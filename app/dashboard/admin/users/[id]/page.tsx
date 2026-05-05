'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { api, ApiError } from '@/lib/api-client';
import type { AdminUserDetail } from '@/types/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

export default function AdminUserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user: me } = useAuth();
  const userId = params.id as string;

  const [detail, setDetail] = useState<AdminUserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [acting, setActing] = useState(false);

  // Confirm dialogs
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    title: string;
    description: string;
    action: () => Promise<void>;
    destructive?: boolean;
  } | null>(null);

  const isSelf = me?.id === userId;

  const loadDetail = useCallback(async () => {
    try {
      const res = await api.get<AdminUserDetail>(`/admin/users/${userId}`);
      setDetail(res);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Er ging iets mis bij het laden.');
      }
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadDetail();
  }, [loadDetail]);

  // Clear success message after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleAction = async (
    endpoint: string,
    label: string,
    body?: Record<string, unknown>
  ) => {
    setError(null);
    setActing(true);
    try {
      await api.post(endpoint, body);
      setSuccess(`${label} uitgevoerd.`);
      await loadDetail();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Er ging iets mis.');
      }
    } finally {
      setActing(false);
    }
  };

  const handleForceDelete = async () => {
    setError(null);
    setActing(true);
    try {
      await api.post(`/admin/users/${userId}/force-delete`);
      router.push('/dashboard/admin/users');
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Er ging iets mis.');
      }
      setActing(false);
    }
  };

  const openConfirm = (
    title: string,
    description: string,
    action: () => Promise<void>,
    destructive = false
  ) => {
    setConfirmDialog({ open: true, title, description, action, destructive });
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('nl-BE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <Skeleton className="h-8 w-48 mb-6" />
        <Skeleton className="h-12 w-64 mb-2" />
        <Skeleton className="h-6 w-96 mb-8" />
        <Skeleton className="h-48 mb-4" />
        <Skeleton className="h-32 mb-4" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <Link
          href="/dashboard/admin/users"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Gebruikerslijst
        </Link>
        <Card className="border-red-200 bg-red-50">
          <CardContent className="py-6">
            <p className="text-red-600">{error || 'Gebruiker niet gevonden.'}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { user } = detail;

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <Link
        href="/dashboard/admin/users"
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Gebruikerslijst
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          {user.displayName || <em className="text-gray-400">geen naam</em>}
        </h1>
        <p className="text-gray-600 text-sm">
          {user.email} · {user.userType === 'candidate' ? 'Kandidaat' : 'Werkgever'}
          {user.isAdmin && ' · Beheerder'}
        </p>
      </div>

      {/* Error banner */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Success banner */}
      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-600">{success}</p>
        </div>
      )}

      {/* Status Card */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-lg">Status</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <dt className="text-gray-500">Geverifieerd</dt>
            <dd>{user.isVerified ? 'Ja' : 'Nee'}</dd>

            <dt className="text-gray-500">Actief</dt>
            <dd>{user.isActive ? 'Ja' : 'Nee'}</dd>

            <dt className="text-gray-500">Beheerder</dt>
            <dd>{user.isAdmin ? 'Ja' : 'Nee'}</dd>

            <dt className="text-gray-500">Verwijderd</dt>
            <dd>{formatDate(user.deletedAt)}</dd>

            <dt className="text-gray-500">Aangemaakt</dt>
            <dd>{formatDate(user.createdAt)}</dd>

            <dt className="text-gray-500">Laatste login</dt>
            <dd>{formatDate(user.lastLogin)}</dd>
          </dl>
        </CardContent>
      </Card>

      {/* Actions Card */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-lg">Acties</CardTitle>
        </CardHeader>
        <CardContent>
          {isSelf ? (
            <p className="text-sm text-gray-500 italic">
              Je kan jezelf niet deactiveren of admin-rechten van jezelf intrekken.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {!user.deletedAt && (
                <>
                  {user.isActive && (
                    <Button
                      variant="outline"
                      disabled={acting}
                      onClick={() =>
                        handleAction(
                          `/admin/users/${userId}/deactivate`,
                          'Deactiveren'
                        )
                      }
                    >
                      Deactiveer
                    </Button>
                  )}
                  {!user.isActive && (
                    <Button
                      variant="outline"
                      disabled={acting}
                      onClick={() =>
                        handleAction(
                          `/admin/users/${userId}/reactivate`,
                          'Heractiveren'
                        )
                      }
                    >
                      Heractiveer
                    </Button>
                  )}
                  {!user.isAdmin && (
                    <Button
                      variant="outline"
                      disabled={acting}
                      onClick={() =>
                        openConfirm(
                          'Admin-rechten toekennen',
                          `Weet je zeker dat je ${user.displayName || user.email} admin-rechten wilt geven?`,
                          () =>
                            handleAction(
                              `/admin/users/${userId}/grant-admin`,
                              'Admin-rechten toekennen'
                            )
                        )
                      }
                    >
                      Maak admin
                    </Button>
                  )}
                  {user.isAdmin && (
                    <Button
                      variant="outline"
                      disabled={acting}
                      onClick={() =>
                        openConfirm(
                          'Admin-rechten intrekken',
                          `Weet je zeker dat je de admin-rechten van ${user.displayName || user.email} wilt intrekken?`,
                          () =>
                            handleAction(
                              `/admin/users/${userId}/revoke-admin`,
                              'Admin-rechten intrekken'
                            )
                        )
                      }
                    >
                      Verwijder admin
                    </Button>
                  )}
                </>
              )}

              <Button
                variant="destructive"
                disabled={acting}
                onClick={() =>
                  openConfirm(
                    'DEFINITIEF verwijderen',
                    'DEFINITIEF verwijderen? Deze actie cascade-delete alles van deze gebruiker en kan niet teruggedraaid worden.',
                    handleForceDelete,
                    true
                  )
                }
              >
                Force-delete
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Profile Data Card */}
      {(detail.candidate || detail.employer) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Profielgegevens (debug)</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs bg-gray-100 p-4 rounded-md max-h-96 overflow-auto">
              {JSON.stringify(detail.candidate ?? detail.employer, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}

      {/* Confirm Dialog */}
      {confirmDialog && (
        <Dialog
          open={confirmDialog.open}
          onOpenChange={(open) => {
            if (!open) setConfirmDialog(null);
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {confirmDialog.destructive && (
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                )}
                {confirmDialog.title}
              </DialogTitle>
              <DialogDescription>{confirmDialog.description}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setConfirmDialog(null)}
                disabled={acting}
              >
                Annuleren
              </Button>
              <Button
                variant={confirmDialog.destructive ? 'destructive' : 'default'}
                disabled={acting}
                onClick={async () => {
                  await confirmDialog.action();
                  setConfirmDialog(null);
                }}
              >
                {acting ? 'Bezig...' : 'Bevestigen'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
