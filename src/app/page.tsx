import Banner from "@/components/banner/Banner";
import { JobFilters } from "@/components/jobs-filters/JobFilters";
import Categories from "@/components/categories/Categories";
import Jobs from "@/components/jobs/Jobs";
import Download from "@/components/download/Download";
import Testimonial from "@/components/testimonial/Testimonial";
import HomeBlog from "@/components/home-blog/HomeBlog";
import Footer from "@/components/footer/Footer";
import SignupCta from "@/components/signup-cta/SignupCta";

export default function Home() {
  return (
    <main>
      <Banner />
      <JobFilters />
      <Categories />
      <Jobs />
      <Download />
      <Testimonial />
      <SignupCta />
      <HomeBlog />
      <Footer />
    </main>
  );
}
