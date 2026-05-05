'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api, ApiError } from '@/lib/api-client';
import { JobForm, type JobFormData } from '@/components/job-form';
import type { Job } from '@/types/api';

export default function NewJobPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: JobFormData, status: 'draft' | 'active') => {
    setError(null);
    setIsSubmitting(true);

    try {
      const payload = {
        title: data.title,
        description: data.description,
        sectorId: data.sectorId,
        city: data.city || null,
        country: data.country || null,
        workType: data.workType,
        experienceLevel: data.experienceLevel,
        salaryMin: data.salaryMin || null,
        salaryMax: data.salaryMax || null,
        closesAt: data.closesAt || null,
        status,
        skills: data.skills.map((s) => ({
          skillId: s.skillId,
          requiredLevel: s.requiredLevel,
          weight: s.weight,
        })),
      };

      const res = await api.post<{ job: Job }>('/employer/jobs', payload);
      router.push(`/dashboard/employer/jobs/${res.job.id}`);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Er ging iets mis. Probeer het opnieuw.');
      }
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/dashboard/employer/jobs');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link 
              href="/dashboard/employer/jobs" 
              className="text-gray-500 hover:text-gray-700"
            >
              Vacatures
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-900 font-medium">Nieuwe vacature</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Nieuwe vacature</h1>
        <p className="text-gray-600 text-sm mt-1">
          Maak een nieuwe vacature aan en vind de perfecte kandidaat.
        </p>
      </div>

      {/* Error banner */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Form */}
      <JobForm
        mode="create"
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
