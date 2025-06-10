import React from "react";
import Link from "next/link";

const JobDetailsHeader: React.FC = () => (
  <section className="stunning-header bg-dark-themes pt200 pb120">
    <div className="container">
      <div className="row align-items-end">
        <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 mb-5 mb-md-0">
          <ul className="breadcrumbs">
            <li className="breadcrumbs-item">
              <Link href="/">Home<i className="puzzle-icon fal fa-angle-double-right"></i></Link>
            </li>
            <li className="breadcrumbs-item">
              <Link href="/candidates/candidate-lists-grid">Candidates<i className="puzzle-icon fal fa-angle-double-right"></i></Link>
            </li>
            <li className="breadcrumbs-item">
              <Link href="/employers/job-lists-grid">Find a Job<i className="puzzle-icon fal fa-angle-double-right"></i></Link>
            </li>
            <li className="breadcrumbs-item active">
              <span>IT Contractor</span>
            </li>
          </ul>
          <h1 className="page-title text-white">Data Center Support Specialist Engineer</h1>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <h6 className="text-white mb-3">Share Job Posting:</h6>
          <ul className="socials socials--round socials--colored">
            <li><a className="bg-facebook" href="#"><i className="puzzle-icon fab fa-facebook-f"></i></a></li>
            <li><a className="bg-messanger" href="#"><i className="puzzle-icon fab fa-facebook-messenger"></i></a></li>
            <li><a className="bg-twitter" href="#"><i className="puzzle-icon fab fa-twitter"></i></a></li>
            <li><a className="bg-google" href="#"><i className="puzzle-icon fab fa-google-plus-g"></i></a></li>
            <li><a className="bg-telegram" href="#"><i className="puzzle-icon fab fa-telegram-plane"></i></a></li>
            <li><a className="bg-linkedin" href="#"><i className="puzzle-icon fab fa-linkedin-in"></i></a></li>
            <li><a className="bg-email" href="#"><i className="puzzle-icon far fa-at"></i></a></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default JobDetailsHeader;