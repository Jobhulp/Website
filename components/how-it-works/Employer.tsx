import React from 'react';

const Employer: React.FC = () => {
  return (
    <section className="medium-padding120">
      <div className="container">
        <div className="row mb60">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <header className="crumina-module crumina-heading heading--h2 heading--with-decoration decoration--red-theme heading--inline mb-0">
              <h2 className="heading-title">Voor Werkgevers: Vind de perfecte match</h2>
              <div className="heading-text">
                Geen lange vacatureteksten meer. Structureer wat je zoekt en ontvang automatisch 
                kandidaten die passen, gerangschikt op match-score.
              </div>
            </header>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 mb-4 mb-md-0">
            <div className="crumina-module crumina-info-box info-box--standard">
              <div className="info-box-content">
                <span className="step-badge bg-red c-white">Stap 1</span>
                <h4 className="info-box-title mt-3">Maak je bedrijfsprofiel</h4>
                <ul className="feature-list">
                  <li>Beschrijf je bedrijfscultuur</li>
                  <li>Vertel hoe het team werkt</li>
                  <li>Geef context over je organisatie</li>
                </ul>
                <p className="info-box-text highlight-text">
                  Kandidaten zien niet alleen de job, maar ook of ze bij jullie bedrijf passen.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 mb-4 mb-md-0">
            <div className="crumina-module crumina-info-box info-box--standard">
              <div className="info-box-content">
                <span className="step-badge bg-red c-white">Stap 2</span>
                <h4 className="info-box-title mt-3">Structureer je job</h4>
                <ul className="feature-list">
                  <li>Geef aan welke skills nodig zijn</li>
                  <li>Beschrijf wat voor type persoon je zoekt</li>
                  <li>Geef context over de functie</li>
                </ul>
                <p className="info-box-text highlight-text">
                  Geen lange vacaturetekst nodig. Gestructureerde input zorgt voor betere matches.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 mb-0">
            <div className="crumina-module crumina-info-box info-box--standard">
              <div className="info-box-content">
                <span className="step-badge bg-red c-white">Stap 3</span>
                <h4 className="info-box-title mt-3">Ontvang kandidaten</h4>
                <ul className="feature-list">
                  <li>Krijg automatisch passende kandidaten</li>
                  <li>Gerangschikt op match-score</li>
                  <li>Toon interesse bij sterke matches</li>
                </ul>
                <p className="info-box-text highlight-text">
                  Alleen bij wederzijdse interesse wordt contact mogelijk. Geen tijdverlies meer.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5 justify-content-center">
          <div className="col-auto">
            <a href="/jobs/job-lists" className="crumina-button button--red button--xl button--hover-primary">
              Start als werkgever
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Employer;
