import CandidateMap from '@/components/candidates/candidate-lists/CandidateMap';
import CandidateSearch from '@/components/candidates/candidate-lists/CandidateSearch';
import CandidateListsSection from '@/components/candidates/candidate-lists/CandidateListsSection';
import Testimonials from '@/components/candidates/candidate-lists/Testimonials';
import SignupCta from '@/components/signup-cta/SignupCta';
import Footer from '@/components/common/footer/Footer';

export default function CandidatesPage() {
  return (
    <div className="main-content-wrapper">
      <CandidateMap />
      <CandidateSearch />
      <CandidateListsSection />
      <Testimonials />
      <SignupCta />
      <Footer />
    </div>
  );
}