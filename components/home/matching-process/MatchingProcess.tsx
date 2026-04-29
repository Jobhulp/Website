import React from 'react';

const MatchingProcess: React.FC = () => {
  return (
    <section id="voor-wie" className="medium-padding120 bg-light-grey">
      <div className="container">
        <div className="row mb60">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <header className="crumina-module crumina-heading heading--h2 heading--with-decoration heading--inline mb-0">
              <h2 className="heading-title">Waarom Jobhulp anders is</h2>
              <div className="heading-text">
                Traditionele jobsites focussen op massa sollicitaties. Jobhulp draait dit om: 
                alleen sterke matches komen in contact. Je spreekt enkel met mensen die echt passen.
              </div>
            </header>
          </div>
        </div>

        <div className="row mb60">
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-4 mb-md-0">
            <div className="crumina-module crumina-info-box info-box--border-top h-100" style={{ borderTopColor: '#f9d423' }}>
              <div className="info-box-thumb">
                <h4 className="info-box-title c-primary">Traditioneel</h4>
                <ul className="list-style-cross">
                  <li>Mensen solliciteren massaal</li>
                  <li>HR filtert alles handmatig</li>
                  <li>Veel gesprekken zijn tijdverlies</li>
                  <li>Frustratie aan beide kanten</li>
                  <li>Lange vacatureteksten schrijven</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-4 mb-md-0">
            <div className="crumina-module crumina-info-box info-box--border-top h-100" style={{ borderTopColor: '#28a745' }}>
              <div className="info-box-thumb">
                <h4 className="info-box-title" style={{ color: '#28a745' }}>Met Jobhulp</h4>
                <ul className="list-style-check">
                  <li>Automatische matching op skills en fit</li>
                  <li>Dubbele interesse = contact</li>
                  <li>Alleen relevante gesprekken</li>
                  <li>Snellere en betere hires</li>
                  <li>Gestructureerde job opbouw</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 mb-4 mb-md-0">
            <div className="crumina-module crumina-info-box info-box--numbers">
              <div className="info-box-content">
                <span className="info-box-number c-yellow">01</span>
                <h5 className="info-box-title">Matchscore</h5>
                <p className="info-box-text">
                  Elke match krijgt een score (bv. 82%). Je ziet direct hoe goed iemand past bij de job of het bedrijf.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 mb-4 mb-md-0">
            <div className="crumina-module crumina-info-box info-box--numbers">
              <div className="info-box-content">
                <span className="info-box-number c-green">02</span>
                <h5 className="info-box-title">Transparantie</h5>
                <p className="info-box-text">
                  Je ziet waarom je matcht en wat er eventueel ontbreekt. Geen black box, maar duidelijke inzichten.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 mb-0">
            <div className="crumina-module crumina-info-box info-box--numbers">
              <div className="info-box-content">
                <span className="info-box-number c-blue">03</span>
                <h5 className="info-box-title">Focus op fit</h5>
                <p className="info-box-text">
                  Niet alleen skills, maar ook persoonlijkheid, werkstijl en verwachtingen worden meegenomen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MatchingProcess;
