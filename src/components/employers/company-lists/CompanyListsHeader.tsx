import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import companyListsSvg from '@/assets/img/svg/05_companies.svg';

const CompanyListsHeader = () => (
  <section className="stunning-header bg-dark-themes pt200">
    <div className="container">
      <div className="row">
        <div className="col-lg-5 col-md-6 col-sm-12 col-xs-12 mb-5 mb-md-0">
          <ul className="breadcrumbs">
            <li className="breadcrumbs-item">
              <Link href="/">Home<i className="puzzle-icon fal fa-angle-double-right"></i></Link>
            </li>
            <li className="breadcrumbs-item">
              <Link href="/candidates/candidate-lists-grid">Candidates<i className="puzzle-icon fal fa-angle-double-right"></i></Link>
            </li>
            <li className="breadcrumbs-item active">
              <span>Company Lists</span>
            </li>
          </ul>

          <h1 className="page-title text-white">Find your dream company</h1>

          <p className="text-white fs-20 my-3 my-sm-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
          </p>

          <Link href="/employers/job-lists" className="crumina-button button--yellow button--xl button--hover-primary">
            Get Started Now
          </Link>
        </div>

        <div className="col-lg-7 col-md-6 col-sm-12 col-xs-12 mt-auto">
          <Image
            src={companyListsSvg}
            alt="company"
            width={600}
            height={400}
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  </section>
);

export default CompanyListsHeader;