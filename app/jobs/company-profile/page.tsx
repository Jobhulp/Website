import React from 'react';
import CompanyProfileHeader from '../../../components/employers/company-profile/CompanyProfileHeader';
import CompanyProfileJobsList from '../../../components/employers/company-profile/CompanyProfileJobsList';
import RelatedCompaniesSlider from '../../../components/employers/company-profile/RelatedCompaniesSlider';
import SignupCta from '../../../components/signup-cta/SignupCta';
import Footer from '../../../components/common/footer/Footer';

const CompanyProfilePage = () => {
  return (
    <main>
      <div className="header--spacer" style={{ height: "142.234px", backgroundColor: "rgb(18, 18, 20)" }}></div>
      <CompanyProfileHeader />
      <CompanyProfileJobsList />
      <RelatedCompaniesSlider />
      <SignupCta />
      <Footer />
    </main>
  );
};

export default CompanyProfilePage;