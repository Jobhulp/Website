import React from 'react';
import Link from 'next/link';

const SubmitResume = () => {
  return (
    <div className="main-content-wrapper">
      <section className="stunning-header bg-dark-themes pt200 pb120">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <ul className="breadcrumbs">
                <li className="breadcrumbs-item">
                  <Link href="/">Home<i className="puzzle-icon fal fa-angle-double-right"></i></Link>
                </li>
                <li className="breadcrumbs-item">
                  <Link href="/candidates">Candidates<i className="puzzle-icon fal fa-angle-double-right"></i></Link>
                </li>
                <li className="breadcrumbs-item active">
                  <span>Account</span>
                </li>
              </ul>

              <h1 className="page-title text-white">Submit Your Resume</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="medium-padding120 bg-light-grey">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <header className="crumina-module crumina-heading heading--h2 heading--with-decoration heading--inline">
                <h2 className="heading-title">Have an Account?</h2>
                <div className="heading-text">If you don't have an account you can create one below by entering your email address. Your account details will be confirmed via email.</div>
              </header>
            </div>
          </div>
          <div className="row mb60">
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"></div>
            <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <a href="#" className="crumina-button button--blue button--xl" data-toggle="modal" data-target="#loginModal">Sign In</a>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <form className="form--resume mb-4">
                <label htmlFor="name1">Your Name</label>
                <input id="name1" name="name1" placeholder="Your Name" type="text" />

                <label htmlFor="email">Your Email</label>
                <input id="email" name="email" placeholder="you@yourdomain.com" type="email" />

                <label htmlFor="location">Region</label>
                <select id="location" className="puzzle--select" data-minimum-results-for-search="Infinity">
                  <option data-display="All Locations">All Locations</option>
                  <option value="1">Melbourne</option>
                  <option value="2">London</option>
                  <option value="3">NewYork</option>
                  <option value="4">Kyiv</option>
                  <option value="5">Barcelona</option>
                </select>

                <label htmlFor="proff">Professional Title</label>
                <input id="proff" name="proff" placeholder='e.g. "Web Developer"' type="text" />

                <label htmlFor="location1">Location</label>
                <input id="location1" name="location1" placeholder='e.g. "London UK", "New York", "Houston TX"' type="text" />

                <label htmlFor="salary">Salary</label>
                <input id="salary" name="salary" placeholder='e.g. "$45 / hour"' type="text" />

                <label htmlFor="site">Website (Optional)</label>
                <input id="site" name="site" placeholder="yourdomain.com" type="text" />

                <label>Photo (Optional)</label>
                <a id="photo" href="#" className="crumina-button button--dark button--xl">Choose File</a>
                <div className="c-grey mt-3 mb-4">Maximum file size: 2 MB.</div>

                <label htmlFor="video">Video (Optional)</label>
                <input id="video" name="video" placeholder="A link to a video about yourself" type="text" />

                <label htmlFor="cat">Resume Category</label>
                <select id="cat" className="puzzle--select" data-minimum-results-for-search="Infinity">
                  <option data-display="All Locations">All Locations</option>
                  <option value="1">Melbourne</option>
                  <option value="2">London</option>
                  <option value="3">NewYork</option>
                  <option value="4">Kyiv</option>
                  <option value="5">Barcelona</option>
                </select>

                <label htmlFor="froala-editor">Resume Content</label>
                <div className="crumina-form-editor">
                  <textarea id="froala-editor"></textarea>
                </div>

                <label htmlFor="skills">Skills (Optional)</label>
                <input id="skills" name="skills" placeholder="Comma separate a list of relevant skills" type="text" />

                <label htmlFor="skills">Social Network URLs (Optional)</label>
                <a href="#" className="crumina-button button--dark button--s align-middle mr-3">+ Add URL</a>
                <span className="d-inline-block align-middle c-grey my-2">Optionally provide links to any of your social network profiles</span>
              </form>

              <label htmlFor="skills">Education (Optional)</label>
              <form className="form--bg-white mb-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <label className="mb-0" htmlFor="school-name">School Name</label>
                  <a href="#" className="link--bold c-red">Remove</a>
                </div>
                <input id="school-name" name="school-name" placeholder="Your School Name" type="text" />
                <div className="row">
                  <div className="col">
                    <label htmlFor="qualif">Qualification(s)</label>
                    <input id="qualif" name="qualif" placeholder="" type="text" />
                  </div>
                  <div className="col">
                    <label htmlFor="date">Start/End Date</label>
                    <input id="date" name="date" placeholder="" type="text" />
                  </div>
                </div>

                <label htmlFor="school-name2">School Name</label>
                <input id="school-name2" name="school-name" placeholder="" type="text" />
              </form>

              <a href="#" className="crumina-button button--dark button--s button--bordered mb-3">+ Add Education</a>
              <label>Experience (Optional)</label>
              <a href="#" className="crumina-button button--dark button--s mb-3">+ Add Experience</a>
              <label>Resume File (Optional)</label>
              <a href="#" className="crumina-button button--dark button--xl button--bordered button--border-dashed">Choose File</a>
              <div className="c-grey mt-3 mb60">Optionally upload your resume for employers to view. Max. file size: 2 MB.</div>

              <Link href="/candidates/resume-preview" className="crumina-button button--green button--xxl button--uppercase-wide button--with-icon button--icon-right">
                Preview<i className="puzzle-icon fal fa-long-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubmitResume;