'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { api, ApiError } from '@/lib/api-client';
import Header from '@/components/common/header/Header';
import Footer from '@/components/common/footer/Footer';
import logo from '@/assets/img/svg/01_logo_white.svg';

const forgotPasswordSchema = z.object({
  email: z.string().email('Ongeldig e-mailadres'),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    setError(null);

    try {
      await api.post<{ ok: boolean }>('/auth/forgot-password', {
        email: data.email,
      });
      setIsSubmitted(true);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Er ging iets mis. Probeer het later opnieuw.');
      }
    }
  };

  return (
    <>
      <Header />
      <div className="header--spacer" style={{ height: '80px' }} />
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
                  <h2 className="h3 c-white mb-2">Wachtwoord vergeten</h2>
                  <p className="c-grey" style={{ fontSize: '14px' }}>
                    Vul je e-mailadres in en we sturen je een link om je wachtwoord te resetten.
                  </p>
                </div>

                {isSubmitted ? (
                  <div>
                    {/* Success message */}
                    <div className="alert mb-4" style={{ 
                      background: 'rgba(40, 167, 69, 0.15)', 
                      border: '1px solid rgba(40, 167, 69, 0.3)',
                      borderRadius: '8px',
                      padding: '16px'
                    }}>
                      <p className="mb-0 c-green" style={{ fontSize: '14px' }}>
                        <i className="far fa-check-circle mr-2"></i>
                        Als dit e-mailadres bij ons bekend is, hebben we je een reset-link gestuurd. Check je inbox (en spam-folder).
                      </p>
                    </div>

                    <div className="text-center">
                      <Link 
                        href="/login" 
                        className="c-grey d-inline-flex align-items-center"
                        style={{ fontSize: '14px', textDecoration: 'none' }}
                      >
                        <i className="far fa-arrow-left mr-2"></i>
                        Terug naar inloggen
                      </Link>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)}>
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

                    <div className="mb-4">
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
                          Versturen...
                        </>
                      ) : (
                        'Stuur reset-link'
                      )}
                    </button>

                    <div className="text-center">
                      <Link 
                        href="/login" 
                        className="c-grey d-inline-flex align-items-center"
                        style={{ fontSize: '14px', textDecoration: 'none' }}
                      >
                        <i className="far fa-arrow-left mr-2"></i>
                        Terug naar inloggen
                      </Link>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
