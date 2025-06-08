import Banner from "@/components/home/banner/Banner";
import { JobFilters } from "@/components/home/jobs-filters/JobFilters";
import Categories from "@/components/home/categories/Categories";
import Jobs from "@/components/home/jobs/Jobs";
import Download from "@/components/common/download/Download";
import Testimonial from "@/components/common/testimonial/Testimonial";
import HomeBlog from "@/components/home/home-blog/HomeBlog";
import Footer from "@/components/common/footer/Footer";
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
