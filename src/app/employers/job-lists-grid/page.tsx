import React from "react";
import StunningHeader from '@/components/employers/job-lists-grid/StunningHeader';
import JobSearchTabs from '@/components/employers/job-lists/JobSearchTabs';
import JobListGrid from '@/components/employers/job-lists-grid/JobListGrid';
import Testimonial from "@/components/common/testimonial/Testimonial";
import SignupCta from '@/components/signup-cta/SignupCta';
import Footer from '@/components/common/footer/Footer';

const JobListsGridPage: React.FC = () => (
  <main >
    <StunningHeader />
    <JobSearchTabs />
    <JobListGrid />
      <Testimonial />
      <SignupCta />
      <Footer />
  </main>
);

export default JobListsGridPage;