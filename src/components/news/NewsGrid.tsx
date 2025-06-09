import React from 'react';
import Link from 'next/link';

const NewsGrid: React.FC = () => {
  return (
    <div className="main-content-wrapper">
      <section className="stunning-header bg-light-grey stunning-bg4 pb120 pt80">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
              <ul className="breadcrumbs">
                <li className="breadcrumbs-item">
                  <Link href="/">Home<i className="puzzle-icon fal fa-angle-double-right"></i></Link>
                </li>
                <li className="breadcrumbs-item active">
                  <span>News</span>
                </li>
              </ul>
              <h1 className="page-title text-white">News Grid</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light-grey">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
              <div className="row">
                {/* News grid items will go here */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsGrid;