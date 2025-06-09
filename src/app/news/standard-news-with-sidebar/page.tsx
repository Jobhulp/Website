import Footer from "@/components/common/footer/Footer";
import NewsStandardNewsWithSidebar from "@/components/news/standard-news-with-sidebar/NewsStandardNewsWithSidebar";
import SignupCta from "@/components/signup-cta/SignupCta";

export default function StandardNewsWithSidebar() {
  return <main>
    <NewsStandardNewsWithSidebar />
    <SignupCta />
    <Footer />
  </main>;
}