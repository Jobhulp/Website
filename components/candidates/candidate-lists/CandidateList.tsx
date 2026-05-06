'use client';

import { useEffect, useState, useCallback } from 'react';
import { api, ApiError } from '@/lib/api-client';
import { Skeleton } from '@/components/ui/skeleton';
import CandidateCard from './CandidateCard';
import type { CandidatesFeedResponse, CandidateFeedItem } from '@/types/api';

function CandidateCardSkeleton() {
  return (
    <div className="ui-card mb-4">
      <div className="ui-card-content">
        <div className="d-flex align-items-start gap-3">
          <Skeleton className="h-16 w-16 rounded-full flex-shrink-0" />
          <div className="flex-grow-1">
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-3" />
            <div className="d-flex gap-2 flex-wrap">
              <Skeleton className="h-6 w-16 rounded" />
              <Skeleton className="h-6 w-20 rounded" />
              <Skeleton className="h-6 w-14 rounded" />
            </div>
          </div>
        </div>
      </div>
      <div className="ui-card-footer">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
}

export default function CandidateList() {
  const [candidates, setCandidates] = useState<CandidateFeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCandidates = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get<CandidatesFeedResponse>(
        '/homepage/candidates-feed?limit=6'
      );
      setCandidates(response.items);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Kandidaten konden niet geladen worden.');
      }
      setCandidates([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  if (loading) {
    return (
      <>
        <h3 className="mb40 mt-0">Beschikbare Kandidaten</h3>
        {Array.from({ length: 4 }).map((_, i) => (
          <CandidateCardSkeleton key={i} />
        ))}
      </>
    );
  }

  if (error) {
    return (
      <>
        <h3 className="mb40 mt-0">Beschikbare Kandidaten</h3>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-700 mb-3">{error}</p>
          <button
            type="button"
            onClick={fetchCandidates}
            className="crumina-button button--dark button--m"
          >
            Opnieuw proberen
          </button>
        </div>
      </>
    );
  }

  if (candidates.length === 0) {
    return (
      <>
        <h3 className="mb40 mt-0">Beschikbare Kandidaten</h3>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-600">Momenteel geen kandidaten beschikbaar.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <h3 className="mb40 mt-0">Beschikbare Kandidaten</h3>
      <p className="text-muted mb-4" style={{ fontSize: '14px' }}>
        <i className="far fa-shield-alt mr-2"></i>
        Kandidaatgegevens zijn geanonimiseerd. Log in als werkgever om profielen te bekijken en contact op te nemen.
      </p>
      {candidates.map((candidate) => (
        <CandidateCard
          key={candidate.id}
          id={candidate.id}
          displayTitle={candidate.displayTitle}
          primarySectorName={candidate.primarySectorName || 'Algemeen'}
          region={candidate.region || undefined}
          topSkills={candidate.topSkills.map(s => s.skillName)}
          yearsExperience={candidate.yearsExperience}
          workType={candidate.workTypes[0] || undefined}
          isFeatured={candidate.reason === 'new_profile'}
          className="mb-4"
        />
      ))}
    </>
  );
}
