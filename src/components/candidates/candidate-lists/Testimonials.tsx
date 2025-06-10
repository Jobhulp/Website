"use client";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const testimonials = [
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua in voluptate velit esse cillum.',
    company: '/img/client9.png'
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua in voluptate velit esse cillum.',
    company: '/img/client12.png'
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua in voluptate velit esse cillum.',
    company: '/img/client13.png'
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua in voluptate velit esse cillum.',
    company: '/img/client10.png'
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua in voluptate velit esse cillum.',
    company: '/img/client11.png'
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua in voluptate velit esse cillum.',
    company: '/img/client12.png'
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua in voluptate velit esse cillum.',
    company: '/img/client13.png'
  }
];

export default function Testimonials() {
  return (
    <section className="medium-padding120">
      <div className="container">
        <div className="row mb60">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <header className="crumina-module crumina-heading heading--h2 heading--with-decoration heading--inline mb-0">
              <h2 className="heading-title">A Few Words from Happy Candidates</h2>
              <div className="heading-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
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
                }}
                loop={true}
                modules={[Pagination]}
                className="swiper-container"
              >
                  {testimonials.map((testimonial, index) => (
                    <SwiperSlide key={index} className="swiper-slide">
                      <blockquote className="quote--squared">
                        <p>
                          <i className="puzzle-icon quote fas fa-quote-left"></i>
                          {testimonial.text}
                        </p>
                        <div className="quote-footer">
                          <img className="logo" src={testimonial.company} title="company" alt="Company logo" />
                        </div>
                      </blockquote>
                    </SwiperSlide>
                  ))}
                  </Swiper>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}