import React from 'react';

const JobSeeker: React.FC = () => {
  return (
    <section className="medium-padding120 bg-light-grey">
      <div className="container">
        <div className="row mb60">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <header className="crumina-module crumina-heading heading--h2 heading--with-decoration decoration--yellow-theme heading--inline mb-0">
              <h2 className="heading-title">Voor Kandidaten: De ervaring in 3 stappen</h2>
              <div className="heading-text">
                Het platform leert je kennen. Geen klassiek CV nodig, geen eindeloos solliciteren. 
                Je vult in wie je bent en wat je zoekt, en Jobhulp doet de rest.
              </div>
            </header>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 mb-4 mb-md-0">
            <div className="crumina-module crumina-info-box info-box--border-top h-100">
              <div className="info-box-thumb">
                <span className="step-badge bg-yellow c-dark">Stap 1</span>
                <h4 className="info-box-title mt-3">Maak je profiel</h4>
                <ul className="feature-list">
                  <li>Geef je skills aan</li>
                  <li>Vul in hoe je graag werkt</li>
                  <li>Geef je voorkeuren: sector, type bedrijf, remote, etc.</li>
                </ul>
                <p className="info-box-text highlight-text">
                  Geen klassiek CV nodig. Het platform begrijpt wie je bent via structuur, niet via tekst.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 mb-4 mb-md-0">
            <div className="crumina-module crumina-info-box info-box--border-top h-100">
              <div className="info-box-thumb">
                <span className="step-badge bg-yellow c-dark">Stap 2</span>
                <h4 className="info-box-title mt-3">Ontvang matches</h4>
                <ul className="feature-list">
                  <li>Krijg automatisch jobs die passen</li>
                  <li>Zie waarom iets matcht</li>
                  <li>Bekijk de matchscore (bv. 82%)</li>
                </ul>
                <p className="info-box-text highlight-text">
                  Transparantie: je ziet precies waarom een job wel of niet past bij jouw profiel.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 mb-0">
            <div className="crumina-module crumina-info-box info-box--border-top h-100">
              <div className="info-box-thumb">
                <span className="step-badge bg-yellow c-dark">Stap 3</span>
                <h4 className="info-box-title mt-3">Toon interesse</h4>
                <ul className="feature-list">
                  <li>Toon interesse in een job</li>
                  <li>Wacht op wederzijdse interesse</li>
                  <li>Contact wordt mogelijk bij mutual match</li>
                </ul>
                <p className="info-box-text highlight-text">
                  Geen sollicitatie. Pas als beide partijen interesse tonen, wordt contact mogelijk.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5 justify-content-center">
          <div className="col-auto">
            <a href="/candidates/submit-resume" className="crumina-button button--yellow button--xl button--hover-primary">
              Start je profiel
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobSeeker;
