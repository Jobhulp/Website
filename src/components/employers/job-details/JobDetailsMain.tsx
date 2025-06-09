import React from "react";

const JobDetailsMain: React.FC = () => (
  <div className="ui-card ui-card--column mb-0">
    <div className="ui-card-content">
      <h3 className="mb-3">About the Job</h3>
      <h4 className="mb-3">Overview</h4>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </p>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
        culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborpum.</p>
      <h4 className="mb-3">Responsibilities</h4>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <h6 className="mb-3">The Envato Specialist</h6>
      <ul>
        <li><a href="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</a></li>
        <li><a href="#">Veniam, quis nostrud exercitation ullamco laboris nisi.</a></li>
        <li><a href="#">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</a></li>
        <li><a href="#">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</a></li>
        <li><a href="#">Excepteur sint occaecat cupidatat non proident.</a></li>
        <li><a href="#">Sunt in culpa qui officia deserunt mollit anim id est laborum.</a></li>
      </ul>
      <h4 className="mb-3">Qualifications</h4>
      <h6 className="mb-3">Skills Required:</h6>
      <ul>
        <li><a href="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</a></li>
        <li><a href="#">Veniam, quis nostrud exercitation ullamcoi.</a></li>
        <li><a href="#">Ut enim ad minim veniam, quis nostrud exercitation ullamco laborist.</a></li>
        <li><a href="#">Duis aute irure dolor in reprehenderit in voluptate.</a></li>
        <li><a href="#">Excepteur sint occaecat cupidatat non proident.</a></li>
        <li><a href="#">Sunt in culpa qui officia deserunt mollit anim id est laborum.</a></li>
      </ul>
      <h4 className="mb-3">Education & Experience</h4>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequataute irure dolor in reprehenderit in voluptate.</p>
      <ul>
        <li><a href="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</a></li>
        <li><a href="#">Veniam, quis nostrud exercitation ullamcoi.</a></li>
        <li><a href="#">Ut enim ad minim veniam, quis nostrud exercitation ullamco laborist.</a></li>
        <li><a href="#">Duis aute irure dolor in reprehenderit in voluptate.</a></li>
        <li><a href="#">Excepteur sint occaecat cupidatat non proident.</a></li>
        <li><a href="#">Sunt in culpa qui officia deserunt mollit anim id est laborum.</a></li>
      </ul>
    </div>
    <div className="ui-card-footer">
      <div className="d-flex justify-content-between align-items-center flex-wrap w-100">
        <a href="#" className="crumina-button button--dark button--m button--with-icon button--icon-left my-2" data-toggle="modal" data-target="#signupModal">
          <i className="puzzle-icon far fa-pencil"></i>Sign Up as Employee
        </a>
        <a href="#" className="crumina-button button--dark button--m button--bordered button--with-icon button--icon-left my-2">
          <i className="puzzle-icon far fa-at"></i>Email Me Jobs Like These
        </a>
      </div>
    </div>
  </div>
);

export default JobDetailsMain;