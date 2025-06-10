import React from "react";
import Link from "next/link";

const ResumeAdded = () => {
  return (
    <div className="main-content-wrapper">
      <div className="header--spacer" style={{ height: "142.234px", backgroundColor: "rgb(18, 18, 20)" }}></div>
      <section className="stunning-header pb120 pt80 bg-dark-themes">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <ul className="breadcrumbs">
                <li className="breadcrumbs-item">
                  <Link href="/">
                    Home
                    <i className="puzzle-icon fal fa-angle-double-right"></i>
                  </Link>
                </li>
                <li className="breadcrumbs-item">
                  <Link href="/candidates/candidate-lists">
                    Kandidaten
                    <i className="puzzle-icon fal fa-angle-double-right"></i>
                  </Link>
                </li>
                <li className="breadcrumbs-item">
                  <Link href="/candidates/submit-resume">
                    Account<i className="puzzle-icon fal fa-angle-double-right"></i>
                  </Link>
                </li>
                <li className="breadcrumbs-item active">
                  <span>Betty Stevens</span>
                </li>
              </ul>

              <h1 className="page-title text-white mb60">CV Indienen</h1>
            </div>
          </div>
        </div>
      </section>


      <section className="pt120 bg-light-grey">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="resume-added">
                <div className="resume-added-content">
                  <div className="row">
                    <div className="col-lg-5 col-md-6 col-sm-12 col-xs-12 mb-4 mb-md-0">
                      <h2 className="no-margin">Congratulations!</h2>
                    </div>
                    <div className="col-lg-7 col-md-6 col-sm-12 col-xs-12">
                      <p className="fs-20">
                        Your resume has been added to Jobhulp. Thank you for
                        your submission.
                      </p>
                      <Link
                        href="/candidates/submit-resume"
                        className="crumina-button button--dark button--xl"
                      >
                        My Account
                      </Link>
                    </div>
                  </div>
                </div>
                <img
                  src="/img/svg/06_hand.svg"
                  alt="resume added"
                  width="161"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResumeAdded;
