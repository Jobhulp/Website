import Image from 'next/image';
import Link from 'next/link';
import { FaMapMarkerAlt, FaGlobe, FaPhone, FaEnvelope, FaLinkedin, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const CompanyProfileHeader = () => {
  return (
    <div className="company-profile-header">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="company-profile-header-left">
              <div className="company-profile-header-logo">
                <Image
                  src="/images/company-logo.png"
                  alt="Company Logo"
                  width={150}
                  height={150}
                  className="img-fluid"
                />
              </div>
              <div className="company-profile-header-info">
                <h1>Tech Solutions Inc.</h1>
                <div className="company-profile-header-meta">
                  <span><FaMapMarkerAlt /> New York, USA</span>
                  <span><FaGlobe /> www.techsolutions.com</span>
                  <span><FaPhone /> +1 234 567 890</span>
                  <span><FaEnvelope /> contact@techsolutions.com</span>
                </div>
                <div className="company-profile-header-social">
                  <Link href="#" className="social-icon"><FaLinkedin /></Link>
                  <Link href="#" className="social-icon"><FaFacebook /></Link>
                  <Link href="#" className="social-icon"><FaTwitter /></Link>
                  <Link href="#" className="social-icon"><FaInstagram /></Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="company-profile-header-right">
              <div className="company-profile-header-stats">
                <div className="stat-item">
                  <h3>50+</h3>
                  <p>Open Positions</p>
                </div>
                <div className="stat-item">
                  <h3>1000+</h3>
                  <p>Employees</p>
                </div>
                <div className="stat-item">
                  <h3>15+</h3>
                  <p>Years Experience</p>
                </div>
              </div>
              <div className="company-profile-header-actions">
                <Link href="#" className="btn btn-primary">Follow Company</Link>
                <Link href="#" className="btn btn-outline-primary">Share Profile</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileHeader;