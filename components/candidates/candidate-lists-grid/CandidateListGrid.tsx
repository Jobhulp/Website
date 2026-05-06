'use client';

import { useEffect, useState, useCallback } from 'react';
import { api, ApiError } from '@/lib/api-client';
import { Skeleton } from '@/components/ui/skeleton';
import CandidateCard from '../candidate-lists/CandidateCard';
import Pagination from '../candidate-lists/Pagination';
import type { CandidatesFeedResponse, CandidateFeedItem } from '@/types/api';

function CardSkeleton() {
  return (
    <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mb40">
      <div className="ui-card">
        <div className="ui-card-content">
          <div className="d-flex flex-column align-items-center">
            <Skeleton className="h-16 w-16 rounded-full mb-3" />
            <Skeleton className="h-5 w-32 mb-2" />
            <Skeleton className="h-4 w-24 mb-3" />
            <div className="d-flex gap-2 flex-wrap justify-content-center">
              <Skeleton className="h-6 w-16 rounded" />
              <Skeleton className="h-6 w-20 rounded" />
            </div>
          </div>
        </div>
        <div className="ui-card-footer justify-content-center">
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  );
}

export default function CandidateListGrid() {
  const [candidates, setCandidates] = useState<CandidateFeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 1; // Will be dynamic when API supports pagination

  const fetchCandidates = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get<CandidatesFeedResponse>(
        '/homepage/candidates-feed?limit=9'
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // API pagination to be implemented
  };

  return (
    <section className="bg-light-grey pb120">
      <div className="container">
        <div className="row mb20">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <h3 className="mb-3 mt-0">Beschikbare Kandidaten</h3>
            <p className="text-muted mb40" style={{ fontSize: '14px' }}>
              <i className="far fa-shield-alt mr-2"></i>
              Kandidaatgegevens zijn geanonimiseerd ter bescherming van privacy. 
              Log in als werkgever om volledige profielen te bekijken.
            </p>
          </div>

          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
          ) : error ? (
            <div className="col-12">
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
            </div>
          ) : candidates.length === 0 ? (
            <div className="col-12">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                <p className="text-gray-600">Momenteel geen kandidaten beschikbaar.</p>
              </div>
            </div>
          ) : (
            candidates.map((candidate) => (
              <div
                key={candidate.id}
                className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mb40"
              >
                <CandidateCard
                  id={candidate.id}
                  displayTitle={candidate.displayTitle}
                  primarySectorName={candidate.primarySectorName || 'Algemeen'}
                  region={candidate.region || undefined}
                  topSkills={candidate.topSkills.map(s => s.skillName)}
                  yearsExperience={candidate.yearsExperience}
                  workType={candidate.workTypes[0] || undefined}
                  isFeatured={candidate.reason === 'new_profile'}
                />
              </div>
            ))
          )}
        </div>
        
        {!loading && !error && candidates.length > 0 && (
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
