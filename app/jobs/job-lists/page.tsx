'use client';

import { useState, useEffect, useCallback } from 'react';
import MapSection from '../../../components/employers/job-lists/MapSection';
import JobSearchTabs from '../../../components/employers/job-lists/JobSearchTabs';
import JobListResults from '../../../components/employers/job-lists/JobListResults';
import Testimonial from "../../../components/common/testimonial/Testimonial";
import SignupCta from '../../../components/signup-cta/SignupCta';
import Footer from '../../../components/common/footer/Footer';
import { api } from '@/lib/api-client';
import type { JobWithEmployer, WorkType, ExperienceLevel, RemotePreference } from '@/types/api';

export interface JobFilters {
  keyword: string;
  sectorId: string;
  province: string;
  workTypes: WorkType[];
  experienceLevel: ExperienceLevel | '';
  remotePreference: RemotePreference | 'all';
  salaryRange: string;
}

const initialFilters: JobFilters = {
  keyword: '',
  sectorId: '',
  province: '',
  workTypes: [],
  experienceLevel: '',
  remotePreference: 'all',
  salaryRange: '',
};

export default function JobLists() {
  const [filters, setFilters] = useState<JobFilters>(initialFilters);
  const [jobs, setJobs] = useState<JobWithEmployer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  // Fetch jobs when filters or page changes
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Build query params from filters
      const params = new URLSearchParams();
      
      if (filters.keyword) {
        params.append('search', filters.keyword);
      }
      if (filters.sectorId) {
        params.append('sectorId', filters.sectorId);
      }
      if (filters.province) {
        params.append('location', filters.province);
      }
      if (filters.workTypes.length > 0) {
        filters.workTypes.forEach(wt => params.append('workType', wt));
      }
      if (filters.experienceLevel) {
        params.append('experienceLevel', filters.experienceLevel);
      }
      if (filters.remotePreference && filters.remotePreference !== 'all') {
        params.append('remotePreference', filters.remotePreference);
      }
      if (filters.salaryRange) {
        const [min, max] = filters.salaryRange.split('-');
        if (min) params.append('salaryMin', min.replace('+', ''));
        if (max) params.append('salaryMax', max);
      }
      
      params.append('page', currentPage.toString());
      params.append('limit', pageSize.toString());
      
      const response = await api.get<{ jobs: JobWithEmployer[]; total: number; page: number; totalPages: number }>(
        `/jobs?${params.toString()}`
      );
      
      setJobs(response.jobs || []);
      setTotalCount(response.total || 0);
      setTotalPages(response.totalPages || 1);
    } catch (err) {
      console.error('[v0] Error fetching jobs:', err);
      setError('Er ging iets mis bij het ophalen van de vacatures.');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, [filters, currentPage]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Reset to page 1 when filters change
  const handleFiltersChange = useCallback((newFilters: JobFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    // Scroll to results
    document.getElementById('job-results')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <main>
      <MapSection />
      <JobSearchTabs 
        filters={filters} 
        onFiltersChange={handleFiltersChange}
        totalCount={totalCount}
      />
      <JobListResults 
        jobs={jobs}
        loading={loading}
        error={error}
        totalCount={totalCount}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <Testimonial />
      <SignupCta />
      <Footer />
    </main>
  );
}
