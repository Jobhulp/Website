'use client';

import React from "react";
import client8 from '@/assets/img/client8.png';
import client9 from '@/assets/img/client9.png';
import client10 from '@/assets/img/client10.png';
import client11 from '@/assets/img/client11.png';
import client12 from '@/assets/img/client12.png';
import client13 from '@/assets/img/client13.png';
import client14 from '@/assets/img/client14.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

const relatedJobs = [
  {
    title: "Data Center Support Specialist Engineer",
    time: "6 hours ago",
    location: "London, United Kingdom",
    companyLogo: client9.src,
    category: "IT Contractor",
    type: "Part Time",
    typeClass: "button--blue-dark",
    featured: false,
  },
  {
    title: "Visualizer, web designer Max 3Ds, Cinema 4D",
    time: "24 hours ago",
    location: "New York, USA",
    companyLogo: client10.src,
    category: "Digital & Creative",
    type: "Full Time",
    typeClass: "button--green",
    featured: true,
  },
  {
    title: "Regional Sales Manager",
    time: "6 days ago",
    location: "Melbourne, Australia",
    companyLogo: client11.src,
    category: "Sales & Marketing",
    type: "Temporary",
    typeClass: "button--red",
    featured: false,
  },
  {
    title: "Data Center Support Specialist Engineer",
    time: "6 days ago",
    location: "Melbourne, Australia",
    companyLogo: client8.src,
    category: "IT Contractor",
    type: "Freelance",
    typeClass: "button--blue",
    featured: true,
  },
  {
    title: "Front End and Back End Developer",
    time: "1 week ago",
    location: "California, USA",
    companyLogo: client12.src,
    category: "Web Development",
    type: "Internship",
    typeClass: "button--yellow",
    featured: false,
  },
  {
    title: "Professional Copywriter for Commercial Advertising",
    time: "3 months ago",
    location: "Cologne, Germany",
    companyLogo: client13.src,
    category: "Writing",
    type: "Freelance",
    typeClass: "button--blue",
    featured: false,
  },
  {
    title: "Visualizer, web designer Max 3Ds, Cinema 4D",
    time: "24 hours ago",
    location: "New York, USA",
    companyLogo: client14.src,
    category: "Digital & Creative",
    type: "Full Time",
    typeClass: "button--green",
    featured: false,
  },
  {
    title: "Data Center Support Specialist Engineer",
    time: "6 days ago",
    location: "Melbourne, Australia",
    companyLogo: client8.src,
    category: "IT Contractor",
    type: "Freelance",
    typeClass: "button--blue",
    featured: true,
  },
  {
    title: "Front End and Back End Developer",
    time: "1 week ago",
    location: "California, USA",
    companyLogo: client12.src,
    category: "Web Development",
    type: "Internship",
    typeClass: "button--yellow",
    featured: false,
  },
  {
    title: "Professional Copywriter for Commercial Advertising",
    time: "3 months ago",
    location: "Cologne, Germany",
    companyLogo: client13.src,
    category: "Writing",
    type: "Freelance",
    typeClass: "button--blue",
    featured: false,
  },
  {
    title: "Visualizer, web designer Max 3Ds, Cinema 4D",
    time: "24 hours ago",
    location: "New York, USA",
    companyLogo: client14.src,
    category: "Digital & Creative",
    type: "Full Time",
    typeClass: "button--green",
    featured: false,
  },
];

const RelatedVacanciesSlider: React.FC = () => (
  <section className="medium-padding120">
    <div className="container">
      <div className="row mb60">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <header className="crumina-module crumina-heading heading--h2 heading--with-decoration heading--inline mb-0">
            <h2 className="heading-title">Browse the Related Vacancies</h2>
            <div className="heading-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
          </header>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="crumina-module crumina-module-slider pagination-bottom-center slider--item-with-shadow">
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              pagination={{
                  clickable: true,
              }}
              navigation={false}
              modules={[Pagination]}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 4,
                },
              }}
              loop={true}
              className="swiper-container"
            >
              {relatedJobs.map((job, idx) => (
                <SwiperSlide key={idx} className="swiper-slide" style={{ height: 'auto' }} >
                  <div className={`ui-card h-100`}>
                    <div className="ui-card-content">
                      <div className="vacancies-title-location">
                        <a href="/jobs/job-details" className="vacancies-title h6">{job.title}</a>
                        <div className="vacancies-location">
                          <time className="published">{job.time}</time>
                          {job.location}
                        </div>
                      </div>
                      <a href="#" className="logo-company w-100">
                        <img className="logo" src={job.companyLogo} title="company" alt="company" />
                      </a>
                    </div>
                    <div className="ui-card-footer">
                      <a href="#" className="link--uppercase-wide fs-12">{job.category}</a>
                      <button type="button" className={`crumina-button ${job.typeClass} button--xxs button--uppercase-wide`}>{job.type}</button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default RelatedVacanciesSlider;