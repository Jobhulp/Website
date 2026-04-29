import SkillsTest from '../../../components/tests/SkillsTest';
import Footer from '../../../components/common/footer/Footer';

export const metadata = {
  title: 'Vaardighedentest | Jobhulp',
  description: 'Test je vaardigheden in communicatie, probleemoplossend denken, samenwerking en meer. Ontdek je sterke punten en groeimogelijkheden.',
};

export default function SkillsTestPage() {
  return (
    <main>
      <SkillsTest />
      <Footer />
    </main>
  );
}
