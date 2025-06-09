import React from "react";
import Link from "next/link";
import client11 from '@/assets/img/client11.png';

const CompanyProfileSidebar: React.FC = () => (
  <aside aria-label="sidebar" className="sidebar sidebar-right">
    <div className="widget w-company widget-sidebar">
      <Link href="/employers/job-details" className="logo-company">
        <img className="logo" src={client11.src} title="company" alt="company" />
      </Link>
      <ul className="summary-items">
        <li className="summary-item">
          <span className="summary-type">Founded:</span>
          <span className="summary-value"><a href="#">2006</a></span>
        </li>
        <li className="summary-item">
          <span className="summary-type">Vacancies:</span>
          <span className="summary-value"><a href="#">36 jobs available</a></span>
        </li>
        <li className="summary-item">
          <span className="summary-type">Industry:</span>
          <span className="summary-value"><a href="#">Marketplace</a></span>
        </li>
        <li className="summary-item">
          <span className="summary-type">Website:</span>
          <span className="summary-value"><a href="#">envato.com</a></span>
        </li>
      </ul>
      <a href="#" className="crumina-button button--primary button--xl button--with-icon button--icon-left mb-3 mb-lg-5 w-100"><i className="puzzle-icon far fa-envelope"></i>Send a Message</a>
      <ul className="socials socials--icon-colored">
        <li className="c-facebook"><a href="#"><i className="puzzle-icon fab fa-facebook-f"></i></a></li>
        <li className="c-twitter"><a href="#"><i className="puzzle-icon fab fa-twitter"></i></a></li>
        <li className="c-instagram"><a href="#"><i className="puzzle-icon fab fa-instagram"></i></a></li>
        <li className="c-youtube"><a href="#"><i className="puzzle-icon fab fa-youtube"></i></a></li>
        <li className="c-pinterest"><a href="#"><i className="puzzle-icon fab fa-pinterest-p"></i></a></li>
      </ul>
    </div>
    <div className="widget w-location widget-sidebar">
      <div className="h4 widget-title mb-3 mb-lg-5">Location</div>
      <div className="crumina-module crumina-map crumina-map--200" id="map-contact" style={{background:'#eee',height:200}}></div>
      <p>PO Box 16122 Collins Street West<br/>Victoria 8007 Australia</p>
    </div>
  </aside>
);

export default CompanyProfileSidebar;