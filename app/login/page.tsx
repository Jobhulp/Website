'use client';

export const dynamic = 'force-dynamic';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useAuth } from '@/lib/auth-context';
import { ApiError } from '@/lib/api-client';
import Header from '@/components/common/header/Header';
import Footer from '@/components/common/footer/Footer';
import logo from '@/assets/img/svg/01_logo_white.svg';

const loginSchema = z.object({
  email: z.string().email('Ongeldig e-mailadres'),
  password: z.string().min(1, 'Wachtwoord is verplicht'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  return (
    <>
      <Header />
      <div className="header--spacer" style={{ height: '80px' }} />
      <Suspense fallback={<LoginSkeleton />}>
        <LoginContent />
      </Suspense>
      <Footer />
    </>
  );
}

function LoginSkeleton() {
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

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setError(null);

    try {
      await login(data.email, data.password);
      const redirect = searchParams.get('redirect') || '/dashboard';
      router.push(redirect);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Er ging iets mis. Probeer het opnieuw.');
      }
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
                <h2 className="h3 c-white mb-2">Welkom terug</h2>
                <p className="c-grey">Log in op je Jobhulp account</p>
              </div>

              {/* Success message for password reset */}
              {searchParams.get('reset') === 'success' && (
                <div className="alert mb-4" style={{ 
                  background: 'rgba(40, 167, 69, 0.15)', 
                  border: '1px solid rgba(40, 167, 69, 0.3)',
                  borderRadius: '8px',
                  padding: '12px 16px'
                }}>
                  <p className="mb-0 c-green" style={{ fontSize: '14px' }}>
                    <i className="far fa-check-circle mr-2"></i>
                    Je wachtwoord is gewijzigd. Je kunt nu inloggen.
                  </p>
                </div>
              )}

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
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label className="c-white mb-2 d-block" style={{ fontSize: '14px', fontWeight: 500 }}>
                    E-mailadres
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="jouw@email.be"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: errors.email ? '1px solid #dc3545' : '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      color: '#fff',
                      fontSize: '15px'
                    }}
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="c-red mt-1 mb-0" style={{ fontSize: '12px' }}>{errors.email.message}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="c-white mb-2 d-block" style={{ fontSize: '14px', fontWeight: 500 }}>
                    Wachtwoord
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Je wachtwoord"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: errors.password ? '1px solid #dc3545' : '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      color: '#fff',
                      fontSize: '15px'
                    }}
                    {...register('password')}
                  />
                  {errors.password && (
                    <p className="c-red mt-1 mb-0" style={{ fontSize: '12px' }}>{errors.password.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="crumina-button button--yellow button--xl w-100"
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
                      Inloggen...
                    </>
                  ) : (
                    'Inloggen'
                  )}
                </button>
              </form>

              <div className="text-center mt-4">
                <Link 
                  href="/forgot-password" 
                  className="c-grey"
                  style={{ fontSize: '14px', textDecoration: 'none' }}
                >
                  Wachtwoord vergeten?
                </Link>
              </div>

              <div className="text-center mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <p className="c-grey mb-0" style={{ fontSize: '14px' }}>
                  Nog geen account?{' '}
                  <Link href="/register" className="c-primary" style={{ fontWeight: 600 }}>
                    Registreer gratis
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
