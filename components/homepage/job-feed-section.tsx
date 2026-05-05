'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { api, ApiError } from '@/lib/api-client';
import { getRecentSectorsParam, getFeedSeed } from '@/lib/sector-tracking';
import { JobFeedCard } from '@/components/job-feed-card';
import { Skeleton } from '@/components/ui/skeleton';
import type { HomepageFeedResponse, HomepageFeedItem } from '@/types/api';

interface JobFeedSectionProps {
  workTypes?: string[];
  city?: string;
  limit?: number;
  onClearFilters?: () => void;
}

function JobCardSkeleton() {
  return (
    <div className="col-lg-12 sorting-item">
      <div className="ui-card">
        <div className="ui-card-content">
          <div className="vacancies-title-location">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="logo-company">
            <Skeleton className="h-12 w-12 rounded" />
          </div>
        </div>
        <div className="ui-card-footer">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-20 rounded" />
        </div>
      </div>
    </div>
  );
}

export function JobFeedSection({ 
  workTypes, 
  city, 
  limit = 6,
  onClearFilters 
}: JobFeedSectionProps) {
  const [items, setItems] = useState<HomepageFeedItem[]>([]);
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
      
      // Get stable seed for anonymous users
      const seed = getFeedSeed();
      if (seed) {
        params.set('seed', seed);
      }

      const response = await api.get<HomepageFeedResponse>(
        `/homepage/feed?${params.toString()}`
      );
      setItems(response.items);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Jobs konden niet geladen worden.');
      }
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [workTypes, city, limit]);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  // Loading state
  if (loading) {
    return (
      <div className="row sorting-container mb40" id="vacancies-grid" data-layout="fitRows">
        {Array.from({ length: limit }).map((_, i) => (
          <JobCardSkeleton key={i} />
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
            <p className="text-gray-600 mb-4">Geen openstaande jobs voor deze filter.</p>
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
      <div className="row sorting-container mb40" id="vacancies-grid" data-layout="fitRows">
        {items.map((item) => (
          <div key={item.id} className="col-lg-12 sorting-item">
            <JobFeedCard item={item} />
          </div>
        ))}
      </div>

      <div className="row justify-content-center">
        <div className="col-auto">
          <Link
            href="/jobs/job-lists"
            className="crumina-button button--grey button--xl load-more-button"
          >
            Meer jobs laden
          </Link>
        </div>
      </div>
    </>
  );
}
