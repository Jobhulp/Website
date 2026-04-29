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
                alt="Jobhulp logo"
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

                <li>
                  <Link href="/how-it-works" onClick={handleLinkClick}>Hoe het werkt</Link>
                </li>

                <li
                  className={`menu-item-has-children ${activeSubmenu === 'kandidaten' ? 'active' : ''}`}
                  onMouseEnter={() => handleMouseEnter('kandidaten')}
                  onMouseLeave={handleMouseLeave}
                >
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    handleSubmenuClick('kandidaten');
                  }}>
                    Voor Kandidaten
                    <span className="show indicator">
                      <i className="puzzle-icon far fa-angle-down"></i>
                    </span>
                  </a>

                  <ul className="sub-menu" style={{ display: activeSubmenu === 'kandidaten' ? 'block' : 'none' }}>
                    <li>
                      <Link href="/candidates/submit-resume" onClick={handleLinkClick}>Maak je profiel</Link>
                    </li>
                    <li>
                      <Link href="/tests" onClick={handleLinkClick}>Doe de testen</Link>
                    </li>
                    <li>
                      <Link href="/jobs/job-lists" onClick={handleLinkClick}>Bekijk matches</Link>
                    </li>
                    <li>
                      <Link href="/dashboard/candidate" onClick={handleLinkClick}>Mijn dashboard</Link>
                    </li>
                  </ul>
                </li>

                <li
                  className={`menu-item-has-children ${activeSubmenu === 'werkgevers' ? 'active' : ''}`}
                  onMouseEnter={() => handleMouseEnter('werkgevers')}
                  onMouseLeave={handleMouseLeave}
                >
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    handleSubmenuClick('werkgevers');
                  }}>
                    Voor Werkgevers
                    <span className="show indicator">
                      <i className="puzzle-icon far fa-angle-down"></i>
                    </span>
                  </a>
                  <ul className="sub-menu" style={{ display: activeSubmenu === 'werkgevers' ? 'block' : 'none' }}>
                    <li>
                      <Link href="/dashboard/employer" onClick={handleLinkClick}>Mijn dashboard</Link>
                    </li>
                    <li>
                      <Link href="/candidates/candidate-lists" onClick={handleLinkClick}>Bekijk kandidaten</Link>
                    </li>
                    <li>
                      <Link href="/jobs/company-profile" onClick={handleLinkClick}>Bedrijfsprofiel</Link>
                    </li>
                  </ul>
                </li>

                <li
                  className={`menu-item-has-children ${activeSubmenu === 'nieuws' ? 'active' : ''}`}
                  onMouseEnter={() => handleMouseEnter('nieuws')}
                  onMouseLeave={handleMouseLeave}
                >
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    handleSubmenuClick('nieuws');
                  }}>
                    Nieuws
                    <span className="show indicator">
                      <i className="puzzle-icon far fa-angle-down"></i>
                    </span>
                  </a>
                  <ul className="sub-menu" style={{ display: activeSubmenu === 'nieuws' ? 'block' : 'none' }}>
                    <li>
                      <Link href="/news/news-page" onClick={handleLinkClick}>Alle artikelen</Link>
                    </li>
                    <li>
                      <Link href="/news/news-details-standard" onClick={handleLinkClick}>Laatste nieuws</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>

            <nav className="login-menu">
              <ul>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleSignupClick(); }}>Registreer</a>
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
                  <h2>Inloggen</h2>
                  <div className="mb-4">Log in met je social account voor snelle toegang.</div>
                  <button type="button" className="crumina-button button--blue-dark button--l button--with-icon button--icon-left w-100 mb-2">
                    <i className="puzzle-icon fab fa-facebook-square"></i>Login met Facebook
                  </button>
                  <button type="button" className="crumina-button button--blue button--l button--with-icon button--icon-left w-100 mb-4">
                    <i className="puzzle-icon fab fa-linkedin-in"></i>Login met LinkedIn
                  </button>
                  <label htmlFor="name">E-mailadres *</label>
                  <input id="name" name="name" placeholder="jouw@email.be" type="email" />
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <label className="mb-0" htmlFor="password">Wachtwoord *</label>
                    <a href="#">Wachtwoord vergeten?</a>
                  </div>
                  <input id="password" name="password" placeholder="" type="password" />
                  <div className="checkbox checkbox--transparent mt-2 mb-4">
                    <label>
                      <input type="checkbox" name="optionsCheckboxes4" />
                      <span className="checkbox-material"><span className="check"></span></span>
                      Onthoud mij
                    </label>
                  </div>
                  <button type="button" className="crumina-button button--green button--l w-100">Inloggen</button>
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
                  <h2 className="mb-4">Registreren</h2>
                  <p className="mb-4">Maak een account aan en ontdek je matches.</p>
                  <label htmlFor="first_name">Voornaam *</label>
                  <input id="first_name" name="name" placeholder="" type="text" />
                  <label htmlFor="last_name">Achternaam *</label>
                  <input id="last_name" name="name" placeholder="" type="text" />
                  <label htmlFor="email">E-mailadres *</label>
                  <input id="email" name="email" placeholder="jouw@email.be" type="email" />
                  <label htmlFor="password1">Wachtwoord *</label>
                  <input id="password1" name="name" placeholder="" type="password" />
                  <div className="checkbox checkbox--transparent mt-2 mb-4">
                    <label>
                      <input type="checkbox" name="userType" value="candidate" defaultChecked />
                      <span className="checkbox-material"><span className="check"></span></span>
                      Ik ben een kandidaat
                    </label>
                  </div>
                  <div className="checkbox checkbox--transparent mb-4">
                    <label>
                      <input type="checkbox" name="userType" value="employer" />
                      <span className="checkbox-material"><span className="check"></span></span>
                      Ik ben een werkgever
                    </label>
                  </div>
                  <button type="button" className="crumina-button button--green button--l w-100 my-3">Account aanmaken</button>
                  <button type="button" className="crumina-button button--white button--l w-100" onClick={handleSwitchToLogin}>Heb je al een account? Log in</button>
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
