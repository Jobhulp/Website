import React from "react";

const JobPagination: React.FC = () => (
  <div className="row">
    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <nav className="navigation">
        <a href="#" className="page-numbers btn-start">
          <i className="puzzle-icon fal fa-angle-double-left"></i>
        </a>
        <a href="#" className="page-numbers btn--prev">
          <i className="puzzle-icon fal fa-angle-left"></i>
        </a>
        <a href="#" className="page-numbers current"><span>1</span></a>
        <a href="#" className="page-numbers"><span>2</span></a>
        <a href="#" className="page-numbers"><span>3</span></a>
        <a href="#" className="page-numbers"><span>4</span></a>
        <a href="#" className="page-numbers"><span>5</span></a>
        <a href="#" className="page-numbers"><span>6</span></a>
        <a href="#" className="page-numbers btn--next">
          <i className="puzzle-icon fal fa-angle-right"></i>
        </a>
        <a href="#" className="page-numbers btn-end">
          <i className="puzzle-icon fal fa-angle-double-right"></i>
        </a>
        <span className="page-numbers all-pages">36 Pages</span>
      </nav>
    </div>
  </div>
);

export default JobPagination;