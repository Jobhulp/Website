'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/lib/auth-context';
import { api, ApiError } from '@/lib/api-client';
import Header from '@/components/common/header/Header';
import Footer from '@/components/common/footer/Footer';
import logo from '@/assets/img/svg/01_logo_white.svg';
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
    <>
      <Header />
      <div className="header--spacer" style={{ height: '80px' }} />
      <section className="crumina-module bg-dark-themes" style={{ minHeight: '60vh', paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
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

              <p className="text-center c-grey mt-4" style={{ fontSize: '14px' }}>
                Al een account?{' '}
                <Link href="/login" className="c-primary" style={{ fontWeight: 600 }}>
                  Inloggen
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

// Step 1: User type selection
function UserTypeSelection({ onSelect }: { onSelect: (type: UserType) => void }) {
  return (
    <div>
      {/* Logo */}
      <div className="text-center mb-4">
        <Link href="/">
          <img src={logo.src} alt="Jobhulp" width="150" />
        </Link>
      </div>

      {/* Title */}
      <div className="text-center mb-5">
        <h2 className="h2 c-white mb-2">Account aanmaken</h2>
        <p className="c-grey">Wat beschrijft jou het beste?</p>
      </div>

      <div className="row">
        {/* Candidate Card */}
        <div className="col-md-6 mb-4 mb-md-0">
          <div 
            className="card h-100"
            onClick={() => onSelect('candidate')}
            style={{ 
              background: 'rgba(255,255,255,0.05)', 
              borderRadius: '16px', 
              padding: '30px',
              border: '2px solid rgba(255,255,255,0.1)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#007bff';
              e.currentTarget.style.background = 'rgba(0,123,255,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            }}
          >
            <div 
              className="mb-3"
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(0,123,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <i className="far fa-user fa-lg c-blue"></i>
            </div>
            <h4 className="c-white mb-2">Ik zoek een job</h4>
            <p className="c-grey mb-3" style={{ fontSize: '14px' }}>
              Maak een profiel aan, toon je vaardigheden en vind de perfecte match met werkgevers.
            </p>
            <span className="c-primary" style={{ fontSize: '14px', fontWeight: 600 }}>
              Verder <i className="far fa-arrow-right ml-1"></i>
            </span>
          </div>
        </div>

        {/* Employer Card */}
        <div className="col-md-6">
          <div 
            className="card h-100"
            onClick={() => onSelect('employer')}
            style={{ 
              background: 'rgba(255,255,255,0.05)', 
              borderRadius: '16px', 
              padding: '30px',
              border: '2px solid rgba(255,255,255,0.1)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#f9d423';
              e.currentTarget.style.background = 'rgba(249,212,35,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            }}
          >
            <div 
              className="mb-3"
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(249,212,35,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <i className="far fa-building fa-lg c-yellow"></i>
            </div>
            <h4 className="c-white mb-2">Ik zoek personeel</h4>
            <p className="c-grey mb-3" style={{ fontSize: '14px' }}>
              Plaats vacatures en vind gekwalificeerde kandidaten die perfect bij je bedrijf passen.
            </p>
            <span className="c-yellow" style={{ fontSize: '14px', fontWeight: 600 }}>
              Verder <i className="far fa-arrow-right ml-1"></i>
            </span>
          </div>
        </div>
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
        const details = error.fieldErrors;
        if (details) {
          const newFieldErrors: Record<string, string> = {};
          details.forEach((detail) => {
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

  const inputStyle = (hasError: boolean) => ({
    background: 'rgba(255,255,255,0.08)',
    border: hasError ? '1px solid #dc3545' : '1px solid rgba(255,255,255,0.15)',
    borderRadius: '8px',
    padding: '12px 16px',
    color: '#fff',
    fontSize: '15px'
  });

  return (
    <div className="card" style={{ 
      background: 'rgba(255,255,255,0.05)', 
      borderRadius: '16px', 
      padding: '40px',
      border: '1px solid rgba(255,255,255,0.1)',
      maxWidth: '500px',
      margin: '0 auto'
    }}>
      {/* Back button */}
      <button
        type="button"
        onClick={onBack}
        className="c-grey mb-3 d-flex align-items-center"
        style={{ background: 'none', border: 'none', fontSize: '14px', cursor: 'pointer' }}
      >
        <i className="far fa-arrow-left mr-2"></i>
        Terug
      </button>

      {/* Title */}
      <div className="mb-4">
        <h3 className="c-white mb-2">
          Account aanmaken als {isCandidate ? 'kandidaat' : 'werkgever'}
        </h3>
        <p className="c-grey" style={{ fontSize: '14px' }}>
          Vul je gegevens in om je account aan te maken
        </p>
      </div>

      {/* Error message */}
      {apiError && (
        <div className="alert mb-4" style={{ 
          background: 'rgba(220, 53, 69, 0.15)', 
          border: '1px solid rgba(220, 53, 69, 0.3)',
          borderRadius: '8px',
          padding: '12px 16px'
        }}>
          <p className="mb-0 c-red" style={{ fontSize: '14px' }}>
            <i className="far fa-exclamation-circle mr-2"></i>
            {apiError}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {isCandidate ? (
          <div className="row mb-3">
            <div className="col-6">
              <label className="c-white mb-2 d-block" style={{ fontSize: '14px', fontWeight: 500 }}>
                Voornaam
              </label>
              <input
                type="text"
                className="form-control w-100"
                placeholder="Jan"
                style={inputStyle(!!getFieldError('firstName'))}
                {...register('firstName' as keyof CandidateFormData)}
              />
              {getFieldError('firstName') && (
                <p className="c-red mt-1 mb-0" style={{ fontSize: '12px' }}>{getFieldError('firstName')}</p>
              )}
            </div>
            <div className="col-6">
              <label className="c-white mb-2 d-block" style={{ fontSize: '14px', fontWeight: 500 }}>
                Achternaam
              </label>
              <input
                type="text"
                className="form-control w-100"
                placeholder="Janssen"
                style={inputStyle(!!getFieldError('lastName'))}
                {...register('lastName' as keyof CandidateFormData)}
              />
              {getFieldError('lastName') && (
                <p className="c-red mt-1 mb-0" style={{ fontSize: '12px' }}>{getFieldError('lastName')}</p>
              )}
            </div>
          </div>
        ) : (
          <div className="mb-3">
            <label className="c-white mb-2 d-block" style={{ fontSize: '14px', fontWeight: 500 }}>
              Bedrijfsnaam
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Acme BV"
              style={inputStyle(!!getFieldError('companyName'))}
              {...register('companyName' as keyof EmployerFormData)}
            />
            {getFieldError('companyName') && (
              <p className="c-red mt-1 mb-0" style={{ fontSize: '12px' }}>{getFieldError('companyName')}</p>
            )}
          </div>
        )}

        <div className="mb-3">
          <label className="c-white mb-2 d-block" style={{ fontSize: '14px', fontWeight: 500 }}>
            E-mailadres
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="jouw@email.be"
            style={inputStyle(!!getFieldError('email'))}
            {...register('email')}
          />
          {getFieldError('email') && (
            <p className="c-red mt-1 mb-0" style={{ fontSize: '12px' }}>{getFieldError('email')}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="c-white mb-2 d-block" style={{ fontSize: '14px', fontWeight: 500 }}>
            Wachtwoord
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="Minimum 8 tekens"
            style={inputStyle(!!getFieldError('password'))}
            {...register('password')}
          />
          {getFieldError('password') && (
            <p className="c-red mt-1 mb-0" style={{ fontSize: '12px' }}>{getFieldError('password')}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="c-white mb-2 d-block" style={{ fontSize: '14px', fontWeight: 500 }}>
            Wachtwoord bevestigen
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="Herhaal je wachtwoord"
            style={inputStyle(!!getFieldError('confirmPassword'))}
            {...register('confirmPassword')}
          />
          {getFieldError('confirmPassword') && (
            <p className="c-red mt-1 mb-0" style={{ fontSize: '12px' }}>{getFieldError('confirmPassword')}</p>
          )}
        </div>

        <p className="c-grey mb-4" style={{ fontSize: '12px' }}>
          Door te registreren ga je akkoord met onze{' '}
          <Link href="/terms" className="c-primary">voorwaarden</Link>{' '}
          en{' '}
          <Link href="/privacy" className="c-primary">privacybeleid</Link>.
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`crumina-button ${isCandidate ? 'button--blue' : 'button--yellow'} button--xl w-100`}
          style={{ 
            borderRadius: '8px',
            padding: '14px 24px',
            fontSize: '16px',
            fontWeight: 600,
            opacity: isSubmitting ? 0.7 : 1
          }}
        >
          {isSubmitting ? (
            <>
              <i className="far fa-spinner fa-spin mr-2"></i>
              Account aanmaken...
            </>
          ) : (
            'Account aanmaken'
          )}
        </button>
      </form>
    </div>
  );
}
