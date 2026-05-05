'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { api, ApiError } from '@/lib/api-client';
import type { AdminJobListItem, PaginatedResult, JobStatus } from '@/types/api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select-shadcn';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Pause, Play, XCircle } from 'lucide-react';

const LIMIT = 20;

const statusLabels: Record<JobStatus, string> = {
  draft: 'Concept',
  active: 'Actief',
  paused: 'Gepauzeerd',
  closed: 'Gesloten',
};

const statusColors: Record<JobStatus, string> = {
  draft: 'bg-gray-100 text-gray-700',
  active: 'bg-green-100 text-green-700',
  paused: 'bg-amber-100 text-amber-700',
  closed: 'bg-red-100 text-red-700',
};

type ActionType = 'pause' | 'resume' | 'close';

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<AdminJobListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [offset, setOffset] = useState(0);

  // Action dialog
  const [actionDialog, setActionDialog] = useState<{
    open: boolean;
    type: ActionType;
    job: AdminJobListItem | null;
  }>({ open: false, type: 'pause', job: null });
  const [actionReason, setActionReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        if (statusFilter !== 'all') params.set('status', statusFilter);
        params.set('limit', String(LIMIT));
        params.set('offset', String(offset));

        const res = await api.get<PaginatedResult<AdminJobListItem>>(
          `/admin/jobs?${params.toString()}`
        );
        setJobs(res.items);
        setTotal(res.total);
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError('Er ging iets mis bij het ophalen van vacatures.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [statusFilter, offset]);

  // Reset offset when filter changes
  useEffect(() => {
    setOffset(0);
  }, [statusFilter]);

  const openActionDialog = (type: ActionType, job: AdminJobListItem) => {
    setActionDialog({ open: true, type, job });
    setActionReason('');
  };

  const closeActionDialog = () => {
    setActionDialog({ open: false, type: 'pause', job: null });
    setActionReason('');
  };

  const executeAction = async () => {
    if (!actionDialog.job) return;

    setActionLoading(true);
    try {
      const { type, job } = actionDialog;
      const body = type === 'resume' ? undefined : { reason: actionReason || undefined };

      await api.post(`/admin/jobs/${job.id}/${type}`, body);

      // Update local state
      setJobs((prev) =>
        prev.map((j) => {
          if (j.id !== job.id) return j;
          let newStatus: JobStatus = j.status;
          if (type === 'pause') newStatus = 'paused';
          if (type === 'resume') newStatus = 'active';
          if (type === 'close') newStatus = 'closed';
          return { ...j, status: newStatus };
        })
      );

      closeActionDialog();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Actie mislukt.');
      }
    } finally {
      setActionLoading(false);
    }
  };

  const getDialogContent = () => {
    const { type, job } = actionDialog;
    if (!job) return { title: '', description: '', showReason: false };

    switch (type) {
      case 'pause':
        return {
          title: 'Vacature pauzeren',
          description: `Weet je zeker dat je "${job.title}" wilt pauzeren? De vacature wordt tijdelijk onzichtbaar voor kandidaten.`,
          showReason: true,
        };
      case 'resume':
        return {
          title: 'Vacature hervatten',
          description: `Weet je zeker dat je "${job.title}" wilt hervatten? De vacature wordt weer zichtbaar voor kandidaten.`,
          showReason: false,
        };
      case 'close':
        return {
          title: 'Vacature definitief sluiten',
          description: `Weet je zeker dat je "${job.title}" definitief wilt sluiten? Dit kan niet ongedaan worden gemaakt.`,
          showReason: true,
        };
    }
  };

  const totalPages = Math.ceil(total / LIMIT);
  const currentPage = Math.floor(offset / LIMIT) + 1;

  const dialogContent = getDialogContent();

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Back link */}
      <Link
        href="/dashboard/admin"
        className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Beheer
      </Link>

      {/* Header */}
      <h1 className="text-2xl font-bold">Vacatures modereren</h1>
      <p className="text-gray-600 text-sm mt-1 mb-6">
        Pauzeer, hervat of sluit vacatures als beheerder. Gebruik dit spaarzaam — werkgevers beheren hun vacatures normaal zelf.
      </p>

      {/* Error banner */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Filter */}
      <Card className="mb-6">
        <CardContent className="py-4">
          <div className="flex items-center gap-4">
            <div className="w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle</SelectItem>
                  <SelectItem value="draft">Concept</SelectItem>
                  <SelectItem value="active">Actief</SelectItem>
                  <SelectItem value="paused">Gepauzeerd</SelectItem>
                  <SelectItem value="closed">Gesloten</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-4 space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Geen vacatures gevonden.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 font-medium text-sm text-gray-600">Titel</th>
                    <th className="text-left p-4 font-medium text-sm text-gray-600">Werkgever</th>
                    <th className="text-left p-4 font-medium text-sm text-gray-600">Stad</th>
                    <th className="text-left p-4 font-medium text-sm text-gray-600">Status</th>
                    <th className="text-right p-4 font-medium text-sm text-gray-600">Acties</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {jobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50">
                      <td className="p-4 font-medium">{job.title}</td>
                      <td className="p-4 text-gray-600">
                        {job.employerName || <em className="text-gray-400">onbekend</em>}
                      </td>
                      <td className="p-4 text-gray-600">{job.city || '—'}</td>
                      <td className="p-4">
                        <Badge className={statusColors[job.status]}>
                          {statusLabels[job.status]}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          {job.status === 'active' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openActionDialog('pause', job)}
                            >
                              <Pause className="h-4 w-4 mr-1" />
                              Pauzeer
                            </Button>
                          )}
                          {job.status === 'paused' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openActionDialog('resume', job)}
                            >
                              <Play className="h-4 w-4 mr-1" />
                              Hervat
                            </Button>
                          )}
                          {(job.status === 'active' || job.status === 'paused') && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => openActionDialog('close', job)}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Sluit
                            </Button>
                          )}
                          {(job.status === 'draft' || job.status === 'closed') && (
                            <span className="text-sm text-gray-400">—</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {total > LIMIT && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {offset + 1}–{Math.min(offset + LIMIT, total)} van {total}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOffset(Math.max(0, offset - LIMIT))}
              disabled={offset === 0}
            >
              Vorige
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOffset(offset + LIMIT)}
              disabled={currentPage >= totalPages}
            >
              Volgende
            </Button>
          </div>
        </div>
      )}

      {/* Action confirmation dialog */}
      <Dialog open={actionDialog.open} onOpenChange={(open) => !open && closeActionDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogContent.title}</DialogTitle>
            <DialogDescription>{dialogContent.description}</DialogDescription>
          </DialogHeader>

          {dialogContent.showReason && (
            <div className="py-4">
              <Label htmlFor="reason">Reden (optioneel)</Label>
              <Textarea
                id="reason"
                value={actionReason}
                onChange={(e) => setActionReason(e.target.value)}
                placeholder="Voeg een reden toe voor de audit-log..."
                className="mt-2"
              />
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={closeActionDialog} disabled={actionLoading}>
              Annuleren
            </Button>
            <Button
              onClick={executeAction}
              disabled={actionLoading}
              variant={actionDialog.type === 'close' ? 'destructive' : 'default'}
            >
              {actionLoading ? 'Bezig...' : 'Bevestigen'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
