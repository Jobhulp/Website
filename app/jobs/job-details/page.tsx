import React from "react";
import JobDetailsHeader from '../../../components/employers/job-details/JobDetailsHeader';
import JobDetailsCompanyInfo from '../../../components/employers/job-details/JobDetailsCompanyInfo';
import JobDetailsMain from '../../../components/employers/job-details/JobDetailsMain';
import JobDetailsSidebar from '../../../components/employers/job-details/JobDetailsSidebar';
import RelatedVacanciesSlider from '../../../components/employers/job-details/RelatedVacanciesSlider';
import SignupCta from "../../../components/signup-cta/SignupCta";
import Footer from "../../../components/common/footer/Footer";

const JobDetailsPage: React.FC = () => (
  <main className="main-content-wrapper">
    <JobDetailsHeader />
    <JobDetailsCompanyInfo />
    <section className="bg-light-grey medium-padding120">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
            <JobDetailsMain />
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 mt-4 mt-lg-0">
            <JobDetailsSidebar />
          </div>
        </div>
      </div>
    </section>
    <RelatedVacanciesSlider />
      <SignupCta />
      <Footer />
  </main>
);

export default JobDetailsPage;