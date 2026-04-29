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
                        <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <i className="fas fa-brain text-white" style={{ fontSize: '24px' }}></i>
                        </div>
                        <div className="ml-3">
                          <h4 className="mb-0">Persoonlijkheidstest</h4>
                          <span className="c-grey">MBTI - 16 Types</span>
                        </div>
                      </div>
                      
                      <p className="mb-3">
                        Ontdek je MBTI persoonlijkheidstype (zoals ENTJ, INFP). Begrijp je werkstijl, 
                        communicatie en hoe je het beste samenwerkt met anderen.
                      </p>

                      <ul className="list-unstyled mb-4">
                        <li className="mb-2">
                          <i className="far fa-clock mr-2 c-grey"></i>
                          Duurt 8-10 minuten
                        </li>
                        <li className="mb-2">
                          <i className="far fa-question-circle mr-2 c-grey"></i>
                          20 vragen
                        </li>
                        <li className="mb-2">
                          <i className="far fa-chart-bar mr-2 c-grey"></i>
                          16 persoonlijkheidstypes
                        </li>
                      </ul>

                      <Link href="/tests/personality" className="crumina-button button--m w-100 text-center" style={{ background: '#6366f1', color: '#fff' }}>
                        Start test
                      </Link>
                    </div>
                  </div>

                  <div className="col-md-6 mb-4">
                    <div className="bg-white p-4 h-100" style={{ borderRadius: '10px' }}>
                      <div className="d-flex align-items-center mb-3">
                        <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <i className="fas fa-briefcase text-white" style={{ fontSize: '24px' }}></i>
                        </div>
                        <div className="ml-3">
                          <h4 className="mb-0">Vaardighedentest</h4>
                          <span className="c-grey">Per jobrichting</span>
                        </div>
                      </div>
                      
                      <p className="mb-3">
                        Kies je gewenste sector (IT, Marketing, Bouw, Horeca, etc.) en test je niveau 
                        met vakspecifieke vragen. Bepaal of je Junior, Medior of Senior bent.
                      </p>

                      <ul className="list-unstyled mb-4">
                        <li className="mb-2">
                          <i className="far fa-clock mr-2 c-grey"></i>
                          Duurt 10-15 minuten
                        </li>
                        <li className="mb-2">
                          <i className="far fa-list mr-2 c-grey"></i>
                          13 sectoren beschikbaar
                        </li>
                        <li className="mb-2">
                          <i className="far fa-chart-bar mr-2 c-grey"></i>
                          Junior / Medior / Senior niveau
                        </li>
                      </ul>

                      <Link href="/tests/skills" className="crumina-button button--m w-100 text-center" style={{ background: '#059669', color: '#fff' }}>
                        Kies sector en start
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Beschikbare sectoren */}
                <div className="bg-white p-4 mb-4" style={{ borderRadius: '10px' }}>
                  <h5 className="mb-3">Beschikbare sectoren voor de vaardighedentest</h5>
                  <div className="row">
                    {[
                      { name: 'IT & Development', icon: 'fa-code', color: '#6366f1' },
                      { name: 'Marketing & Communicatie', icon: 'fa-bullhorn', color: '#ec4899' },
                      { name: 'Sales & Business Dev', icon: 'fa-handshake', color: '#f59e0b' },
                      { name: 'Finance & Accounting', icon: 'fa-chart-pie', color: '#059669' },
                      { name: 'HR & Recruitment', icon: 'fa-users-cog', color: '#8b5cf6' },
                      { name: 'Operations & Logistiek', icon: 'fa-cogs', color: '#0891b2' },
                      { name: 'Customer Service', icon: 'fa-headset', color: '#10b981' },
                      { name: 'Design & Creative', icon: 'fa-paint-brush', color: '#f43f5e' },
                      { name: 'Gezondheidszorg', icon: 'fa-heartbeat', color: '#ef4444' },
                      { name: 'Automotive & Techniek', icon: 'fa-car', color: '#3b82f6' },
                      { name: 'Bouw & Constructie', icon: 'fa-hard-hat', color: '#f97316' },
                      { name: 'Vastgoed & Makelaardij', icon: 'fa-home', color: '#14b8a6' },
                      { name: 'Horeca & Hospitality', icon: 'fa-utensils', color: '#a855f7' },
                    ].map((sector, index) => (
                      <div key={index} className="col-6 col-md-4 col-lg-3 mb-2">
                        <div className="d-flex align-items-center p-2" style={{ fontSize: '13px' }}>
                          <i className={`fas ${sector.icon} mr-2`} style={{ color: sector.color, width: '18px' }}></i>
                          <span>{sector.name}</span>
                        </div>
                      </div>
                    ))}
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
