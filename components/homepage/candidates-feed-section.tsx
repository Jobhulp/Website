'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { api, ApiError } from '@/lib/api-client';
import { useAuth } from '@/lib/auth-context';
import { getRecentSectorsParam, getFeedSeed } from '@/lib/sector-tracking';
import { CandidateFeedCard } from '@/components/candidate-feed-card';
import { Skeleton } from '@/components/ui/skeleton';
import type { CandidatesFeedResponse, CandidateFeedItem } from '@/types/api';

interface CandidatesFeedSectionProps {
  workTypes?: string[];
  city?: string;
  limit?: number;
  onClearFilters?: () => void;
}

function CandidateCardSkeleton() {
  return (
    <div className="col-lg-12 sorting-item">
      <div className="ui-card">
        <div className="ui-card-content">
          <div className="d-flex align-items-center gap-3">
            <Skeleton className="h-14 w-14 rounded-full flex-shrink-0" />
            <div className="flex-grow-1">
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
          <div className="mt-3">
            <div className="d-flex gap-2 flex-wrap">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </div>
        </div>
        <div className="ui-card-footer">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-16 rounded" />
        </div>
      </div>
    </div>
  );
}

export function CandidatesFeedSection({ 
  workTypes, 
  city, 
  limit = 6,
  onClearFilters 
}: CandidatesFeedSectionProps) {
  const router = useRouter();
  const { user } = useAuth();
  
  const [items, setItems] = useState<CandidateFeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeed = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.set('limit', limit.toString());
      
      if (workTypes && workTypes.length > 0) {
        params.set('workType', workTypes.join(','));
      }
      if (city) {
        params.set('city', city);
      }
      
      // Get recent sectors from localStorage
      const recentSectors = getRecentSectorsParam();
      if (recentSectors) {
        params.set('recentSectors', recentSectors);
      }
      
      // Get stable seed for consistent ordering
      const seed = getFeedSeed();
      if (seed) {
        params.set('seed', seed);
      }

      const response = await api.get<CandidatesFeedResponse>(
        `/homepage/candidates-feed?${params.toString()}`
      );
      setItems(response.items);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Kandidaten konden niet geladen worden.');
      }
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [workTypes, city, limit]);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  const handleCardClick = useCallback((item: CandidateFeedItem) => {
    // Anonymous user - redirect to login
    if (!user) {
      router.push(`/login?redirect=/candidates/${item.id}`);
      return;
    }

    // Logged-in candidate - redirect to employer signup info
    if (user.userType === 'candidate') {
      // Candidates can't view other candidates - do nothing or redirect
      return;
    }

    // Logged-in employer - navigate to candidate detail
    router.push(`/candidates/${item.id}`);
  }, [user, router]);

  // Loading state
  if (loading) {
    return (
      <div className="row sorting-container mb40" id="candidates-grid" data-layout="fitRows">
        {Array.from({ length: limit }).map((_, i) => (
          <CandidateCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="row mb40">
        <div className="col-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-700 mb-3">{error}</p>
            <button
              type="button"
              onClick={() => fetchFeed()}
              className="crumina-button button--dark button--m"
            >
              Opnieuw proberen
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (items.length === 0) {
    return (
      <div className="row mb40">
        <div className="col-12">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-600 mb-4">Geen kandidaten gevonden voor deze filter.</p>
            {onClearFilters && (
              <button
                type="button"
                onClick={onClearFilters}
                className="crumina-button button--grey button--m"
              >
                Filter wissen
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="row sorting-container mb40" id="candidates-grid" data-layout="fitRows">
        {items.map((item) => (
          <div key={item.id} className="col-lg-12 sorting-item">
            <CandidateFeedCard 
              item={item} 
              onClick={() => handleCardClick(item)}
            />
          </div>
        ))}
      </div>

      <div className="row justify-content-center">
        <div className="col-auto">
          <button
            type="button"
            onClick={() => {
              if (!user) {
                router.push('/login?redirect=/candidates');
              } else if (user.userType === 'employer') {
                router.push('/candidates');
              }
              // Candidates can't access - button does nothing
            }}
            className="crumina-button button--grey button--xl load-more-button"
          >
            Meer kandidaten bekijken
          </button>
        </div>
      </div>
    </>
  );
}
