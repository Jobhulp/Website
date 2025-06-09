import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const NewsDetailsGallery: React.FC = () => {
  return (
    <div className="main-content-wrapper">
      <section className="stunning-header bg-dark-themes pb120 pt80">
        <div className="overlay overlay-stunning"></div>
        <div className="container">
          <div className="row align-items-end">
            <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
              <ul className="breadcrumbs">
                <li className="breadcrumbs-item">
                  <Link href="/">Home<i className="puzzle-icon fal fa-angle-double-right"></i></Link>
                </li>
                <li className="breadcrumbs-item">
                  <Link href="/news">News<i className="puzzle-icon fal fa-angle-double-right"></i></Link>
                </li>
                <li className="breadcrumbs-item active">
                  <span>Photography, Art</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-5 mb-lg-0">
              <h1 className="page-title text-white">H1. Photo Gallery Post Format</h1>
            </div>

            <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
              <div className="input--with-icon input--icon-right">
                <input id="input2" className="input--dark" name="name" placeholder="What are you looking for?" type="text" />
                <i className="puzzle-icon fal fa-search"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="my-3">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
              <div className="post-info">
                <div className="author-block info-item my-2">
                  <div className="avatar avatar--60">
                    <img src="/img/author10.jpg" alt="avatar" />
                  </div>
                  <div className="author-content">
                    <div className="description">Posted by</div>
                    <Link href="/author" className="link--uppercase-wide fs-12">Betty Stevens</Link>
                  </div>
                </div>

                <div className="info-item my-2">
                  <div className="description">Categorys:</div>
                  <div className="value">
                    <Link href="#" className="link--uppercase-wide fs-12">Business</Link>,
                    <Link href="#" className="link--uppercase-wide fs-12">Startup</Link>
                  </div>
                </div>

                <div className="info-item my-2">
                  <div className="description">Date:</div>
                  <div className="value">
                    <Link href="#" className="link--uppercase-wide fs-12">26 November 2018</Link>
                  </div>
                </div>

                <div className="info-item my-2">
                  <div className="description">Comments:</div>
                  <div className="value">
                    <Link href="#" className="link--uppercase-wide fs-12">
                      0
                      <i className="puzzle-icon fas fa-comment-alt-dots c-grey"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb80">
        <div className="container-fluid no-padding">
          <div className="row no-gutters">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <article className="hentry post post-standard has-post-thumbnail post-standard-details slider">
                <div className="post-thumb">
                  <div className="crumina-module crumina-module-slider navigation-center-both-sides pagination-bottom-center">
                    <Swiper
                      spaceBetween={0}
                      slidesPerView={1}
                      navigation
                      pagination={{ clickable: true }}
                    >
                      <SwiperSlide>
                        <img src="/img/post15.jpg" alt="post" />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img src="/img/post15.jpg" alt="post" />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img src="/img/post15.jpg" alt="post" />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img src="/img/post15.jpg" alt="post" />
                      </SwiperSlide>
                    </Swiper>
                  </div>
                </div>

                <div className="container">
                  <div className="row mt60">
                    <div className="col-lg-1 col-md-2 col-sm-2 col-xs-2 col-2">
                      <div className="crumina-sticky-sidebar">
                        <div className="sidebar__inner">
                          <ul className="socials socials--round socials--blog">
                            {/* Social media links */}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-8 offset-lg-1 col-md-8 col-sm-10 col-xs-10 col-10">
                      {/* Article content will go here */}
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsDetailsGallery;