import React from "react";

const Download: React.FC = () => {
  return (
    <section className="bg-dark-themes">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 pt120 pb120">
            <header className="crumina-module crumina-heading heading--h2 heading--with-decoration text-white">
              <h2 className="heading-title">
                Download de Jobhulp-app voor je mobiel
              </h2>
              <div className="heading-text">
                Download nu de gratis Jobhulp-applicatie!
              </div>
            </header>
            <div className="universal-btn-wrapper">
              <a href="#" className="crumina-button button--market">
                <i className="puzzle-icon fab fa-apple" />
                Apple
                <br />
                Store
              </a>
              <a href="#" className="crumina-button button--market">
                <i className="puzzle-icon fab fa-google-play" />
                Google
                <br />
                Play
              </a>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-auto ml-auto mr-auto">
            <img src="img/iphone.png" alt="iphone" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Download;
