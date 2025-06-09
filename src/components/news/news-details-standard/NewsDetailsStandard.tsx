import React from 'react';
import { Link } from 'react-router-dom';

interface NewsDetailsStandardProps {
  // Add props if needed
}

const NewsDetailsStandard: React.FC<NewsDetailsStandardProps> = () => {
  return (
    <div className="main-content-wrapper">
      <section className="stunning-header bg-dark-themes pb120 pt80">
        <div className="overlay overlay-stunning"></div>
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
                  <span>Business</span>
                </li>
              </ul>
              <h1 className="page-title text-white">H1. Simple Post Format with Featured Image</h1>
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
                    <Link to="/author" className="link--uppercase-wide fs-12">Betty Stevens</Link>
                  </div>
                </div>

                <div className="info-item my-2">
                  <div className="description">Categorys:</div>
                  <div className="value">
                    <Link to="#" className="link--uppercase-wide fs-12">Business</Link>,
                    <Link to="#" className="link--uppercase-wide fs-12">Startup</Link>
                  </div>
                </div>

                <div className="info-item my-2">
                  <div className="description">Date:</div>
                  <div className="value">
                    <Link to="#" className="link--uppercase-wide fs-12">26 November 2018</Link>
                  </div>
                </div>

                <div className="info-item my-2">
                  <div className="description">Comments:</div>
                  <div className="value">
                    <Link to="#" className="link--uppercase-wide fs-12">
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

      <section className="bg-light-grey medium-padding120">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
              <article className="hentry post post-standard has-post-thumbnail post-standard-details">
                {/* Article content will go here */}
              </article>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsDetailsStandard;