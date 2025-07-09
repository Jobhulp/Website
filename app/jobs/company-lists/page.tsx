import React from 'react';
import CompanyAlphabetList from '../../../components/employers/company-lists/CompanyAlphabetList';
import CompanyListsHeader from '../../../components/employers/company-lists/CompanyListsHeader';
import SignupCta from '../../../components/signup-cta/SignupCta';
import Footer from '../../../components/common/footer/Footer';
import RelatedCompaniesSlider from '../../../components/employers/company-profile/RelatedCompaniesSlider';

const CompanyListsPage = () => {
  return (
    <main>
      <CompanyListsHeader />
      <CompanyAlphabetList />
      <RelatedCompaniesSlider />
      <SignupCta />
      <Footer />
    </main>
  );
};

export default CompanyListsPage;