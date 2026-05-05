'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { api, ApiError } from '@/lib/api-client';
import type { CandidateProfile } from '@/types/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ProfileCompleteness } from '@/components/profile-completeness';

interface QuickAction {
  title: string;
  description: string;
  href: string;
}

const candidateActions: QuickAction[] = [
  {
    title: 'Mijn profiel',
    description: 'Beheer je persoonlijke gegevens en voorkeuren',
    href: '/dashboard/profile',
  },
  {
    title: 'Mijn skills',
    description: 'Voeg skills toe en test je niveau',
    href: '/dashboard/profile/skills',
  },
  {
    title: 'Persoonlijkheidstest',
    description: 'Ontdek je MBTI persoonlijkheidstype',
    href: '/dashboard/profile/personality-test',
  },
  {
    title: 'Matches',
    description: 'Bekijk vacatures die bij je passen',
    href: '/dashboard/matches',
  },
  {
    title: 'Berichten',
    description: 'Chat met werkgevers',
    href: '/dashboard/chat',
  },
  {
    title: 'Account',
    description: 'Accountinstellingen en beveiliging',
    href: '/dashboard/account',
  },
];

const employerActions: QuickAction[] = [
  {
    title: 'Bedrijfsprofiel',
    description: 'Beheer je bedrijfsgegevens',
    href: '/dashboard/employer/profile',
  },
  {
    title: 'Mijn vacatures',
    description: 'Beheer en plaats vacatures',
    href: '/dashboard/employer/jobs',
  },
  {
    title: 'Berichten',
    description: 'Chat met kandidaten',
    href: '/dashboard/chat',
  },
  {
    title: 'Account',
    description: 'Accountinstellingen en beveiliging',
    href: '/dashboard/account',
  },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<CandidateProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);

  // Fetch candidate profile for completeness
  useEffect(() => {
    if (user?.userType === 'candidate') {
      setProfileLoading(true);
      api
        .get<{ profile: CandidateProfile }>('/candidate/profile')
        .then((res) => {
          setProfile(res.profile);
        })
        .catch((err) => {
          if (err instanceof ApiError) {
            setProfileError(err.message);
          }
        })
        .finally(() => {
          setProfileLoading(false);
        });
    }
  }, [user?.userType]);

  // Loading state
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Skeleton className="h-10 w-64 mb-2" />
        <Skeleton className="h-5 w-96 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  const displayName =
    user.profile.firstName ||
    user.profile.companyName ||
    user.email.split('@')[0];

  const actions = user.userType === 'candidate' ? candidateActions : employerActions;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Welkom terug, {displayName}!</h1>
        <p className="text-gray-600 text-sm mt-1">
          {user.userType === 'candidate'
            ? 'Beheer je profiel, bekijk matches en chat met werkgevers.'
            : 'Beheer je vacatures, bekijk kandidaten en chat met matches.'}
        </p>
      </div>

      {/* Profile completeness banner - only for candidates */}
      {user.userType === 'candidate' && (
        <div className="mb-8">
          {profileLoading ? (
            <Skeleton className="h-24" />
          ) : profileError ? (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="py-4">
                <p className="text-sm text-red-600">{profileError}</p>
              </CardContent>
            </Card>
          ) : profile ? (
            <div className="space-y-4">
              <ProfileCompleteness completeness={profile.profileCompleteness} />
              {profile.profileCompleteness < 100 && (
                <div className="flex justify-end">
                  <Button asChild size="sm">
                    <Link href="/dashboard/profile">Profiel aanvullen</Link>
                  </Button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}

      {/* Quick actions grid */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Snelle acties</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {actions.map((action) => (
            <Link key={action.href} href={action.href} className="block group">
              <Card className="h-full transition-colors hover:border-primary">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{action.title}</CardTitle>
                    <span className="text-gray-400 group-hover:text-primary transition-colors">
                      &rarr;
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{action.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Admin section */}
      {user.isAdmin && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Beheer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/dashboard/admin" className="block group">
              <Card className="h-full transition-colors hover:border-primary">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Admin dashboard</CardTitle>
                    <span className="text-gray-400 group-hover:text-primary transition-colors">
                      &rarr;
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Gebruikersbeheer, statistieken en instellingen
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
