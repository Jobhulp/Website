import React from "react";

const Intro: React.FC = () => {
  return (
    <>
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pt100">
        <header className="crumina-module crumina-heading heading--h2 heading--with-decoration heading--inline text-white mb-5">
          <h2 className="heading-title">
            We verbinden werkgevers met professionals
          </h2>
          <div className="heading-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </div>
        </header>
      </div>
      <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12 m-auto">
        <div className="crumina-module crumina-our-video">
          <div className="video-thumb">
            <img src="img/svg/02_how_it_works.svg" alt="video" />
            <a
              href="https://www.youtube.com/watch?v=wnJ6LuUFpMo"
              className="video-control js-popup-iframe"
            >
              <svg className="puzzle-icon" width="28" height="40">
                <path
                  fillRule="evenodd"
                  d="M27.61 19.214L1.416.16A.874.874 0 0 0 .483.101.963.963 0 0 0 0 .944V39.05c0 .352.186.677.483.843a.87.87 0 0 0 .933-.06L27.61 20.782a.968.968 0 0 0 .39-.784.965.965 0 0 0-.39-.784z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Intro;
