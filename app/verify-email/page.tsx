'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import { api, ApiError } from '@/lib/api-client';
import type { SessionUser } from '@/types/api';

export default function VerifyEmailPage() {
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
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <svg
              className="h-6 w-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <CardTitle className="text-2xl font-bold">Bevestig je e-mailadres</CardTitle>
          <CardDescription>
            We hebben een bevestigingslink gestuurd naar{' '}
            <span className="font-medium text-gray-900">{user?.email ?? 'je e-mailadres'}</span>.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600 text-center">
            Klik op de link in de e-mail om je account te activeren. 
            Check ook je spam-folder als je de e-mail niet ziet.
          </p>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <Button
            onClick={handleResend}
            disabled={isResending || resendStatus === 'success'}
            variant={resendStatus === 'success' ? 'outline' : 'default'}
            className="w-full"
          >
            {isResending ? (
              'Versturen...'
            ) : resendStatus === 'success' ? (
              'Verzonden'
            ) : (
              'Verstuur opnieuw'
            )}
          </Button>

          <div className="text-center">
            <Link
              href="/dashboard"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              &larr; Naar dashboard
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
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
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          {status === 'loading' && (
            <>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center">
                <svg
                  className="h-8 w-8 text-gray-400 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              </div>
              <CardTitle className="text-2xl font-bold">Bezig met verifiëren...</CardTitle>
              <CardDescription>Even geduld terwijl we je e-mail bevestigen.</CardDescription>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <CardTitle className="text-2xl font-bold text-green-600">E-mail bevestigd!</CardTitle>
              <CardDescription>Je wordt doorgestuurd naar je dashboard...</CardDescription>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <CardTitle className="text-2xl font-bold">Bevestiging mislukt</CardTitle>
              <CardDescription>
                {error ?? 'De link kan verlopen of ongeldig zijn.'}
              </CardDescription>
            </>
          )}
        </CardHeader>

        {status === 'error' && (
          <CardContent>
            <Link href="/verify-email">
              <Button className="w-full">Vraag nieuwe link aan</Button>
            </Link>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
