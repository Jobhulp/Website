import React from "react";
import client8 from '@/assets/img/client8.png';
import client9 from '@/assets/img/client9.png';
import client10 from '@/assets/img/client10.png';
import client11 from '@/assets/img/client11.png';
import client12 from '@/assets/img/client12.png';
import client13 from '@/assets/img/client13.png';
import client14 from '@/assets/img/client14.png';
import client15 from '@/assets/img/client15.png';
import client16 from '@/assets/img/client16.png';

const jobs = [
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
    companyLogo: client15.src,
    category: "IT Contractor",
    type: "Temporary",
    typeClass: "button--red",
    featured: true,
  },
  {
    title: "Data Center Support Specialist Engineer",
    time: "6 hours ago",
    location: "London, United Kingdom",
    companyLogo: client16.src,
    category: "IT Contractor",
    type: "Part Time",
    typeClass: "button--blue-dark",
    featured: false,
  },
];

const JobListGrid: React.FC = () => (
  <section className="bg-light-grey pb120">
    <div className="container">
      <div className="row mb20">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <h3 className="mb40 mt-0">Search Result:</h3>
        </div>
        {jobs.map((job, idx) => (
          <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mb40" key={idx}>
            <div className={`ui-card${job.featured ? ' featured-vacancies' : ''} h-100`}>
              <div className="ui-card-content">
                <div className="vacancies-title-location">
                  <a href="#" className="vacancies-title h6">{job.title}</a>
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
          </div>
        ))}
      </div>
      <div className="row">
        <div className="col-lg-12">
          <nav className="navigation flex items-center justify-center gap-2">
            <a href="#" className="page-numbers btn-start"><i className="puzzle-icon fal fa-angle-double-left"></i></a>
            <a href="#" className="page-numbers btn--prev"><i className="puzzle-icon fal fa-angle-left"></i></a>
            <a href="#" className="page-numbers current"><span>1</span></a>
            <a href="#" className="page-numbers"><span>2</span></a>
            <a href="#" className="page-numbers"><span>3</span></a>
            <a href="#" className="page-numbers"><span>4</span></a>
            <a href="#" className="page-numbers"><span>5</span></a>
            <a href="#" className="page-numbers"><span>6</span></a>
            <a href="#" className="page-numbers btn--next"><i className="puzzle-icon fal fa-angle-right"></i></a>
            <a href="#" className="page-numbers btn-end"><i className="puzzle-icon fal fa-angle-double-right"></i></a>
            <span className="page-numbers all-pages">36 Pages</span>
          </nav>
        </div>
      </div>
    </div>
  </section>
);

export default JobListGrid;