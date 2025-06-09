import CandidateDetails from '@/components/candidates/candidate-details/CandidateDetails';
import Footer from '@/components/common/footer/Footer';
import SignupCta from '@/components/signup-cta/SignupCta';

export default function CandidateDetailsPage() {
  return (
    <main>
      <CandidateDetails />
      <SignupCta />
      <Footer />
    </main>
  );
}