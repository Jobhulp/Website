import Footer from "../../../components/common/footer/Footer";
import NewsDetailsStandard from "../../../components/news/news-details-standard/NewsDetailsStandard";
import SignupCta from "../../../components/signup-cta/SignupCta";

export default function NewsDetailsStandardPage() {
  return <main>
    <NewsDetailsStandard />
    <SignupCta />
    <Footer />
  </main>;
}