import Banner from "../components/home/banner/Banner";
import MatchingProcess from "../components/home/matching-process/MatchingProcess";
import ForWho from "../components/home/for-who/ForWho";
import Testimonial from "../components/common/testimonial/Testimonial";
import SignupCta from "../components/signup-cta/SignupCta";
import Footer from "../components/common/footer/Footer";

export default function Home() {
  return (
    <main>
      <Banner />
      <MatchingProcess />
      <ForWho />
      <Testimonial />
      <SignupCta />
      <Footer />
    </main>
  );
}
