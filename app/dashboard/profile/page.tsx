'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { api, ApiError } from '@/lib/api-client';
import type { CandidateProfile, WorkType } from '@/types/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';
import { ProfileCompleteness } from '@/components/profile-completeness';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select-shadcn';
import { Upload, X, FileText, Check, ChevronRight, MapPin, User, Briefcase, Settings } from 'lucide-react';

// Schemas for each section
const personalInfoSchema = z.object({
  firstName: z.string().min(1, 'Voornaam is verplicht'),
  lastName: z.string().min(1, 'Achternaam is verplicht'),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(),
  bio: z.string().max(500, 'Maximum 500 tekens').optional(),
});

const locationSchema = z.object({
  streetAddress: z.string().optional(),
  postalCode: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

const preferencesSchema = z.object({
  desiredSalaryMin: z.number().min(0).optional().nullable(),
  desiredSalaryMax: z.number().min(0).optional().nullable(),
  maxCommuteKm: z.number().min(0).max(500).optional().nullable(),
  linkedinUrl: z.string().url('Ongeldige URL').optional().or(z.literal('')),
  portfolioUrl: z.string().url('Ongeldige URL').optional().or(z.literal('')),
  isSearchable: z.boolean(),
});

type PersonalInfoForm = z.infer<typeof personalInfoSchema>;
type LocationForm = z.infer<typeof locationSchema>;
type PreferencesForm = z.infer<typeof preferencesSchema>;

const WORK_TYPE_LABELS: Record<WorkType, string> = {
  full_time: 'Voltijds',
  part_time: 'Deeltijds',
  freelance: 'Freelance',
  temporary: 'Tijdelijk',
};

const COUNTRIES = [
  { value: 'BE', label: 'België' },
  { value: 'NL', label: 'Nederland' },
  { value: 'LU', label: 'Luxemburg' },
  { value: 'DE', label: 'Duitsland' },
  { value: 'FR', label: 'Frankrijk' },
];

export default function CandidateProfilePage() {
  const [profile, setProfile] = useState<CandidateProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Section save states
  const [savingPersonal, setSavingPersonal] = useState(false);
  const [savedPersonal, setSavedPersonal] = useState(false);
  const [savingLocation, setSavingLocation] = useState(false);
  const [savedLocation, setSavedLocation] = useState(false);
  const [savingPreferences, setSavingPreferences] = useState(false);
  const [savedPreferences, setSavedPreferences] = useState(false);

  // Work types state (separate because multi-checkbox)
  const [workTypes, setWorkTypes] = useState<WorkType[]>([]);
  const [workTypesDirty, setWorkTypesDirty] = useState(false);

  // Avatar/CV upload states
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [cvUrl, setCvUrl] = useState<string | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingCv, setUploadingCv] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const cvInputRef = useRef<HTMLInputElement>(null);

  // Geocode state
  const [geocoding, setGeocoding] = useState(false);
  const [geoLocation, setGeoLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Forms
  const personalForm = useForm<PersonalInfoForm>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      dateOfBirth: '',
      bio: '',
    },
  });

  const locationForm = useForm<LocationForm>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      streetAddress: '',
      postalCode: '',
      city: '',
      country: 'BE',
    },
  });

  const preferencesForm = useForm<PreferencesForm>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      desiredSalaryMin: null,
      desiredSalaryMax: null,
      maxCommuteKm: 30,
      linkedinUrl: '',
      portfolioUrl: '',
      isSearchable: true,
    },
  });

  // Bio character count
  const bioValue = personalForm.watch('bio') || '';

  // Fetch profile on mount
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await api.get<{ profile: CandidateProfile }>('/candidate/profile');
        const p = res.profile;
        setProfile(p);
        setAvatarUrl(p.avatarUrl);
        setCvUrl(p.cvUrl);
        setWorkTypes(p.workTypes || []);
        if (p.latitude && p.longitude) {
          setGeoLocation({ lat: p.latitude, lng: p.longitude });
        }

        // Populate forms
        personalForm.reset({
          firstName: p.firstName || '',
          lastName: p.lastName || '',
          phone: p.phone || '',
          dateOfBirth: p.dateOfBirth || '',
          bio: p.bio || '',
        });

        locationForm.reset({
          streetAddress: p.streetAddress || '',
          postalCode: p.postalCode || '',
          city: p.city || '',
          country: p.country || 'BE',
        });

        preferencesForm.reset({
          desiredSalaryMin: p.desiredSalaryMin,
          desiredSalaryMax: p.desiredSalaryMax,
          maxCommuteKm: p.maxCommuteKm ?? 30,
          linkedinUrl: p.linkedinUrl || '',
          portfolioUrl: p.portfolioUrl || '',
          isSearchable: p.isSearchable ?? true,
        });
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError('Er ging iets mis bij het laden van je profiel.');
        }
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  // Save handlers
  const savePersonalInfo = async (data: PersonalInfoForm) => {
    setSavingPersonal(true);
    setSavedPersonal(false);
    try {
      await api.patch('/candidate/profile', data);
      setSavedPersonal(true);
      personalForm.reset(data);
      setTimeout(() => setSavedPersonal(false), 2000);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      }
    } finally {
      setSavingPersonal(false);
    }
  };

  const saveLocation = async (data: LocationForm) => {
    setSavingLocation(true);
    setSavedLocation(false);
    try {
      // Geocode the address
      if (data.streetAddress && data.city && data.country) {
        setGeocoding(true);
        try {
          const geoRes = await api.post<{ latitude: number; longitude: number }>('/geocode', {
            streetAddress: data.streetAddress,
            postalCode: data.postalCode,
            city: data.city,
            country: data.country,
          });
          setGeoLocation({ lat: geoRes.latitude, lng: geoRes.longitude });
          await api.patch('/candidate/profile', {
            ...data,
            latitude: geoRes.latitude,
            longitude: geoRes.longitude,
          });
        } catch {
          // Geocode failed, save without coords
          await api.patch('/candidate/profile', data);
        } finally {
          setGeocoding(false);
        }
      } else {
        await api.patch('/candidate/profile', data);
      }
      setSavedLocation(true);
      locationForm.reset(data);
      setTimeout(() => setSavedLocation(false), 2000);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      }
    } finally {
      setSavingLocation(false);
    }
  };

  const savePreferences = async (data: PreferencesForm) => {
    setSavingPreferences(true);
    setSavedPreferences(false);
    try {
      await api.patch('/candidate/profile', {
        ...data,
        workTypes,
      });
      setSavedPreferences(true);
      setWorkTypesDirty(false);
      preferencesForm.reset(data);
      setTimeout(() => setSavedPreferences(false), 2000);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      }
    } finally {
      setSavingPreferences(false);
    }
  };

  const toggleWorkType = (type: WorkType) => {
    setWorkTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
    setWorkTypesDirty(true);
  };

  // File upload handlers
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    try {
      // Get presigned URL
      const { uploadUrl, publicUrl } = await api.post<{ uploadUrl: string; publicUrl: string }>(
        '/candidate/avatar/upload-url',
        { contentType: file.type }
      );

      // Upload to R2
      await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type },
      });

      // Update profile
      await api.patch('/candidate/profile', { avatarUrl: publicUrl });
      setAvatarUrl(publicUrl);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      }
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleCvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('CV mag maximaal 5MB zijn.');
      return;
    }

    setUploadingCv(true);
    try {
      // Get presigned URL
      const { uploadUrl, publicUrl } = await api.post<{ uploadUrl: string; publicUrl: string }>(
        '/candidate/cv/upload-url',
        { contentType: file.type, fileName: file.name }
      );

      // Upload to R2
      await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type },
      });

      // Update profile
      await api.patch('/candidate/profile', { cvUrl: publicUrl });
      setCvUrl(publicUrl);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      }
    } finally {
      setUploadingCv(false);
    }
  };

  const removeAvatar = async () => {
    try {
      await api.patch('/candidate/profile', { avatarUrl: null });
      setAvatarUrl(null);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      }
    }
  };

  const removeCv = async () => {
    try {
      await api.patch('/candidate/profile', { cvUrl: null });
      setCvUrl(null);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="container max-w-3xl mx-auto px-4 py-8">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-64 mb-8" />
        <div className="space-y-6">
          <Skeleton className="h-48" />
          <Skeleton className="h-64" />
          <Skeleton className="h-48" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-1">Mijn profiel</h1>
      <p className="text-gray-600 text-sm mb-8">
        Beheer je persoonlijke gegevens en voorkeuren
      </p>

      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Profile Completeness */}
        {profile && (
          <ProfileCompleteness completeness={profile.profileCompleteness} />
        )}

        {/* Avatar & CV Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Profielfoto en CV
            </CardTitle>
            <CardDescription>
              Upload een foto en je CV om je profiel completer te maken
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Avatar */}
              <div>
                <Label className="mb-2 block">Profielfoto</Label>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt="Profielfoto"
                        className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                        <User className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                    {avatarUrl && (
                      <button
                        onClick={removeAvatar}
                        className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                  <div>
                    <input
                      ref={avatarInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => avatarInputRef.current?.click()}
                      disabled={uploadingAvatar}
                    >
                      {uploadingAvatar ? 'Uploaden...' : 'Foto kiezen'}
                    </Button>
                  </div>
                </div>
              </div>

              {/* CV */}
              <div>
                <Label className="mb-2 block">CV (PDF, max 5MB)</Label>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    {cvUrl ? (
                      <div className="w-20 h-20 rounded-lg bg-green-50 flex items-center justify-center border-2 border-green-200">
                        <FileText className="h-8 w-8 text-green-600" />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                        <FileText className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                    {cvUrl && (
                      <button
                        onClick={removeCv}
                        className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <input
                      ref={cvInputRef}
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={handleCvUpload}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => cvInputRef.current?.click()}
                      disabled={uploadingCv}
                    >
                      {uploadingCv ? 'Uploaden...' : cvUrl ? 'Vervangen' : 'CV uploaden'}
                    </Button>
                    {cvUrl && (
                      <a
                        href={cvUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline"
                      >
                        Bekijk CV
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Persoonlijke informatie
            </CardTitle>
            <CardDescription>
              Je naam en contactgegevens
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={personalForm.handleSubmit(savePersonalInfo)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Voornaam</Label>
                  <Input
                    id="firstName"
                    {...personalForm.register('firstName')}
                    placeholder="Jan"
                  />
                  {personalForm.formState.errors.firstName && (
                    <p className="text-xs text-red-500">{personalForm.formState.errors.firstName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Achternaam</Label>
                  <Input
                    id="lastName"
                    {...personalForm.register('lastName')}
                    placeholder="Janssens"
                  />
                  {personalForm.formState.errors.lastName && (
                    <p className="text-xs text-red-500">{personalForm.formState.errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefoonnummer</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...personalForm.register('phone')}
                    placeholder="+32 470 12 34 56"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Geboortedatum</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    {...personalForm.register('dateOfBirth')}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="bio">Bio</Label>
                  <span className={`text-xs ${bioValue.length > 500 ? 'text-red-500' : 'text-gray-500'}`}>
                    {bioValue.length}/500
                  </span>
                </div>
                <Textarea
                  id="bio"
                  {...personalForm.register('bio')}
                  placeholder="Vertel kort iets over jezelf, je ervaring en wat je zoekt..."
                  rows={4}
                />
                {personalForm.formState.errors.bio && (
                  <p className="text-xs text-red-500">{personalForm.formState.errors.bio.message}</p>
                )}
              </div>

              <div className="flex items-center justify-end gap-3">
                {savedPersonal && (
                  <span className="text-sm text-green-600 flex items-center gap-1">
                    <Check className="h-4 w-4" /> Opgeslagen
                  </span>
                )}
                <Button
                  type="submit"
                  disabled={!personalForm.formState.isDirty || savingPersonal}
                >
                  {savingPersonal ? 'Bewaren...' : 'Bewaren'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Location Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Locatie
            </CardTitle>
            <CardDescription>
              Je adres wordt gebruikt voor het berekenen van reisafstanden
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={locationForm.handleSubmit(saveLocation)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="streetAddress">Straat en huisnummer</Label>
                <Input
                  id="streetAddress"
                  {...locationForm.register('streetAddress')}
                  placeholder="Grote Markt 1"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postcode</Label>
                  <Input
                    id="postalCode"
                    {...locationForm.register('postalCode')}
                    placeholder="1000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Gemeente</Label>
                  <Input
                    id="city"
                    {...locationForm.register('city')}
                    placeholder="Brussel"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Land</Label>
                  <Select
                    value={locationForm.watch('country') || 'BE'}
                    onValueChange={(value) => locationForm.setValue('country', value, { shouldDirty: true })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRIES.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {geoLocation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-md flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-700">
                    Adres gelocaliseerd: {geoLocation.lat.toFixed(2)}°N, {geoLocation.lng.toFixed(2)}°E
                  </span>
                </div>
              )}

              <div className="flex items-center justify-end gap-3">
                {savedLocation && (
                  <span className="text-sm text-green-600 flex items-center gap-1">
                    <Check className="h-4 w-4" /> Opgeslagen
                  </span>
                )}
                <Button
                  type="submit"
                  disabled={!locationForm.formState.isDirty || savingLocation || geocoding}
                >
                  {geocoding ? 'Localiseren...' : savingLocation ? 'Bewaren...' : 'Bewaren'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Work Preferences Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Werkvoorkeuren
            </CardTitle>
            <CardDescription>
              Je salariswensen en beschikbaarheid
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={preferencesForm.handleSubmit(savePreferences)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="desiredSalaryMin">Minimum salaris (EUR/maand bruto)</Label>
                  <Input
                    id="desiredSalaryMin"
                    type="number"
                    {...preferencesForm.register('desiredSalaryMin', { valueAsNumber: true })}
                    placeholder="2500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="desiredSalaryMax">Maximum salaris (EUR/maand bruto)</Label>
                  <Input
                    id="desiredSalaryMax"
                    type="number"
                    {...preferencesForm.register('desiredSalaryMax', { valueAsNumber: true })}
                    placeholder="4000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Type werk</Label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(WORK_TYPE_LABELS) as WorkType[]).map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-2 p-3 border rounded-md cursor-pointer hover:bg-gray-50"
                    >
                      <Checkbox
                        checked={workTypes.includes(type)}
                        onCheckedChange={() => toggleWorkType(type)}
                      />
                      <span className="text-sm">{WORK_TYPE_LABELS[type]}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxCommuteKm">Maximum woon-werk afstand (km)</Label>
                <Input
                  id="maxCommuteKm"
                  type="number"
                  {...preferencesForm.register('maxCommuteKm', { valueAsNumber: true })}
                  placeholder="30"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                  <Input
                    id="linkedinUrl"
                    type="url"
                    {...preferencesForm.register('linkedinUrl')}
                    placeholder="https://linkedin.com/in/..."
                  />
                  {preferencesForm.formState.errors.linkedinUrl && (
                    <p className="text-xs text-red-500">{preferencesForm.formState.errors.linkedinUrl.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="portfolioUrl">Portfolio URL</Label>
                  <Input
                    id="portfolioUrl"
                    type="url"
                    {...preferencesForm.register('portfolioUrl')}
                    placeholder="https://..."
                  />
                  {preferencesForm.formState.errors.portfolioUrl && (
                    <p className="text-xs text-red-500">{preferencesForm.formState.errors.portfolioUrl.message}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                <div>
                  <Label htmlFor="isSearchable" className="font-medium">
                    Zichtbaar voor werkgevers
                  </Label>
                  <p className="text-sm text-gray-500">
                    Als dit aan staat, kunnen werkgevers je profiel vinden
                  </p>
                </div>
                <Switch
                  id="isSearchable"
                  checked={preferencesForm.watch('isSearchable')}
                  onCheckedChange={(checked) =>
                    preferencesForm.setValue('isSearchable', checked, { shouldDirty: true })
                  }
                />
              </div>

              <div className="flex items-center justify-end gap-3">
                {savedPreferences && (
                  <span className="text-sm text-green-600 flex items-center gap-1">
                    <Check className="h-4 w-4" /> Opgeslagen
                  </span>
                )}
                <Button
                  type="submit"
                  disabled={(!preferencesForm.formState.isDirty && !workTypesDirty) || savingPreferences}
                >
                  {savingPreferences ? 'Bewaren...' : 'Bewaren'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Meer opties
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link
              href="/dashboard/profile/skills"
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium">Beheer mijn skills</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Link>
            <Link
              href="/dashboard/profile/personality-test"
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div>
                <span className="font-medium">
                  {profile?.mbtiType ? 'Persoonlijkheidstest opnieuw doen' : 'Doe de persoonlijkheidstest'}
                </span>
                {profile?.mbtiType && (
                  <p className="text-sm text-gray-500">Huidig type: {profile.mbtiType}</p>
                )}
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Link>
            <Link
              href="/dashboard/profile/experience"
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium">Werkervaring en opleiding</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
