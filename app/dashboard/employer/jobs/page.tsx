'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { api, ApiError } from '@/lib/api-client';
import type { JobWithSkills, JobStatus } from '@/types/api';
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

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
  closed: 'bg-gray-200 text-gray-500',
};

const workTypeLabels: Record<string, string> = {
  fulltime: 'Voltijds',
  parttime: 'Deeltijds',
  freelance: 'Freelance',
  internship: 'Stage',
  temporary: 'Tijdelijk',
};

type FilterStatus = 'all' | JobStatus;

export default function EmployerJobsPage() {
  const [jobs, setJobs] = useState<JobWithSkills[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [updatingJobId, setUpdatingJobId] = useState<string | null>(null);
  const [deletingJobId, setDeletingJobId] = useState<string | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    try {
      setLoading(true);
      const data = await api.get<JobWithSkills[]>('/employer/jobs');
      setJobs(data);
      setError(null);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Er ging iets mis bij het ophalen van de vacatures.');
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateJobStatus(jobId: string, newStatus: JobStatus) {
    setUpdatingJobId(jobId);
    try {
      await api.patch(`/employer/jobs/${jobId}/status`, { status: newStatus });
      setJobs((prev) =>
        prev.map((job) =>
          job.id === jobId ? { ...job, status: newStatus } : job
        )
      );
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      }
    } finally {
      setUpdatingJobId(null);
    }
  }

  async function deleteJob(jobId: string) {
    if (!confirm('Weet je zeker dat je deze vacature wilt verwijderen?')) {
      return;
    }
    setDeletingJobId(jobId);
    try {
      await api.delete(`/employer/jobs/${jobId}`);
      setJobs((prev) => prev.filter((job) => job.id !== jobId));
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      }
    } finally {
      setDeletingJobId(null);
    }
  }

  const filteredJobs =
    filterStatus === 'all'
      ? jobs
      : jobs.filter((job) => job.status === filterStatus);

  function formatSalary(min: number | null, max: number | null): string {
    if (!min && !max) return '';
    if (min && max) return `${min.toLocaleString('nl-BE')} - ${max.toLocaleString('nl-BE')} EUR`;
    if (min) return `Vanaf ${min.toLocaleString('nl-BE')} EUR`;
    if (max) return `Tot ${max.toLocaleString('nl-BE')} EUR`;
    return '';
  }

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('nl-BE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  if (loading) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-40" />
        </div>
        <Skeleton className="h-10 w-full mb-6" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-40" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="p-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold">Mijn vacatures</h1>
          <Button asChild>
            <Link href="/dashboard/employer/jobs/new">+ Nieuwe vacature</Link>
          </Button>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Filter bar */}
        <div className="mb-6">
          <Select
            value={filterStatus}
            onValueChange={(value) => setFilterStatus(value as FilterStatus)}
          >
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter op status" />
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

        {/* Jobs list */}
        {filteredJobs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-600 mb-4">
                {filterStatus === 'all'
                  ? 'Nog geen vacatures. Maak je eerste vacature aan om kandidaten te vinden.'
                  : `Geen vacatures met status "${statusLabels[filterStatus as JobStatus]}".`}
              </p>
              {filterStatus === 'all' && (
                <Button asChild>
                  <Link href="/dashboard/employer/jobs/new">+ Nieuwe vacature</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="overflow-hidden">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col gap-4">
                    {/* Title and status */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-lg font-semibold">{job.title}</h3>
                          <Badge className={statusColors[job.status]}>
                            {statusLabels[job.status]}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-1 text-sm text-gray-600">
                          {job.city && <span>{job.city}</span>}
                          {job.city && job.workType && <span>|</span>}
                          {job.workType && <span>{workTypeLabels[job.workType]}</span>}
                          {(job.salaryMin || job.salaryMax) && (
                            <>
                              <span>|</span>
                              <span>{formatSalary(job.salaryMin, job.salaryMax)}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Skills */}
                    {job.skills && job.skills.length > 0 && (
                      <div>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="text-sm text-gray-600 cursor-help underline decoration-dotted">
                              {job.skills.length} vereiste skill{job.skills.length !== 1 ? 's' : ''}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <ul className="text-sm">
                              {job.skills.map((skill) => (
                                <li key={skill.id}>{skill.skillName}</li>
                              ))}
                            </ul>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    )}

                    {/* Dates */}
                    <div className="text-sm text-gray-500">
                      <span>Aangemaakt op {formatDate(job.createdAt)}</span>
                      {job.closesAt && (
                        <span className="ml-3">
                          Sluit op {formatDate(job.closesAt)}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 pt-2 border-t">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/employer/jobs/${job.id}`}>
                          Bekijken
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/employer/jobs/${job.id}/matches`}>
                          Matches
                        </Link>
                      </Button>

                      {/* Status actions */}
                      {job.status === 'draft' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateJobStatus(job.id, 'active')}
                          disabled={updatingJobId === job.id}
                        >
                          {updatingJobId === job.id ? 'Bezig...' : 'Publiceren'}
                        </Button>
                      )}
                      {job.status === 'active' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateJobStatus(job.id, 'paused')}
                          disabled={updatingJobId === job.id}
                        >
                          {updatingJobId === job.id ? 'Bezig...' : 'Pauzeren'}
                        </Button>
                      )}
                      {job.status === 'paused' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateJobStatus(job.id, 'active')}
                          disabled={updatingJobId === job.id}
                        >
                          {updatingJobId === job.id ? 'Bezig...' : 'Heractiveren'}
                        </Button>
                      )}
                      {job.status !== 'closed' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateJobStatus(job.id, 'closed')}
                          disabled={updatingJobId === job.id}
                        >
                          {updatingJobId === job.id ? 'Bezig...' : 'Sluiten'}
                        </Button>
                      )}

                      {/* Delete - only for drafts */}
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => deleteJob(job.id)}
                        disabled={job.status !== 'draft' || deletingJobId === job.id}
                      >
                        {deletingJobId === job.id ? 'Bezig...' : 'Verwijderen'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
