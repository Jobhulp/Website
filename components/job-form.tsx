'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { api } from '@/lib/api-client';
import type { JobWithSkills, Sector, WorkType, ExperienceLevel, ProficiencyLevel } from '@/types/api';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select-shadcn';
import { RequiredSkillsManager, type RequiredSkill } from '@/components/required-skills-manager';

// Zod schema
const skillSchema = z.object({
  skillId: z.string().uuid(),
  requiredLevel: z.enum(['informed', 'beginner', 'advanced', 'expert', 'master']),
  weight: z.number().min(1).max(5),
});

const jobFormSchema = z.object({
  title: z.string().min(3, 'Titel moet minstens 3 karakters zijn').max(200, 'Titel mag maximaal 200 karakters zijn'),
  description: z.string().min(20, 'Beschrijving moet minstens 20 karakters zijn').max(5000, 'Beschrijving mag maximaal 5000 karakters zijn'),
  sectorId: z.string().uuid('Selecteer een sector'),
  city: z.string().min(2, 'Stad moet minstens 2 karakters zijn'),
  country: z.string().min(1, 'Selecteer een land'),
  workType: z.enum(['fulltime', 'parttime', 'freelance', 'internship', 'temporary']),
  experienceLevel: z.enum(['junior', 'medior', 'senior']),
  salaryMin: z.number().min(0).optional().nullable(),
  salaryMax: z.number().min(0).optional().nullable(),
  closesAt: z.string().optional().nullable(),
  skills: z.array(skillSchema).min(1, 'Voeg minstens 1 skill toe'),
}).refine((data) => {
  if (data.salaryMin != null && data.salaryMax != null) {
    return data.salaryMax >= data.salaryMin;
  }
  return true;
}, {
  message: 'Maximum salaris moet groter of gelijk zijn aan minimum salaris',
  path: ['salaryMax'],
});

export type JobFormData = z.infer<typeof jobFormSchema>;

// Type for default values that can come from API (JobWithSkills) or be partial form data
type JobFormDefaultValues = {
  title?: string;
  description?: string;
  sectorId?: string;
  city?: string | null;
  country?: string | null;
  workType?: WorkType;
  experienceLevel?: ExperienceLevel;
  salaryMin?: number | null;
  salaryMax?: number | null;
  closesAt?: string | null;
  skills?: Array<{
    skillId: string;
    skillName?: string;
    requiredLevel: ProficiencyLevel;
    weight: number;
  }>;
};

interface JobFormProps {
  mode: 'create' | 'edit';
  defaultValues?: JobFormDefaultValues;
  onSubmit: (data: JobFormData, status: 'draft' | 'active') => Promise<void>;
  onCancel: () => void;
}

// Dutch labels
const WORK_TYPE_LABELS: Record<WorkType, string> = {
  fulltime: 'Voltijds',
  parttime: 'Deeltijds',
  freelance: 'Freelance',
  internship: 'Stage',
  temporary: 'Tijdelijk',
};

const EXPERIENCE_LEVEL_LABELS: Record<ExperienceLevel, string> = {
  junior: 'Junior',
  medior: 'Medior',
  senior: 'Senior',
};

const COUNTRIES = [
  { value: 'BE', label: 'België' },
  { value: 'NL', label: 'Nederland' },
  { value: 'LU', label: 'Luxemburg' },
  { value: 'DE', label: 'Duitsland' },
  { value: 'FR', label: 'Frankrijk' },
];

