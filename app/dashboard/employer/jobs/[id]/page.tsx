'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { api, ApiError } from '@/lib/api-client';
import type { JobWithSkills, JobStatus, ProficiencyLevel } from '@/types/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { JobForm } from '@/components/job-form';

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

const workTypeLabels: Record<string, string> = {
  full_time: 'Voltijds',
  part_time: 'Deeltijds',
  freelance: 'Freelance',
  temporary: 'Tijdelijk',
};

const experienceLevelLabels: Record<string, string> = {
  junior: 'Junior',
  medior: 'Medior',
  senior: 'Senior',
};

const proficiencyLabels: Record<ProficiencyLevel, string> = {
  informed: 'Op de hoogte',
  beginner: 'Beginner',
  advanced: 'Gevorderd',
  expert: 'Expert',
  master: 'Meester',
};

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;

  const [job, setJob] = useState<JobWithSkills | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchJob = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get<{ job: JobWithSkills }>(`/employer/jobs/${jobId}`);
      setJob(res.job);
      setError(null);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Er ging iets mis bij het ophalen van de vacature.');
      }
    } finally {
      setLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    fetchJob();
  }, [fetchJob]);

  const handleStatusChange = async (newStatus: JobStatus) => {
    if (!job || newStatus === job.status) return;

    try {
      setStatusUpdating(true);
      await api.patch(`/employer/jobs/${jobId}/status`, { status: newStatus });
      setJob({ ...job, status: newStatus });
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      }
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await api.delete(`/employer/jobs/${jobId}`);
      router.push('/dashboard/employer/jobs');
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      }
      setDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const handleFormSubmit = async (data: JobFormData) => {
    await api.patch(`/employer/jobs/${jobId}`, data);
    await fetchJob();
    setIsEditMode(false);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Skeleton className="h-8 w-64 mb-4" />
        <Skeleton className="h-6 w-48 mb-8" />
        <Skeleton className="h-96" />
      </div>
    );
  }

  if (error && !job) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="py-6">
            <p className="text-red-600 mb-4">{error}</p>
            <Button variant="outline" asChild>
              <Link href="/dashboard/employer/jobs">Terug naar vacatures</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!job) return null;

  const formDefaultValues = {
    title: job.title,
    sectorId: job.sectorId,
    description: job.description,
    city: job.city || '',
    country: job.country || 'BE',
    workType: job.workType,
    experienceLevel: job.experienceLevel,
    salaryMin: job.salaryMin,
    salaryMax: job.salaryMax,
    skills: job.skills.map((s) => ({
      skillId: s.skillId,
      skillName: s.skillName,
      requiredLevel: s.requiredLevel,
      weight: s.weight,
    })),
    closesAt: job.closesAt,
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-gray-600">
          <li>
            <Link href="/dashboard/employer/jobs" className="hover:text-gray-900">
              Vacatures
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 font-medium truncate max-w-xs">{job.title}</li>
        </ol>
      </nav>

      {/* Error banner */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <Badge className={statusColors[job.status]}>{statusLabels[job.status]}</Badge>
          </div>
          <p className="text-sm text-gray-600">
            Aangemaakt op {new Date(job.createdAt).toLocaleDateString('nl-BE')}
            {job.publishedAt && (
              <> · Gepubliceerd op {new Date(job.publishedAt).toLocaleDateString('nl-BE')}</>
            )}
          </p>
        </div>

        {!isEditMode && (
          <Button onClick={() => setIsEditMode(true)}>Bewerken</Button>
        )}
      </div>

      {/* Quick nav tabs */}
      <div className="flex gap-4 mb-8 border-b">
        <Link
          href={`/dashboard/employer/jobs/${jobId}`}
          className="px-4 py-2 text-sm font-medium border-b-2 border-primary text-primary"
        >
          Details
        </Link>
        <Link
          href={`/dashboard/employer/jobs/${jobId}/matches`}
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          Matches
        </Link>
        <Link
          href={`/dashboard/employer/jobs/${jobId}/tests`}
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          Werkgever-toetsen
        </Link>
      </div>

      {/* Main content */}
      {isEditMode ? (
        <JobForm
          mode="edit"
          defaultValues={formDefaultValues}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsEditMode(false)}
        />
      ) : (
        <div className="space-y-6">
          {/* Basic info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basis informatie</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Beschrijving</p>
                <p className="whitespace-pre-wrap">{job.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Locatie</p>
                  <p>{job.city ? `${job.city}, ${job.country}` : job.country || 'Niet opgegeven'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Werktype</p>
                  <p>{workTypeLabels[job.workType]}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Ervaringsniveau</p>
                  <p>{experienceLevelLabels[job.experienceLevel]}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Salaris</p>
                  <p>
                    {job.salaryMin || job.salaryMax
                      ? `€${job.salaryMin?.toLocaleString('nl-BE') || '?'} - €${job.salaryMax?.toLocaleString('nl-BE') || '?'} / maand`
                      : 'Niet opgegeven'}
                  </p>
                </div>
              </div>
              {job.closesAt && (
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Sluitingsdatum</p>
                  <p>{new Date(job.closesAt).toLocaleDateString('nl-BE')}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Vereiste vaardigheden</CardTitle>
            </CardHeader>
            <CardContent>
              {job.skills.length === 0 ? (
                <p className="text-gray-500">Geen vaardigheden opgegeven.</p>
              ) : (
                <div className="space-y-3">
                  {job.skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{skill.skillName}</p>
                        <p className="text-sm text-gray-500">
                          Niveau: {proficiencyLabels[skill.requiredLevel]}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">Gewicht: {skill.weight}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Footer actions */}
          <Card>
            <CardContent className="py-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">Status wijzigen:</span>
                  <Select
                    value={job.status}
                    onValueChange={(value) => handleStatusChange(value as JobStatus)}
                    disabled={statusUpdating}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Concept</SelectItem>
                      <SelectItem value="active">Actief</SelectItem>
                      <SelectItem value="paused">Gepauzeerd</SelectItem>
                      <SelectItem value="closed">Gesloten</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {job.status === 'draft' && (
                  <Button
                    variant="destructive"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    Vacature verwijderen
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Delete confirmation dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Vacature verwijderen</DialogTitle>
            <DialogDescription>
              Weet je zeker dat je de vacature &quot;{job.title}&quot; wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              disabled={deleting}
            >
              Annuleren
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? 'Verwijderen...' : 'Verwijderen'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
