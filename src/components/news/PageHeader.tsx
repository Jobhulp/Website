import React from 'react';
import Link from 'next/link';

interface PageHeaderProps {
  title: string;
  breadcrumbs?: {
    label: string;
    href?: string;
  }[];
  showSearch?: boolean;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  breadcrumbs = [],
  showSearch = false,
  className = ''
}) => {
  return (
    <section className={`stunning-header bg-dark-themes pb120 pt80 ${className}`}>
      <div className="container">
        <div className="row align-items-end">
          <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 mb-5 mb-md-0">
            <ul className="breadcrumbs">
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="breadcrumbs-item">
                  {crumb.href ? (
                    <Link href={crumb.href}>
                      {crumb.label}
                      <i className="puzzle-icon fal fa-angle-double-right"></i>
                    </Link>
                  ) : (
                    <span>{crumb.label}</span>
                  )}
                </li>
              ))}
            </ul>
            <h1 className="page-title text-white">{title}</h1>
          </div>
          {showSearch && (
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <div className="input--with-icon input--icon-right">
                <input
                  id="search-input"
                  className="input--dark"
                  name="search"
                  placeholder="What are you looking for?"
                  type="text"
                />
                <i className="puzzle-icon fal fa-search"></i>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHeader;