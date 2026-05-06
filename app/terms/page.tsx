import Link from 'next/link';
import Footer from '@/components/common/footer/Footer';
import Jumbotron from '@/components/common/jumbotron/Jumbotron';
import SignupCta from '@/components/signup-cta/SignupCta';

export default function TermsPage() {
  return (
    <main>
      <Jumbotron
        title="Gebruiksvoorwaarden"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Voorwaarden', isActive: true }
        ]}
      >
        <div className="col-lg-8 col-md-10 col-sm-12">
          <p className="c-white-dark mb-0">
            Laatst bijgewerkt: 1 mei 2026
          </p>
        </div>
      </Jumbotron>

      <section className="medium-padding100">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 col-sm-12 mx-auto">
              
              <div className="mb-5">
                <h2 className="h4 mb-3">1. Aanvaarding van de voorwaarden</h2>
                <p>
                  Door je te registreren of Jobhulp te gebruiken ga je akkoord met deze 
                  voorwaarden en met ons <Link href="/privacy" className="c-primary">privacybeleid</Link>.
                </p>
              </div>

              <div className="mb-5">
                <h2 className="h4 mb-3">2. Beschrijving van de dienst</h2>
                <p>
                  Jobhulp is een online platform dat jobzoekers (&quot;kandidaten&quot;) en werkgevers 
                  samenbrengt op basis van vaardigheden, persoonlijkheid en voorkeuren. Wij 
                  faciliteren de match en bieden communicatie-tools, maar zijn geen partij bij 
                  eventuele arbeidsovereenkomsten.
                </p>
              </div>

              <div className="mb-5">
                <h2 className="h4 mb-3">3. Account-vereisten</h2>
                <p>Om Jobhulp te gebruiken moet je:</p>
                <ul className="list--standard">
                  <li>Minimaal 16 jaar oud zijn</li>
                  <li>Accurate en waarheidsgetrouwe informatie verstrekken</li>
                  <li>Slechts een account per persoon aanmaken</li>
                  <li>Bij bedrijfsaccounts: een bevoegd vertegenwoordiger zijn van het bedrijf</li>
                  <li>Je login-gegevens niet delen met derden</li>
                </ul>
              </div>

              <div className="mb-5">
                <h2 className="h4 mb-3">4. Aanvaardbaar gebruik</h2>
                <p>Je gaat akkoord om Jobhulp niet te gebruiken voor:</p>
                <ul className="list--standard">
                  <li>Het verstrekken van frauduleuze of misleidende informatie</li>
                  <li>Discriminatie op basis van beschermde kenmerken</li>
                  <li>Het versturen van spam of ongewenste berichten</li>
                  <li>Het lastigvallen of intimideren van andere gebruikers</li>
                  <li>Ongeautoriseerde toegang tot systemen (hacking) of geautomatiseerd verzamelen van data (scraping)</li>
                  <li>Het schenden van auteursrechten of andere intellectuele eigendomsrechten</li>
                </ul>
              </div>

              <div className="mb-5">
                <h2 className="h4 mb-3">5. Inhoud die je deelt</h2>
                <p>
                  Door inhoud te plaatsen (zoals profielgegevens, cv&apos;s, vacatureteksten) 
                  verleen je ons een niet-exclusieve, wereldwijde licentie om die inhoud 
                  weer te geven en te verwerken in het kader van onze diensten. Je behoudt 
                  het volledige eigendomsrecht over je inhoud.
                </p>
              </div>

              <div className="mb-5">
                <h2 className="h4 mb-3">6. Werkgevers - extra voorwaarden</h2>
                <p>Als werkgever ga je daarnaast akkoord met het volgende:</p>
                <ul className="list--standard">
                  <li>Vacatureteksten zijn waarheidsgetrouw en niet discriminerend</li>
                  <li>Werkgevertoetsen worden uitsluitend gebruikt voor legitieme selectiedoeleinden</li>
                  <li>Persoonsgegevens van kandidaten worden alleen gebruikt voor de specifieke vacature waarvoor de kandidaat zich heeft aangemeld</li>
                </ul>
              </div>

              <div className="mb-5">
                <h2 className="h4 mb-3">7. Beeindiging</h2>
                <p>
                  Je kan je account op elk moment verwijderen via je account-instellingen. 
                  Wij behouden ons het recht voor om accounts op te schorten of te beeindigen 
                  bij schending van deze voorwaarden.
                </p>
              </div>

              <div className="mb-5">
                <h2 className="h4 mb-3">8. Beperking van aansprakelijkheid</h2>
                <p>
                  Jobhulp wordt geleverd &quot;as is&quot;. Wij garanderen niet dat de dienst 
                  ononderbroken of foutloos is. Onze totale aansprakelijkheid is beperkt 
                  tot het bedrag dat je in de afgelopen 12 maanden hebt betaald, behalve 
                  waar de wet dit verbiedt.
                </p>
              </div>

              <div className="mb-5">
                <h2 className="h4 mb-3">9. Wijzigingen aan deze voorwaarden</h2>
                <p>
                  Substantiele wijzigingen worden per e-mail aangekondigd, minstens 30 
                  dagen voordat ze van kracht worden. Door de dienst te blijven gebruiken 
                  na die datum, ga je akkoord met de gewijzigde voorwaarden.
                </p>
              </div>

              <div className="mb-5">
                <h2 className="h4 mb-3">10. Toepasselijk recht</h2>
                <p>
                  Op deze voorwaarden is Belgisch recht van toepassing. Geschillen worden 
                  voorgelegd aan de bevoegde rechtbanken. Voor consumenten: je kan ook 
                  terecht bij het Europees ODR-platform op{' '}
                  <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="c-primary">
                    ec.europa.eu/consumers/odr
                  </a>.
                </p>
              </div>

              <hr className="my-5" />

              <p className="c-grey">
                Zie ook: <Link href="/privacy" className="c-primary">Privacybeleid</Link>
              </p>

            </div>
          </div>
        </div>
      </section>

      <SignupCta />
      <Footer />
    </main>
  );
}
