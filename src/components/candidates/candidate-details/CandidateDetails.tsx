import React from "react";
import Link from "next/link";
import Recommendations from "./Recommendations";
import RelatedCandidates from "./RelatedCandidates";

const CandidateDetails = () => {
  return (
    <div className="main-content-wrapper">
      <div
        className="header--spacer"
        style={{ height: "142.234px", backgroundColor: "rgb(18, 18, 20)" }}
      ></div>

      <section className="stunning-header stunning-bg2 medium-padding120 bg-light-grey">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
              <ul className="breadcrumbs">
                <li className="breadcrumbs-item">
                  <Link href="/">
                    Home
                    <i className="puzzle-icon fal fa-angle-double-right"></i>
                  </Link>
                </li>
                <li className="breadcrumbs-item">
                  <Link href="/employers">
                    Employers
                    <i className="puzzle-icon fal fa-angle-double-right"></i>
                  </Link>
                </li>
                <li className="breadcrumbs-item active">
                  <span>Candidates</span>
                </li>
              </ul>

              <h1 className="page-title text-white mb60">Betty Stevens</h1>

              <div className="ui-card ui-card--column mb-0">
                <div className="ui-card-content">
                  <h3 className="mb-3">About me</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                  </p>
                  <p>
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laboprum.
                  </p>

                  <h4 className="mb-3">Personal Characteristics:</h4>
                  <p>
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                    irure dolor in reprehenderit in voluptate velit esse cillum
                    dolore eu fugiat nulla pariatur.
                  </p>
                  <ul>
                    <li>
                      <a href="#">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod.
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Veniam, quis nostrud exercitation ullamco laboris nisi.
                      </a>
                    </li>
                    <li>
                      <a href="#">Ut enim ad minim veniam, quis nostrud.</a>
                    </li>
                    <li>
                      <a href="#">
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit esse.
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Excepteur sint occaecat cupidatat non proident.
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Sunt in culpa qui officia deserunt mollit anim id est
                        laborum.
                      </a>
                    </li>
                  </ul>

                  <h4 className="mb-3">Education:</h4>
                  <p>
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                    irure dolor in reprehenderit in voluptate velit esse cillum
                    dolore eu fugiat nulla pariatur.
                  </p>
                  <ul className="crumina-module crumina-list--with-border">
                    <li>
                      <h5>School of Arts & Sciences at Stanford University</h5>
                      <div className="c-grey my-3">
                        MBA from Harvard Business School (2004-2012)
                      </div>
                      <p>
                        Veniam, quis nostrud exercitation ullamco laboris nisi
                        ut aliquip ex ea commodo consequat. Duis aute irure
                        dolor in reprehenderit in voluptate velit esse cillum
                        dolore eu fugiat nulla pariatur.
                      </p>
                    </li>
                    <li>
                      <h5>School of Design at University of Pennsylvania</h5>
                      <div className="c-grey my-3">BBA (2006-2014)</div>
                      <p>
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur
                        exercitation ullamco laboris nisi.
                      </p>
                    </li>
                    <li>
                      <h5>Massachusetts Institute of Technology</h5>
                      <div className="c-grey my-3">
                        Section UX & UI design (2008-2010)
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                    </li>
                  </ul>

                  <h4 className="mb-3">Experience:</h4>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea.
                  </p>

                  <ul className="crumina-module crumina-list--with-border">
                    <li>
                      <h5>UI/UX Designer</h5>
                      <div className="c-grey my-3">Google (2012 - 2014)</div>
                      <p>
                        Veniam, quis nostrud exercitation ullamco laboris nisi
                        ut aliquip ex ea commodo consequat. Duis aute irure
                        dolor in reprehenderit in voluptate velit esse cillum
                        dolore eu fugiat nulla pariatur.
                      </p>
                    </li>
                    <li>
                      <h5>Web Designer</h5>
                      <div className="c-grey my-3">Facebook (2014-2017)</div>
                      <p>
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur
                        exercitation ullamco laboris nisi.
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="ui-card-footer">
                  <div className="d-flex align-items-center w-100">
                    <h5 className="mr-4">Share:</h5>
                    <ul className="socials socials--round socials--colored">
                      <li>
                        <a className="bg-facebook" href="#">
                          <i className="puzzle-icon fab fa-facebook-f"></i>
                        </a>
                      </li>
                      <li>
                        <a className="bg-messanger" href="#">
                          <i className="puzzle-icon fab fa-facebook-messenger"></i>
                        </a>
                      </li>
                      <li>
                        <a className="bg-twitter" href="#">
                          <i className="puzzle-icon fab fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a className="bg-google" href="#">
                          <i className="puzzle-icon fab fa-google-plus-g"></i>
                        </a>
                      </li>
                      <li>
                        <a className="bg-telegram" href="#">
                          <i className="puzzle-icon fab fa-telegram-plane"></i>
                        </a>
                      </li>
                      <li>
                        <a className="bg-linkedin" href="#">
                          <i className="puzzle-icon fab fa-linkedin-in"></i>
                        </a>
                      </li>
                      <li>
                        <a className="bg-email" href="#">
                          <i className="puzzle-icon far fa-at"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 pt120">
              <aside aria-label="sidebar" className="sidebar sidebar-right">
                <div className="widget w-company widget-sidebar">
                  <div className="avatar avatar--280">
                    <img src="/img/author10.jpg" alt="avatar" />
                  </div>

                  <ul className="summary-items">
                    <li className="summary-item">
                      <span className="summary-type">Profession:</span>
                      <span className="summary-value">
                        <a href="#">Web Designer</a>
                      </span>
                    </li>
                    <li className="summary-item">
                      <span className="summary-type">Location:</span>
                      <span className="summary-value">
                        <a href="#">Melbourne, Australia</a>
                      </span>
                    </li>
                    <li className="summary-item">
                      <span className="summary-type">Salary:</span>
                      <span className="summary-value">
                        <a href="#">$45 / Hour</a>
                      </span>
                    </li>
                    <li className="summary-item">
                      <span className="summary-type">Website:</span>
                      <span className="summary-value">
                        <a href="#">bettystevens.com</a>
                      </span>
                    </li>
                    <li className="summary-item">
                      <span className="summary-type">Skills:</span>
                      <span className="summary-value">
                        <a href="#">Web</a>,<a href="#">Web Design</a>,
                        <a href="#">User Interface</a>,<a href="#">UX</a>
                      </span>
                    </li>
                  </ul>

                  <a
                    href="#"
                    className="crumina-button button--primary button--xl button--with-icon button--icon-left mb-3 w-100"
                  >
                    <i className="puzzle-icon far fa-envelope"></i>Send a
                    Message
                  </a>
                  <a
                    href="#"
                    className="crumina-button button--dark button--xl button--bordered mb-4 w-100"
                  >
                    Bookmark this Resume
                  </a>

                  <ul className="socials socials--icon-colored">
                    <li className="c-facebook">
                      <a href="#">
                        <i className="puzzle-icon fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li className="c-twitter">
                      <a href="#">
                        <i className="puzzle-icon fab fa-twitter"></i>
                      </a>
                    </li>
                    <li className="c-instagram">
                      <a href="#">
                        <i className="puzzle-icon fab fa-instagram"></i>
                      </a>
                    </li>
                    <li className="c-youtube">
                      <a href="#">
                        <i className="puzzle-icon fab fa-youtube"></i>
                      </a>
                    </li>
                    <li className="c-pinterest">
                      <a href="#">
                        <i className="puzzle-icon fab fa-pinterest-p"></i>
                      </a>
                    </li>
                  </ul>
                </div>

                <Recommendations />
              </aside>
            </div>
          </div>
        </div>
      </section>
      <RelatedCandidates />
    </div>
  );
};

export default CandidateDetails;
