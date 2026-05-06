'use client';

import { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { api, ApiError } from '@/lib/api-client';
import Header from '@/components/common/header/Header';
import Footer from '@/components/common/footer/Footer';
import logo from '@/assets/img/svg/01_logo_white.svg';

const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(8, 'Minimum 8 tekens'),
    confirmPassword: z.string().min(1, 'Bevestig je wachtwoord'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Wachtwoorden komen niet overeen',
    path: ['confirmPassword'],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  return (
    <>
      <Header />
      <div className="header--spacer" style={{ height: '80px' }} />
      <Suspense fallback={<ResetPasswordSkeleton />}>
        <ResetPasswordContent />
      </Suspense>
      <Footer />
    </>
  );
}

function ResetPasswordSkeleton() {
  return (
    <section className="crumina-module bg-dark-themes" style={{ minHeight: '60vh', paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-8">
            <div className="card" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '16px', padding: '40px' }}>
              <div className="text-center mb-4">
                <div style={{ width: '150px', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', margin: '0 auto' }} />
              </div>
              <div style={{ height: '200px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  // No token provided
  if (!token) {
    return (
      <section className="crumina-module bg-dark-themes" style={{ minHeight: '60vh', paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-8">
              <div className="card text-center" style={{ 
                background: 'rgba(255,255,255,0.05)', 
                borderRadius: '16px', 
                padding: '40px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                {/* Logo */}
                <div className="mb-4">
                  <Link href="/">
                    <img src={logo.src} alt="Jobhulp" width="150" />
                  </Link>
                </div>

                <div className="mb-4">
                  <div 
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: 'rgba(220, 53, 69, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px'
                    }}
                  >
                    <i className="far fa-exclamation-triangle fa-lg c-red"></i>
                  </div>
                  <h3 className="c-white mb-2">Ongeldige link</h3>
                  <p className="c-grey" style={{ fontSize: '14px' }}>
                    Geen token gevonden. Vraag een nieuwe reset-link aan.
                  </p>
                </div>

                <Link 
                  href="/forgot-password"
                  className="crumina-button button--yellow button--xl mb-3"
                  style={{ 
                    borderRadius: '8px',
                    padding: '14px 24px',
                    fontSize: '16px',
                    fontWeight: 600,
                    display: 'inline-block',
                    textDecoration: 'none'
                  }}
                >
                  Nieuwe reset-link aanvragen
                </Link>

                <div>
                  <Link 
                    href="/login" 
                    className="c-grey"
                    style={{ fontSize: '14px', textDecoration: 'none' }}
                  >
                    Terug naar inloggen
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const onSubmit = async (data: ResetPasswordFormData) => {
    setError(null);
    setIsSubmitting(true);

    try {
      await api.post('/auth/reset-password', {
        token,
        newPassword: data.newPassword,
      });

      // Success - redirect to login with success param
      router.push('/login?reset=success');
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Er is een onverwachte fout opgetreden');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="crumina-module bg-dark-themes" style={{ minHeight: '60vh', paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-8">
            <div className="card" style={{ 
              background: 'rgba(255,255,255,0.05)', 
              borderRadius: '16px', 
              padding: '40px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              {/* Logo */}
              <div className="text-center mb-4">
                <Link href="/">
                  <img src={logo.src} alt="Jobhulp" width="150" />
                </Link>
              </div>

              {/* Title */}
              <div className="text-center mb-4">
                <h2 className="h3 c-white mb-2">Nieuw wachtwoord instellen</h2>
                <p className="c-grey" style={{ fontSize: '14px' }}>
                  Kies een nieuw wachtwoord voor je account
                </p>
              </div>

              {/* Error message */}
              {error && (
                <div className="alert mb-4" style={{ 
                  background: 'rgba(220, 53, 69, 0.15)', 
                  border: '1px solid rgba(220, 53, 69, 0.3)',
                  borderRadius: '8px',
                  padding: '12px 16px'
                }}>
                  <p className="mb-0 c-red" style={{ fontSize: '14px' }}>
                    <i className="far fa-exclamation-circle mr-2"></i>
                    {error}
                  </p>
                  {(error.toLowerCase().includes('verlopen') || error.toLowerCase().includes('ongeldig')) && (
                    <Link
                      href="/forgot-password"
                      className="c-red d-block mt-2"
                      style={{ fontSize: '13px', textDecoration: 'underline' }}
                    >
                      Vraag een nieuwe reset-link aan
                    </Link>
                  )}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label className="c-white mb-2 d-block" style={{ fontSize: '14px', fontWeight: 500 }}>
                    Nieuw wachtwoord
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Minimum 8 tekens"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: errors.newPassword ? '1px solid #dc3545' : '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      color: '#fff',
                      fontSize: '15px'
                    }}
                    {...register('newPassword')}
                  />
                  {errors.newPassword && (
                    <p className="c-red mt-1 mb-0" style={{ fontSize: '12px' }}>{errors.newPassword.message}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="c-white mb-2 d-block" style={{ fontSize: '14px', fontWeight: 500 }}>
                    Bevestig wachtwoord
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Herhaal je wachtwoord"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: errors.confirmPassword ? '1px solid #dc3545' : '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      color: '#fff',
                      fontSize: '15px'
                    }}
                    {...register('confirmPassword')}
                  />
                  {errors.confirmPassword && (
                    <p className="c-red mt-1 mb-0" style={{ fontSize: '12px' }}>{errors.confirmPassword.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="crumina-button button--yellow button--xl w-100 mb-4"
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
                      Wachtwoord wijzigen...
                    </>
                  ) : (
                    'Wachtwoord wijzigen'
                  )}
                </button>

                <div className="text-center">
                  <Link 
                    href="/login" 
                    className="c-grey"
                    style={{ fontSize: '14px', textDecoration: 'none' }}
                  >
                    Terug naar inloggen
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
