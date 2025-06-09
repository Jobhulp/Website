"use client";
import React, { useEffect, useRef } from "react";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import CandidateCard from './CandidateCard';

const featuredCandidates = [
  {
    name: 'Jerry Thomas',
    location: 'London, United Kingdom',
    avatar: '/img/author8.jpg',
    skills: ['Web', 'Development', 'HTML', 'WordPress'],
    title: 'Web Developer',
    rate: '$45 / Hour',
    isFeatured: true
  },
  {
    name: 'Catherine White',
    location: 'New York, USA',
    avatar: '/img/author9.jpg',
    skills: ['UX', 'UI', 'Web Design'],
    title: 'UX/UI Designer',
    rate: '$60 / Hour'
  },
  {
    name: 'Betty Stevens',
    location: 'Melbourne, Australia',
    avatar: '/img/author10.jpg',
    skills: ['Web', 'Web Design', 'UX', 'User Interfaces'],
    title: 'Web Designer',
    rate: '$45 / Hour',
    isFeatured: true
  },
  {
    name: 'Russell Wright',
    location: 'California, USA',
    avatar: '/img/author11.jpg',
    skills: ['Analysis', 'Finance', 'Sales', 'Marketing'],
    title: 'Marketing Director',
    rate: '$35 / Hour'
  },
  {
    name: 'Doris Stewart',
    location: 'Cologne, Germany',
    avatar: '/img/author12.jpg',
    skills: ['Web', 'Development', 'HTML', 'WordPress'],
    title: 'Web Developer',
    rate: '$45 / Hour'
  },
  {
    name: 'Maria Bowman',
    location: 'New York, USA',
    avatar: '/img/author13.jpg',
    skills: ['UX', 'UI', 'Web Design'],
    title: 'UX/UI Designer',
    rate: '$60 / Hour'
  }
];

export default function FeaturedCandidates() {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      const swiper = new Swiper(swiperRef.current, {
        modules: [ Navigation],
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
    <aside aria-label="sidebar" className="sidebar sidebar-right">
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
              {featuredCandidates.map((candidate, index) => (
                <div key={index} className="swiper-slide">
                  <CandidateCard
                    {...candidate}
                    skills={[]}
                    className="h-100"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="widget w-banner widget-sidebar">
        <div className="banner-header">
          Advertising
        </div>
        <div className="banner-content">
          <h4 className="widget-title">Download free Puzzler App for your mobile</h4>
          <div className="icon-market-wrap">
            <a href="#"><i className="puzzle-icon fab fa-apple"></i></a>
            <a href="#"><i className="puzzle-icon fab fa-google-play"></i></a>
          </div>
          <img src="/img/iphone1.png" title="phone" alt="iPhone" />
        </div>
      </div>
    </aside>
  );
}