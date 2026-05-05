'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { api, ApiError } from '@/lib/api-client';
import type { JobWithSkills } from '@/types/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select-shadcn';

const optionSchema = z.object({
  text: z.string().min(1, 'Optie tekst is verplicht'),
  isCorrect: z.boolean(),
});

const questionSchema = z.object({
  text: z.string().min(1, 'Vraag tekst is verplicht'),
  options: z
    .array(optionSchema)
    .min(2, 'Minstens 2 opties per vraag')
    .max(6, 'Maximaal 6 opties per vraag')
    .refine(
      (options) => options.filter((o) => o.isCorrect).length === 1,
      'Exact 1 correct antwoord per vraag'
    ),
});

const testFormSchema = z.object({
  title: z.string().min(3, 'Minimum 3 tekens').max(200, 'Maximum 200 tekens'),
  skillId: z.string().min(1, 'Selecteer een skill'),
  description: z.string().max(1000, 'Maximum 1000 tekens').optional(),
  passThreshold: z.number().min(50, 'Minimum 50%').max(100, 'Maximum 100%'),
  questions: z.array(questionSchema).min(1, 'Minstens 1 vraag'),
});

type TestFormData = z.infer<typeof testFormSchema>;

export default function NewEmployerTestPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;

  const [job, setJob] = useState<JobWithSkills | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TestFormData>({
    resolver: zodResolver(testFormSchema),
    defaultValues: {
      title: '',
      skillId: '',
      description: '',
      passThreshold: 70,
      questions: [
        {
          text: '',
          options: [
            { text: '', isCorrect: true },
            { text: '', isCorrect: false },
          ],
        },
      ],
    },
  });

  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: 'questions',
  });

  const watchedQuestions = watch('questions');

  useEffect(() => {
    async function fetchJob() {
      try {
        const res = await api.get<{ job: JobWithSkills }>(`/employer/jobs/${jobId}`);
        setJob(res.job);
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError('Kon vacature niet laden');
        }
      } finally {
        setLoading(false);
      }
    }
    fetchJob();
  }, [jobId]);

  const onSubmit = async (data: TestFormData) => {
    setSubmitting(true);
    setError(null);

    try {
      await api.post(`/employer/jobs/${jobId}/tests`, data);
      router.push(`/dashboard/employer/jobs/${jobId}/tests`);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Kon toets niet aanmaken');
      }
      setSubmitting(false);
    }
  };

  const addOption = (questionIndex: number) => {
    const currentOptions = watchedQuestions[questionIndex]?.options || [];
    if (currentOptions.length < 6) {
      setValue(`questions.${questionIndex}.options`, [
        ...currentOptions,
        { text: '', isCorrect: false },
      ]);
    }
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const currentOptions = watchedQuestions[questionIndex]?.options || [];
    if (currentOptions.length > 2) {
      setValue(
        `questions.${questionIndex}.options`,
        currentOptions.filter((_, i) => i !== optionIndex)
      );
    }
  };

  const setCorrectOption = (questionIndex: number, optionIndex: number) => {
    const currentOptions = watchedQuestions[questionIndex]?.options || [];
    setValue(
      `questions.${questionIndex}.options`,
      currentOptions.map((opt, i) => ({
        ...opt,
        isCorrect: i === optionIndex,
      }))
    );
  };

  if (loading) {
    return (
      <div className="container max-w-3xl py-8">
        <Skeleton className="h-8 w-64 mb-4" />
        <Skeleton className="h-[600px]" />
      </div>
    );
  }

  if (error && !job) {
    return (
      <div className="container max-w-3xl py-8">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="py-6">
            <p className="text-red-600">{error}</p>
            <Button asChild variant="outline" className="mt-4">
              <Link href="/dashboard/employer/jobs">Terug naar vacatures</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <Link href="/dashboard/employer/jobs" className="hover:text-gray-900">
          Vacatures
        </Link>
        <span>/</span>
        <Link href={`/dashboard/employer/jobs/${jobId}`} className="hover:text-gray-900">
          {job?.title}
        </Link>
        <span>/</span>
        <Link href={`/dashboard/employer/jobs/${jobId}/tests`} className="hover:text-gray-900">
          Toetsen
        </Link>
        <span>/</span>
        <span className="text-gray-900">Nieuwe toets</span>
      </nav>

      <h1 className="text-2xl font-bold mb-2">Nieuwe werkgever-toets</h1>
      <p className="text-gray-600 text-sm mb-6">
        Maak een eigen toets aan om kandidaten te testen op specifieke vaardigheden.
      </p>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* General info */}
        <Card>
          <CardHeader>
            <CardTitle>Algemeen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Titel *</Label>
              <Input
                id="title"
                {...register('title')}
                placeholder="bijv. JavaScript Basis Kennis"
              />
              {errors.title && (
                <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="skillId">Skill *</Label>
              <Select
                value={watch('skillId')}
                onValueChange={(value) => setValue('skillId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecteer een skill" />
                </SelectTrigger>
                <SelectContent>
                  {job?.skills.map((skill) => (
                    <SelectItem key={skill.skillId} value={skill.skillId}>
                      {skill.skillName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.skillId && (
                <p className="text-sm text-red-600 mt-1">{errors.skillId.message}</p>
              )}
              {job?.skills.length === 0 && (
                <p className="text-sm text-amber-600 mt-1">
                  Deze vacature heeft nog geen vereiste skills. Voeg eerst skills toe.
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="description">Beschrijving (optioneel)</Label>
              <Textarea
                id="description"
                {...register('description')}
                placeholder="Korte beschrijving van wat deze toets test..."
                rows={3}
              />
              <div className="flex justify-between mt-1">
                {errors.description && (
                  <p className="text-sm text-red-600">{errors.description.message}</p>
                )}
                <p className="text-xs text-gray-500 ml-auto">
                  {watch('description')?.length || 0}/1000
                </p>
              </div>
            </div>

            <div>
              <Label htmlFor="passThreshold">Slaagpercentage *</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="passThreshold"
                  type="number"
                  min={50}
                  max={100}
                  {...register('passThreshold', { valueAsNumber: true })}
                  className="w-24"
                />
                <span className="text-gray-600">%</span>
              </div>
              {errors.passThreshold && (
                <p className="text-sm text-red-600 mt-1">{errors.passThreshold.message}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Kandidaten moeten dit percentage halen om te slagen (50-100%)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tip card */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="py-4">
            <p className="text-sm text-blue-800">
              <strong>Tip:</strong> 5-10 vragen werkt het beste. Niet te lang, maar genoeg om
              een goed beeld te krijgen van de kennis van de kandidaat.
            </p>
          </CardContent>
        </Card>

        {/* Questions */}
        <Card>
          <CardHeader>
            <CardTitle>Vragen</CardTitle>
            <CardDescription>
              Voeg minstens 1 vraag toe. Elke vraag heeft 2-6 opties waarvan er exact 1 correct is.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {questionFields.map((field, qIndex) => (
              <div
                key={field.id}
                className="p-4 border rounded-lg bg-gray-50 space-y-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <Label>Vraag {qIndex + 1} *</Label>
                    <Textarea
                      {...register(`questions.${qIndex}.text`)}
                      placeholder="Stel je vraag..."
                      rows={2}
                    />
                    {errors.questions?.[qIndex]?.text && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.questions[qIndex]?.text?.message}
                      </p>
                    )}
                  </div>
                  {questionFields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeQuestion(qIndex)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Verwijder
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Opties</Label>
                  {watchedQuestions[qIndex]?.options.map((option, oIndex) => (
                    <div key={oIndex} className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Checkbox
                          checked={option.isCorrect}
                          onCheckedChange={() => setCorrectOption(qIndex, oIndex)}
                        />
                      </div>
                      <Input
                        {...register(`questions.${qIndex}.options.${oIndex}.text`)}
                        placeholder={`Optie ${oIndex + 1}`}
                        className="flex-1"
                      />
                      {watchedQuestions[qIndex]?.options.length > 2 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeOption(qIndex, oIndex)}
                          className="text-gray-500 hover:text-red-600"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Button>
                      )}
                    </div>
                  ))}
                  {errors.questions?.[qIndex]?.options && (
                    <p className="text-sm text-red-600">
                      {typeof errors.questions[qIndex]?.options?.message === 'string'
                        ? errors.questions[qIndex]?.options?.message
                        : 'Controleer de opties'}
                    </p>
                  )}
                  {watchedQuestions[qIndex]?.options.length < 6 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => addOption(qIndex)}
                      className="text-gray-600"
                    >
                      + Optie toevoegen
                    </Button>
                  )}
                  <p className="text-xs text-gray-500">
                    Vink het correcte antwoord aan met het selectievakje
                  </p>
                </div>
              </div>
            ))}

            {errors.questions?.message && (
              <p className="text-sm text-red-600">{errors.questions.message}</p>
            )}

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                appendQuestion({
                  text: '',
                  options: [
                    { text: '', isCorrect: true },
                    { text: '', isCorrect: false },
                  ],
                })
              }
            >
              + Vraag toevoegen
            </Button>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={submitting}
          >
            Annuleren
          </Button>
          <Button type="submit" disabled={submitting || job?.skills.length === 0}>
            {submitting ? 'Opslaan...' : 'Opslaan'}
          </Button>
        </div>
      </form>
    </div>
  );
}
