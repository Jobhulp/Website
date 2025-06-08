import MapSection from '@/components/employers/job-lists/MapSection';
import JobSearchTabs from '@/components/employers/job-lists/JobSearchTabs';
import JobListResults from '@/components/employers/job-lists/JobListResults';
import Testimonial from "@/components/common/testimonial/Testimonial";
import SignupCta from '@/components/signup-cta/SignupCta';
import Footer from '@/components/common/footer/Footer';

export default function JobLists() {
  return (
    <main>
      <MapSection />
      <JobSearchTabs />
      <JobListResults />
      <Testimonial />
      <SignupCta />
      <Footer />
    </main>
  );
}