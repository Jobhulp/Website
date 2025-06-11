import React from 'react';
import Link from 'next/link';

const NewsDetailsVideo: React.FC = () => {
  return (
    <div className="main-content-wrapper">
      <div className="header--spacer" style={{ height: "142.234px", backgroundColor: "rgb(18, 18, 20)" }}></div>
      <section className="stunning-header bg-light-grey stunning-bg4 pb120 pt80">
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
                  <span>Creative</span>
                </li>
              </ul>
              <h1 className="page-title text-white">Standard Video Post Format</h1>

              <div className="post-info my-3 my-sm-5">
                <div className="author-block info-item my-2">
                  <div className="avatar avatar--60">
                    <img src="/img/author10.jpg" alt="avatar" />
                  </div>
                  <div className="author-content">
                    <div className="description">Posted by</div>
                    <Link href="/author" className="link--uppercase-wide fs-12 text-white">Betty Stevens</Link>
                  </div>
                </div>

                <div className="info-item my-2">
                  <div className="description">Categorys:</div>
                  <div className="value">
                    <Link href="#" className="link--uppercase-wide arrow--white fs-12">Business</Link>,
                    <Link href="#" className="link--uppercase-wide arrow--white fs-12">Startup</Link>
                  </div>
                </div>

                <div className="info-item my-2">
                  <div className="description">Date:</div>
                  <div className="value">
                    <Link href="#" className="link--uppercase-wide arrow--white fs-12">26 November 2018</Link>
                  </div>
                </div>

                <div className="info-item my-2">
                  <div className="description">Comments:</div>
                  <div className="value">
                    <Link href="#" className="link--uppercase-wide arrow--white fs-12">
                      0
                      <i className="puzzle-icon fas fa-comment-alt-dots c-grey"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
              <article className="hentry post post-standard has-post-thumbnail post-standard-details video-youtube">
                <div className="post__content">
                  <p className="fs-20">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo.
                  </p>

                  <div className="post-thumb">
                    <img src="/img/post17.jpg" alt="post" />
                    <a href="https://www.youtube.com/watch?v=wnJ6LuUFpMo" className="video-control video-control-youtube youtube--big js-popup-iframe">
                      <svg className="puzzle-icon" width="21" height="26">
                        <path fill="#FFF" fillRule="evenodd" d="M0 .016l21 12.119L0 25.984V.016z" />
                      </svg>
                    </a>
                  </div>

                  <h2>H2. Duis aute irure dolor in reprehenderit in voluptate velit</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                    irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  </p>
                  <h3>H3. Excepteur sint occaecat cupidatat</h3>
                  <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                    ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                    sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <blockquote>
                    <p>Ut enim ad minim veniam,
                      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                      commodo consequat velit esse cillum dolore.
                    </p>
                    <h6>
                      Angelina Johnson
                      <span>Graphic Designer</span>
                    </h6>
                  </blockquote>
                  <h3>H3. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</h3>
                  <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
                    qui officia deserunt mollit anim id est laborum.
                  </p>
                  <div className="wp-caption alignleft">
                    <img className="alignleft" src="/img/post18.jpg" alt="post" />
                  </div>
                  <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                    anim id est laborum quis nostrud exercitation ullamco laboris nisi ut aliquip ipsum
                    dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut
                  </p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <h4>H4. Cepteur sint occaecat cupidatat non proident</h4>
                  <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                    nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                    officia deserunt mollit anim id est laborum.
                  </p>
                  <ol>
                    <li>
                      <Link href="#">Lorem ipsum dolor sit amet.</Link>
                    </li>
                    <li>
                      <Link href="#">Veniam, quis nostrud exercitation ullamco.</Link>
                    </li>
                    <li>
                      <Link href="#">Ut enim ad minim veniam, quis nostrud.</Link>
                    </li>
                    <li>
                      <Link href="#">Duis aute irure dolor in reprehenderit.</Link>
                    </li>
                    <li>
                      <Link href="#">Excepteur sint occaecat cupidatat non proident.</Link>
                    </li>
                    <li>
                      <Link href="#">Sunt in culpa qui officia.</Link>
                    </li>
                  </ol>
                  <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                    ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                    sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  <h5>H5. Quis nostrud exercitation ullamco laboris nisi ut aliquip:</h5>
                  <ul>
                    <li>
                      <Link href="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</Link>
                    </li>
                    <li>
                      <Link href="#">Veniam, quis nostrud exercitation ullamco laboris nisi.</Link>
                    </li>
                    <li>
                      <Link href="#">Ut enim ad minim veniam, quis nostrud.</Link>
                    </li>
                    <li>
                      <Link href="#">Duis aute irure dolor in reprehenderit in voluptate velit esse.</Link>
                    </li>
                    <li>
                      <Link href="#">Excepteur sint occaecat cupidatat non proident.</Link>
                    </li>
                    <li>
                      <Link href="#">Sunt in culpa qui officia deserunt mollit anim id est laborum.</Link>
                    </li>
                  </ul>
                  <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                    ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur.
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
                  <div className="ui-card-footer">
                    <div className="d-flex align-items-center w-100">
                      <h5 className="mr-4">Share:</h5>
                      <ul className="socials socials--round socials--colored">
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
                  <div className="d-flex justify-content-between align-items-center flex-wrap mt60">
                    <Link href="/news/news-details-gallery" className="crumina-button button--dark button--xl button--bordered button--uppercase-wide button--with-icon button--icon-left my-2 w-45"><i className="puzzle-icon fal fa-long-arrow-left"></i>Previous Post</Link>
                    <Link href="/news/news-details-video" className="crumina-button button--dark button--xl button--bordered button--uppercase-wide button--with-icon button--icon-right my-2 w-45">Next Post<i className="puzzle-icon fal fa-long-arrow-right"></i></Link>
                  </div>
                  <div className="comments medium-padding80" id="comments">
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
                                <Link href="#" rel="external" className="h6">Philip Demarco</Link>
                              </cite>
                              <div className="comment-content comment">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
                              </div>
                            </header>
                          </div>
                          <div className="comments__footer">
                            <div className="comments__time">
                              <Link href="#" className="published link--uppercase-wide c-grey fs-12">23 October 2018</Link>
                            </div>
                            <Link href="#" className="link--uppercase-wide link--with-icon link--icon-right fs-12">Reply<i className="puzzle-icon far fa-angle-right"></i></Link>
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
                                    <Link href="#" rel="external" className="h6">Jerry Thomas</Link>
                                  </cite>
                                  <div className="comment-content comment">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                  </div>
                                </header>
                              </div>
                              <div className="comments__footer">
                                <div className="comments__time">
                                  <Link href="#" className="published link--uppercase-wide c-grey fs-12">23 October 2018</Link>
                                </div>
                                <Link href="#" className="link--uppercase-wide link--with-icon link--icon-right fs-12">Reply<i className="puzzle-icon far fa-angle-right"></i></Link>
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
                                    <Link href="#" rel="external" className="h6">Betty Stevens</Link>
                                  </cite>
                                  <div className="comment-content comment">
                                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                  </div>
                                </header>
                              </div>
                              <div className="comments__footer">
                                <div className="comments__time">
                                  <Link href="#" className="published link--uppercase-wide c-grey fs-12">23 October 2018</Link>
                                </div>
                                <Link href="#" className="link--uppercase-wide link--with-icon link--icon-right fs-12">Reply<i className="puzzle-icon far fa-angle-right"></i></Link>
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
                                        <Link href="#" rel="external" className="h6">Catherine White</Link>
                                      </cite>
                                      <div className="comment-content comment">
                                        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                      </div>
                                    </header>
                                  </div>
                                  <div className="comments__footer">
                                    <div className="comments__time">
                                      <Link href="#" className="published link--uppercase-wide c-grey fs-12">23 October 2018</Link>
                                    </div>
                                    <Link href="#" className="link--uppercase-wide link--with-icon link--icon-right fs-12">Reply<i className="puzzle-icon far fa-angle-right"></i></Link>
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
                                <Link href="#" rel="external" className="h6">Russell Wright</Link>
                              </cite>
                              <div className="comment-content comment">
                                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                              </div>
                            </header>
                          </div>
                          <div className="comments__footer">
                            <div className="comments__time">
                              <Link href="#" className="published link--uppercase-wide c-grey fs-12">23 October 2018</Link>
                            </div>
                            <Link href="#" className="link--uppercase-wide link--with-icon link--icon-right fs-12">Reply<i className="puzzle-icon far fa-angle-right"></i></Link>
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
                                    <Link href="#" rel="external" className="h6">Maria Bowman</Link>
                                  </cite>
                                  <div className="comment-content comment">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                  </div>
                                </header>
                              </div>
                              <div className="comments__footer">
                                <div className="comments__time">
                                  <Link href="#" className="published link--uppercase-wide c-grey fs-12">23 October 2018</Link>
                                </div>
                                <Link href="#" className="link--uppercase-wide link--with-icon link--icon-right fs-12">Reply<i className="puzzle-icon far fa-angle-right"></i></Link>
                              </div>
                            </div>
                          </li>
                        </ol>
                      </li>
                    </ol>
                  </div>
                  <form className="contact-form leave-reply" method="post">
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
                    <textarea rows={5} name="message" id="message" placeholder="Your Message"></textarea>
                    <input name="name" placeholder="Your Name" type="text" />
                    <input name="email" placeholder="Your Email Address" type="email" />
                    <input name="site" placeholder="Website" type="text" />
                    <button type="button" className="crumina-button button--dark button--xl mt-3">Post a Comment</button>
                  </form>
                </div>
              </article>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 mt-4 mt-lg-0">
              <div className="crumina-sticky-sidebar">
                <div className="sidebar__inner">
                  <aside aria-label="sidebar" className="sidebar sidebar-right">
                    <div className="widget w-info widget-sidebar">
                      <Link href="/" className="site-logo">
                        <img className="puzzle-icon" src="/img/svg/02_logo_dark.svg" alt="logo" width="120" />
                      </Link>
                      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est.</p>
                      <Link href="/how-it-works" className="crumina-button button--dark button--m">How it works?</Link>
                    </div>
                    <div className="widget w-search widget-sidebar">
                      <h4 className="widget-title">What are you looking for?</h4>
                      <div className="input--with-icon input--icon-right">
                        <input id="search" name="search" placeholder="Search" type="text" />
                        <i className="puzzle-icon fal fa-search"></i>
                      </div>
                    </div>
                    <div className="widget widget_links widget-sidebar">
                      <h4 className="widget-title">Categories</h4>
                      <ul>
                        <li><Link href="#">Startup</Link></li>
                        <li><Link href="#">Business</Link></li>
                        <li><Link href="#">Marketing</Link></li>
                        <li><Link href="#">Creative</Link></li>
                        <li><Link href="#">Photography</Link></li>
                        <li><Link href="#">Artp</Link></li>
                      </ul>
                    </div>
                    <div className="widget w-recent-posts widget-sidebar">
                      <h4 className="widget-title">JJobs from Envato</h4>
                      <ul>
                        <li><Link href="#">Attached: The Important & Standard Post Format</Link></li>
                        <li><Link href="#">Simple Post Format with Featured Image</Link></li>
                        <li><Link href="#">YouTube Video Post Format</Link></li>
                        <li><Link href="#">SoundCloud Audio Post Format</Link></li>
                        <li><Link href="#">Simple Post Format with Featured Image</Link></li>
                      </ul>
                    </div>
                    <div className="widget w-banner widget-sidebar">
                      <div className="banner-header">Advertising</div>
                      <div className="banner-content">
                        <h4 className="widget-title">Download free Jobbhulp App for your mobile</h4>
                        <div className="icon-market-wrap">
                          <Link href="#"><i className="puzzle-icon fab fa-apple"></i></Link>
                          <Link href="#"><i className="puzzle-icon fab fa-google-play"></i></Link>
                        </div>
                        <img src="/img/iphone1.png" title="phone" />
                      </div>
                    </div>
                    <div className="widget w-recent-comments widget-sidebar">
                      <h4 className="widget-title">Recent Comments</h4>
                      <ul>
                        <li>
                          <i className="puzzle-icon fas fa-comment-alt-dots"></i>
                          <div className="wrapper">
                            <Link href="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</Link>
                            <Link href="#" className="author-name">Admin</Link>
                          </div>
                        </li>
                        <li>
                          <i className="puzzle-icon fas fa-comment-alt-dots"></i>
                          <div className="wrapper">
                            <Link href="#">Ut enim ad minpim veniam</Link>
                            <Link href="#" className="author-name">Angelina Johnson</Link>
                          </div>
                        </li>
                        <li>
                          <i className="puzzle-icon fas fa-comment-alt-dots"></i>
                          <div className="wrapper">
                            <Link href="#">Duis aute irure dolor in reprehenderit in voluptate velit esse dolor sit amet</Link>
                            <Link href="#" className="author-name">AdRussell Wrightmin</Link>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="widget widget_links widget-sidebar">
                      <h4 className="widget-title">Archives</h4>
                      <ul>
                        <li><Link href="#">April 2018</Link></li>
                        <li><Link href="#">March 2018</Link></li>
                        <li><Link href="#">February 2018</Link></li>
                        <li><Link href="#">July 2018</Link></li>
                      </ul>
                    </div>
                    <div className="widget w-socials widget-sidebar">
                      <h4 className="widget-title">Social Network</h4>
                      <div className="c-grey">We are awesome follow us:</div>
                      <ul className="socials socials--round socials--colored">
                        <li><Link className="bg-facebook" href="#"><i className="puzzle-icon fab fa-facebook-f"></i></Link></li>
                        <li><Link className="bg-messanger" href="#"><i className="puzzle-icon fab fa-facebook-messenger"></i></Link></li>
                        <li><Link className="bg-twitter" href="#"><i className="puzzle-icon fab fa-twitter"></i></Link></li>
                        <li><Link className="bg-google" href="#"><i className="puzzle-icon fab fa-google-plus-g"></i></Link></li>
                        <li><Link className="bg-rss" href="#"><i className="puzzle-icon far fa-rss"></i></Link></li>
                      </ul>
                    </div>
                    <div className="widget w-tags widget-sidebar">
                      <h4 className="widget-title">Popular Tags</h4>
                      <ul className="tags-list">
                        <li><Link href="#">Startup</Link></li>
                        <li><Link href="#">Business</Link></li>
                        <li><Link href="#">Art</Link></li>
                        <li><Link href="#">Photographyp</Link></li>
                        <li><Link href="#">Creative</Link></li>
                      </ul>
                    </div>
                    <div className="widget w-subscribe widget-sidebar">
                      <h4 className="widget-title">Subscribe to newsletter</h4>
                      <form>
                        <input className="input--white" name="name" placeholder="Email Address" type="email" />
                        <button type="button" className="crumina-button button--dark button--xl w-100">Subscribe Now!</button>
                      </form>
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsDetailsVideo;