import PersonalityTest from '../../../components/tests/PersonalityTest';
import Footer from '../../../components/common/footer/Footer';

export const metadata = {
  title: 'Persoonlijkheidstest | Jobhulp',
  description: 'Ontdek je werkstijl en persoonlijkheidstype met de Jobhulp DISC-test. Verbeter je matches door jezelf beter te leren kennen.',
};

export default function PersonalityTestPage() {
  return (
    <main>
      <PersonalityTest />
      <Footer />
    </main>
  );
}
