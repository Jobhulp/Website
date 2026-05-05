'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { api, ApiError } from '@/lib/api-client';
import type { AuditLogEntry, AuditAction, PaginatedResult } from '@/types/api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import {
  Ban,
  CheckCircle,
  Trash2,
  Pause,
  Play,
  Lock,
  Crown,
  User,
  Download,
  DoorOpen,
  RotateCcw,
  ChevronDown,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';

const ITEMS_PER_PAGE = 20;

const ACTION_ICONS: Record<AuditAction, React.ReactNode> = {
  admin_user_deactivate: <Ban className="h-5 w-5 text-red-500" />,
  admin_user_reactivate: <CheckCircle className="h-5 w-5 text-green-500" />,
  admin_user_force_delete: <Trash2 className="h-5 w-5 text-red-600" />,
  admin_job_pause: <Pause className="h-5 w-5 text-amber-500" />,
  admin_job_resume: <Play className="h-5 w-5 text-green-500" />,
  admin_job_close: <Lock className="h-5 w-5 text-gray-500" />,
  admin_grant_admin: <Crown className="h-5 w-5 text-purple-500" />,
  admin_revoke_admin: <User className="h-5 w-5 text-gray-500" />,
  user_data_export: <Download className="h-5 w-5 text-blue-500" />,
  user_account_delete: <DoorOpen className="h-5 w-5 text-red-500" />,
  user_account_restore: <RotateCcw className="h-5 w-5 text-green-500" />,
};

const ACTION_LABELS: Record<AuditAction, string> = {
  admin_user_deactivate: 'Gebruiker gedeactiveerd',
  admin_user_reactivate: 'Gebruiker geheractiveerd',
  admin_user_force_delete: 'Gebruiker definitief verwijderd',
  admin_job_pause: 'Vacature gepauzeerd',
  admin_job_resume: 'Vacature hervat',
  admin_job_close: 'Vacature gesloten',
  admin_grant_admin: 'Admin-rechten toegekend',
  admin_revoke_admin: 'Admin-rechten ingetrokken',
  user_data_export: 'Data-export gedownload',
  user_account_delete: 'Account verwijderd (zelfgekozen)',
  user_account_restore: 'Account hersteld',
};

function isSelfServiceAction(action: AuditAction): boolean {
  return action.startsWith('user_');
}

function truncateId(id: string): string {
  return id.length > 8 ? `${id.substring(0, 8)}...` : id;
}

function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString('nl-BE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

interface AuditEntryProps {
  entry: AuditLogEntry;
}

function AuditEntry({ entry }: AuditEntryProps) {
  const [expanded, setExpanded] = useState(false);
  const hasMetadata = entry.metadata && Object.keys(entry.metadata).length > 0;

  return (
    <div className="py-4">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5">
          {ACTION_ICONS[entry.action]}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title row */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-gray-900">
              {ACTION_LABELS[entry.action]}
            </span>
            {isSelfServiceAction(entry.action) && (
              <Badge variant="secondary" className="text-xs">
                Self-service
              </Badge>
            )}
          </div>

          {/* Sub-info */}
          <div className="mt-1 text-sm text-gray-600 space-y-1">
            <div className="flex items-center gap-4 flex-wrap">
              <span>
                Actor:{' '}
                {entry.actorUserId ? (
                  <Link
                    href={`/dashboard/admin/users/${entry.actorUserId}`}
                    className="text-blue-600 hover:underline font-mono"
                  >
                    {truncateId(entry.actorUserId)}
                  </Link>
                ) : (
                  <span className="text-gray-400 italic">systeem</span>
                )}
              </span>

              {entry.targetId && entry.targetType && (
                <span>
                  Target:{' '}
                  {entry.targetType === 'users' ? (
                    <Link
                      href={`/dashboard/admin/users/${entry.targetId}`}
                      className="text-blue-600 hover:underline font-mono"
                    >
                      {entry.targetType}/{truncateId(entry.targetId)}
                    </Link>
                  ) : (
                    <span className="font-mono">
                      {entry.targetType}/{truncateId(entry.targetId)}
                    </span>
                  )}
                </span>
              )}
            </div>

            <div className="text-gray-500">
              {formatDateTime(entry.createdAt)}
            </div>
          </div>

          {/* Expandable metadata */}
          {hasMetadata && (
            <div className="mt-2">
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
              >
                {expanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
                Metadata
              </button>

              {expanded && (
                <pre className="mt-2 p-3 bg-gray-50 rounded-md text-xs overflow-x-auto">
                  {JSON.stringify(entry.metadata, null, 2)}
                </pre>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminAuditLogPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [entries, setEntries] = useState<AuditLogEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Redirect non-admin users
  useEffect(() => {
    if (user && !user.isAdmin) {
      router.replace('/dashboard');
    }
  }, [user, router]);

  // Fetch audit log
  useEffect(() => {
    async function fetchAuditLog() {
      setLoading(true);
      setError(null);

      try {
        const offset = (page - 1) * ITEMS_PER_PAGE;
        const res = await api.get<PaginatedResult<AuditLogEntry>>(
          `/admin/audit-log?limit=${ITEMS_PER_PAGE}&offset=${offset}`
        );
        setEntries(res.items);
        setTotal(res.total);
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError('Er ging iets mis bij het ophalen van de audit-log.');
        }
      } finally {
        setLoading(false);
      }
    }

    if (user?.isAdmin) {
      fetchAuditLog();
    }
  }, [user, page]);

  if (!user || !user.isAdmin) {
    return null;
  }

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const startItem = (page - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(page * ITEMS_PER_PAGE, total);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back link */}
      <Link
        href="/dashboard/admin"
        className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Beheer
      </Link>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Audit-log</h1>
        <p className="text-gray-600 text-sm mt-1">
          Tijdlijn van admin-acties en GDPR-self-service events. Items zijn
          immutabel — niet bewerkbaar of verwijderbaar.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Feed */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-start gap-4">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-4 w-72" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              ))}
            </div>
          ) : entries.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              Geen audit-log entries gevonden.
            </div>
          ) : (
            <div className="divide-y px-6">
              {entries.map((entry) => (
                <AuditEntry key={entry.id} entry={entry} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {startItem}-{endItem} van {total}
          </p>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Vorige
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Volgende
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
