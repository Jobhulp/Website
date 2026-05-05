'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { api, ApiError } from '@/lib/api-client';
import { useAuth } from '@/lib/auth-context';
import { trackSectorClick, getRecentSectorsParam, getFeedSeed } from '@/lib/sector-tracking';
import { JobFeedCard } from '@/components/job-feed-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import type {
  HomepageFeedItem,
  HomepageFeedResponse,
  HomepageSector,
  SectorBySlugResponse,
  HomepageCitiesResponse,
  WorkType,
} from '@/types/api';
import { ArrowLeft, Briefcase, MapPin, Filter } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const ITEMS_PER_PAGE = 24;

// WorkType options
const WORK_TYPES: { value: WorkType; label: string }[] = [
  { value: 'fulltime', label: 'Voltijds' },
  { value: 'parttime', label: 'Deeltijds' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'internship', label: 'Stage' },
  { value: 'temporary', label: 'Tijdelijk' },
];

export default function SectorJobsPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { user } = useAuth();

  // Sector state
  const [sector, setSector] = useState<HomepageSector | null>(null);
  const [sectorLoading, setSectorLoading] = useState(true);
  const [sectorError, setSectorError] = useState<'not_found' | 'error' | null>(null);

  // Jobs state
  const [jobs, setJobs] = useState<HomepageFeedItem[]>([]);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [jobsError, setJobsError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Filter state
  const [workType, setWorkType] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [cities, setCities] = useState<string[]>([]);

  // Fetch sector by slug
  useEffect(() => {
    async function fetchSector() {
      setSectorLoading(true);
      setSectorError(null);

      try {
        const res = await api.get<SectorBySlugResponse>(`/homepage/sectors/by-slug/${slug}`);
        setSector(res.sector);

        // Track sector click for personalization
        trackSectorClick(res.sector.id, !!user);
      } catch (err) {
        if (err instanceof ApiError && err.statusCode === 404) {
          setSectorError('not_found');
        } else {
          setSectorError('error');
        }
      } finally {
        setSectorLoading(false);
      }
    }

    fetchSector();
  }, [slug, user]);

  // Fetch cities for filter
  useEffect(() => {
    async function fetchCities() {
      try {
        const res = await api.get<HomepageCitiesResponse>('/homepage/cities');
        setCities(res.cities);
      } catch {
        // Silently fail - cities filter just won't work
      }
    }
    fetchCities();
  }, []);

  // Fetch jobs for sector
  const fetchJobs = useCallback(
    async (reset: boolean = false) => {
      if (!sector) return;

      setJobsLoading(true);
      setJobsError(null);

      try {
        const params = new URLSearchParams();
        params.set('sectorId', sector.id);
        params.set('limit', ITEMS_PER_PAGE.toString());
        params.set('offset', reset ? '0' : offset.toString());

        if (workType) params.set('workType', workType);
        if (city) params.set('city', city);

        const recentSectors = getRecentSectorsParam();
        if (recentSectors) params.set('recentSectors', recentSectors);

        const seed = getFeedSeed();
        if (seed) params.set('seed', seed);

        const res = await api.get<HomepageFeedResponse>(`/homepage/feed?${params.toString()}`);

        if (reset) {
          setJobs(res.items);
          setOffset(res.items.length);
        } else {
          setJobs((prev) => [...prev, ...res.items]);
          setOffset((prev) => prev + res.items.length);
        }

        setHasMore(res.items.length === ITEMS_PER_PAGE);
      } catch (err) {
        if (err instanceof ApiError) {
          setJobsError(err.message);
        } else {
          setJobsError('Jobs konden niet geladen worden.');
        }
      } finally {
        setJobsLoading(false);
      }
    },
    [sector, workType, city, offset]
  );

  // Initial fetch when sector loads
  useEffect(() => {
    if (sector) {
      fetchJobs(true);
    }
  }, [sector]);

  // Refetch when filters change
  useEffect(() => {
    if (sector) {
      setOffset(0);
      fetchJobs(true);
    }
  }, [workType, city]);

  // Clear filters
  const handleClearFilters = () => {
    setWorkType('');
    setCity('');
  };

  // Load more
  const handleLoadMore = () => {
    fetchJobs(false);
  };

  // Get dynamic icon component
  const getIconComponent = (iconName: string) => {
    const IconComponent = (LucideIcons as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[iconName];
    return IconComponent || LucideIcons.Briefcase;
  };

  // Loading state
  if (sectorLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Skeleton className="h-6 w-32 mb-6" />
        <div className="flex items-center gap-4 mb-8">
          <Skeleton className="h-16 w-16 rounded-xl" />
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>
        <Skeleton className="h-12 w-full mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  // Not found state
  if (sectorError === 'not_found') {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-8">
          <Briefcase className="mx-auto mb-4 text-amber-600" size={48} />
          <h1 className="text-2xl font-bold mb-4">Deze sector bestaat niet</h1>
          <p className="text-gray-600 mb-6">
            De sector die je zoekt is niet gevonden. Bekijk alle{' '}
            <Link href="/" className="text-primary hover:underline">
              matches per specialisme
            </Link>{' '}
            op de homepage.
          </p>
          <Link href="/">
            <Button>Naar homepage</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Error state
  if (sectorError === 'error') {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8">
          <h1 className="text-2xl font-bold mb-4 text-red-800">Er ging iets mis</h1>
          <p className="text-gray-600 mb-6">
            De sector kon niet geladen worden. Probeer het later opnieuw.
          </p>
          <Link href="/">
            <Button variant="outline">Naar homepage</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!sector) return null;

  const IconComponent = getIconComponent(sector.icon);
  const hasActiveFilters = workType || city;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Naar homepage</span>
        </Link>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center text-white"
              style={{ backgroundColor: sector.color }}
            >
              <IconComponent size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{sector.name}</h1>
              <p className="text-gray-600 flex items-center gap-2 mt-1">
                <Briefcase size={16} />
                <span>{sector.activeJobsCount} openstaande vacatures</span>
                {sector.matchedJobsCount !== null && sector.matchedJobsCount > 0 && (
                  <span className="text-green-600 font-medium">
                    ({sector.matchedJobsCount} matches voor jou)
                  </span>
                )}
              </p>
            </div>
          </div>
        </header>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-gray-500">
              <Filter size={18} />
              <span className="text-sm font-medium">Filters:</span>
            </div>

            {/* Work type filter */}
            <Select value={workType} onValueChange={setWorkType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Alle contracten" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Alle contracten</SelectItem>
                {WORK_TYPES.map((wt) => (
                  <SelectItem key={wt.value} value={wt.value}>
                    {wt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* City filter */}
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Alle steden" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Alle steden</SelectItem>
                {cities.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Clear filters */}
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                Filters wissen
              </Button>
            )}
          </div>
        </div>

        {/* Error banner */}
        {jobsError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{jobsError}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => fetchJobs(true)}
            >
              Opnieuw proberen
            </Button>
          </div>
        )}

        {/* Jobs grid */}
        {jobsLoading && jobs.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-xl" />
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm">
            <MapPin className="mx-auto mb-4 text-gray-400" size={48} />
            <h2 className="text-xl font-semibold mb-2">Geen vacatures gevonden</h2>
            <p className="text-gray-600 mb-6">
              Er zijn geen openstaande vacatures voor deze filter in {sector.name}.
            </p>
            {hasActiveFilters && (
              <Button onClick={handleClearFilters}>Filters wissen</Button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <JobFeedCard key={job.id} item={job} />
              ))}
            </div>

            {/* Load more / pagination info */}
            <div className="mt-8 text-center">
              {hasMore ? (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleLoadMore}
                  disabled={jobsLoading}
                >
                  {jobsLoading ? 'Laden...' : 'Meer vacatures laden'}
                </Button>
              ) : (
                <p className="text-gray-500">
                  Toont alle {jobs.length} vacatures in {sector.name}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
