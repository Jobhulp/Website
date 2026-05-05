'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export default function AccountPage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  // Export state
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  // Delete state
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Loading state
  if (!user) {
    return (
      <div className="container max-w-2xl mx-auto py-8 px-4">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-64 mb-8" />
        <Skeleton className="h-48 mb-6" />
        <Skeleton className="h-32 mb-6" />
        <Skeleton className="h-40 mb-6" />
        <Skeleton className="h-56" />
      </div>
    );
  }

  const handleExport = async () => {
    setExporting(true);
    setExportError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? '';
      const res = await fetch(`${apiUrl}/gdpr/export`, { credentials: 'include' });

      if (!res.ok) {
        throw new Error('Export mislukt');
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `jobhulp-data-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      setExportError(err instanceof Error ? err.message : 'Export mislukt');
    } finally {
      setExporting(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    setDeleteError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? '';
      const res = await fetch(`${apiUrl}/gdpr/delete-account`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ confirmEmail }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Verwijderen mislukt');
      }

      await logout();
      router.push('/');
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'Verwijderen mislukt');
      setDeleting(false);
    }
  };

  const canDelete = confirmEmail.toLowerCase() === user.email.toLowerCase();

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-block"
        >
          &larr; Dashboard
        </Link>
        <h1 className="text-2xl font-bold">Account-instellingen</h1>
        <p className="text-sm text-gray-600">
          Beheer je gegevens, privacy en account-status.
        </p>
      </div>

      {/* Section 1: Account info */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Account info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-500">E-mail</span>
            <span className="text-sm font-medium">{user.email}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-500">Type</span>
            <span className="text-sm font-medium">
              {user.userType === 'candidate' ? 'Kandidaat' : 'Werkgever'}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-500">Geverifieerd</span>
            <span className="text-sm font-medium">
              {user.isVerified ? 'Ja' : 'Nee'}
            </span>
          </div>
          {user.isAdmin && (
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-500">Rol</span>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Beheerder</Badge>
                <Link
                  href="/dashboard/admin"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Beheer &rarr;
                </Link>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Section 2: Notifications */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Meldingen</CardTitle>
          <CardDescription>
            Per type instellen welke meldingen je wil ontvangen.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant="outline">
            <Link href="/dashboard/notifications/preferences">Beheer voorkeuren</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Section 3: Data export */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Mijn gegevens downloaden</CardTitle>
          <CardDescription>
            Download een JSON-bestand met al je gegevens op Jobhulp: profiel,
            skills, opleiding, werkervaring, matches, berichten en testresultaten.
            Dit is je recht op data-portabiliteit (GDPR Art. 20).
          </CardDescription>
        </CardHeader>
        <CardContent>
          {exportError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{exportError}</p>
            </div>
          )}
          <Button onClick={handleExport} disabled={exporting}>
            {exporting ? 'Bezig met exporteren...' : 'Download mijn gegevens'}
          </Button>
        </CardContent>
      </Card>

      {/* Section 4: Delete account */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Account verwijderen</CardTitle>
          <CardDescription>
            Je account wordt gemarkeerd als verwijderd. Persoonlijke gegevens worden
            onmiddellijk geanonimiseerd. Na 30 dagen wordt het account definitief en
            onherroepelijk verwijderd. In die periode kun je binnen die termijn nog
            herstel aanvragen via support.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-4">
            Wat blijft tijdens de overgangsperiode behouden? Berichten in lopende
            chats blijven leesbaar voor de andere kant (jouw naam wordt vervangen door
            &apos;Verwijderde gebruiker&apos;). Match-historie blijft anoniem zichtbaar.
          </p>

          {!showDeleteForm ? (
            <button
              type="button"
              onClick={() => setShowDeleteForm(true)}
              className="text-sm text-red-600 hover:text-red-800 hover:underline"
            >
              Ik wil mijn account verwijderen
            </button>
          ) : (
            <div className="border border-red-100 bg-red-50 rounded-lg p-4">
              {deleteError && (
                <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-md">
                  <p className="text-sm text-red-700">{deleteError}</p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <Label htmlFor="confirmEmail" className="text-sm">
                    Typ je e-mailadres ter bevestiging: <strong>{user.email}</strong>
                  </Label>
                  <Input
                    id="confirmEmail"
                    type="email"
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                    placeholder={user.email}
                    className="mt-1"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowDeleteForm(false);
                      setConfirmEmail('');
                      setDeleteError(null);
                    }}
                    disabled={deleting}
                  >
                    Annuleren
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={!canDelete || deleting}
                  >
                    {deleting ? 'Bezig met verwijderen...' : 'Definitief verwijderen'}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
