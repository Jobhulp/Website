'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import teamSvg from '@/assets/img/svg/01_team.svg';
import freelancerSvg from '@/assets/img/svg/03_freelancer.svg';
import employerSvg from '@/assets/img/svg/04_employer.svg';

const Banner = () => (
  <div className="crumina-module crumina-module-slider slider--main navigation-center-both-sides bg-dark-themes">
    <div className="swiper-btn-wrap">
      <div className="swiper-btn-prev">
        <i className="puzzle-icon fal fa-long-arrow-left"></i>
      </div>
      <div className="swiper-btn-next">
        <i className="puzzle-icon fal fa-long-arrow-right"></i>
      </div>
    </div>
    <Swiper
      modules={[Navigation]}
      navigation={{
        prevEl: '.swiper-btn-prev',
        nextEl: '.swiper-btn-next',
      }}
      slidesPerView={1}
      loop={true}
      className="swiper-container"
    >
      <SwiperSlide>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 col-md-6 col-sm-12 col-xs-12 mb-3 mb-md-0" data-swiper-parallax="-300">
              <h2 className="h1 main-slider-title">Slimme matches, geen massa sollicitaties</h2>
              <h3 className="main-slider-sub-title">
                <span>Jobhulp koppelt mensen en jobs </span>
                <span className="c-primary">voor</span>
                <span> er gesolliciteerd wordt. Alleen relevante gesprekken.</span>
              </h3>
              <div className="universal-btn-wrapper">
                <a href="/how-it-works" className="crumina-button button--yellow button--xl button--hover-primary">Hoe het werkt</a>
                <a href="#voor-wie" className="arrow--white link--bold link--with-icon link--icon-right">Ontdek meer<i className="puzzle-icon far fa-angle-right"></i></a>
              </div>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-12 col-xs-12" data-swiper-parallax="-100">
              <img src={teamSvg.src} alt="team matching" />
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 col-md-6 col-sm-12 col-xs-12 mb-3 mb-md-0" data-swiper-parallax="-100">
              <img src={freelancerSvg.src} alt="kandidaat profiel" />
            </div>
            <div className="col-lg-5 col-md-6 col-sm-12 col-xs-12" data-swiper-parallax="-300">
              <h2 className="h1 main-slider-title">Geen CV nodig. Het platform leert je kennen.</h2>
              <h3 className="main-slider-sub-title title--small">Vul je skills, werkstijl en voorkeuren in. Jobhulp matcht je automatisch met passende jobs.</h3>
              <div className="universal-btn-wrapper">
                <a href="/candidates/submit-resume" className="crumina-button button--blue button--xl button--hover-primary">Maak je profiel</a>
                <a href="/how-it-works" className="arrow--white link--bold link--with-icon link--icon-right">Meer info<i className="puzzle-icon far fa-angle-right"></i></a>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 col-md-6 col-sm-12 col-xs-12 mb-3 mb-md-0" data-swiper-parallax="-300">
              <h2 className="h1 main-slider-title">Vind de perfecte match voor je team</h2>
              <h3 className="main-slider-sub-title title--small">Geen lange vacatureteksten. Structureer wat je zoekt en ontvang automatisch passende kandidaten.</h3>
              <div className="universal-btn-wrapper">
                <a href="/jobs/job-lists" className="crumina-button button--red button--xl button--hover-primary">Start als werkgever</a>
                <a href="/how-it-works" className="arrow--white link--bold link--with-icon link--icon-right">Hoe het werkt<i className="puzzle-icon far fa-angle-right"></i></a>
              </div>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-12 col-xs-12" data-swiper-parallax="-100">
              <img src={employerSvg.src} alt="werkgever matching" />
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
);

export default Banner;
