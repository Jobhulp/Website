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
      question: 'Hoe werkt de matching bij Jobhulp?',
      answer: 'Jobhulp matcht kandidaten en jobs op basis van skills, werkstijl, persoonlijkheid en voorkeuren. Je krijgt een matchscore (bv. 82%) en ziet precies waarom je wel of niet past. Dit gaat veel verder dan alleen zoekwoorden matchen.'
    },
    {
      id: 'collapseTwo',
      question: 'Wat is een "mutual match"?',
      answer: 'Bij Jobhulp werk je niet met sollicitaties, maar met wederzijdse interesse. Pas als zowel de kandidaat als de werkgever interesse toont in elkaar, wordt contact mogelijk. Dit voorkomt nutteloze gesprekken en zorgt ervoor dat je alleen spreekt met mensen die echt passen.'
    },
    {
      id: 'collapseThree',
      question: 'Moet ik een CV uploaden?',
      answer: 'Nee, bij Jobhulp heb je geen klassiek CV nodig. In plaats daarvan vul je gestructureerd je skills, werkstijl en voorkeuren in. Het platform leert je kennen via deze structuur, niet via tekst. Dit zorgt voor veel betere matches.'
    },
    {
      id: 'collapseFour',
      question: 'Wat kost Jobhulp?',
      answer: 'Voor kandidaten is Jobhulp volledig gratis. Werkgevers betalen alleen voor daadwerkelijke matches. Zo zorgen we ervoor dat het platform voor iedereen toegankelijk is en werkgevers alleen betalen voor resultaat.'
    },
    {
      id: 'collapseFive',
      question: 'Waarin verschilt Jobhulp van LinkedIn of Indeed?',
      answer: 'Jobhulp is geen jobsite of netwerk. Het is een matchmaker. Bij LinkedIn en Indeed solliciteer je massaal en moet HR alles filteren. Bij Jobhulp worden alleen sterke matches aan elkaar voorgesteld. Geen massa sollicitaties, geen overload aan informatie.'
    },
    {
      id: 'collapseSix',
      question: 'Hoe snel vind ik een match?',
      answer: 'Dat hangt af van je profiel en de beschikbare jobs of kandidaten. Omdat Jobhulp focust op kwaliteit boven kwantiteit, kan het iets langer duren voordat je een match krijgt. Maar als je een match krijgt, weet je dat het een sterke match is.'
    }
  ];

  const toggleAccordion = (id: string) => {
    setActiveId(activeId === id ? '' : id);
  };

  return (
    <section className="medium-padding120 bg-light-grey">
      <div className="container">
        <div className="row mb60">
          <div className="col-lg-6 col-md-8 col-sm-12 col-xs-12">
            <header className="crumina-module crumina-heading heading--h2 heading--with-decoration decoration--blue-theme mb-0">
              <h2 className="heading-title">Veel Gestelde Vragen</h2>
              <div className="heading-text">Alles wat je wilt weten over hoe Jobhulp werkt.</div>
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
