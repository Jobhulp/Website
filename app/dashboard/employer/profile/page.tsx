'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { api, ApiError } from '@/lib/api-client';
import { useAuth } from '@/lib/auth-context';
import type { EmployerProfile, Sector } from '@/types/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select-shadcn';

// Validation schemas
const companyInfoSchema = z.object({
  companyName: z.string().min(2, 'Bedrijfsnaam is verplicht'),
  vatNumber: z.string().regex(/^BE0\d{3}\.\d{3}\.\d{3}$/, 'Formaat: BE0000.000.000').or(z.literal('')).optional(),
  sectorId: z.string().optional(),
  websiteUrl: z.string().url('Ongeldige URL').or(z.literal('')).optional(),
  linkedinUrl: z.string().url('Ongeldige URL').or(z.literal('')).optional(),
});

const locationSchema = z.object({
  streetAddress: z.string().optional(),
  postalCode: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

const descriptionSchema = z.object({
  description: z.string().max(2000, 'Maximum 2000 tekens').optional(),
  cultureDescription: z.string().max(1000, 'Maximum 1000 tekens').optional(),
});

type CompanyInfoForm = z.infer<typeof companyInfoSchema>;
type LocationForm = z.infer<typeof locationSchema>;
type DescriptionForm = z.infer<typeof descriptionSchema>;

const COUNTRIES = [
  { value: 'BE', label: 'België' },
  { value: 'NL', label: 'Nederland' },
  { value: 'LU', label: 'Luxemburg' },
  { value: 'DE', label: 'Duitsland' },
  { value: 'FR', label: 'Frankrijk' },
];

export default function EmployerProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<EmployerProfile | null>(null);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Section states
  const [brandingSaving, setBrandingSaving] = useState(false);
  const [brandingSaved, setBrandingSaved] = useState(false);
  const [companyInfoSaving, setCompanyInfoSaving] = useState(false);
  const [companyInfoSaved, setCompanyInfoSaved] = useState(false);
  const [locationSaving, setLocationSaving] = useState(false);
  const [locationSaved, setLocationSaved] = useState(false);
  const [descriptionSaving, setDescriptionSaving] = useState(false);
  const [descriptionSaved, setDescriptionSaved] = useState(false);

  // Image previews
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  // Forms
  const companyInfoForm = useForm<CompanyInfoForm>({
    resolver: zodResolver(companyInfoSchema),
    defaultValues: {
      companyName: '',
      vatNumber: '',
      sectorId: '',
      websiteUrl: '',
      linkedinUrl: '',
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

  const descriptionForm = useForm<DescriptionForm>({
    resolver: zodResolver(descriptionSchema),
    defaultValues: {
      description: '',
      cultureDescription: '',
    },
  });

  // Load profile and sectors
  useEffect(() => {
    async function loadData() {
      try {
        const [profileRes, sectorsRes] = await Promise.all([
          api.get<{ profile: EmployerProfile }>('/employer/profile'),
          api.get<{ sectors: Sector[] }>('/skills/sectors'),
        ]);

        const p = profileRes.profile;
        setProfile(p);
        setSectors(sectorsRes.sectors);

        // Populate forms
        companyInfoForm.reset({
          companyName: p.companyName || '',
          vatNumber: p.vatNumber || '',
          sectorId: p.sectorId || '',
          websiteUrl: p.websiteUrl || '',
          linkedinUrl: p.linkedinUrl || '',
        });

        locationForm.reset({
          streetAddress: p.streetAddress || '',
          postalCode: p.postalCode || '',
          city: p.city || '',
          country: p.country || 'BE',
        });

        descriptionForm.reset({
          description: p.description || '',
          cultureDescription: p.cultureDescription || '',
        });

        // Set image previews
        if (p.logoUrl) setLogoPreview(p.logoUrl);
        if (p.coverImageUrl) setCoverPreview(p.coverImageUrl);
      } catch (err) {
        setError(err instanceof ApiError ? err.message : 'Kon profiel niet laden');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Image handlers
  const handleLogoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Logo mag maximaal 2MB zijn');
      return;
    }

    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleCoverSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Cover image mag maximaal 5MB zijn');
      return;
    }

    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const removeLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
    if (logoInputRef.current) logoInputRef.current.value = '';
  };

  const removeCover = () => {
    setCoverFile(null);
    setCoverPreview(null);
    if (coverInputRef.current) coverInputRef.current.value = '';
  };

  // Save branding
  const saveBranding = async () => {
    setBrandingSaving(true);
    setBrandingSaved(false);

    try {
      const formData = new FormData();
      if (logoFile) formData.append('logo', logoFile);
      if (coverFile) formData.append('coverImage', coverFile);
      if (!logoPreview && profile?.logoUrl) formData.append('removeLogo', 'true');
      if (!coverPreview && profile?.coverImageUrl) formData.append('removeCover', 'true');

      await api.patch('/employer/profile/branding', formData);

      setBrandingSaved(true);
      setLogoFile(null);
      setCoverFile(null);
      setTimeout(() => setBrandingSaved(false), 2000);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Kon branding niet opslaan');
    } finally {
      setBrandingSaving(false);
    }
  };

  // Save company info
  const saveCompanyInfo = async (data: CompanyInfoForm) => {
    setCompanyInfoSaving(true);
    setCompanyInfoSaved(false);

    try {
      await api.patch('/employer/profile', {
        companyName: data.companyName,
        vatNumber: data.vatNumber || null,
        sectorId: data.sectorId || null,
        websiteUrl: data.websiteUrl || null,
        linkedinUrl: data.linkedinUrl || null,
      });

      setCompanyInfoSaved(true);
      setTimeout(() => setCompanyInfoSaved(false), 2000);
    } catch (err) {
      if (err instanceof ApiError && err.details) {
        err.details.forEach((d) => {
          companyInfoForm.setError(d.field as keyof CompanyInfoForm, { message: d.message });
        });
      } else {
        setError(err instanceof ApiError ? err.message : 'Kon bedrijfsinfo niet opslaan');
      }
    } finally {
      setCompanyInfoSaving(false);
    }
  };

  // Save location with geocoding
  const saveLocation = async (data: LocationForm) => {
    setLocationSaving(true);
    setLocationSaved(false);

    try {
      // Geocode if address is provided
      let latitude: number | null = null;
      let longitude: number | null = null;

      if (data.streetAddress && data.city && data.country) {
        const address = `${data.streetAddress}, ${data.postalCode} ${data.city}, ${data.country}`;
        try {
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
          );
          const geoData = await geoRes.json();
          if (geoData[0]) {
            latitude = parseFloat(geoData[0].lat);
            longitude = parseFloat(geoData[0].lon);
          }
        } catch {
          // Geocoding failed, continue without coordinates
        }
      }

      await api.patch('/employer/profile', {
        streetAddress: data.streetAddress || null,
        postalCode: data.postalCode || null,
        city: data.city || null,
        country: data.country || null,
        latitude,
        longitude,
      });

      setLocationSaved(true);
      setTimeout(() => setLocationSaved(false), 2000);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Kon locatie niet opslaan');
    } finally {
      setLocationSaving(false);
    }
  };

  // Save description
  const saveDescription = async (data: DescriptionForm) => {
    setDescriptionSaving(true);
    setDescriptionSaved(false);

    try {
      await api.patch('/employer/profile', {
        description: data.description || null,
        cultureDescription: data.cultureDescription || null,
      });

      setDescriptionSaved(true);
      setTimeout(() => setDescriptionSaved(false), 2000);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Kon beschrijving niet opslaan');
    } finally {
      setDescriptionSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-64" />
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
      </div>
    );
  }

  const descriptionValue = descriptionForm.watch('description') || '';
  const cultureValue = descriptionForm.watch('cultureDescription') || '';

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Bedrijfsprofiel</h1>
        <p className="text-gray-600 text-sm">
          Beheer je bedrijfsinformatie die kandidaten te zien krijgen.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Branding Section */}
        <Card>
          <CardHeader>
            <CardTitle>Branding</CardTitle>
            <CardDescription>Je logo en cover image voor de bedrijfspagina.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Logo */}
            <div>
              <Label className="mb-2 block">Logo (vierkant, max 2MB)</Label>
              <div className="flex items-center gap-4">
                {logoPreview ? (
                  <div className="relative">
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="w-24 h-24 rounded-lg object-cover border"
                    />
                    <button
                      type="button"
                      onClick={removeLogo}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600"
                    >
                      X
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => logoInputRef.current?.click()}
                    className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                  >
                    <span className="text-gray-400 text-sm text-center px-2">Klik om te uploaden</span>
                  </div>
                )}
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoSelect}
                  className="hidden"
                />
                {logoPreview && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => logoInputRef.current?.click()}
                  >
                    Wijzigen
                  </Button>
                )}
              </div>
            </div>

            {/* Cover Image */}
            <div>
              <Label className="mb-2 block">Cover image (16:9, max 5MB)</Label>
              <div className="space-y-2">
                {coverPreview ? (
                  <div className="relative">
                    <img
                      src={coverPreview}
                      alt="Cover preview"
                      className="w-full h-48 rounded-lg object-cover border"
                    />
                    <button
                      type="button"
                      onClick={removeCover}
                      className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full text-sm flex items-center justify-center hover:bg-red-600"
                    >
                      X
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => coverInputRef.current?.click()}
                    className="w-full h-32 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                  >
                    <span className="text-gray-400 text-sm">Klik om cover image te uploaden</span>
                  </div>
                )}
                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleCoverSelect}
                  className="hidden"
                />
                {coverPreview && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => coverInputRef.current?.click()}
                  >
                    Wijzigen
                  </Button>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={saveBranding}
                disabled={brandingSaving || (!logoFile && !coverFile && logoPreview === profile?.logoUrl && coverPreview === profile?.coverImageUrl)}
              >
                {brandingSaving ? 'Opslaan...' : brandingSaved ? 'Opgeslagen' : 'Branding opslaan'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Company Info Section */}
        <Card>
          <CardHeader>
            <CardTitle>Bedrijfsinformatie</CardTitle>
            <CardDescription>Basis informatie over je bedrijf.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={companyInfoForm.handleSubmit(saveCompanyInfo)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">Bedrijfsnaam *</Label>
                  <Input
                    id="companyName"
                    {...companyInfoForm.register('companyName')}
                    className="mt-1"
                  />
                  {companyInfoForm.formState.errors.companyName && (
                    <p className="text-sm text-red-600 mt-1">
                      {companyInfoForm.formState.errors.companyName.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="vatNumber">BTW-nummer</Label>
                  <Input
                    id="vatNumber"
                    placeholder="BE0000.000.000"
                    {...companyInfoForm.register('vatNumber')}
                    className="mt-1"
                  />
                  {companyInfoForm.formState.errors.vatNumber && (
                    <p className="text-sm text-red-600 mt-1">
                      {companyInfoForm.formState.errors.vatNumber.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="sectorId">Sector</Label>
                <Select
                  value={companyInfoForm.watch('sectorId') || ''}
                  onValueChange={(value) => companyInfoForm.setValue('sectorId', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecteer een sector" />
                  </SelectTrigger>
                  <SelectContent>
                    {sectors.map((sector) => (
                      <SelectItem key={sector.id} value={sector.id}>
                        {sector.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="websiteUrl">Website</Label>
                  <Input
                    id="websiteUrl"
                    type="url"
                    placeholder="https://www.example.com"
                    {...companyInfoForm.register('websiteUrl')}
                    className="mt-1"
                  />
                  {companyInfoForm.formState.errors.websiteUrl && (
                    <p className="text-sm text-red-600 mt-1">
                      {companyInfoForm.formState.errors.websiteUrl.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="linkedinUrl">LinkedIn</Label>
                  <Input
                    id="linkedinUrl"
                    type="url"
                    placeholder="https://linkedin.com/company/..."
                    {...companyInfoForm.register('linkedinUrl')}
                    className="mt-1"
                  />
                  {companyInfoForm.formState.errors.linkedinUrl && (
                    <p className="text-sm text-red-600 mt-1">
                      {companyInfoForm.formState.errors.linkedinUrl.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={companyInfoSaving || !companyInfoForm.formState.isDirty}
                >
                  {companyInfoSaving ? 'Opslaan...' : companyInfoSaved ? 'Opgeslagen' : 'Bedrijfsinfo opslaan'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Location Section */}
        <Card>
          <CardHeader>
            <CardTitle>Locatie</CardTitle>
            <CardDescription>Het adres van je bedrijf.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={locationForm.handleSubmit(saveLocation)} className="space-y-4">
              <div>
                <Label htmlFor="streetAddress">Straat en nummer</Label>
                <Input
                  id="streetAddress"
                  {...locationForm.register('streetAddress')}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="postalCode">Postcode</Label>
                  <Input
                    id="postalCode"
                    {...locationForm.register('postalCode')}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="city">Stad</Label>
                  <Input
                    id="city"
                    {...locationForm.register('city')}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="country">Land</Label>
                  <Select
                    value={locationForm.watch('country') || 'BE'}
                    onValueChange={(value) => locationForm.setValue('country', value, { shouldDirty: true })}
                  >
                    <SelectTrigger className="mt-1">
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

              {profile?.latitude && profile?.longitude && (
                <p className="text-sm text-gray-500">
                  Coordinaten: {profile.latitude.toFixed(4)}, {profile.longitude.toFixed(4)}
                </p>
              )}

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={locationSaving || !locationForm.formState.isDirty}
                >
                  {locationSaving ? 'Opslaan...' : locationSaved ? 'Opgeslagen' : 'Locatie opslaan'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Description Section */}
        <Card>
          <CardHeader>
            <CardTitle>Beschrijving</CardTitle>
            <CardDescription>
              Vertel kandidaten waar je voor staat - wat maakt jullie bijzonder?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={descriptionForm.handleSubmit(saveDescription)} className="space-y-4">
              <div>
                <Label htmlFor="description">Over het bedrijf</Label>
                <Textarea
                  id="description"
                  rows={5}
                  maxLength={2000}
                  placeholder="Beschrijf je bedrijf, producten/diensten, en missie..."
                  {...descriptionForm.register('description')}
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1 text-right">
                  {descriptionValue.length}/2000
                </p>
              </div>

              <div>
                <Label htmlFor="cultureDescription">Bedrijfscultuur</Label>
                <Textarea
                  id="cultureDescription"
                  rows={4}
                  maxLength={1000}
                  placeholder="Hoe is het om bij jullie te werken? Teamsfeer, waarden, voordelen..."
                  {...descriptionForm.register('cultureDescription')}
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1 text-right">
                  {cultureValue.length}/1000
                </p>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={descriptionSaving || !descriptionForm.formState.isDirty}
                >
                  {descriptionSaving ? 'Opslaan...' : descriptionSaved ? 'Opgeslagen' : 'Beschrijving opslaan'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card>
          <CardContent className="py-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/dashboard/employer/jobs"
                className="flex-1 p-4 border rounded-lg hover:border-primary hover:bg-gray-50 transition-colors text-center"
              >
                <span className="font-medium">Mijn vacatures</span>
                <span className="text-gray-500 ml-2">→</span>
              </Link>
              <Link
                href="/dashboard/chat"
                className="flex-1 p-4 border rounded-lg hover:border-primary hover:bg-gray-50 transition-colors text-center"
              >
                <span className="font-medium">Berichten</span>
                <span className="text-gray-500 ml-2">→</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
