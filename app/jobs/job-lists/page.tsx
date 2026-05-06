import type { Metadata } from 'next';
import MapSection from '../../../components/employers/job-lists/MapSection';
import JobSearchTabs from '../../../components/employers/job-lists/JobSearchTabs';
import JobListResults from '../../../components/employers/job-lists/JobListResults';
import Testimonial from "../../../components/common/testimonial/Testimonial";
import SignupCta from '../../../components/signup-cta/SignupCta';
import Footer from '../../../components/common/footer/Footer';
import { BreadcrumbSchema, AggregateJobsSchema } from '../../../components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Vacatures in België - Vind je perfecte job',
  description: 'Bekijk actuele vacatures in België. Filter op locatie, sector en werktype. Match op basis van je vaardigheden en persoonlijkheid met Jobhulp.',
  openGraph: {
    title: 'Vacatures in België | Jobhulp',
    description: 'Ontdek vacatures die écht bij je passen. Filter en match op vaardigheden.',
  },
  alternates: {
    canonical: '/jobs/job-lists',
  },
};

export default function JobLists() {
  return (
    <main>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Vacatures', url: '/jobs/job-lists' },
        ]}
      />
      <AggregateJobsSchema jobCount={150} />
      <MapSection />
      <JobSearchTabs />
      <JobListResults />
      <Testimonial />
      <SignupCta />
      <Footer />
    </main>
  );
}
