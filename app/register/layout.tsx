import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Registreren - Maak een gratis account',
  description: 'Registreer gratis bij Jobhulp als kandidaat of werkgever. Start met matchen op vaardigheden en persoonlijkheid.',
  openGraph: {
    title: 'Registreren bij Jobhulp',
    description: 'Maak een gratis account en start met slimme job matching.',
  },
  alternates: {
    canonical: '/register',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
