import React from "react";
import Link from "next/link";
import CompanyProfileSidebar from "./CompanyProfileSidebar";

const CompanyProfileHeader: React.FC = () => (
  <section className="stunning-header stunning-bg1 medium-padding120 bg-light-grey">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
          <ul className="breadcrumbs">
            <li className="breadcrumbs-item">
              <Link href="/">Home<i className="puzzle-icon fal fa-angle-double-right"></i></Link>
            </li>
            <li className="breadcrumbs-item">
              <Link href="/candidates/candidate-lists-grid">Candidates<i className="puzzle-icon fal fa-angle-double-right"></i></Link>
            </li>
            <li className="breadcrumbs-item active">
              <span>Companies</span>
            </li>
          </ul>
          <h1 className="page-title text-white mb60">Envato Pty Ltd.</h1>
          <div className="ui-card ui-card--column mb-0">
            <div className="ui-card-content">
              <h3 className="mb-3">About company</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              <h4 className="mb-3">Founded</h4>
              <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              <h4 className="mb-3">Short Story</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <h5 className="mb-3">The Envato Specialist</h5>
              <ul>
                <li><a href="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</a></li>
                <li><a href="#">Veniam, quis nostrud exercitation ullamco laboris nisi.</a></li>
                <li><a href="#">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</a></li>
                <li><a href="#">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</a></li>
                <li><a href="#">Excepteur sint occaecat cupidatat non proident.</a></li>
                <li><a href="#">Sunt in culpa qui officia deserunt mollit anim id est laborum.</a></li>
              </ul>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laboprum.</p>
            </div>
            <div className="ui-card-footer">
              <div className="d-flex align-items-center w-100">
                <h5 className="mr-4">Share:</h5>
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
        </div>

        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 pt120">
            <CompanyProfileSidebar />
        </div>
      </div>
    </div>
  </section>
);

export default CompanyProfileHeader;