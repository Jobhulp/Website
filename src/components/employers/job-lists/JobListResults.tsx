import React from "react";
import Image from "next/image";
import client2 from '@/assets/img/client2.png';
import iphone1 from '@/assets/img/iphone1.png';

const JobListResults: React.FC = () => (
  <section className="bg-light-grey pb120">
    <div className="container">
      <div className="row mb40">
        <div className="col-lg-8">
          <h3 className="mb40 mt-0">Search Result:</h3>
          {/* Job cards would be mapped here as a prop in a real app */}
          <div className="ui-card featured-vacancies mb-4">
            <div className="ui-card-content">
              <div className="vacancies-title-location">
                <a href="#" className="vacancies-title h6">Data Center Support Specialist Engineer</a>
                <div className="vacancies-location">
                  <time className="published">6 hours ago</time>
                  London, United Kingdom
                </div>
              </div>
              <a href="#" className="logo-company">
                <img className="logo" src={client2.src} alt="company" />
              </a>
            </div>
            <div className="ui-card-footer">
              <a href="#" className="link--uppercase-wide fs-12">IT Contractor</a>
              <button type="button" className="crumina-button button--blue-dark button--xxs button--uppercase-wide">Part Time</button>
            </div>
          </div>
          {/* Repeat for other job cards as needed */}
        </div>
        <div className="col-lg-4 mt-4 mt-lg-0">
          <aside aria-label="sidebar" className="sidebar sidebar-right">
            {/* Sidebar widgets would go here */}
            <div className="widget w-featured-vacancies widget-sidebar">
              <h3 className="widget-title">Featured</h3>
              {/* Featured jobs slider placeholder */}
            </div>
            <div className="widget w-banner widget-sidebar mt-4">
              <div className="banner-header">Advertising</div>
              <div className="banner-content">
                <h4 className="widget-title">Download free Puzzler App for your mobile</h4>
                <div className="icon-market-wrap flex gap-2">
                  <a href="#"><i className="puzzle-icon fab fa-apple" /></a>
                  <a href="#"><i className="puzzle-icon fab fa-google-play" /></a>
                </div>
                <img src={iphone1.src} alt="phone" />
              </div>
            </div>
          </aside>
        </div>
      </div>
      {/* Pagination */}
      <div className="row">
        <div className="col-lg-12">
          <nav className="navigation flex items-center justify-center gap-2">
            <a href="#" className="page-numbers btn-start"><i className="puzzle-icon fal fa-angle-double-left"></i></a>
            <a href="#" className="page-numbers btn--prev"><i className="puzzle-icon fal fa-angle-left"></i></a>
            <a href="#" className="page-numbers current"><span>1</span></a>
            <a href="#" className="page-numbers"><span>2</span></a>
            <a href="#" className="page-numbers"><span>3</span></a>
            <a href="#" className="page-numbers"><span>4</span></a>
            <a href="#" className="page-numbers"><span>5</span></a>
            <a href="#" className="page-numbers"><span>6</span></a>
            <a href="#" className="page-numbers btn--next"><i className="puzzle-icon fal fa-angle-right"></i></a>
            <a href="#" className="page-numbers btn-end"><i className="puzzle-icon fal fa-angle-double-right"></i></a>
            <span className="page-numbers all-pages">36 Pages</span>
          </nav>
        </div>
      </div>
    </div>
  </section>
);

export default JobListResults;