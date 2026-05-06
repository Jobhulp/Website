import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inloggen',
  description: 'Log in op je Jobhulp account om je matches te bekijken en je profiel te beheren.',
  openGraph: {
    title: 'Inloggen | Jobhulp',
    description: 'Bekijk je matches en beheer je profiel.',
  },
  alternates: {
    canonical: '/login',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
