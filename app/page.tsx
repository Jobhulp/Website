'use client';

import { useState, useCallback } from 'react';
import Banner from '../components/home/banner/Banner';
import { JobFilters } from '../components/home/jobs-filters/JobFilters';
import Jobs from '../components/home/jobs/Jobs';
import { SectorsGrid } from '../components/homepage/sectors-grid';
import { CandidatesSectorsGrid } from '../components/homepage/candidates-sectors-grid';
import Testimonial from '../components/common/testimonial/Testimonial';
import SignupCta from '../components/signup-cta/SignupCta';
import Footer from '../components/common/footer/Footer';
import { OrganizationSchema, WebSiteSchema, LocalBusinessSchema, FAQSchema } from '../components/seo/JsonLd';
import type { WorkType } from '@/types/api';

// FAQ items for SEO
const faqItems = [
  {
    question: 'Wat is Jobhulp?',
    answer: 'Jobhulp is een online platform dat kandidaten en werkgevers matcht op basis van vaardigheden, persoonlijkheid en voorkeuren. We gaan verder dan het traditionele CV en kijken naar wat iemand echt kan en wil.',
  },
  {
    question: 'Is Jobhulp gratis voor kandidaten?',
    answer: 'Ja, Jobhulp is volledig gratis voor kandidaten. Je kunt een profiel aanmaken, skills testen, en matches ontvangen zonder kosten.',
  },
  {
    question: 'Hoe werkt de matching?',
    answer: 'Onze matching is gebaseerd op drie pijlers: vaardigheden (skills die je hebt en kunt aantonen), persoonlijkheid (wie je bent en hoe je werkt), en voorkeuren (wat je zoekt in een job). Dit zorgt voor betere matches dan alleen op CV.',
  },
  {
    question: 'Wat zijn de voordelen voor werkgevers?',
    answer: 'Werkgevers ontvangen alleen kandidaten die echt passen bij de vacature. Geen stapels CVs meer, maar voorgeselecteerde matches op basis van bewezen vaardigheden en persoonlijkheid.',
  },
  {
    question: 'Hoe test ik mijn vaardigheden?',
    answer: 'Na registratie kun je online skills tests afleggen. Deze tests meten je werkelijke vaardigheidsniveau en verhogen je zichtbaarheid bij werkgevers.',
  },
];

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
  const [activeTab, setActiveTab] = useState<'jobs' | 'candidates'>('jobs');

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
      {/* SEO JSON-LD Schemas */}
      <OrganizationSchema />
      <WebSiteSchema />
      <LocalBusinessSchema />
      <FAQSchema items={faqItems} />
      
      <Banner />
      <JobFilters onFiltersChange={handleFiltersChange} />
      <Jobs 
        workTypes={filters.workTypes.length > 0 ? filters.workTypes : undefined}
        city={filters.city || undefined}
        onClearFilters={handleClearFilters}
        onTabChange={setActiveTab}
      />
      {/* Render both grids but hide inactive one to prevent re-fetch on tab switch */}
      <div style={{ display: activeTab === 'jobs' ? 'block' : 'none' }}>
        <SectorsGrid />
      </div>
      <div style={{ display: activeTab === 'candidates' ? 'block' : 'none' }}>
        <CandidatesSectorsGrid />
      </div>
      <Testimonial />
      <SignupCta />
      <Footer />
    </main>
  );
}
