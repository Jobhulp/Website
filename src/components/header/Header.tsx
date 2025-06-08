"use client";

import "./style.css";
import LanguageSwitcher from "./LanguageSwitcher";
import Link from "next/link";
import logo from '@/assets/img/svg/01_logo_white.svg';

const Header = () => {
  return (
    <header
      className="header header--absolute header--transparent"
      id="site-header"
    >
      <div className="container">
        <div className="header-content-wrapper">
          <Link href="/" className="site-logo">
            <img
              className="puzzle-icon"
              src={logo.src}
              alt="logo"
              width="120"
            />
          </Link>

          <nav id="primary-menu" className="primary-menu">
            <a
              href="javascript:void(0)"
              id="menu-icon-trigger"
              className="menu-icon-trigger showhide"
            >
              <span className="mob-menu--title">Menu</span>
              <span id="menu-icon-wrapper" className="menu-icon-wrapper">
                <svg width="1000px" height="1000px">
                  <path
                    id="pathD"
                    d="M 300 400 L 700 400 C 900 400 900 750 600 850 A 400 400 0 0 1 200 200 L 800 800"
                  ></path>
                  <path id="pathE" d="M 300 500 L 700 500"></path>
                  <path
                    id="pathF"
                    d="M 700 600 L 300 600 C 100 600 100 200 400 150 A 400 380 0 1 1 200 800 L 800 200"
                  ></path>
                </svg>
              </span>
            </a>

            <ul className="primary-menu-menu">
              <li>
                <Link href="/">Home</Link>
              </li>

              <li className="">
                <Link href="/how-it-works">How it Works</Link>
              </li>

              <li className="menu-item-has-children">
                <a href="#">
                  Employers
                  <span className="show indicator">
                    <i className="puzzle-icon far fa-angle-down"></i>
                  </span>
                </a>

                <ul className="sub-menu">
                  <li>
                    <Link href="/employers/job-lists">Job lists</Link>
                  </li>
                  <li>
                    <Link href="/employers/job-lists-grid">Job lists grid</Link>
                  </li>
                  <li>
                    <Link href="/employers/job-details">Job details</Link>
                  </li>
                  <li>
                    <Link href="/employers/company-profile">Company profile</Link>
                  </li>
                  <li>
                    <Link href="/employers/company-lists">Company lists</Link>
                  </li>
                </ul>
              </li>

              <li className="menu-item-has-children">
                <a href="#">
                  Candidates
                  <span className="show indicator">
                    <i className="puzzle-icon far fa-angle-down"></i>
                  </span>
                </a>
                <ul className="sub-menu">
                  <li>
                    <Link href="/candidates/candidate-lists">Candidate lists</Link>
                  </li>
                  <li>
                    <Link href="/candidates/candidate-lists-grid">Candidate lists grid</Link>
                  </li>
                  <li>
                    <Link href="/candidates/candidate-details">Candidate details</Link>
                  </li>
                  <li>
                    <Link href="/candidates/submit-resume">Submit resume</Link>
                  </li>
                  <li>
                    <Link href="/candidates/resume-preview">Resume preview</Link>
                  </li>
                  <li>
                    <Link href="/candidates/resume-added">Resume added</Link>
                  </li>
                </ul>
              </li>

              <li className="menu-item-has-children">
                <a href="#">
                  News
                  <span className="show indicator">
                    <i className="puzzle-icon far fa-angle-down"></i>
                  </span>
                </a>
                <ul className="sub-menu">
                  <li>
                    <Link href="/news/news-page">News page</Link>
                  </li>
                  <li>
                    <Link href="/news/standard-news-with-sidebar">Standard news with sidebar</Link>
                  </li>
                  <li>
                    <Link href="/news/news-details-standard">News details standard</Link>
                  </li>
                  <li>
                    <Link href="/news/news-details-gallery">News details gallery</Link>
                  </li>
                  <li>
                    <Link href="/news/news-details-video">News details with video</Link>
                  </li>
                </ul>
              </li>

              <li className="menu-item-has-mega-menu menu-item-has-children">
                <a href="#">
                  Pages
                  <span className="show indicator">
                    <i className="puzzle-icon far fa-angle-down"></i>
                  </span>
                </a>
                <div className="megamenu">
                  <div className="megamenu-row">
                    <div className="col3">
                      <ul>
                        <li className="megamenu-item-info">
                          <h6 className="megamenu-item-info-title">Pages</h6>
                        </li>
                        <li>
                          <Link href="/pages/pricing-plans">
                            <i className="puzzle-icon fas fa-caret-right"></i>
                            Pricing plans
                          </Link>
                        </li>
                        <li>
                          <Link href="/pages/contacts">
                            <i className="puzzle-icon fas fa-caret-right"></i>
                            Contacts
                          </Link>
                        </li>
                        <li>
                          <Link href="/pages/send-message">
                            <i className="puzzle-icon fas fa-caret-right"></i>
                            Send message
                          </Link>
                        </li>
                        <li>
                          <Link href="/pages/coming-soon">
                            <i className="puzzle-icon fas fa-caret-right"></i>
                            Coming Soon Page
                          </Link>
                        </li>
                        <li>
                          <Link href="/pages/error-404">
                            <i className="puzzle-icon fas fa-caret-right"></i>
                            Error 404
                          </Link>
                        </li>
                        <li>
                          <Link href="/pages/sign-up">
                            <i className="puzzle-icon fas fa-caret-right"></i>
                            Sign Up
                          </Link>
                        </li>
                        <li>
                          <Link href="/pages/login">
                            <i className="puzzle-icon fas fa-caret-right"></i>
                            Login
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div className="col3">
                      <ul>
                        <li className="megamenu-item-info">
                          <h6 className="megamenu-item-info-title">
                            Classic Styles
                          </h6>
                        </li>
                        <li>
                          <Link href="/pages/accordions">
                            <i className="puzzle-icon fas fa-caret-right"></i>
                            Accordions
                          </Link>
                        </li>
                        <li>
                          <Link href="/pages/button-styles">
                            <i className="puzzle-icon fas fa-caret-right"></i>
                            Button Styles
                          </Link>
                        </li>
                        <li>
                          <Link href="/pages/forms">
                            <i className="puzzle-icon fas fa-caret-right"></i>
                            Forms
                          </Link>
                        </li>
                        <li>
                          <Link href="/pages/icon-with-text">
                            <i className="puzzle-icon fas fa-caret-right"></i>
                            Icon with Text
                          </Link>
                        </li>
                        <li>
                          <Link href="/pages/link-styles">
                            <i className="puzzle-icon fas fa-caret-right"></i>
                            Link Styles
                          </Link>
                        </li>
                        <li>
                          <Link href="/pages/tab-styles">
                            <i className="puzzle-icon fas fa-caret-right"></i>
                            Tab Styles
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div className="col3">
                      <ul>
                        <li className="megamenu-item-info">
                          <h6 className="megamenu-item-info-title">
                            Typography
                          </h6>
                        </li>
                        <li>
                          <Link href="/pages/heading-styles">
                            <i className="puzzle-icon fas fa-caret-right"></i>
                            Heading Styles
                          </Link>
                        </li>
                        <li>
                          <Link href="/pages/highlights">
                            <i className="puzzle-icon fas fa-caret-right"></i>
                            Highlights
                          </Link>
                        </li>
                        <li>
                          <Link href="/pages/blockquotes">
                            <i className="puzzle-icon fas fa-caret-right"></i>
                            Blockquotes
                          </Link>
                        </li>
                        <li>
                          <Link href="/pages/columns">
                            <i className="puzzle-icon fas fa-caret-right"></i>
                            Columns
                          </Link>
                        </li>
                        <li>
                          <Link href="/pages/lists">
                            <i className="puzzle-icon fas fa-caret-right"></i>
                            Lists
                          </Link>
                        </li>
                        <li>
                          <Link href="/pages/icons">
                            <i className="puzzle-icon fas fa-caret-right"></i>
                            Icons
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </nav>

          <nav className="login-menu">
            <ul>
              <li>
                <Link href="/signup">Sign Up</Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="crumina-button button--primary button--s button--hover-primary"
                >
                  Login
                </Link>
              </li>
            </ul>
          </nav>

          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
