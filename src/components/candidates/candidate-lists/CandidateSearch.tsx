export default function CandidateSearch() {
  return (
    <section>
      <div className="tabs tabs--border-primary negative-margin-top-115">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li role="presentation" className="nav-item active">
                  <a className="nav-link active h2 tabs-scroll" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Find a Candidate</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="tab-content">
          <div className="container">
            <div className="row pb60">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="tab-pane active" id="home" role="tabpanel" aria-labelledby="home-tab">
                  <form className="form--search">
                    <div className="row">
                      <div className="col-md-4 col-sm-6 col-xs-12 mb-3 mb-md-0">
                        <input name="name" placeholder="Your Full Name" type="text" />
                      </div>
                      <div className="col-md-3 col-sm-6 col-xs-12 mb-3 mb-md-0">
                        <select id="select1" className="puzzle--select" data-minimum-results-for-search="Infinity">
                          <option data-display="All Specialisms">All Specialisms</option>
                          <option value="1">Freelance</option>
                          <option value="2">Full Time</option>
                          <option value="3">Intership</option>
                          <option value="4">Part Time</option>
                          <option value="5">Temporary</option>
                        </select>
                      </div>
                      <div className="col-md-3 col-sm-6 col-xs-12 mb-3 mb-md-0">
                        <select id="select2" className="puzzle--select" data-minimum-results-for-search="Infinity">
                          <option data-display="All Locations">All Locations</option>
                          <option value="1">Freelance</option>
                          <option value="2">Full Time</option>
                          <option value="3">Intership</option>
                          <option value="4">Part Time</option>
                          <option value="5">Temporary</option>
                        </select>
                      </div>
                      <div className="col-md-2 col-sm-6 col-xs-12 mb-3 mb-md-0">
                        <button type="button" className="crumina-button button--dark button--xl">Search</button>
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
}