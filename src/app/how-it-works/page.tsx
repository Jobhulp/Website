import Footer from '@/components/common/footer/Footer';
import Jumbotron from '@/components/common/jumbotron/Jumbotron';
import Intro from '@/components/how-it-works/Intro';
import SignupCta from '@/components/signup-cta/SignupCta';
import Testimonial from '@/components/testimonial/Testimonial';
import React from 'react';
import JobSeeker from '@/components/how-it-works/JobSeeker';
import Employer from '@/components/how-it-works/Employer';
import FAQ from '@/components/how-it-works/FAQ';
import Download from '@/components/common/download/Download';

const HowItWorks = () => {
  return (
    <main>
      <Jumbotron
        title="Hoe Jobhulp voor u werkt"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'How it works', isActive: true }
        ]}
      >
        <Intro />
      </Jumbotron>
      <JobSeeker />
      <Employer />
      <Download/>
      <FAQ />
      <Testimonial />
      <SignupCta />
      <Footer />
    </main>
  );
};

export default HowItWorks;