import React from 'react';
import candidateSvg from '@/assets/img/svg/03_freelancer.svg';
import employerSvg from '@/assets/img/svg/04_employer.svg';

const ForWho: React.FC = () => {
  return (
    <section className="medium-padding120">
      <div className="container">
        {/* For Candidates */}
        <div className="row align-items-center mb80">
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-4 mb-md-0">
            <img src={candidateSvg.src} alt="Voor kandidaten" className="w-100" />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <header className="crumina-module crumina-heading heading--h2 heading--with-decoration decoration--yellow-theme mb-4">
              <h2 className="heading-title">Voor Kandidaten</h2>
              <div className="heading-text">
                Het platform leert je kennen. Geen klassiek CV nodig, geen eindeloos solliciteren.
              </div>
            </header>
            
            <div className="steps-list">
              <div className="step-item mb-4">
                <div className="d-flex align-items-start">
                  <span className="step-number bg-yellow c-dark">1</span>
                  <div className="step-content ml-3">
                    <h5 className="mb-2">Maak je profiel</h5>
                    <p className="mb-0">Vul je skills, werkstijl en voorkeuren in. Sector, type bedrijf, remote opties - jij bepaalt.</p>
                  </div>
                </div>
              </div>
              
              <div className="step-item mb-4">
                <div className="d-flex align-items-start">
                  <span className="step-number bg-yellow c-dark">2</span>
                  <div className="step-content ml-3">
                    <h5 className="mb-2">Ontvang matches</h5>
                    <p className="mb-0">Krijg automatisch jobs te zien die goed passen. Je ziet ook waarom iets matcht.</p>
                  </div>
                </div>
              </div>
              
              <div className="step-item mb-4">
                <div className="d-flex align-items-start">
                  <span className="step-number bg-yellow c-dark">3</span>
                  <div className="step-content ml-3">
                    <h5 className="mb-2">Toon interesse</h5>
                    <p className="mb-0">Alleen bij wederzijdse interesse wordt contact mogelijk. Geen nutteloze sollicitaties.</p>
                  </div>
                </div>
              </div>
            </div>

            <a href="/candidates/submit-resume" className="crumina-button button--yellow button--xl button--hover-primary mt-3">
              Start je profiel
            </a>
          </div>
        </div>

        {/* For Employers */}
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 order-md-2 mb-4 mb-md-0">
            <img src={employerSvg.src} alt="Voor werkgevers" className="w-100" />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 order-md-1">
            <header className="crumina-module crumina-heading heading--h2 heading--with-decoration decoration--red-theme mb-4">
              <h2 className="heading-title">Voor Werkgevers</h2>
              <div className="heading-text">
                Geen lange vacatureteksten meer. Structureer wat je zoekt en ontvang direct passende kandidaten.
              </div>
            </header>
            
            <div className="steps-list">
              <div className="step-item mb-4">
                <div className="d-flex align-items-start">
                  <span className="step-number bg-red c-white">1</span>
                  <div className="step-content ml-3">
                    <h5 className="mb-2">Maak je bedrijfsprofiel</h5>
                    <p className="mb-0">Beschrijf je bedrijfscultuur, hoe het team werkt en wat voor type persoon je zoekt.</p>
                  </div>
                </div>
              </div>
              
              <div className="step-item mb-4">
                <div className="d-flex align-items-start">
                  <span className="step-number bg-red c-white">2</span>
                  <div className="step-content ml-3">
                    <h5 className="mb-2">Structureer je job</h5>
                    <p className="mb-0">Geef aan welke skills nodig zijn en de context van de job. Geen lange vacaturetekst nodig.</p>
                  </div>
                </div>
              </div>
              
              <div className="step-item mb-4">
                <div className="d-flex align-items-start">
                  <span className="step-number bg-red c-white">3</span>
                  <div className="step-content ml-3">
                    <h5 className="mb-2">Ontvang kandidaten</h5>
                    <p className="mb-0">Krijg automatisch kandidaten te zien, gerangschikt op hoe goed ze passen.</p>
                  </div>
                </div>
              </div>
            </div>

            <a href="/jobs/job-lists" className="crumina-button button--red button--xl button--hover-primary mt-3">
              Start als werkgever
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForWho;
