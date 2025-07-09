"use client";

import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';

const NewsDetailsGallery: React.FC = () => {
  return (
    <div className="main-content-wrapper">
      <div
        className="header--spacer"
        style={{ height: "142.234px", backgroundColor: "rgb(18, 18, 20)" }}
      ></div>
      <section className="stunning-header bg-dark-themes pb120 pt80">
        <div className="overlay overlay-stunning"></div>
        <div className="container">
          <div className="row align-items-end">
            <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
              <ul className="breadcrumbs">
                <li className="breadcrumbs-item">
                  <Link href="/">
                    Home
                    <i className="puzzle-icon fal fa-angle-double-right"></i>
                  </Link>
                </li>
                <li className="breadcrumbs-item">
                  <Link href="/news">
                    News
                    <i className="puzzle-icon fal fa-angle-double-right"></i>
                  </Link>
                </li>
                <li className="breadcrumbs-item active">
                  <span>Photography, Art</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-5 mb-lg-0">
              <h1 className="page-title text-white">
                H1. Photo Gallery Post Format
              </h1>
            </div>

            <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
              <div className="input--with-icon input--icon-right">
                <input
                  id="input2"
                  className="input--dark"
                  name="name"
                  placeholder="What are you looking for?"
                  type="text"
                />
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
                    <Link href="/author" className="link--uppercase-wide fs-12">
                      Betty Stevens
                    </Link>
                  </div>
                </div>

                <div className="info-item my-2">
                  <div className="description">Categorys:</div>
                  <div className="value">
                    <Link href="#" className="link--uppercase-wide fs-12">
                      Business
                    </Link>
                    ,
                    <Link href="#" className="link--uppercase-wide fs-12">
                      Startup
                    </Link>
                  </div>
                </div>

                <div className="info-item my-2">
                  <div className="description">Date:</div>
                  <div className="value">
                    <Link href="#" className="link--uppercase-wide fs-12">
                      26 November 2018
                    </Link>
                  </div>
                </div>

                <div className="info-item my-2">
                  <div className="description">Comments:</div>
                  <div className="value">
                    <Link href="#" className="link--uppercase-wide fs-12">
                      <span> 0 </span>
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
                    >
                      <div className="swiper-btn-prev">
                        <i className="puzzle-icon fal fa-long-arrow-left" />
                      </div>
                      <div className="swiper-btn-next">
                        <i className="puzzle-icon fal fa-long-arrow-right" />
                      </div>
                      {[1, 2, 3, 4].map((i) => (
                        <SwiperSlide key={i}>
                          <img src="/img/post15.jpg" alt="post" />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <div className="swiper-pagination"></div>
                  </div>
                </div>
                <div className="container">
                  <div className="row mt60">
                    <div className="col-lg-1 col-md-2 col-sm-2 col-xs-2 col-2">
                      <div className="crumina-sticky-sidebar">
                        <div className="sidebar__inner">
                          <ul className="socials socials--round socials--blog">
                            <li>
                              <Link className="bg-facebook" href="#">
                                <i className="puzzle-icon fab fa-facebook-f"></i>
                              </Link>
                            </li>
                            <li>
                              <Link className="bg-messanger" href="#">
                                <i className="puzzle-icon fab fa-facebook-messenger"></i>
                              </Link>
                            </li>
                            <li>
                              <Link className="bg-twitter" href="#">
                                <i className="puzzle-icon fab fa-twitter"></i>
                              </Link>
                            </li>
                            <li>
                              <Link className="bg-google" href="#">
                                <i className="puzzle-icon fab fa-google-plus-g"></i>
                              </Link>
                            </li>
                            <li>
                              <Link className="bg-telegram" href="#">
                                <i className="puzzle-icon fab fa-telegram-plane"></i>
                              </Link>
                            </li>
                            <li>
                              <Link className="bg-linkedin" href="#">
                                <i className="puzzle-icon fab fa-linkedin-in"></i>
                              </Link>
                            </li>
                            <li>
                              <Link className="bg-email" href="#">
                                <i className="puzzle-icon far fa-at"></i>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-8 offset-lg-1 col-md-8 col-sm-10 col-xs-10 col-10">
                      <p className="fs-20">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                        enim ad minim veniam, quis nostrud exercitation ullamco laboris
                        nisi ut aliquip ex ea commodo.
                      </p>
                      <h2>
                        H2. Duis aute irure dolor in reprehenderit in voluptate
                        velit
                      </h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                        do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit
                        esse cillum dolore eu fugiat nulla pariatur.
                      </p>
                      <h3>H3. Excepteur sint occaecat cupidatat</h3>
                      <p>
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                        irure dolor in reprehenderit in voluptate velit esse cillum
                        dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt
                        mollit anim id est laborum.
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                        do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua.
                      </p>
                      <blockquote>
                        <p>
                          Ut enim ad minim veniam, quis nostrud exercitation ullamco
                          laboris nisi ut aliquip ex ea commodo consequat velit esse
                          cillum dolore.
                        </p>
                        <h6>
                          Angelina Johnson <span>Graphic Designer</span>
                        </h6>
                      </blockquote>
                      <h3>
                        H3. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris
                      </h3>
                      <p>
                        Duis aute irure dolor in reprehenderit in voluptate velit
                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                        occaecat cupidatat non proident, sunt in culpa qui officia
                        deserunt mollit anim id est laborum.
                      </p>
                    </div>
                    <div className="col-lg-10 col-md-12 col-sm-12 col-xs-12 mx-auto">
                      <div className="wp-caption alignnone my-3 my-sm-5">
                        <img src="/img/post16.jpg" alt="post" />
                        <div className="wp-caption-text">
                          Lorem ipsum dolor sit amet, sint occaecat cupidatat non proident. Photo by @brookecagle <Link href="#">Unsplash</Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12 mx-auto">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                        do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                      <h4>H4. Cepteur sint occaecat cupidatat non proident</h4>
                      <p>
                        Duis aute irure dolor in reprehenderit in voluptate velit
                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                        occaecat cupidatat non proident, sunt in culpa qui officia
                        deserunt mollit anim id est laborum.
                      </p>
                      <ol>
                        <li>
                          <Link href="#">Lorem ipsum dolor sit amet.</Link>
                        </li>
                        <li>
                          <Link href="#">
                            Veniam, quis nostrud exercitation ullamco.
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            Ut enim ad minim veniam, quis nostrud.
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            Duis aute irure dolor in reprehenderit.
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            Excepteur sint occaecat cupidatat non proident.
                          </Link>
                        </li>
                        <li>
                          <Link href="#">Sunt in culpa qui officia.</Link>
                        </li>
                      </ol>
                      <p>
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                        irure dolor in reprehenderit in voluptate velit esse cillum
                        dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt
                        mollit anim id est laborum.
                      </p>
                      <h5>
                        H5. Quis nostrud exercitation ullamco laboris nisi ut
                        aliquip:
                      </h5>
                      <ul>
                        <li>
                          <Link href="#">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod.
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            Veniam, quis nostrud exercitation ullamco laboris nisi.
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            Ut enim ad minim veniam, quis nostrud.
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            Duis aute irure dolor in reprehenderit in voluptate
                            velit esse.
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            Excepteur sint occaecat cupidatat non proident.
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            Sunt in culpa qui officia deserunt mollit anim id est
                            laborum.
                          </Link>
                        </li>
                      </ul>
                      <p>
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                        irure dolor in reprehenderit in voluptate velit esse cillum
                        dolore eu fugiat nulla pariatur.
                      </p>
                      <ul className="tags-list mt60">
                        <li>
                          <Link href="#">Startup</Link>
                        </li>
                        <li>
                          <Link href="#">Business</Link>
                        </li>
                        <li>
                          <Link href="#">Art</Link>
                        </li>
                        <li>
                          <Link href="#">Photographyp</Link>
                        </li>
                        <li>
                          <Link href="#">Creative</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light-grey medium-padding120">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mx-auto">
              <form className="contact-form form--bg-white leave-reply" method="post">
                <div className="row align-items-center">
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <header className="crumina-module crumina-heading heading--h2 heading--with-decoration">
                      <h2 className="heading-title">Leave a Comment</h2>
                    </header>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-4 mb-md-0">
                    <div className="c-grey">* Lorem ipsum dolor sit, consectetur adipiscing elit, sed do.</div>
                  </div>
                </div>
                <textarea
                  rows={5}
                  name="message"
                  id="message"
                  placeholder="Your Message"
                ></textarea>
                <input name="name" placeholder="Your Name" type="text" />
                <input
                  name="email"
                  placeholder="Your Email Address"
                  type="email"
                />
                <input name="site" placeholder="Website" type="text" />
                <button
                  type="button"
                  className="crumina-button button--dark button--xl mt-3"
                >
                  Post a Comment
                </button>
              </form>

              <div className="comments pt80">
                <header className="crumina-module crumina-heading heading--h2 heading--with-decoration heading--inline">
                  <h2 className="heading-title">6 Comments</h2>
                </header>
                <ol className="comments__list">
                  <li className="comments__item">
                    <div className="comment-entry comment comments__article">
                      <div className="comments__body">
                        <div className="comments__avatar">
                          <div className="author-block">
                            <div className="avatar avatar--70">
                              <img src="/img/author6.jpg" alt="avatar" />
                            </div>
                          </div>
                        </div>
                        <header className="comment-meta comments__header">
                          <cite className="fn url comments__author">
                            <Link href="#" rel="external" className="h6">
                              Philip Demarco
                            </Link>
                          </cite>
                          <div className="comment-content comment">
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore et
                              dolore magna aliqua. Ut enim ad minim veniam, quis
                              nostrud exercitation ullamco laboris nisi ut
                              aliquip.
                            </p>
                          </div>
                        </header>
                      </div>
                      <div className="comments__footer">
                        <div className="comments__time">
                          <Link
                            href="#"
                            className="published link--uppercase-wide c-grey fs-12"
                          >
                            23 October 2018
                          </Link>
                        </div>
                        <Link
                          href="#"
                          className="link--uppercase-wide link--with-icon link--icon-right fs-12"
                        >
                          Reply<i className="puzzle-icon far fa-angle-right"></i>
                        </Link>
                      </div>
                    </div>
                    <ol className="children">
                      <li className="comments__item">
                        <div className="comment-entry comment comments__article">
                          <div className="comments__body">
                            <div className="comments__avatar">
                              <div className="author-block">
                                <div className="avatar avatar--70">
                                  <img src="/img/author2.jpg" alt="avatar" />
                                </div>
                              </div>
                            </div>
                            <header className="comment-meta comments__header">
                              <cite className="fn url comments__author">
                                <Link href="#" rel="external" className="h6">
                                  Jerry Thomas
                                </Link>
                              </cite>
                              <div className="comment-content comment">
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit.
                                </p>
                              </div>
                            </header>
                          </div>
                          <div className="comments__footer">
                            <div className="comments__time">
                              <Link
                                href="#"
                                className="published link--uppercase-wide c-grey fs-12"
                              >
                                23 October 2018
                              </Link>
                            </div>
                            <Link
                              href="#"
                              className="link--uppercase-wide link--with-icon link--icon-right fs-12"
                            >
                              Reply
                              <i className="puzzle-icon far fa-angle-right"></i>
                            </Link>
                          </div>
                        </div>
                      </li>
                      <li className="comments__item">
                        <div className="comment-entry comment comments__article">
                          <div className="comments__body">
                            <div className="comments__avatar">
                              <div className="author-block">
                                <div className="avatar avatar--70">
                                  <img src="/img/author10.jpg" alt="avatar" />
                                </div>
                              </div>
                            </div>
                            <header className="comment-meta comments__header">
                              <cite className="fn url comments__author">
                                <Link href="#" rel="external" className="h6">
                                  Betty Stevens
                                </Link>
                              </cite>
                              <div className="comment-content comment">
                                <p>
                                  Duis aute irure dolor in reprehenderit in
                                  voluptate velit esse cillum dolore eu fugiat
                                  nulla pariatur. Excepteur sint occaecat
                                  cupidatat non proident, sunt in culpa qui
                                  officia deserunt mollit anim id est laborum.
                                </p>
                              </div>
                            </header>
                          </div>
                          <div className="comments__footer">
                            <div className="comments__time">
                              <Link
                                href="#"
                                className="published link--uppercase-wide c-grey fs-12"
                              >
                                23 October 2018
                              </Link>
                            </div>
                            <Link
                              href="#"
                              className="link--uppercase-wide link--with-icon link--icon-right fs-12"
                            >
                              Reply
                              <i className="puzzle-icon far fa-angle-right"></i>
                            </Link>
                          </div>
                        </div>
                        <ol className="children">
                          <li className="comments__item">
                            <div className="comment-entry comment comments__article">
                              <div className="comments__body">
                                <div className="comments__avatar">
                                  <div className="author-block">
                                    <div className="avatar avatar--70">
                                      <img src="/img/author3.jpg" alt="avatar" />
                                    </div>
                                  </div>
                                </div>
                                <header className="comment-meta comments__header">
                                  <cite className="fn url comments__author">
                                    <Link href="#" rel="external" className="h6">
                                      Catherine White
                                    </Link>
                                  </cite>
                                  <div className="comment-content comment">
                                    <p>
                                      Excepteur sint occaecat cupidatat non
                                      proident, sunt in culpa qui officia deserunt
                                      mollit anim id est laborum.
                                    </p>
                                  </div>
                                </header>
                              </div>
                              <div className="comments__footer">
                                <div className="comments__time">
                                  <Link
                                    href="#"
                                    className="published link--uppercase-wide c-grey fs-12"
                                  >
                                    23 October 2018
                                  </Link>
                                </div>
                                <Link
                                  href="#"
                                  className="link--uppercase-wide link--with-icon link--icon-right fs-12"
                                >
                                  Reply
                                  <i className="puzzle-icon far fa-angle-right"></i>
                                </Link>
                              </div>
                            </div>
                          </li>
                        </ol>
                      </li>
                    </ol>
                  </li>
                  <li className="comments__item">
                    <div className="comment-entry comment comments__article">
                      <div className="comments__body">
                        <div className="comments__avatar">
                          <div className="author-block">
                            <div className="avatar avatar--70">
                              <img src="/img/author11.jpg" alt="avatar" />
                            </div>
                          </div>
                        </div>
                        <header className="comment-meta comments__header">
                          <cite className="fn url comments__author">
                            <Link href="#" rel="external" className="h6">
                              Russell Wright
                            </Link>
                          </cite>
                          <div className="comment-content comment">
                            <p>
                              Duis aute irure dolor in reprehenderit in voluptate
                              velit esse cillum dolore eu fugiat nulla pariatur.
                              Excepteur sint occaecat cupidatat non proident, sunt
                              in culpa qui officia deserunt mollit anim id est
                              laborum.
                            </p>
                          </div>
                        </header>
                      </div>
                      <div className="comments__footer">
                        <div className="comments__time">
                          <Link
                            href="#"
                            className="published link--uppercase-wide c-grey fs-12"
                          >
                            23 October 2018
                          </Link>
                        </div>
                        <Link
                          href="#"
                          className="link--uppercase-wide link--with-icon link--icon-right fs-12"
                        >
                          Reply<i className="puzzle-icon far fa-angle-right"></i>
                        </Link>
                      </div>
                    </div>
                    <ol className="children">
                      <li className="comments__item">
                        <div className="comment-entry comment comments__article">
                          <div className="comments__body">
                            <div className="comments__avatar">
                              <div className="author-block">
                                <div className="avatar avatar--70">
                                  <img src="/img/author13.jpg" alt="avatar" />
                                </div>
                              </div>
                            </div>
                            <header className="comment-meta comments__header">
                              <cite className="fn url comments__author">
                                <Link href="#" rel="external" className="h6">
                                  Maria Bowman
                                </Link>
                              </cite>
                              <div className="comment-content comment">
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit.
                                </p>
                              </div>
                            </header>
                          </div>
                          <div className="comments__footer">
                            <div className="comments__time">
                              <Link
                                href="#"
                                className="published link--uppercase-wide c-grey fs-12"
                              >
                                23 October 2018
                              </Link>
                            </div>
                            <Link
                              href="#"
                              className="link--uppercase-wide link--with-icon link--icon-right fs-12"
                            >
                              Reply
                              <i className="puzzle-icon far fa-angle-right"></i>
                            </Link>
                          </div>
                        </div>
                      </li>
                    </ol>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="medium-padding120">
        <div className="container">
          <div className="row mb60">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <header className="crumina-module crumina-heading heading--h2 heading--with-decoration heading--inline mb-0">
                <h2 className="heading-title">You may be interested to read it</h2>
                <div className="heading-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
              </header>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 mb-4 mb-md-0">
              <article className="hentry post post-standard has-post-thumbnail mb-0" data-mh="blog-item">
                <div className="post-header">
                  <Link href="#" className="post-category">Business</Link>
                </div>
                <div className="post__content">
                  <div className="post-content-wrap">
                    <Link href="#" className="post-title h5">Simple Post with Featured Image</Link>
                  </div>
                  <div className="post-thumb">
                    <img src="/img/post2.jpg" alt="post" />
                  </div>
                </div>
                <div className="post-additional-info">
                  <time className="post__date published" dateTime="2018-12-08 12:00:00">26 November 2018</time>
                  <Link href="#" className="post__comments">0<i className="puzzle-icon fas fa-comment-alt-dots"></i></Link>
                </div>
              </article>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 mb-4 mb-md-0">
              <article className="hentry post post-standard has-post-thumbnail mb-0" data-mh="blog-item">
                <div className="post-header">
                  <Link href="#" className="post-category">Startup</Link>
                </div>
                <div className="post__content">
                  <div className="post-content-wrap">
                    <Link href="#" className="post-title h5">Simple Post with Featured Image</Link>
                  </div>
                  <div className="post-thumb">
                    <img src="/img/post5.jpg" alt="post" />
                  </div>
                </div>
                <div className="post-additional-info">
                  <time className="post__date published" dateTime="2018-09-13 12:00:00">13 September 2018</time>
                  <Link href="#" className="post__comments">46<i className="puzzle-icon fas fa-comment-alt-dots"></i></Link>
                </div>
              </article>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <article className="hentry post post-standard has-post-thumbnail video-standard mb-0" data-mh="blog-item">
                <div className="post-header">
                  <Link href="#" className="post-category">Creative</Link>
                </div>
                <div className="post__content">
                  <div className="post-content-wrap">
                    <Link href="#" className="post-title h5">Standard Video Post Format</Link>
                  </div>
                  <div className="post-thumb">
                    <img src="/img/post6.jpg" alt="post" />
                    <Link href="https://www.youtube.com/watch?v=wnJ6LuUFpMo" className="video-control video-control-standard js-popup-iframe">
                      <svg className="puzzle-icon" width="14" height="17">
                        <path fill="none" stroke="#FFF" strokeWidth="2" d="M1 1l11 6.533L1 15V1z" />
                      </svg>
                    </Link>
                  </div>
                </div>
                <div className="post-additional-info">
                  <time className="post__date published" dateTime="2018-10-14 12:00:00">22 August 2018</time>
                  <Link href="#" className="post__comments">2<i className="puzzle-icon fas fa-comment-alt-dots"></i></Link>
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
