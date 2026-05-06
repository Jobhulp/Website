'use client';

import Link from 'next/link';
import Header from '@/components/common/header/Header';
import Footer from '@/components/common/footer/Footer';

export default function PrivacyPolicyPage() {
  const today = new Date().toLocaleDateString('nl-BE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-dark-themes min-h-screen">
      <Header />
      
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center gap-2 text-sm">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li className="text-gray-600">/</li>
                <li className="text-white">Privacybeleid</li>
              </ol>
            </nav>

            {/* Header */}
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Privacybeleid
              </h1>
              <p className="text-gray-400">
                Laatst bijgewerkt: {today}
              </p>
            </div>

            {/* Placeholder warning */}
            <div className="mb-8 p-4 rounded-lg border border-yellow-500/30 bg-yellow-500/10">
              <div className="flex items-start gap-3">
                <i className="fas fa-exclamation-triangle text-yellow-500 mt-0.5"></i>
                <p className="text-yellow-200 text-sm">
                  <strong>Placeholder</strong> — deze tekst is een sjabloon en moet voor go-live 
                  gevalideerd worden door een juridisch adviseur.
                </p>
              </div>
            </div>

            {/* Content card */}
            <div className="bg-white rounded-xl p-8 md:p-12 shadow-xl">
              <article className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
                
                <h2>1. Wie zijn wij?</h2>
                <p>
                  Jobhulp is een matching-platform voor jobzoekers en werkgevers, beheerd door 
                  [bedrijfsnaam], gevestigd te [adres], BTW-nummer [BE...]. Voor vragen over dit 
                  privacybeleid kan je contact opnemen via [e-mail].
                </p>

                <h2>2. Welke gegevens verzamelen we?</h2>
                <p>Wij verzamelen de volgende categorieën van persoonsgegevens:</p>
                <ul>
                  <li>
                    <strong>Bij registratie:</strong> e-mailadres, wachtwoord (gehasht), gebruikerstype
                  </li>
                  <li>
                    <strong>Profielgegevens (kandidaat):</strong> naam, telefoonnummer, geboortedatum, 
                    adres, foto, CV, opleiding, werkervaring, skills, salarisverwachting, 
                    persoonlijkheidstest-resultaat
                  </li>
                  <li>
                    <strong>Profielgegevens (werkgever):</strong> bedrijfsnaam, BTW-nummer, adres, 
                    beschrijving, logo
                  </li>
                  <li>
                    <strong>Gebruiksdata:</strong> matches, interesse-uitwisselingen, chatgesprekken, 
                    testresultaten, login-tijdstempels
                  </li>
                  <li>
                    <strong>Cookies:</strong> één session-cookie voor authenticatie. Geen tracking-cookies.
                  </li>
                </ul>

                <h2>3. Waarom verwerken we deze gegevens?</h2>
                <p>Wij verwerken je gegevens voor de volgende doeleinden:</p>
                <ul>
                  <li>
                    <strong>De dienst leveren:</strong> matching tussen kandidaten en werkgevers 
                    mogelijk maken
                  </li>
                  <li>
                    <strong>Account-beheer en authenticatie:</strong> je account beveiligen en 
                    toegang verlenen
                  </li>
                  <li>
                    <strong>Beveiliging:</strong> misbruik voorkomen en de veiligheid van het 
                    platform waarborgen
                  </li>
                  <li>
                    <strong>Wettelijke verplichtingen:</strong> voldoen aan toepasselijke wet- en 
                    regelgeving
                  </li>
                </ul>

                <h2>4. Met wie delen we gegevens?</h2>
                <ul>
                  <li>
                    <strong>Tussen kandidaat en werkgever:</strong> na wederzijdse interesse worden 
                    bepaalde profielgegevens gedeeld om contact mogelijk te maken
                  </li>
                  <li>
                    <strong>Sub-processors:</strong> Neon (database), Cloudflare (opslag), Resend 
                    (e-mail), Railway (hosting). Allemaal binnen EU/EER of onder GDPR-conforme 
                    contracten.
                  </li>
                </ul>

                <h2>5. Hoe lang bewaren we gegevens?</h2>
                <ul>
                  <li>
                    <strong>Actieve accounts:</strong> zolang het account bestaat
                  </li>
                  <li>
                    <strong>Verwijderde accounts:</strong> 30 dagen anonimisatie, daarna hard-delete
                  </li>
                  <li>
                    <strong>Audit-log voor admin-acties:</strong> 5 jaar
                  </li>
                </ul>

                <h2>6. Jouw rechten (GDPR)</h2>
                <p>Als betrokkene heb je de volgende rechten:</p>
                <ul>
                  <li>
                    <strong>Inzage en data-portabiliteit (Art. 15+20):</strong> download je gegevens 
                    via <Link href="/dashboard/account">/dashboard/account</Link>
                  </li>
                  <li>
                    <strong>Rectificatie (Art. 16):</strong> bewerk je profiel op elk moment
                  </li>
                  <li>
                    <strong>Vergetelheid (Art. 17):</strong> verwijder je account zelf via de 
                    instellingen
                  </li>
                  <li>
                    <strong>Beperking (Art. 18):</strong> deactiveer je account
                  </li>
                  <li>
                    <strong>Bezwaar (Art. 21):</strong> contacteer ons
                  </li>
                  <li>
                    <strong>Klacht:</strong> Gegevensbeschermingsautoriteit, Drukpersstraat 35, 
                    1000 Brussel
                  </li>
                </ul>

                <h2>7. Beveiliging</h2>
                <p>
                  Wachtwoorden worden gehasht met bcrypt. Sessies verlopen via httpOnly-cookies met 
                  SameSite=Lax in productie. Alle verkeer verloopt via HTTPS. We voeren periodieke 
                  veiligheids-audits uit.
                </p>

                <h2>8. Wijzigingen aan dit beleid</h2>
                <p>
                  We laten je per e-mail weten wanneer er substantiële wijzigingen zijn aan dit 
                  privacybeleid.
                </p>

                <hr className="my-8 border-gray-200" />

                <p className="text-sm text-gray-500">
                  Zie ook:{' '}
                  <Link href="/terms">Gebruiksvoorwaarden</Link>
                </p>
              </article>
            </div>

            {/* Back to home */}
            <div className="mt-8 text-center">
              <Link 
                href="/"
                className="crumina-button button--secondary inline-flex items-center gap-2"
              >
                <i className="fas fa-arrow-left"></i>
                Terug naar home
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
