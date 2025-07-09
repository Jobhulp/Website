import React from "react";
import client11 from '@/assets/img/client11.png';

const JobDetailsCompanyInfo: React.FC = () => (
  <section className="medium-padding40">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 mb-4 mb-lg-0">
          <a href="#" className="logo-company w-100 h-100">
            <img className="logo" src={client11.src} title="company" alt="company" />
          </a>
        </div>
        <div className="col-lg-5 col-md-6 col-sm-12 col-xs-12 mb-4 mb-lg-0">
          <h2 className="mt-0">Envato Pty Ltd.</h2>
          <p className="no-margin">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborpum.</p>
        </div>
        <div className="col-lg-2 col-md-6 col-sm-12 col-xs-12 mb-4 mb-lg-0">
          <a href="https://jobbhulp.be/jobs/company-profile" className="crumina-button button--dark button--l button--bordered">Bedrijfsprofiel</a>
        </div>
        <div className="col-lg-2 col-md-6 col-sm-12 col-xs-12 mb-0 mb-lg-0">
          <a href="#" className="crumina-button button--primary button--l button--with-icon button--icon-left"><i className="puzzle-icon far fa-envelope"></i>Message</a>
        </div>
      </div>
    </div>
  </section>
);

export default JobDetailsCompanyInfo;