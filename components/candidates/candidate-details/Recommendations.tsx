"use client";
import React from "react";
import Image from "next/image";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const recommendations = [
  {
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    author: "Philip Demarco",
    role: "Copywriter",
    avatar: "/img/author6.jpg",
  },
  {
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua in voluptate velit esse cillum.",
    author: "Angelina Johnson",
    role: "Graphic Designer",
    avatar: "/img/author1.jpg",
  },
  {
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
    author: "Peter Spenser",
    role: "Marketing Director",
    avatar: "/img/author7.jpg",
  },
  {
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    author: "Philip Demarco",
    role: "Copywriter",
    avatar: "/img/author6.jpg",
  },
  {
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua in voluptate velit esse cillum.",
    author: "Angelina Johnson",
    role: "Graphic Designer",
    avatar: "/img/author1.jpg",
  },
  {
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
    author: "Peter Spenser",
    role: "Marketing Director",
    avatar: "/img/author7.jpg",
  },
  {
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    author: "Philip Demarco",
    role: "Copywriter",
    avatar: "/img/author6.jpg",
  },
];

const Recommendations = () => {


  return (
    <div className="widget w-quotes widget-sidebar">
      <h3 className="widget-title">Recommendations:</h3>

      <div className="crumina-module crumina-module-slider pagination-bottom-center slider--item-with-shadow">
      <Swiper
              slidesPerView={1}
              spaceBetween={40}
              pagination={{
                clickable: true,
              }}
              navigation={false}
              loop={true}
              modules={[Pagination]}
              className="swiper-container auto-height"
            >
              {recommendations.map((recommendation, index) => (
                <SwiperSlide key={index} className="swiper-slide">
                  <blockquote className="quote--squared h-100">
                    <p>
                      <i className="puzzle-icon quote fas fa-quote-left"></i>
                      {recommendation.quote}
                    </p>

                    <div className="quote-footer">
                      <div className="author-block">
                        <div className="avatar avatar--70">
                          <Image
                            src={recommendation.avatar}
                            alt={recommendation.author}
                            width={70}
                            height={70}
                          />
                        </div>
                        <div className="author-content">
                          <h6 className="author-name">
                            {recommendation.author}
                          </h6>
                          <div className="author-prof">
                            {recommendation.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  </blockquote>
                </SwiperSlide>
              ))}
            </Swiper>
      </div>
    </div>
  );
};

export default Recommendations;
