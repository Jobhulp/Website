import React from "react";
import Link from "next/link";
import freelancerSvg from '@/assets/img/svg/04_employer.svg';

const StunningHeader: React.FC = () => (
  <section className="stunning-header bg-dark-themes pt200 pb200">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-5 mb-md-0">
          <ul className="breadcrumbs">
            <li className="breadcrumbs-item">
              <Link href="/">Home<i className="puzzle-icon fal fa-angle-double-right"></i></Link>
            </li>
            <li className="breadcrumbs-item">
              <Link href="/candidates/lists-grid">Candidates<i className="puzzle-icon fal fa-angle-double-right"></i></Link>
            </li>
            <li className="breadcrumbs-item active">
              <span>Find a Job</span>
            </li>
          </ul>
          <h1 className="page-title text-white">We have 6.368 professional candidates!</h1>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <img src={freelancerSvg.src} alt="company" />
        </div>
      </div>
    </div>
  </section>
);

export default StunningHeader;