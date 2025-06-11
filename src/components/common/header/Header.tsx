"use client";
import React, { useState } from 'react';
import "./style.css";
import LanguageSwitcher from "./LanguageSwitcher";
import Link from "next/link";
import logo from '@/assets/img/svg/01_logo_white.svg';
import { useMegaMenu } from './useMegaMenu';

const Header = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const {
    isMenuOpen,
    activeSubmenu,
    toggleMenu,
    handleSubmenuClick,
    handleMouseEnter,
    handleMouseLeave
  } = useMegaMenu();

  const handleLoginClick = () => {
    setShowLoginModal(true);
    setShowSignupModal(false);
  };

  const handleSignupClick = () => {
    setShowSignupModal(true);
    setShowLoginModal(false);
  };

  const handleCloseModals = () => {
    setShowLoginModal(false);
    setShowSignupModal(false);
  };

  const handleSwitchToLogin = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  const handleLinkClick = () => {
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  return (
    <>
      <header
        className="header header--sticky header--dark"
        id="site-header"
      >
        <div className="container">
          <div className="header-content-wrapper">
            <Link href="/" className="site-logo" onClick={handleLinkClick}>
              <img
                className="puzzle-icon"
                src={logo.src}
                alt="logo"
                width="120"
              />
            </Link>

            <nav id="primary-menu" className={`primary-menu primary-menu-responsive ${isMenuOpen ? 'mobile-menu-open' : ''}`}>
              <a
                id="menu-icon-trigger"
                className="menu-icon-trigger showhide"
                onClick={toggleMenu}
              >
                <span className="mob-menu--title">Menu</span>
                <span id="menu-icon-wrapper" className="menu-icon-wrapper">
                  <i className="puzzle-icon fas fa-bars fa-lg"></i>
                </span>
              </a>

              <ul className="primary-menu-menu">
                <li>
                  <Link href="/" onClick={handleLinkClick}>Home</Link>
                </li>

                <li className="">
                  <Link href="/how-it-works" onClick={handleLinkClick}>How it Works</Link>
                </li>

                <li
                  className={`menu-item-has-children ${activeSubmenu === 'jobs' ? 'active' : ''}`}
                  onMouseEnter={() => handleMouseEnter('jobs')}
                  onMouseLeave={handleMouseLeave}
                >
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    handleSubmenuClick('jobs');
                  }}>
                    Jobs
                    <span className="show indicator">
                      <i className="puzzle-icon far fa-angle-down"></i>
                    </span>
                  </a>

                  <ul className="sub-menu" style={{ display: activeSubmenu === 'jobs' ? 'block' : 'none' }}>
                    <li>
                      <Link href="/jobs/job-lists" onClick={handleLinkClick}>Job lists</Link>
                    </li>
                    <li>
                      <Link href="/jobs/job-lists-grid" onClick={handleLinkClick}>Job lists grid</Link>
                    </li>
                    <li>
                      <Link href="/jobs/job-details" onClick={handleLinkClick}>Job details</Link>
                    </li>
                    <li>
                      <Link href="/jobs/company-profile" onClick={handleLinkClick}>Company profile</Link>
                    </li>
                    <li>
                      <Link href="/jobs/company-lists" onClick={handleLinkClick}>Company lists</Link>
                    </li>
                  </ul>
                </li>

                <li
                  className={`menu-item-has-children ${activeSubmenu === 'candidates' ? 'active' : ''}`}
                  onMouseEnter={() => handleMouseEnter('candidates')}
                  onMouseLeave={handleMouseLeave}
                >
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    handleSubmenuClick('candidates');
                  }}>
                    Candidates
                    <span className="show indicator">
                      <i className="puzzle-icon far fa-angle-down"></i>
                    </span>
                  </a>
                  <ul className="sub-menu" style={{ display: activeSubmenu === 'candidates' ? 'block' : 'none' }}>
                    <li>
                      <Link href="/candidates/candidate-lists" onClick={handleLinkClick}>Candidate lists</Link>
                    </li>
                    <li>
                      <Link href="/candidates/candidate-lists-grid" onClick={handleLinkClick}>Candidate lists grid</Link>
                    </li>
                    <li>
                      <Link href="/candidates/candidate-details" onClick={handleLinkClick}>Candidate details</Link>
                    </li>
                    <li>
                      <Link href="/candidates/submit-resume" onClick={handleLinkClick}>Submit resume</Link>
                    </li>
                    <li>
                      <Link href="/candidates/resume-preview" onClick={handleLinkClick}>Resume preview</Link>
                    </li>
                    <li>
                      <Link href="/candidates/resume-added" onClick={handleLinkClick}>Resume added</Link>
                    </li>
                  </ul>
                </li>

                <li
                  className={`menu-item-has-children ${activeSubmenu === 'news' ? 'active' : ''}`}
                  onMouseEnter={() => handleMouseEnter('news')}
                  onMouseLeave={handleMouseLeave}
                >
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    handleSubmenuClick('news');
                  }}>
                    News
                    <span className="show indicator">
                      <i className="puzzle-icon far fa-angle-down"></i>
                    </span>
                  </a>
                  <ul className="sub-menu" style={{ display: activeSubmenu === 'news' ? 'block' : 'none' }}>
                    <li>
                      <Link href="/news/news-page" onClick={handleLinkClick}>News page</Link>
                    </li>
                    <li>
                      <Link href="/news/standard-news-with-sidebar" onClick={handleLinkClick}>Standard news with sidebar</Link>
                    </li>
                    <li>
                      <Link href="/news/news-details-standard" onClick={handleLinkClick}>News details standard</Link>
                    </li>
                    <li>
                      <Link href="/news/news-details-gallery" onClick={handleLinkClick}>News details gallery</Link>
                    </li>
                    <li>
                      <Link href="/news/news-details-video" onClick={handleLinkClick}>News details with video</Link>
                    </li>
                  </ul>
                </li>

                <li
                  className={`menu-item-has-mega-menu menu-item-has-children ${activeSubmenu === 'pages' ? 'active' : ''}`}
                  onMouseEnter={() => handleMouseEnter('pages')}
                  onMouseLeave={handleMouseLeave}
                >
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    handleSubmenuClick('pages');
                  }}>
                    Pages
                    <span className="show indicator">
                      <i className="puzzle-icon far fa-angle-down"></i>
                    </span>
                  </a>
                  <div className="megamenu" style={{ display: activeSubmenu === 'pages' ? 'block' : 'none' }}>
                    <div className="megamenu-row">
                      <div className="col3">
                        <ul>
                          <li className="megamenu-item-info">
                            <h6 className="megamenu-item-info-title">Pages</h6>
                          </li>
                          <li>
                            <Link href="/pages/pricing-plans" onClick={handleLinkClick}>
                              <i className="puzzle-icon fas fa-caret-right"></i>
                              Pricing plans
                            </Link>
                          </li>
                          <li>
                            <Link href="/pages/contacts" onClick={handleLinkClick}>
                              <i className="puzzle-icon fas fa-caret-right"></i>
                              Contacts
                            </Link>
                          </li>
                          <li>
                            <Link href="/pages/send-message" onClick={handleLinkClick}>
                              <i className="puzzle-icon fas fa-caret-right"></i>
                              Send message
                            </Link>
                          </li>
                          <li>
                            <Link href="/pages/coming-soon" onClick={handleLinkClick}>
                              <i className="puzzle-icon fas fa-caret-right"></i>
                              Coming Soon Page
                            </Link>
                          </li>
                          <li>
                            <Link href="/pages/error-404" onClick={handleLinkClick}>
                              <i className="puzzle-icon fas fa-caret-right"></i>
                              Error 404
                            </Link>
                          </li>
                          <li>
                            <Link href="/pages/sign-up" onClick={handleLinkClick}>
                              <i className="puzzle-icon fas fa-caret-right"></i>
                              Sign Up
                            </Link>
                          </li>
                          <li>
                            <Link href="/pages/login" onClick={handleLinkClick}>
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
                            <Link href="/pages/accordions" onClick={handleLinkClick}>
                              <i className="puzzle-icon fas fa-caret-right"></i>
                              Accordions
                            </Link>
                          </li>
                          <li>
                            <Link href="/pages/button-styles" onClick={handleLinkClick}>
                              <i className="puzzle-icon fas fa-caret-right"></i>
                              Button Styles
                            </Link>
                          </li>
                          <li>
                            <Link href="/pages/forms" onClick={handleLinkClick}>
                              <i className="puzzle-icon fas fa-caret-right"></i>
                              Forms
                            </Link>
                          </li>
                          <li>
                            <Link href="/pages/icon-with-text" onClick={handleLinkClick}>
                              <i className="puzzle-icon fas fa-caret-right"></i>
                              Icon with Text
                            </Link>
                          </li>
                          <li>
                            <Link href="/pages/link-styles" onClick={handleLinkClick}>
                              <i className="puzzle-icon fas fa-caret-right"></i>
                              Link Styles
                            </Link>
                          </li>
                          <li>
                            <Link href="/pages/tab-styles" onClick={handleLinkClick}>
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
                            <Link href="/pages/heading-styles" onClick={handleLinkClick}>
                              <i className="puzzle-icon fas fa-caret-right"></i>
                              Heading Styles
                            </Link>
                          </li>
                          <li>
                            <Link href="/pages/highlights" onClick={handleLinkClick}>
                              <i className="puzzle-icon fas fa-caret-right"></i>
                              Highlights
                            </Link>
                          </li>
                          <li>
                            <Link href="/pages/blockquotes" onClick={handleLinkClick}>
                              <i className="puzzle-icon fas fa-caret-right"></i>
                              Blockquotes
                            </Link>
                          </li>
                          <li>
                            <Link href="/pages/columns" onClick={handleLinkClick}>
                              <i className="puzzle-icon fas fa-caret-right"></i>
                              Columns
                            </Link>
                          </li>
                          <li>
                            <Link href="/pages/lists" onClick={handleLinkClick}>
                              <i className="puzzle-icon fas fa-caret-right"></i>
                              Lists
                            </Link>
                          </li>
                          <li>
                            <Link href="/pages/icons" onClick={handleLinkClick}>
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
                  <a href="#" onClick={(e) => { e.preventDefault(); handleSignupClick(); }}>Sign Up</a>
                </li>
                <li>
                  <a
                    href="#"
                    className="crumina-button button--primary button--s button--hover-primary"
                    onClick={(e) => { e.preventDefault(); handleLoginClick(); }}
                  >
                    Login
                  </a>
                </li>
              </ul>
            </nav>

            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal fade window-popup show" style={{ display: 'block' }} tabIndex={-1} role="dialog" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" onClick={handleCloseModals} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form className="form-login">
                  <h2>My Account</h2>
                  <div className="mb-4">For fast login use your social account.</div>
                  <button type="button" className="crumina-button button--blue-dark button--l button--with-icon button--icon-left w-100 mb-2">
                    <i className="puzzle-icon fab fa-facebook-square"></i>Login with the Facebook
                  </button>
                  <button type="button" className="crumina-button button--blue button--l button--with-icon button--icon-left w-100 mb-4">
                    <i className="puzzle-icon fab fa-twitter"></i>Login with the Twitter
                  </button>
                  <label htmlFor="name">Username or Email Address *</label>
                  <input id="name" name="name" placeholder="" type="text" />
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <label className="mb-0" htmlFor="password">Password *</label>
                    <a href="#">Lost your password?</a>
                  </div>
                  <input id="password" name="password" placeholder="" type="password" />
                  <div className="checkbox checkbox--transparent mt-2 mb-4">
                    <label>
                      <input type="checkbox" name="optionsCheckboxes4" />
                      <span className="checkbox-material"><span className="check"></span></span>
                      Remember Me
                    </label>
                  </div>
                  <button type="button" className="crumina-button button--green button--l w-100">Log In</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="modal fade window-popup show" style={{ display: 'block' }} tabIndex={-1} role="dialog" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" onClick={handleCloseModals} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form className="form-login">
                  <h2 className="mb-4">Register</h2>
                  <label htmlFor="first_name">First Name *</label>
                  <input id="first_name" name="name" placeholder="" type="text" />
                  <label htmlFor="last_name">Last Name *</label>
                  <input id="last_name" name="name" placeholder="" type="text" />
                  <label htmlFor="password1">Password *</label>
                  <input id="password1" name="name" placeholder="" type="password" />
                  <button type="button" className="crumina-button button--green button--l w-100 my-3">Create an Account</button>
                  <button type="button" className="crumina-button button--white button--l w-100" onClick={handleSwitchToLogin}>Log In</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Backdrop */}
      {(showLoginModal || showSignupModal) && (
        <div className="modal-backdrop fade show" style={{ opacity: 0.5 }}></div>
      )}
    </>
  );
};

export default Header;
