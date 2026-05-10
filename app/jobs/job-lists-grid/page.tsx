'use client';

import React, { useState, useEffect, useCallback } from 'react';
import StunningHeader from '../../../components/employers/job-lists-grid/StunningHeader';
import JobSearchTabs from '../../../components/employers/job-lists/JobSearchTabs';
import JobListGrid from '../../../components/employers/job-lists-grid/JobListGrid';
import Testimonial from '../../../components/common/testimonial/Testimonial';
import SignupCta from '../../../components/signup-cta/SignupCta';
import Footer from '../../../components/common/footer/Footer';
import { api } from '@/lib/api-client';
import type { JobWithEmployer, WorkType, ExperienceLevel, RemotePreference } from '@/types/api';

interface JobFilters {
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

const JobListsGridPage: React.FC = () => {
  const [filters, setFilters] = useState<JobFilters>(initialFilters);
  const [jobs, setJobs] = useState<JobWithEmployer[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.keyword) params.append('search', filters.keyword);
      if (filters.sectorId) params.append('sectorId', filters.sectorId);
      if (filters.province) params.append('location', filters.province);
      if (filters.workTypes.length > 0) {
        filters.workTypes.forEach(wt => params.append('workType', wt));
      }
      if (filters.experienceLevel) params.append('experienceLevel', filters.experienceLevel);
      if (filters.remotePreference && filters.remotePreference !== 'all') {
        params.append('remotePreference', filters.remotePreference);
      }
      params.append('limit', '20');
      
      const response = await api.get<{ jobs: JobWithEmployer[]; total: number }>(`/jobs?${params.toString()}`);
      setJobs(response.jobs || []);
      setTotalCount(response.total || 0);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleFiltersChange = useCallback((newFilters: JobFilters) => {
    setFilters(newFilters);
  }, []);

  return (
    <main>
      <StunningHeader />
      <JobSearchTabs 
        filters={filters} 
        onFiltersChange={handleFiltersChange}
        totalCount={totalCount}
      />
      <JobListGrid jobs={jobs} loading={loading} />
      <Testimonial />
      <SignupCta />
      <Footer />
    </main>
  );
};

export default JobListsGridPage;
