'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { api, ApiError } from '@/lib/api-client';
import type { SkillTestAttempt } from '@/types/api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface StartEmployerTestResponse {
  attempt: SkillTestAttempt;
}

export default function StartEmployerTestPage() {
  const router = useRouter();
  const params = useParams();
  const employerTestId = params.employerTestId as string;

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const startTest = async () => {
      try {
        const response = await api.post<StartEmployerTestResponse>(
          '/tests/start-employer-test',
          { employerSkillTestId: employerTestId }
        );
        
        // Redirect to the attempt page
        router.replace(`/dashboard/profile/test/attempt/${response.attempt.id}`);
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError('Er is een onverwachte fout opgetreden.');
        }
      }
    };

    startTest();
  }, [employerTestId, router]);

  if (error) {
    return (
      <div className="container max-w-md mx-auto py-12 px-4">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="py-8 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-red-800 mb-2">
              Toets kan niet gestart worden
            </h2>
            <p className="text-sm text-red-600 mb-6">{error}</p>
            <Button asChild variant="outline">
              <Link href="/dashboard/chat">Terug naar berichten</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Loading state - redirect in progress
  return (
    <div className="container max-w-md mx-auto py-12 px-4">
      <Card>
        <CardContent className="py-12 text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-6 h-6 text-primary animate-spin"
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
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold mb-1">Toets starten...</h2>
          <p className="text-sm text-gray-600">
            Een moment geduld, we bereiden je toets voor.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
