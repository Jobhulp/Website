import React from "react";
import howItWorks from '@/assets/img/svg/02_how_it_works.svg';

const Intro: React.FC = () => {
  return (
    <>
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pt100">
        <header className="crumina-module crumina-heading heading--h2 heading--with-decoration heading--inline text-white mb-5">
          <h2 className="heading-title">
            Slimme matching tussen mensen en jobs
          </h2>
          <div className="heading-text">
            Jobhulp is een platform dat mensen en jobs aan elkaar koppelt voor er gesolliciteerd wordt.
            In plaats van massaal solliciteren en eindeloos screenen, zorgt Jobhulp ervoor dat alleen 
            de juiste matches elkaar ontmoeten. Je spreekt alleen met mensen die echt passen.
          </div>
        </header>
      </div>
      <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12 m-auto">
        <div className="crumina-module crumina-our-video">
          <div className="video-thumb">
            <img src={howItWorks.src} alt="Hoe Jobhulp werkt" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Intro;
