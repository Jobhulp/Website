import type { Metadata } from 'next';
import Footer from '../../components/common/footer/Footer';
import Jumbotron from '../../components/common/jumbotron/Jumbotron';
import Intro from '../../components/how-it-works/Intro';
import SignupCta from '../../components/signup-cta/SignupCta';
import Testimonial from '../../components/common/testimonial/Testimonial';
import React from 'react';
import JobSeeker from '../../components/how-it-works/JobSeeker';
import Employer from '../../components/how-it-works/Employer';
import FAQ from '../../components/how-it-works/FAQ';
import Download from '../../components/common/download/Download';
import { HowToSchema, BreadcrumbSchema } from '../../components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Hoe Jobhulp werkt - Voor kandidaten en werkgevers',
  description: 'Ontdek hoe Jobhulp kandidaten en werkgevers matcht. Maak een profiel, test je skills, en ontvang matches die echt passen. Gratis voor kandidaten.',
  openGraph: {
    title: 'Hoe Jobhulp werkt - Stap voor stap uitleg',
    description: 'Leer hoe je als kandidaat of werkgever aan de slag gaat met Jobhulp. Van profiel tot match in enkele stappen.',
  },
  alternates: {
    canonical: '/how-it-works',
  },
};

const howToSteps = [
  { name: 'Maak een profiel', text: 'Registreer je gratis en vul je vaardigheden, voorkeuren en werkervaring in.' },
  { name: 'Test je skills', text: 'Leg optionele skills tests af om je vaardigheidsniveau te bewijzen aan werkgevers.' },
  { name: 'Ontvang matches', text: 'Ons algoritme matcht je automatisch met vacatures die bij je passen.' },
  { name: 'Kom in contact', text: 'Bij een wederzijdse match kun je direct in contact komen met de werkgever.' },
];

const HowItWorks = () => {
  return (
    <main>
      <HowToSchema
        name="Hoe Jobhulp werkt voor kandidaten"
        description="Stap-voor-stap uitleg hoe je als kandidaat matches vindt op Jobhulp"
        steps={howToSteps}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Hoe het werkt', url: '/how-it-works' },
        ]}
      />
      <Jumbotron
        title="Hoe Jobhulp werkt"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Hoe het werkt', isActive: true }
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
