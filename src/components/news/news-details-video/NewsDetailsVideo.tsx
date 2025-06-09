import React from 'react';
import { Link } from 'react-router-dom';

interface NewsDetailsVideoProps {
  // Add props if needed
}

const NewsDetailsVideo: React.FC<NewsDetailsVideoProps> = () => {
  return (
    <div className="main-content-wrapper">
      <section className="stunning-header bg-light-grey stunning-bg4 pb120 pt80">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
              <ul className="breadcrumbs">
                <li className="breadcrumbs-item">
                  <Link to="/">Home<i className="puzzle-icon fal fa-angle-double-right"></i></Link>
                </li>
                <li className="breadcrumbs-item">
                  <Link to="/news">News<i className="puzzle-icon fal fa-angle-double-right"></i></Link>
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
                    <Link to="/author" className="link--uppercase-wide fs-12 text-white">Betty Stevens</Link>
                  </div>
                </div>

                <div className="info-item my-2">
                  <div className="description">Categorys:</div>
                  <div className="value">
                    <Link to="#" className="link--uppercase-wide arrow--white fs-12">Business</Link>,
                    <Link to="#" className="link--uppercase-wide arrow--white fs-12">Startup</Link>
                  </div>
                </div>

                <div className="info-item my-2">
                  <div className="description">Date:</div>
                  <div className="value">
                    <Link to="#" className="link--uppercase-wide arrow--white fs-12">26 November 2018</Link>
                  </div>
                </div>

                <div className="info-item my-2">
                  <div className="description">Comments:</div>
                  <div className="value">
                    <Link to="#" className="link--uppercase-wide arrow--white fs-12">
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

                  {/* Article content will go here */}
                </div>

                <div className="ui-card-footer">
                  <div className="d-flex align-items-center w-100">
                    <h5 className="mr-4">Share:</h5>
                    <ul className="socials socials--round socials--colored">
                      {/* Social media links */}
                    </ul>
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

export default NewsDetailsVideo;