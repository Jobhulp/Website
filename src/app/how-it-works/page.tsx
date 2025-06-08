import Footer from '@/components/footer/Footer';
import Jumbotron from '@/components/jumbotron/Jumbotron';
import Intro from '@/components/how-it-work/Intro';
import SignupCta from '@/components/signup-cta/SignupCta';
import Testimonial from '@/components/testimonial/Testimonial';
import React from 'react';
import JobSeeker from '@/components/how-it-work/JobSeeker';
import Employer from '@/components/how-it-work/Employer';
import FAQ from '@/components/how-it-work/FAQ';
import Download from '@/components/download/Download';

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