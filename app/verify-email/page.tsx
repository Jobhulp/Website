'use client';

export const dynamic = 'force-dynamic';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { api, ApiError } from '@/lib/api-client';
import Header from '@/components/common/header/Header';
import Footer from '@/components/common/footer/Footer';
import logo from '@/assets/img/svg/01_logo_white.svg';
import type { SessionUser } from '@/types/api';

export default function VerifyEmailPage() {
  return (
    <>
      <Header />
      <div className="header--spacer" style={{ height: '80px' }} />
      <Suspense fallback={<VerifyEmailSkeleton />}>
        <VerifyEmailContent />
      </Suspense>
      <Footer />
    </>
  );
}

function VerifyEmailSkeleton() {
  return (
    <section className="crumina-module bg-dark-themes" style={{ minHeight: '60vh', paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-8">
            <div className="card" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '16px', padding: '40px' }}>
              <div className="text-center mb-4">
                <div style={{ width: '150px', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', margin: '0 auto' }} />
              </div>
              <div style={{ height: '150px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  if (token) {
    return <VerifyWithToken token={token} />;
  }

  return <VerifyInstructions />;
}

// Mode A - No token: show instructions and resend button
function VerifyInstructions() {
  const { user } = useAuth();
  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleResend = async () => {
    if (!user?.email || isResending) return;

    setIsResending(true);
    setError(null);
    setResendStatus('idle');

    try {
      await api.post('/auth/verify-email/request', { email: user.email });
      setResendStatus('success');
      
      // Reset success state after 2 seconds
      setTimeout(() => {
        setResendStatus('idle');
      }, 2000);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Er ging iets mis. Probeer het later opnieuw.');
      }
      setResendStatus('error');
    } finally {
      setIsResending(false);
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

              {/* Icon */}
              <div className="text-center mb-4">
                <div 
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'rgba(0, 123, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px'
                  }}
                >
                  <i className="far fa-envelope fa-lg c-blue"></i>
                </div>
                <h3 className="c-white mb-2">Bevestig je e-mailadres</h3>
                <p className="c-grey" style={{ fontSize: '14px' }}>
                  We hebben een bevestigingslink gestuurd naar{' '}
                  <span className="c-white" style={{ fontWeight: 500 }}>{user?.email ?? 'je e-mailadres'}</span>.
                </p>
              </div>

              <p className="c-grey text-center mb-4" style={{ fontSize: '14px' }}>
                Klik op de link in de e-mail om je account te activeren. 
                Check ook je spam-folder als je de e-mail niet ziet.
              </p>

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

              {/* Success message */}
              {resendStatus === 'success' && (
                <div className="alert mb-4" style={{ 
                  background: 'rgba(40, 167, 69, 0.15)', 
                  border: '1px solid rgba(40, 167, 69, 0.3)',
                  borderRadius: '8px',
                  padding: '12px 16px'
                }}>
                  <p className="mb-0 c-green" style={{ fontSize: '14px' }}>
                    <i className="far fa-check-circle mr-2"></i>
                    E-mail verzonden!
                  </p>
                </div>
              )}

              <button
                onClick={handleResend}
                disabled={isResending || resendStatus === 'success'}
                className="crumina-button button--yellow button--xl w-100 mb-4"
                style={{ 
                  borderRadius: '8px',
                  padding: '14px 24px',
                  fontSize: '16px',
                  fontWeight: 600,
                  opacity: (isResending || resendStatus === 'success') ? 0.7 : 1
                }}
              >
                {isResending ? (
                  <>
                    <i className="far fa-spinner fa-spin mr-2"></i>
                    Versturen...
                  </>
                ) : resendStatus === 'success' ? (
                  <>
                    <i className="far fa-check mr-2"></i>
                    Verzonden
                  </>
                ) : (
                  'Verstuur opnieuw'
                )}
              </button>

              <div className="text-center">
                <Link 
                  href="/dashboard" 
                  className="c-grey d-inline-flex align-items-center"
                  style={{ fontSize: '14px', textDecoration: 'none' }}
                >
                  <i className="far fa-arrow-left mr-2"></i>
                  Naar dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Mode B - With token: auto-verify
function VerifyWithToken({ token }: { token: string }) {
  const router = useRouter();
  const { setUser } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await api.post<{ user: SessionUser }>('/auth/verify-email/confirm', { token });
        setUser(response.user);
        setStatus('success');

        // Redirect to dashboard after 1.5 seconds
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError('Er ging iets mis bij het verifiëren.');
        }
        setStatus('error');
      }
    };

    verifyEmail();
  }, [token, setUser, router]);

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

              {status === 'loading' && (
                <>
                  <div 
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px'
                    }}
                  >
                    <i className="far fa-spinner fa-spin fa-lg c-white"></i>
                  </div>
                  <h3 className="c-white mb-2">Bezig met verifiëren...</h3>
                  <p className="c-grey" style={{ fontSize: '14px' }}>
                    Even geduld terwijl we je e-mail bevestigen.
                  </p>
                </>
              )}

              {status === 'success' && (
                <>
                  <div 
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: 'rgba(40, 167, 69, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px'
                    }}
                  >
                    <i className="far fa-check fa-lg c-green"></i>
                  </div>
                  <h3 className="c-green mb-2">E-mail bevestigd!</h3>
                  <p className="c-grey" style={{ fontSize: '14px' }}>
                    Je wordt doorgestuurd naar je dashboard...
                  </p>
                </>
              )}

              {status === 'error' && (
                <>
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
                    <i className="far fa-times fa-lg c-red"></i>
                  </div>
                  <h3 className="c-white mb-2">Bevestiging mislukt</h3>
                  <p className="c-grey mb-4" style={{ fontSize: '14px' }}>
                    {error ?? 'De link kan verlopen of ongeldig zijn.'}
                  </p>
                  
                  <Link 
                    href="/verify-email"
                    className="crumina-button button--yellow button--xl"
                    style={{ 
                      borderRadius: '8px',
                      padding: '14px 24px',
                      fontSize: '16px',
                      fontWeight: 600,
                      display: 'inline-block',
                      textDecoration: 'none'
                    }}
                  >
                    Vraag nieuwe link aan
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
