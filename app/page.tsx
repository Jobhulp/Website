'use client';

import { useState, useCallback } from 'react';
import Banner from '../components/home/banner/Banner';
import { JobFilters } from '../components/home/jobs-filters/JobFilters';
import Jobs from '../components/home/jobs/Jobs';
import Categories from '../components/home/categories/Categories';
import Testimonial from '../components/common/testimonial/Testimonial';
import SignupCta from '../components/signup-cta/SignupCta';
import Footer from '../components/common/footer/Footer';
import type { WorkType } from '@/types/api';

interface Filters {
  workTypes: WorkType[];
  city: string;
  keywords: string;
}

export default function Home() {
  const [filters, setFilters] = useState<Filters>({
    workTypes: [],
    city: '',
    keywords: '',
  });

  const handleFiltersChange = useCallback((newFilters: Filters) => {
    setFilters(newFilters);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({
      workTypes: [],
      city: '',
      keywords: '',
    });
  }, []);

  return (
    <main>
      <Banner />
      <JobFilters onFiltersChange={handleFiltersChange} />
      <Jobs 
        workTypes={filters.workTypes.length > 0 ? filters.workTypes : undefined}
        city={filters.city || undefined}
        onClearFilters={handleClearFilters}
      />
      <Categories />
      <Testimonial />
      <SignupCta />
      <Footer />
    </main>
  );
}
