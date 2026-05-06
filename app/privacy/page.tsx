import Link from 'next/link';
import Footer from '@/components/common/footer/Footer';
import Jumbotron from '@/components/common/jumbotron/Jumbotron';
import SignupCta from '@/components/signup-cta/SignupCta';

export default function PrivacyPolicyPage() {
  return (
    <main>
      <Jumbotron
        title="Privacybeleid"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Privacy', isActive: true }
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
                <h2 className="h4 mb-3">1. Wie zijn wij?</h2>
                <p>
                  Jobhulp is een matching-platform voor jobzoekers en werkgevers, beheerd door 
                  Jobhulp BV, gevestigd in Belgie. Voor vragen over dit privacybeleid kan je 
                  contact opnemen via <a href="mailto:privacy@jobhulp.be" className="c-primary">privacy@jobhulp.be</a>.
                </p>
              </div>

              <div className="mb-5">
                <h2 className="h4 mb-3">2. Welke gegevens verzamelen we?</h2>
                <p>Wij verzamelen de volgende categorieen van persoonsgegevens:</p>
                <ul className="list--standard">
                  <li><strong>Bij registratie:</strong> e-mailadres, wachtwoord (gehasht), gebruikerstype</li>
                  <li><strong>Profielgegevens (kandidaat):</strong> naam, telefoonnummer, geboortedatum, adres, foto, CV, opleiding, werkervaring, skills, salarisverwachting, persoonlijkheidstest-resultaat</li>
                  <li><strong>Profielgegevens (werkgever):</strong> bedrijfsnaam, BTW-nummer, adres, beschrijving, logo</li>
                  <li><strong>Gebruiksdata:</strong> matches, interesse-uitwisselingen, chatgesprekken, testresultaten, login-tijdstempels</li>
                  <li><strong>Cookies:</strong> een session-cookie voor authenticatie. Geen tracking-cookies.</li>
                </ul>
              </div>

              <div className="mb-5">
                <h2 className="h4 mb-3">3. Waarom verwerken we deze gegevens?</h2>
                <p>Wij verwerken je gegevens voor de volgende doeleinden:</p>
                <ul className="list--standard">
                  <li><strong>De dienst leveren:</strong> matching tussen kandidaten en werkgevers mogelijk maken</li>
                  <li><strong>Account-beheer en authenticatie:</strong> je account beveiligen en toegang verlenen</li>
                  <li><strong>Beveiliging:</strong> misbruik voorkomen en de veiligheid van het platform waarborgen</li>
                  <li><strong>Wettelijke verplichtingen:</strong> voldoen aan toepasselijke wet- en regelgeving</li>
                </ul>
              </div>

              <div className="mb-5">
                <h2 className="h4 mb-3">4. Met wie delen we gegevens?</h2>
                <ul className="list--standard">
                  <li><strong>Tussen kandidaat en werkgever:</strong> na wederzijdse interesse worden bepaalde profielgegevens gedeeld om contact mogelijk te maken</li>
                  <li><strong>Sub-processors:</strong> Neon (database), Cloudflare (opslag), Resend (e-mail). Allemaal binnen EU/EER of onder GDPR-conforme contracten.</li>
                </ul>
              </div>

              <div className="mb-5">
                <h2 className="h4 mb-3">5. Hoe lang bewaren we gegevens?</h2>
                <ul className="list--standard">
                  <li><strong>Actieve accounts:</strong> zolang het account bestaat</li>
                  <li><strong>Verwijderde accounts:</strong> 30 dagen anonimisatie, daarna hard-delete</li>
                  <li><strong>Audit-log voor admin-acties:</strong> 5 jaar</li>
                </ul>
              </div>

              <div className="mb-5">
                <h2 className="h4 mb-3">6. Jouw rechten (GDPR)</h2>
                <p>Als betrokkene heb je de volgende rechten:</p>
                <ul className="list--standard">
                  <li><strong>Inzage en data-portabiliteit (Art. 15+20):</strong> download je gegevens via je account-instellingen</li>
                  <li><strong>Rectificatie (Art. 16):</strong> bewerk je profiel op elk moment</li>
                  <li><strong>Vergetelheid (Art. 17):</strong> verwijder je account zelf via de instellingen</li>
                  <li><strong>Beperking (Art. 18):</strong> deactiveer je account</li>
                  <li><strong>Bezwaar (Art. 21):</strong> contacteer ons</li>
                  <li><strong>Klacht:</strong> Gegevensbeschermingsautoriteit, Drukpersstraat 35, 1000 Brussel</li>
                </ul>
              </div>

              <div className="mb-5">
                <h2 className="h4 mb-3">7. Beveiliging</h2>
                <p>
                  Wachtwoorden worden gehasht met bcrypt. Sessies verlopen via httpOnly-cookies met 
                  SameSite=Lax in productie. Alle verkeer verloopt via HTTPS. We voeren periodieke 
                  veiligheids-audits uit.
                </p>
              </div>

              <div className="mb-5">
                <h2 className="h4 mb-3">8. Wijzigingen aan dit beleid</h2>
                <p>
                  We laten je per e-mail weten wanneer er substantiele wijzigingen zijn aan dit 
                  privacybeleid.
                </p>
              </div>

              <hr className="my-5" />

              <p className="c-grey">
                Zie ook: <Link href="/terms" className="c-primary">Gebruiksvoorwaarden</Link>
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
