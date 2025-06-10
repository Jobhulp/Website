"use client";

import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import client8 from '@/assets/img/client8.png';
import client9 from '@/assets/img/client9.png';
import client10 from '@/assets/img/client10.png';
import client11 from '@/assets/img/client11.png';
import client12 from '@/assets/img/client12.png';
import client13 from '@/assets/img/client13.png';
import client14 from '@/assets/img/client14.png';
import client15 from '@/assets/img/client15.png';
import Link from "next/link";

const companies = [
  {
    name: "Tech Solutions Inc.",
    logo: client8.src,
    location: "New York, USA",
    industry: "Technology",
    jobs: 12
  },
  {
    name: "Digital Creations",
    logo: client9.src,
    location: "London, UK",
    industry: "Digital & Creative",
    jobs: 8
  },
  {
    name: "Global Marketing",
    logo: client10.src,
    location: "Melbourne, Australia",
    industry: "Marketing",
    jobs: 15
  },
  {
    name: "Web Developers Co.",
    logo: client11.src,
    location: "San Francisco, USA",
    industry: "Web Development",
    jobs: 20
  },
  {
    name: "Creative Studio",
    logo: client12.src,
    location: "Berlin, Germany",
    industry: "Design",
    jobs: 6
  },
  {
    name: "Data Analytics Pro",
    logo: client13.src,
    location: "Singapore",
    industry: "Data Science",
    jobs: 10
  },
  {
    name: "Mobile Solutions",
    logo: client14.src,
    location: "Tokyo, Japan",
    industry: "Mobile Development",
    jobs: 9
  },
  {
    name: "Cloud Services",
    logo: client15.src,
    location: "Toronto, Canada",
    industry: "Cloud Computing",
    jobs: 14
  }
];

const RelatedCompaniesSlider: React.FC = () => (
  <section className="pb120 bg-light-grey">
    <div className="container">
      <div className="row mb60">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <header className="crumina-module crumina-heading heading--h2 heading--with-decoration heading--inline mb-0">
            <h2 className="heading-title">Browse the Related Companies</h2>
            <div className="heading-text">Discover similar companies in your industry and explore their job opportunities.</div>
          </header>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="crumina-module crumina-module-slider pagination-bottom-center slider--item-with-shadow">
            <Swiper
              slidesPerView={4}
              spaceBetween={30}
              pagination={{ clickable: true }}
              navigation={false}
              modules={[Pagination]}
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
              className="swiper-container auto-height"
            >
              {companies.map((company, idx) => (
                <SwiperSlide key={idx} className="swiper-slide" style={{ height: 'auto' }}>
                  <div className="ui-card h-100">
                    <div className="ui-card-content h-100">
                      <a href="/employers/job-details" className="my-auto">
                        <img className="logo" src={company.logo} title="company" alt="company" />
                      </a>
                    </div>
                    <div className="ui-card-footer">
                      <Link href="/employers/company-profile" className="link--bold link--with-icon link--icon-right">
                        View profile<i className="puzzle-icon far fa-angle-right"></i>
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="swiper-pagination"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default RelatedCompaniesSlider;