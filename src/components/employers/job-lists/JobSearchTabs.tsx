import React from "react";

const JobSearchTabs: React.FC = () => (
  <section>
    <div className="tabs tabs--border-primary negative-margin-top-115">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li role="presentation" className="nav-item active">
                <a className="nav-link active h2 tabs-scroll" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">
                  Find your dream job
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="tab-content">
        <div className="container">
          <div className="row pb-16">
            <div className="col-lg-12">
              <div className="tab-pane active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <form className="form--search">
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <input name="name" placeholder="Your Full Name" type="text" className="input input-bordered w-full" />
                    </div>
                    <div className="col-md-3 mb-3">
                      <select id="select1" className="puzzle--select w-full">
                        <option>All Specialisms</option>
                        <option value="1">Freelance</option>
                        <option value="2">Full Time</option>
                        <option value="3">Internship</option>
                        <option value="4">Part Time</option>
                        <option value="5">Temporary</option>
                      </select>
                    </div>
                    <div className="col-md-3 mb-3">
                      <select id="select2" className="puzzle--select w-full">
                        <option>All Locations</option>
                        <option value="1">Freelance</option>
                        <option value="2">Full Time</option>
                        <option value="3">Internship</option>
                        <option value="4">Part Time</option>
                        <option value="5">Temporary</option>
                      </select>
                    </div>
                    <div className="col-md-2 mb-3">
                      <button type="button" className="crumina-button button--dark button--xl w-full">Search</button>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-lg-12">
                      <div className="flex flex-wrap gap-4">
                        <label className="checkbox checkbox--blue-dark">
                          <input type="checkbox" name="optionsCheckboxes" />
                          <span className="checkbox-material"><span className="check"></span></span>
                          Part Time
                        </label>
                        <label className="checkbox checkbox--green">
                          <input type="checkbox" name="optionsCheckboxes1" />
                          <span className="checkbox-material"><span className="check"></span></span>
                          Full Time
                        </label>
                        <label className="checkbox checkbox--red">
                          <input type="checkbox" name="optionsCheckboxes2" />
                          <span className="checkbox-material"><span className="check"></span></span>
                          Temporary
                        </label>
                        <label className="checkbox checkbox--yellow">
                          <input type="checkbox" name="optionsCheckboxes3" />
                          <span className="checkbox-material"><span className="check"></span></span>
                          Internship
                        </label>
                        <label className="checkbox checkbox--blue">
                          <input type="checkbox" name="optionsCheckboxes4" />
                          <span className="checkbox-material"><span className="check"></span></span>
                          Freelance
                        </label>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default JobSearchTabs;