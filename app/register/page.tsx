'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/auth-context';
import { api, ApiError } from '@/lib/api-client';
import type { UserType, AuthResponse } from '@/types/api';

// Schema for candidate registration
const candidateSchema = z.object({
  email: z.string().email('Ongeldig e-mailadres'),
  password: z.string().min(8, 'Minimum 8 tekens'),
  confirmPassword: z.string(),
  firstName: z.string().min(1, 'Voornaam is verplicht'),
  lastName: z.string().min(1, 'Achternaam is verplicht'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Wachtwoorden komen niet overeen',
  path: ['confirmPassword'],
});

// Schema for employer registration
const employerSchema = z.object({
  email: z.string().email('Ongeldig e-mailadres'),
  password: z.string().min(8, 'Minimum 8 tekens'),
  confirmPassword: z.string(),
  companyName: z.string().min(2, 'Bedrijfsnaam moet minimaal 2 tekens zijn'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Wachtwoorden komen niet overeen',
  path: ['confirmPassword'],
});

type CandidateFormData = z.infer<typeof candidateSchema>;
type EmployerFormData = z.infer<typeof employerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [step, setStep] = useState<1 | 2>(1);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
    setStep(2);
    setApiError(null);
    setFieldErrors({});
  };

  const handleBack = () => {
    setStep(1);
    setUserType(null);
    setApiError(null);
    setFieldErrors({});
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gray-50">
      <div className="w-full max-w-2xl">
        {step === 1 ? (
          <UserTypeSelection onSelect={handleUserTypeSelect} />
        ) : (
          <RegistrationForm
            userType={userType!}
            onBack={handleBack}
            apiError={apiError}
            setApiError={setApiError}
            fieldErrors={fieldErrors}
            setFieldErrors={setFieldErrors}
            setUser={setUser}
            router={router}
          />
        )}

        <p className="text-center text-sm text-gray-600 mt-6">
          Al een account?{' '}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Inloggen
          </Link>
        </p>
      </div>
    </div>
  );
}

// Step 1: User type selection
function UserTypeSelection({ onSelect }: { onSelect: (type: UserType) => void }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Account aanmaken</h1>
        <p className="text-gray-600 text-sm mt-1">Wat beschrijft jou het beste?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card
          className="cursor-pointer transition-all hover:border-primary hover:shadow-md"
          onClick={() => onSelect('candidate')}
        >
          <CardHeader className="pb-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <CardTitle className="text-lg">Ik zoek een job</CardTitle>
            <CardDescription>
              Maak een profiel aan, toon je vaardigheden en vind de perfecte match met werkgevers.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <span className="text-sm text-primary font-medium flex items-center gap-1">
              Verder
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer transition-all hover:border-primary hover:shadow-md"
          onClick={() => onSelect('employer')}
        >
          <CardHeader className="pb-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <CardTitle className="text-lg">Ik zoek personeel</CardTitle>
            <CardDescription>
              Plaats vacatures en vind gekwalificeerde kandidaten die perfect bij je bedrijf passen.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <span className="text-sm text-primary font-medium flex items-center gap-1">
              Verder
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Step 2: Registration form
function RegistrationForm({
  userType,
  onBack,
  apiError,
  setApiError,
  fieldErrors,
  setFieldErrors,
  setUser,
  router,
}: {
  userType: UserType;
  onBack: () => void;
  apiError: string | null;
  setApiError: (error: string | null) => void;
  fieldErrors: Record<string, string>;
  setFieldErrors: (errors: Record<string, string>) => void;
  setUser: (user: AuthResponse['user']) => void;
  router: ReturnType<typeof useRouter>;
}) {
  const isCandidate = userType === 'candidate';
  const schema = isCandidate ? candidateSchema : employerSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CandidateFormData | EmployerFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: CandidateFormData | EmployerFormData) => {
    setApiError(null);
    setFieldErrors({});

    try {
      const { confirmPassword, ...submitData } = data;
      const response = await api.post<AuthResponse>('/auth/register', {
        ...submitData,
        userType,
      });

      setUser(response.user);
      router.push('/verify-email');
    } catch (error) {
      if (error instanceof ApiError) {
        setApiError(error.message);
        if (error.details) {
          const newFieldErrors: Record<string, string> = {};
          error.details.forEach((detail) => {
            if (detail.field) {
              newFieldErrors[detail.field] = detail.message;
            }
          });
          setFieldErrors(newFieldErrors);
        }
      } else {
        setApiError('Er is een onverwachte fout opgetreden');
      }
    }
  };

  const getFieldError = (field: string) => {
    return fieldErrors[field] || (errors as Record<string, { message?: string }>)[field]?.message;
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1 mb-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Terug
        </button>
        <CardTitle className="text-xl">
          Account aanmaken voor {isCandidate ? 'kandidaat' : 'werkgever'}
        </CardTitle>
        <CardDescription>
          Vul je gegevens in om je account aan te maken
        </CardDescription>
      </CardHeader>
      <CardContent>
        {apiError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{apiError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {isCandidate ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Voornaam</Label>
                <Input
                  id="firstName"
                  {...register('firstName' as keyof CandidateFormData)}
                  placeholder="Jan"
                />
                {getFieldError('firstName') && (
                  <p className="text-xs text-red-500">{getFieldError('firstName')}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Achternaam</Label>
                <Input
                  id="lastName"
                  {...register('lastName' as keyof CandidateFormData)}
                  placeholder="Janssen"
                />
                {getFieldError('lastName') && (
                  <p className="text-xs text-red-500">{getFieldError('lastName')}</p>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="companyName">Bedrijfsnaam</Label>
              <Input
                id="companyName"
                {...register('companyName' as keyof EmployerFormData)}
                placeholder="Acme BV"
              />
              {getFieldError('companyName') && (
                <p className="text-xs text-red-500">{getFieldError('companyName')}</p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="jouw@email.be"
            />
            {getFieldError('email') && (
              <p className="text-xs text-red-500">{getFieldError('email')}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Wachtwoord</Label>
            <Input
              id="password"
              type="password"
              {...register('password')}
              placeholder="Minimum 8 tekens"
            />
            {getFieldError('password') && (
              <p className="text-xs text-red-500">{getFieldError('password')}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Wachtwoord bevestigen</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
              placeholder="Herhaal je wachtwoord"
            />
            {getFieldError('confirmPassword') && (
              <p className="text-xs text-red-500">{getFieldError('confirmPassword')}</p>
            )}
          </div>

          <p className="text-xs text-gray-500">
            Door te registreren ga je akkoord met onze{' '}
            <Link href="/terms" className="text-primary hover:underline">
              voorwaarden
            </Link>{' '}
            en{' '}
            <Link href="/privacy" className="text-primary hover:underline">
              privacybeleid
            </Link>
            .
          </p>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Account aanmaken...' : 'Account aanmaken'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
