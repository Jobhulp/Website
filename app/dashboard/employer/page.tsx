import EmployerDashboard from '../../../components/dashboard/employer/EmployerDashboard';
import Footer from '../../../components/common/footer/Footer';

export const metadata = {
  title: 'Mijn Dashboard - Werkgever | Jobhulp',
  description: 'Bekijk kandidaat matches, beheer je vacatures en ontdek welke kandidaten interesse hebben in jouw bedrijf.',
};

export default function EmployerDashboardPage() {
  return (
    <main>
      <EmployerDashboard />
      <Footer />
    </main>
  );
}
