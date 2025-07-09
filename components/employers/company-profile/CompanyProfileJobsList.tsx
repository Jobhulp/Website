import React from "react";
import Link from "next/link";
import client9 from '@/assets/img/client9.png';
import client10 from '@/assets/img/client10.png';
import client11 from '@/assets/img/client11.png';
import client12 from '@/assets/img/client12.png';
import client13 from '@/assets/img/client13.png';

const jobs = [
  {
    title: "Data Center Support Specialist Engineer",
    time: "6 hours ago",
    location: "London, United Kingdom",
    logo: client9.src,
    category: "IT Contractor",
    type: "Part Time",
    typeClass: "button--blue-dark",
    featured: false,
  },
  {
    title: "Visualizer, web designer Max 3Ds, Cinema 4D",
    time: "24 hours ago",
    location: "New York, USA",
    logo: client10.src,
    category: "Digital & Creative",
    type: "Full Time",
    typeClass: "button--green",
    featured: true,
  },
  {
    title: "Regional Sales Manager",
    time: "6 days ago",
    location: "Melbourne, Australia",
    logo: client11.src,
    category: "Sales & Marketing",
    type: "Temporary",
    typeClass: "button--red",
    featured: false,
  },
  {
    title: "Data Center Support Specialist Engineer",
    time: "6 days ago",
    location: "Melbourne, Australia",
    logo: client9.src,
    category: "IT Contractor",
    type: "Freelance",
    typeClass: "button--blue",
    featured: true,
  },
  {
    title: "Front End and Back End Developer",
    time: "1 week ago",
    location: "California, USA",
    logo: client12.src,
    category: "Web Development",
    type: "Internship",
    typeClass: "button--yellow",
    featured: false,
  },
  {
    title: "Professional Copywriter for Commercial Advertising",
    time: "3 months ago",
    location: "Cologne, Germany",
    logo: client13.src,
    category: "Writing",
    type: "Freelance",
    typeClass: "button--blue",
    featured: false,
  },
  {
    title: "Visualizer, web designer Max 3Ds, Cinema 4D",
    time: "24 hours ago",
    location: "New York, USA",
    logo: client10.src,
    category: "Digital & Creative",
    type: "Full Time",
    typeClass: "button--green",
    featured: false,
  },
  {
    title: "Data Center Support Specialist Engineer",
    time: "6 days ago",
    location: "Melbourne, Australia",
    logo: client9.src,
    category: "IT Contractor",
    type: "Temporary",
    typeClass: "button--red",
    featured: true,
  },
  {
    title: "Data Center Support Specialist Engineer",
    time: "6 hours ago",
    location: "London, United Kingdom",
    logo: client9.src,
    category: "IT Contractor",
    type: "Part Time",
    typeClass: "button--blue-dark",
    featured: false,
  },
];

const CompanyProfileJobsList: React.FC = () => (
  <section className="pb120 bg-light-grey">
    <div className="container">
      <div className="row mb60">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <header className="crumina-module crumina-heading heading--h2 heading--with-decoration heading--inline mb-0">
            <h2 className="heading-title">Jobs at Envato</h2>
            <div className="heading-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
          </header>
        </div>
      </div>
      <div className="row sorting-container mb20" id="job-items" data-layout="fitRows">
        {jobs.map((job, idx) => (
          <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mb40 sorting-item" key={idx}>
            <div className={`ui-card${job.featured ? ' featured-vacancies' : ''} mb-0`} data-mh="job-item">
              <div className="ui-card-content">
                <div className="vacancies-title-location">
                  <Link href="/employers/job-details" className="vacancies-title h6">{job.title}</Link>
                  <div className="vacancies-location">
                    <time className="published">{job.time}</time>
                    {job.location}
                  </div>
                </div>
              </div>
              <div className="ui-card-footer">
                <a href="#" className="link--uppercase-wide fs-12">{job.category}</a>
                <button type="button" className={`crumina-button ${job.typeClass} button--xxs button--uppercase-wide`}>{job.type}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row justify-content-center">
        <div className="col-auto">
          <a href="#" className="crumina-button button--grey button--xl load-more-button" data-load-link="jobs-to-load.html" data-container="job-items">Load More Listings</a>
        </div>
      </div>
    </div>
  </section>
);

export default CompanyProfileJobsList;