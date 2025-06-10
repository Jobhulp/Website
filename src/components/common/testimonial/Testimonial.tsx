"use client";

import React from "react";
import TestimonialCard from "./TestimonialCard";
import { testimonials } from "./data";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';


const Testimonial: React.FC = () => {
  return (
    <section className="medium-padding120">
      <div className="container">
        <div className="row mb60">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <header className="crumina-module crumina-heading heading--h2 heading--with-decoration heading--inline mb-0">
              <h2 className="heading-title">
                Een paar woorden van gelukkige kandidaten
              </h2>
              <div className="heading-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
            </header>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="crumina-module crumina-module-slider pagination-bottom-center slider--item-with-shadow">
              <Swiper
                slidesPerView={3}
                spaceBetween={40}
                pagination={{
                    clickable: true,
                }}
                navigation={false}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },
                  576: { // sm
                    slidesPerView: 2,
                  },
                  768: { // md
                    slidesPerView: 3,
                  },
                  992: { // lg
                    slidesPerView: 4,
                  },
                  1200: { // xl
                    slidesPerView: 5,
                  },
                  1400: { // xxl
                    slidesPerView: 6,
                  },
                }}
                loop={true}
                modules={[Pagination]}
                className="swiper-container"
              >
                {testimonials.map((testimonial) => (
                  <SwiperSlide key={testimonial.id} className="swiper-slide">
                    <TestimonialCard testimonial={testimonial} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
