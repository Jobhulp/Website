import type { Metadata } from 'next';
import CandidateMap from '../../../components/candidates/candidate-lists/CandidateMap';
import CandidateSearch from '../../../components/candidates/candidate-lists/CandidateSearch';
import CandidateListsSection from '../../../components/candidates/candidate-lists/CandidateListsSection';
import Testimonials from '../../../components/candidates/candidate-lists/Testimonials';
import SignupCta from '../../../components/signup-cta/SignupCta';
import Footer from '../../../components/common/footer/Footer';
import { BreadcrumbSchema } from '../../../components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Kandidaten zoeken - Vind talent voor uw bedrijf',
  description: 'Bekijk beschikbare kandidaten in België. Geanonimiseerde profielen met vaardigheden en ervaring. Word werkgever om in contact te komen.',
  openGraph: {
    title: 'Kandidaten zoeken | Jobhulp voor werkgevers',
    description: 'Vind voorgeselecteerde kandidaten die passen bij uw vacatures.',
  },
  alternates: {
    canonical: '/candidates/candidate-lists',
  },
};

export default function CandidatesPage() {
  return (
    <div className="main-content-wrapper">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Kandidaten', url: '/candidates/candidate-lists' },
        ]}
      />
      <CandidateMap />
      <CandidateSearch />
      <CandidateListsSection />
      <Testimonials />
      <SignupCta />
      <Footer />
    </div>
  );
}
