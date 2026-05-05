'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Users, Briefcase, ScrollText, ChevronLeft, ChevronRight } from 'lucide-react';

const adminCards = [
  {
    title: 'Gebruikers',
    description: 'Lijst, zoeken, deactiveren, admin-rechten beheren.',
    href: '/dashboard/admin/users',
    icon: Users,
  },
  {
    title: 'Vacatures',
    description: 'Modereren — pauzeren, hervatten, sluiten.',
    href: '/dashboard/admin/jobs',
    icon: Briefcase,
  },
  {
    title: 'Audit-log',
    description: 'Tijdlijn van alle admin- en GDPR-acties.',
    href: '/dashboard/admin/audit-log',
    icon: ScrollText,
  },
];

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !user.isAdmin) {
      router.replace('/dashboard');
    }
  }, [user, router]);

  // Loading state
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Skeleton className="h-6 w-32 mb-6" />
        <Skeleton className="h-10 w-48 mb-2" />
        <Skeleton className="h-5 w-96 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      </div>
    );
  }

  // Not admin - will redirect
  if (!user.isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back link */}
      <Link
        href="/dashboard"
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Naar dashboard
      </Link>

      {/* Header */}
      <h1 className="text-2xl font-bold">Beheer</h1>
      <p className="text-gray-600 text-sm mb-8">
        Beheerders-functies. Acties worden gelogd in het audit-log.
      </p>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {adminCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.href} href={card.href}>
              <Card className="h-full cursor-pointer transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Icon className="h-5 w-5 text-gray-700" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{card.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {card.description}
                        </CardDescription>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  </div>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
