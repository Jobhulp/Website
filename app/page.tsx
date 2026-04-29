import Banner from "../components/home/banner/Banner";
import { JobFilters } from "../components/home/jobs-filters/JobFilters";
import Jobs from "../components/home/jobs/Jobs";
import Categories from "../components/home/categories/Categories";
import Testimonial from "../components/common/testimonial/Testimonial";
import SignupCta from "../components/signup-cta/SignupCta";
import Footer from "../components/common/footer/Footer";

export default function Home() {
  return (
    <main>
      <Banner />
      <JobFilters />
      <Jobs />
      <Categories />
      <Testimonial />
      <SignupCta />
      <Footer />
    </main>
  );
}