export function JobForm({ mode, defaultValues, onSubmit, onCancel }: JobFormProps) {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [sectorsLoading, setSectorsLoading] = useState(true);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitTarget, setSubmitTarget] = useState<'draft' | 'active' | null>(null);

  // Map defaultValues to form shape
  const getDefaultValues = (): Partial<JobFormData> => {
    if (!defaultValues) {
      return {
        workType: 'fulltime',
        experienceLevel: 'medior',
        country: 'BE',
        skills: [],
      };
    }

    return {
      title: defaultValues.title || '',
      description: defaultValues.description || '',
      sectorId: defaultValues.sectorId || '',
      city: defaultValues.city || '',
      country: defaultValues.country || 'BE',
      workType: defaultValues.workType || 'fulltime',
      experienceLevel: defaultValues.experienceLevel || 'medior',
      salaryMin: defaultValues.salaryMin,
      salaryMax: defaultValues.salaryMax,
      closesAt: defaultValues.closesAt?.split('T')[0] || null,
      skills: defaultValues.skills?.map((s) => ({
        skillId: s.skillId,
        requiredLevel: s.requiredLevel,
        weight: s.weight,
      })) || [],
    };
  };

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<JobFormData>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: getDefaultValues(),
  });

  const descriptionLength = watch('description')?.length || 0;

  // Fetch sectors on mount
  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const res = await api.get<Sector[]>('/skills/sectors');
        setSectors(res);
      } catch {
        // Silently fail
      } finally {
        setSectorsLoading(false);
      }
    };
    fetchSectors();
  }, []);

  const handleFormSubmit = async (data: JobFormData, status: 'draft' | 'active') => {
    setIsSubmitting(true);
    setSubmitTarget(status);
    setSubmitError(null);

    try {
      await onSubmit(data, status);
    } catch (err) {
      if (err instanceof Error) {
        setSubmitError(err.message);
      } else {
        setSubmitError('Er ging iets mis bij het opslaan.');
      }
    } finally {
      setIsSubmitting(false);
      setSubmitTarget(null);
    }
  };

  return (
    <form className="space-y-6">
      {/* Error banner */}
      {submitError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{submitError}</p>
        </div>
      )}

      {/* Section 1: Basis info */}
      <Card>
        <CardHeader>
          <CardTitle>Basis informatie</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Functietitel *</Label>
            <Input
              id="title"
              placeholder="Bijv. Frontend Developer"
              {...register('title')}
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && (
              <p className="text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          {/* Sector */}
          <div className="space-y-2">
            <Label htmlFor="sectorId">Sector *</Label>
            <Controller
              name="sectorId"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={sectorsLoading}
                >
                  <SelectTrigger className={errors.sectorId ? 'border-red-500' : ''}>
                    <SelectValue placeholder={sectorsLoading ? 'Laden...' : 'Selecteer sector'} />
                  </SelectTrigger>
                  <SelectContent>
                    {sectors.map((sector) => (
                      <SelectItem key={sector.id} value={sector.id}>
                        {sector.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.sectorId && (
              <p className="text-sm text-red-600">{errors.sectorId.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Beschrijving *</Label>
            <Textarea
              id="description"
              placeholder="Beschrijf de functie, verantwoordelijkheden en wat je zoekt in een kandidaat..."
              rows={6}
              {...register('description')}
              className={errors.description ? 'border-red-500' : ''}
            />
            <div className="flex justify-between">
              {errors.description ? (
                <p className="text-sm text-red-600">{errors.description.message}</p>
              ) : (
                <span />
              )}
              <span className={`text-sm ${descriptionLength > 5000 ? 'text-red-600' : 'text-gray-500'}`}>
                {descriptionLength}/5000
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Locatie */}
      <Card>
        <CardHeader>
          <CardTitle>Locatie</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* City */}
            <div className="space-y-2">
              <Label htmlFor="city">Stad *</Label>
              <Input
                id="city"
                placeholder="Bijv. Antwerpen"
                {...register('city')}
                className={errors.city ? 'border-red-500' : ''}
              />
              {errors.city && (
                <p className="text-sm text-red-600">{errors.city.message}</p>
              )}
            </div>

            {/* Country */}
            <div className="space-y-2">
              <Label htmlFor="country">Land *</Label>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className={errors.country ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Selecteer land" />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRIES.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.country && (
                <p className="text-sm text-red-600">{errors.country.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 3: Type & ervaring */}
      <Card>
        <CardHeader>
          <CardTitle>Type en ervaring</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Work type */}
          <div className="space-y-3">
            <Label>Werktype *</Label>
            <Controller
              name="workType"
              control={control}
              render={({ field }) => (
                <div className="flex flex-wrap gap-3">
                  {(Object.keys(WORK_TYPE_LABELS) as WorkType[]).map((type) => (
                    <label
                      key={type}
                      className={`flex items-center gap-2 px-4 py-2 rounded-md border cursor-pointer transition-colors ${
                        field.value === type
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        value={type}
                        checked={field.value === type}
                        onChange={() => field.onChange(type)}
                        className="sr-only"
                      />
                      {WORK_TYPE_LABELS[type]}
                    </label>
                  ))}
                </div>
              )}
            />
            {errors.workType && (
              <p className="text-sm text-red-600">{errors.workType.message}</p>
            )}
          </div>

          {/* Experience level */}
          <div className="space-y-3">
            <Label>Ervaringsniveau *</Label>
            <Controller
              name="experienceLevel"
              control={control}
              render={({ field }) => (
                <div className="flex flex-wrap gap-3">
                  {(Object.keys(EXPERIENCE_LEVEL_LABELS) as ExperienceLevel[]).map((level) => (
                    <label
                      key={level}
                      className={`flex items-center gap-2 px-4 py-2 rounded-md border cursor-pointer transition-colors ${
                        field.value === level
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        value={level}
                        checked={field.value === level}
                        onChange={() => field.onChange(level)}
                        className="sr-only"
                      />
                      {EXPERIENCE_LEVEL_LABELS[level]}
                    </label>
                  ))}
                </div>
              )}
            />
            {errors.experienceLevel && (
              <p className="text-sm text-red-600">{errors.experienceLevel.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Section 4: Salarisrange */}
      <Card>
        <CardHeader>
          <CardTitle>Salarisrange (optioneel)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Geef een salarisrange op om aantrekkelijker te zijn voor goede kandidaten.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Min salary */}
            <div className="space-y-2">
              <Label htmlFor="salaryMin">Minimum (EUR/maand bruto)</Label>
              <Input
                id="salaryMin"
                type="number"
                min={0}
                placeholder="Bijv. 2500"
                {...register('salaryMin', { valueAsNumber: true })}
                className={errors.salaryMin ? 'border-red-500' : ''}
              />
              {errors.salaryMin && (
                <p className="text-sm text-red-600">{errors.salaryMin.message}</p>
              )}
            </div>

            {/* Max salary */}
            <div className="space-y-2">
              <Label htmlFor="salaryMax">Maximum (EUR/maand bruto)</Label>
              <Input
                id="salaryMax"
                type="number"
                min={0}
                placeholder="Bijv. 3500"
                {...register('salaryMax', { valueAsNumber: true })}
                className={errors.salaryMax ? 'border-red-500' : ''}
              />
              {errors.salaryMax && (
                <p className="text-sm text-red-600">{errors.salaryMax.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 5: Required skills */}
      <Card>
        <CardHeader>
          <CardTitle>Vereiste skills *</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Controller
            name="skills"
            control={control}
            render={({ field }) => (
              <RequiredSkillsManager
                value={field.value as RequiredSkill[]}
                onChange={field.onChange}
              />
            )}
          />
          {errors.skills && (
            <p className="text-sm text-red-600">{errors.skills.message}</p>
          )}
        </CardContent>
      </Card>

      {/* Section 6: Sluitingsdatum */}
      <Card>
        <CardHeader>
          <CardTitle>Sluitingsdatum (optioneel)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="closesAt">Sluit automatisch op</Label>
            <Input
              id="closesAt"
              type="date"
              {...register('closesAt')}
              min={new Date().toISOString().split('T')[0]}
            />
            <p className="text-sm text-gray-500">
              Als je geen datum invult, blijft de vacature actief tot je hem zelf sluit.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Annuleren
        </Button>

        {mode === 'create' ? (
          <>
            <Button
              type="button"
              variant="outline"
              onClick={handleSubmit((data) => handleFormSubmit(data, 'draft'))}
              disabled={isSubmitting}
            >
              {isSubmitting && submitTarget === 'draft' ? 'Opslaan...' : 'Opslaan als concept'}
            </Button>
            <Button
              type="button"
              onClick={handleSubmit((data) => handleFormSubmit(data, 'active'))}
              disabled={isSubmitting}
            >
              {isSubmitting && submitTarget === 'active' ? 'Publiceren...' : 'Publiceren'}
            </Button>
          </>
        ) : (
          <Button
            type="button"
            onClick={handleSubmit((data) => handleFormSubmit(data, 'active'))}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Opslaan...' : 'Wijzigingen opslaan'}
          </Button>
        )}
      </div>
    </form>
  );
}
