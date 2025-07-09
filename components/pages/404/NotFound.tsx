import React from 'react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="main-content-wrapper">
      <section className="stunning-header bg-dark-themes pt200 pb120">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 mb-5 mb-md-0">
              <ul className="breadcrumbs">
                <li className="breadcrumbs-item">
                  <Link href="/">
                    Home<i className="puzzle-icon fal fa-angle-double-right"></i>
                  </Link>
                </li>
                <li className="breadcrumbs-item">
                  <Link href="/">
                    Pages<i className="puzzle-icon fal fa-angle-double-right"></i>
                  </Link>
                </li>
                <li className="breadcrumbs-item active">
                  <span>Error 404</span>
                </li>
              </ul>

              <h1 className="page-title text-white">Pagina Niet Gevonden</h1>
            </div>

            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <div className="input--with-icon input--icon-right">
                <input
                  id="input2"
                  className="input--dark"
                  name="name"
                  placeholder="Waar ben je naar op zoek?"
                  type="text"
                />
                <i className="puzzle-icon fal fa-search"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt120">
        <div className="container">
          <div className="row align-items-start">
            <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mb-5 mb-lg-0">
              <header className="crumina-module crumina-heading heading--h2 heading--with-decoration">
                <h2 className="heading-title">
                  We kunnen de pagina die u zoekt niet vinden!
                </h2>
                <div className="heading-text">
                  Het lijkt erop dat de pagina die u zoekt, is verplaatst of niet
                  bestaan. Maar er zijn nog een paar dingen die u kunt doen. Klik op het sitelogo om naar de homepage te gaan of probeer te zoeken.
                </div>
              </header>
              <Link href="/" className="crumina-button button--primary button--xl">
                Ga naar Homapagina
              </Link>
            </div>

            <div className="col-lg-8 col-md-6 col-sm-12 col-xs-12 mt-auto">
              <img
                className="d-block mb-negative-1"
                src="/img/svg/07_mountains.svg"
                alt="company"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;