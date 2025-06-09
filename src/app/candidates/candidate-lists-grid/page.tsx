import SignupCta from "@/components/signup-cta/SignupCta";
import Footer from "@/components/common/footer/Footer";
import StunningHeader from "@/components/employers/job-lists-grid/StunningHeader";
import Testimonial from "@/components/candidates/candidate-lists/Testimonials";
import CandidateSearch from "@/components/candidates/candidate-lists/CandidateSearch";
import CandidateListGrid from "@/components/candidates/candidate-lists-grid/CandidateListGrid";
import Download from "@/components/common/download/Download";

export default function CandidateListsGrid() {
  return (
    <main>
      <StunningHeader />
      <CandidateSearch />
      <CandidateListGrid />
      <Download />
      <Testimonial />
      <SignupCta />
      <Footer />
    </main>
  );
}
