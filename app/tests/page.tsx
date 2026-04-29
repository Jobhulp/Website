import Link from 'next/link';
import Footer from '../../components/common/footer/Footer';

export const metadata = {
  title: 'Testen | Jobhulp',
  description: 'Maak je profiel compleet met onze persoonlijkheids- en vaardighedentesten. Verbeter je matches door jezelf beter te laten kennen.',
};

export default function TestsOverviewPage() {
  return (
    <main>
      <div className="main-content-wrapper">
        <div className="header--spacer" style={{ height: '142px', backgroundColor: '#121214' }}></div>
        
        <section className="bg-dark-themes py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 text-center">
                <h1 className="text-white mb-3">Jobhulp Testen</h1>
                <p className="text-white" style={{ opacity: 0.8 }}>
                  Laat Jobhulp je beter leren kennen voor betere matches
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="medium-padding120 bg-light-grey">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <div className="bg-white p-5 mb-4" style={{ borderRadius: '10px' }}>
                  <h2 className="mb-4">Waarom testen?</h2>
                  <p style={{ fontSize: '16px', lineHeight: '1.7' }}>
                    Bij Jobhulp geloven we dat een goede match verder gaat dan alleen vaardigheden. 
                    Door onze testen te maken, begrijpen wij wie je bent en hoe je werkt. 
                    Dit helpt ons om je te matchen met bedrijven waar je niet alleen kunt presteren, 
                    maar waar je ook echt past.
                  </p>
                  
                  <div className="row mt-4">
                    <div className="col-md-4 text-center mb-3">
                      <div className="p-3">
                        <i className="far fa-handshake c-yellow" style={{ fontSize: '36px' }}></i>
                        <h6 className="mt-2 mb-0">Betere Matches</h6>
                      </div>
                    </div>
                    <div className="col-md-4 text-center mb-3">
                      <div className="p-3">
                        <i className="far fa-eye c-blue" style={{ fontSize: '36px' }}></i>
                        <h6 className="mt-2 mb-0">Meer Transparantie</h6>
                      </div>
                    </div>
                    <div className="col-md-4 text-center mb-3">
                      <div className="p-3">
                        <i className="far fa-clock c-green" style={{ fontSize: '36px' }}></i>
                        <h6 className="mt-2 mb-0">Sneller Contact</h6>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Test Cards */}
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="bg-white p-4 h-100" style={{ borderRadius: '10px' }}>
                      <div className="d-flex align-items-center mb-3">
                        <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#dc3545', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <i className="fas fa-brain text-white" style={{ fontSize: '24px' }}></i>
                        </div>
                        <div className="ml-3">
                          <h4 className="mb-0">Persoonlijkheidstest</h4>
                          <span className="c-grey">DISC Model</span>
                        </div>
                      </div>
                      
                      <p className="mb-3">
                        Ontdek je persoonlijkheidstype en werkstijl. Ben je een Doener, Inspirator, 
                        Supporter of Analist? Deze test helpt werkgevers begrijpen hoe je in hun team past.
                      </p>

                      <ul className="list-unstyled mb-4">
                        <li className="mb-2">
                          <i className="far fa-clock mr-2 c-grey"></i>
                          Duurt 5 minuten
                        </li>
                        <li className="mb-2">
                          <i className="far fa-question-circle mr-2 c-grey"></i>
                          12 vragen
                        </li>
                        <li className="mb-2">
                          <i className="far fa-chart-bar mr-2 c-grey"></i>
                          Uitgebreid resultaat
                        </li>
                      </ul>

                      <Link href="/tests/personality" className="crumina-button button--yellow button--m w-100 text-center">
                        Start test
                      </Link>
                    </div>
                  </div>

                  <div className="col-md-6 mb-4">
                    <div className="bg-white p-4 h-100" style={{ borderRadius: '10px' }}>
                      <div className="d-flex align-items-center mb-3">
                        <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#007bff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <i className="fas fa-chart-line text-white" style={{ fontSize: '24px' }}></i>
                        </div>
                        <div className="ml-3">
                          <h4 className="mb-0">Vaardighedentest</h4>
                          <span className="c-grey">5 Categorieen</span>
                        </div>
                      </div>
                      
                      <p className="mb-3">
                        Test je niveau in communicatie, probleemoplossend denken, samenwerking, 
                        digitale vaardigheden en aanpassingsvermogen.
                      </p>

                      <ul className="list-unstyled mb-4">
                        <li className="mb-2">
                          <i className="far fa-clock mr-2 c-grey"></i>
                          Duurt 10 minuten
                        </li>
                        <li className="mb-2">
                          <i className="far fa-question-circle mr-2 c-grey"></i>
                          15 vragen
                        </li>
                        <li className="mb-2">
                          <i className="far fa-chart-bar mr-2 c-grey"></i>
                          Score per categorie
                        </li>
                      </ul>

                      <Link href="/tests/skills" className="crumina-button button--blue button--m w-100 text-center">
                        Start test
                      </Link>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-dark p-4 text-center" style={{ borderRadius: '10px' }}>
                  <h4 className="text-white mb-2">Nog geen profiel?</h4>
                  <p className="text-white mb-3" style={{ opacity: 0.8 }}>
                    Maak eerst je profiel aan en vul daarna de testen in voor de beste matches.
                  </p>
                  <Link href="/candidates/submit-resume" className="crumina-button button--yellow button--m">
                    Maak profiel aan
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
