import React from "react";
import Link from "next/link";
import client11 from '@/assets/img/client11.png';

const JobDetailsSidebar: React.FC = () => (
  <aside aria-label="sidebar" className="sidebar sidebar-right">
    <div className="widget w-subscribe widget-sidebar">
      <h3 className="widget-title">Want more jobs like this?</h3>
      <form>
        <input className="input--white" name="name" placeholder="Your Email Address" type="email" />
        <button type="button" className="crumina-button button--dark button--xl w-100">Subscribe Now!</button>
      </form>
    </div>
    <div className="widget w-summary widget-sidebar">
      <h3 className="widget-title">Job summary</h3>
      <ul className="summary-items">
        <li className="summary-item">
          <span className="summary-type">Location:</span>
          <span className="summary-value"><a href="#">Melbourne, Australia</a></span>
        </li>
        <li className="summary-item">
          <span className="summary-type">Posted:</span>
          <span className="summary-value"><a href="#">8 days ago</a></span>
        </li>
        <li className="summary-item">
          <span className="summary-type">Type:</span>
          <span className="summary-value"><a href="#" className="crumina-button button--red button--xxs button--uppercase-wide">Temporary</a></span>
        </li>
      </ul>
    </div>
    <div className="widget w-about widget-sidebar">
      <div className="about-content">
        <h3 className="widget-title">About Company</h3>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequataute irure dolor in reprehenderit in voluptate.</p>
        <a href="#" className="logo">
          <img className="logo" src={client11.src} title="company" alt="company" />
        </a>
      </div>
      <div className="about-footer">
        <Link href="#" className="link--bold link--with-icon link--icon-right">View Company Profile<i className="puzzle-icon far fa-angle-right"></i></Link>
      </div>
    </div>
    <div className="widget w-envato-jobs widget-sidebar">
      <h3 className="widget-title">Jobs from Envato</h3>
      <ul>
        <li>
          <Link href="#" className="link--bold h5">Data Center Support Specialist Engineer</Link>
        </li>
        <li>
          <Link href="#" className="link--bold h5">Regional Sales Manager</Link>
        </li>
        <li>
          <Link href="#" className="link--bold h5">Visualizer, web designer Max 3Ds, Cinema 4D</Link>
        </li>
      </ul>
    </div>
  </aside>
);

export default JobDetailsSidebar;