"use client";
import React, { useEffect, useRef } from "react";
import Swiper from "swiper";
import {  Navigation } from "swiper/modules";
import { featured } from './jobListData';
import "swiper/css";
import "swiper/css/navigation";

const FeaturedJobsSlider: React.FC = () => {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      const swiper = new Swiper(swiperRef.current, {
        modules: [Navigation],
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        autoHeight: true,
        pagination: false,
        navigation: {
          nextEl: ".swiper-btn-next",
          prevEl: ".swiper-btn-prev",
        },
      });

      return () => {
        swiper.destroy();
      };
    }
  }, []);

  return (
    <div className="widget w-featured-vacancies widget-sidebar">
      <h3 className="widget-title">Featured</h3>
      <div className="crumina-module crumina-module-slider navigation-top-right">
        <div className="swiper-btn-wrap">
          <div className="swiper-btn-prev">
            <i className="puzzle-icon fal fa-long-arrow-left"></i>
          </div>
          <div className="swiper-btn-next">
            <i className="puzzle-icon fal fa-long-arrow-right"></i>
          </div>
        </div>
        <div ref={swiperRef} className="swiper-container">
          <div className="swiper-wrapper">
            {featured.map((item, idx) => (
              <div className="swiper-slide" key={idx}>
                <div className="ui-card featured-vacancies">
                  <div className="ui-card-content">
                    <div className="vacancies-title-location">
                      <a href="#" className="vacancies-title h6">{item.title}</a>
                      <div className="vacancies-location">
                        <time className="published">{item.time}</time>
                        {item.location}
                      </div>
                    </div>
                    <a href="#" className="logo-company logo-company--thumb">
                      <img className="logo" src={item.logo.src} alt="company" />
                      <img src={item.company.src} alt="company" />
                      <div className="overlay"></div>
                    </a>
                  </div>
                  <div className="ui-card-footer">
                    <a href="#" className="link--uppercase-wide fs-12">{item.category}</a>
                    <button type="button" className={`crumina-button ${item.typeClass} button--xxs button--uppercase-wide`}>{item.type}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedJobsSlider;