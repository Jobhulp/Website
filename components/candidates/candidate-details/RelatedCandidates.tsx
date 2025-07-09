import React from "react";
import { Pagination } from "swiper/modules";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

interface Candidate {
  name: string;
  location: string;
  avatar: string;
  role: string;
  rate: string;
}

const candidates: Candidate[] = [
  {
    name: "Jerry Thomas",
    location: "London, United Kingdom",
    avatar: "/img/author8.jpg",
    role: "Web Developer",
    rate: "$45 / Hour"
  },
  {
    name: "Catherine White",
    location: "New York, USA",
    avatar: "/img/author9.jpg",
    role: "UX/UI Designer",
    rate: "$60 / Hour"
  },
  {
    name: "Betty Stevens",
    location: "Melbourne, Australia",
    avatar: "/img/author10.jpg",
    role: "Web Designer",
    rate: "$45 / Hour"
  },
  {
    name: "Russell Wright",
    location: "California, USA",
    avatar: "/img/author11.jpg",
    role: "Marketing Director",
    rate: "$35 / Hour"
  },
  {
    name: "Doris Stewart",
    location: "Cologne, Germany",
    avatar: "/img/author12.jpg",
    role: "Web Developer",
    rate: "$60 / Hour"
  },
  {
    name: "Maria Bowman",
    location: "New York, USA",
    avatar: "/img/author13.jpg",
    role: "UX/UI Designer",
    rate: "$60 / Hour"
  }
];

const RelatedCandidates: React.FC = () => {


  return (
    <section className="medium-padding120">
      <div className="container">
        <div className="row mb60">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <header className="crumina-module crumina-heading heading--h2 heading--with-decoration heading--inline mb-0">
              <h2 className="heading-title">Browse the Related Candidates</h2>
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
                }}
                loop={true}
                className="swiper-container"
              >
                  {candidates.map((candidate, idx) => (
                    <SwiperSlide className="swiper-slide" key={idx}>
                      <div className="ui-card featured-vacancies">
                        <div className="ui-card-content">
                          <div className="vacancies-title-location">
                            <Link href="/candidate-details" className="vacancies-title h5">{candidate.name}</Link>
                            <div className="vacancies-location">{candidate.location}</div>
                          </div>
                          <div className="avatar avatar--80">
                            <img src={candidate.avatar} alt="avatar" />
                          </div>
                        </div>
                        <div className="ui-card-footer">
                          <a href="#" className="link--uppercase-wide fs-12">{candidate.role}</a>
                          <a href="#" className="link--bold fs-12">{candidate.rate}</a>
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
};

export default RelatedCandidates;