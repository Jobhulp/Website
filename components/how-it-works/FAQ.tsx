'use client';

import React, { useState } from 'react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('collapseOne');

  const faqItems: FAQItem[] = [
    {
      id: 'collapseOne',
      question: 'Lorem ipsum dolor sit amet, consectetur adipiscing?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.'
    },
    {
      id: 'collapseTwo',
      question: 'Ut enim ad minim veniam?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.'
    },
    {
      id: 'collapseThree',
      question: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.'
    },
    {
      id: 'collapseFour',
      question: 'Excepteur sint occaecat cupidatat non proident?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.'
    }
  ];

  const toggleAccordion = (id: string) => {
    setActiveId(activeId === id ? '' : id);
  };

  return (
    <section className="medium-padding120 bg-light-grey">
      <div className="container">
        <div className="row mb60">
          <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
            <header className="crumina-module crumina-heading heading--h2 heading--with-decoration decoration--blue-theme mb-0">
              <h2 className="heading-title">Veel Gestelde Vragen</h2>
            </header>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="crumina-module crumina-accordion accordion" id="accordion">
              {faqItems.map((item) => (
                <div className="card" key={item.id}>
                  <div className={`card-header ${activeId === item.id ? 'active' : ''}`} id={`heading${item.id}`}>
                    <h3 className="mb-0 accordion-heading">
                      <i className="puzzle-icon fal fa-long-arrow-right"></i>
                      <button
                        className="btn btn-link"
                        type="button"
                        onClick={() => toggleAccordion(item.id)}
                        aria-expanded={activeId === item.id}
                        aria-controls={item.id}
                      >
                        {item.question}
                      </button>
                    </h3>
                  </div>

                  <div
                    id={item.id}
                    className={`collapse ${activeId === item.id ? 'show' : ''}`}
                    aria-labelledby={`heading${item.id}`}
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;