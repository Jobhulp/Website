import React from 'react';

interface Category {
  title: string;
  positions: number;
  icon: string;
  link: string;
}

const categories: Category[] = [
  {
    title: "IT & Development",
    positions: 892,
    icon: "puzzle-icon",
    link: "/jobs/it"
  },
  {
    title: "Gezondheidszorg",
    positions: 743,
    icon: "puzzle-icon",
    link: "/jobs/healthcare"
  },
  {
    title: "Finance & Accounting",
    positions: 651,
    icon: "puzzle-icon",
    link: "/jobs/finance"
  },
  {
    title: "Marketing & Communicatie",
    positions: 534,
    icon: "puzzle-icon",
    link: "/jobs/marketing"
  },
  {
    title: "Sales & Business Dev",
    positions: 489,
    icon: "puzzle-icon",
    link: "/jobs/sales"
  },
  {
    title: "Bouw & Constructie",
    positions: 412,
    icon: "puzzle-icon",
    link: "/jobs/construction"
  },
  {
    title: "Automotive & Techniek",
    positions: 387,
    icon: "puzzle-icon",
    link: "/jobs/automotive"
  },
  {
    title: "Horeca & Hospitality",
    positions: 356,
    icon: "puzzle-icon",
    link: "/jobs/hospitality"
  },
  {
    title: "Vastgoed & Makelaardij",
    positions: 298,
    icon: "puzzle-icon",
    link: "/jobs/real-estate"
  },
  {
    title: "HR & Recruitment",
    positions: 267,
    icon: "puzzle-icon",
    link: "/jobs/hr"
  },
  {
    title: "Operations & Logistiek",
    positions: 234,
    icon: "puzzle-icon",
    link: "/jobs/operations"
  },
  {
    title: "Design & Creative",
    positions: 198,
    icon: "puzzle-icon",
    link: "/jobs/design"
  },
  {
    title: "Customer Service",
    positions: 176,
    icon: "puzzle-icon",
    link: "/jobs/customer-service"
  }
];

const Categories: React.FC = () => {
  return (
    <section className="medium-padding120">
      <div className="container">
        <div className="row mb60">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <header className="crumina-module crumina-heading heading--h2 heading--with-decoration heading--inline mb-0">
              <h2 className="heading-title">Vind matches per specialisme</h2>
              <div className="heading-text">
                Ontdek jobs die passen bij jouw expertise. Jobhulp matcht je automatisch met bedrijven die op zoek zijn naar jouw specifieke vaardigheden en ervaring.
              </div>
            </header>
          </div>
        </div>

        <div className="row sorting-container mb20" data-layout="fitRows" id="category-grid">
          {categories.map((category, index) => (
            <div key={index} className="col-lg-3 col-md-6 col-sm-12 col-xs-12 mb40 sorting-item">
              <div className="crumina-module crumina-info-box info-box--squared">
                <div className="info-box-thumb">
                  <svg className={category.icon} width="60" height="60">
                    <path fill="" fillRule="evenodd" d="M58.064 60H0v-1.935h1.936v-38.71h15.483V0h25.162v19.355h15.483v38.71H60V60h-1.936zM17.419 21.29H3.871v36.775h13.548V21.29zm13.549 36.775h4.839V43.548h-4.839v14.517zm-6.775 0h4.839V43.548h-4.839v14.517zm16.452-38.71V1.935h-21.29v56.13h2.903V43.548h-.968v-1.935H38.71v1.935h-.968v14.517h2.903v-38.71zm15.484 1.935H42.581v36.775h13.548V21.29zm-2.903 7.742h-7.742v-5.806h7.742v5.806zm-1.936-3.871h-3.87v1.936h3.87v-1.936zm1.936 11.614h-7.742v-5.807h7.742v5.807zm-1.936-3.872h-3.87v1.936h3.87v-1.936zm1.936 11.613h-7.742V38.71h7.742v5.806zm-1.936-3.871h-3.87v1.935h3.87v-1.935zm1.936 11.613h-7.742v-5.806h7.742v5.806zm-1.936-3.871h-3.87v1.936h3.87v-1.936zM30.968 30.968h7.742v5.807h-7.742v-5.807zm1.935 3.871h3.871v-1.936h-3.871v1.936zm-1.935-11.613h7.742v5.806h-7.742v-5.806zm1.935 3.871h3.871v-1.936h-3.871v1.936zm0-5.807h-5.806v-5.806H21.29V9.677h5.807V3.871h5.806v5.806h5.807v5.807h-5.807v5.806zm3.871-7.742v-1.935h-5.806V5.807h-1.936v5.806h-5.806v1.935h5.806v5.807h1.936v-5.807h5.806zm-7.742 15.484H21.29v-5.806h7.742v5.806zm-1.935-3.871h-3.871v1.936h3.871v-1.936zm1.935 11.614H21.29v-5.807h7.742v5.807zm-1.935-3.872h-3.871v1.936h3.871v-1.936zm-12.581-3.871H6.774v-5.806h7.742v5.806zm-1.935-3.871H8.71v1.936h3.871v-1.936zm1.935 11.614H6.774v-5.807h7.742v5.807zm-1.935-3.872H8.71v1.936h3.871v-1.936zm1.935 11.613H6.774V38.71h7.742v5.806zm-1.935-3.871H8.71v1.935h3.871v-1.935zm1.935 11.613H6.774v-5.806h7.742v5.806zm-1.935-3.871H8.71v1.936h3.871v-1.936z" />
                  </svg>
                  <a href={category.link} className="h5 info-box-title">{category.title}</a>
                </div>
                <div className="info-box-content">
                  <a href={category.link} className="info-box-link">{category.positions} matches</a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row justify-content-center">
          <div className="col-auto">
            <a href="#" className="crumina-button button--yellow button--xl load-more-button" data-load-link="category-to-load.html" data-container="category-grid">
              Meer specialismen tonen
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
