import CandidateDashboard from '../../../components/dashboard/candidate/CandidateDashboard';
import Footer from '../../../components/common/footer/Footer';

export const metadata = {
  title: 'Mijn Dashboard - Kandidaat | Jobhulp',
  description: 'Bekijk je job matches, beheer je profiel en ontdek welke bedrijven interesse hebben in jou.',
};

export default function CandidateDashboardPage() {
  return (
    <main>
      <CandidateDashboard />
      <Footer />
    </main>
  );
}
