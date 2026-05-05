'use client';

import Link from 'next/link';

export default function PrivacyPolicyPage() {
  const today = new Date().toLocaleDateString('nl-BE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="mx-auto max-w-3xl">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Naar startpagina
        </Link>

        {/* Warning banner */}
        <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-amber-800 text-sm">
            <span className="font-semibold">Placeholder</span> — deze tekst is een sjabloon en moet voor go-live gevalideerd worden door een juridisch adviseur.
          </p>
        </div>

        {/* Content */}
        <article className="prose prose-gray max-w-none">
          <h1>Privacybeleid</h1>
          <p className="text-gray-500">Laatst bijgewerkt: {today}</p>

          <h2>1. Wie zijn wij?</h2>
          <p>
            Jobhulp is een matching-platform voor jobzoekers en werkgevers, beheerd door [bedrijfsnaam], gevestigd te [adres], BTW-nummer [BE...]. Voor vragen over dit privacybeleid kan je contact opnemen via [e-mail].
          </p>

          <h2>2. Welke gegevens verzamelen we?</h2>
          <p>Wij verzamelen de volgende categorieën van persoonsgegevens:</p>
          <ul>
            <li>
              <strong>Bij registratie:</strong> e-mailadres, wachtwoord (gehasht), gebruikerstype
            </li>
            <li>
              <strong>Profielgegevens (kandidaat):</strong> naam, telefoonnummer, geboortedatum, adres, foto, CV, opleiding, werkervaring, skills, salarisverwachting, persoonlijkheidstest-resultaat
            </li>
            <li>
              <strong>Profielgegevens (werkgever):</strong> bedrijfsnaam, BTW-nummer, adres, beschrijving, logo
            </li>
            <li>
              <strong>Gebruiksdata:</strong> matches, interesse-uitwisselingen, chatgesprekken, testresultaten, login-tijdstempels
            </li>
            <li>
              <strong>Cookies:</strong> één session-cookie voor authenticatie. Geen tracking-cookies.
            </li>
          </ul>

          <h2>3. Waarom verwerken we deze gegevens?</h2>
          <p>Wij verwerken je gegevens voor de volgende doeleinden:</p>
          <ul>
            <li>
              <strong>De dienst leveren:</strong> matching tussen kandidaten en werkgevers mogelijk maken
            </li>
            <li>
              <strong>Account-beheer en authenticatie:</strong> je account beveiligen en toegang verlenen
            </li>
            <li>
              <strong>Beveiliging:</strong> misbruik voorkomen en de veiligheid van het platform waarborgen
            </li>
            <li>
              <strong>Wettelijke verplichtingen:</strong> voldoen aan toepasselijke wet- en regelgeving
            </li>
          </ul>

          <h2>4. Met wie delen we gegevens?</h2>
          <ul>
            <li>
              <strong>Tussen kandidaat en werkgever:</strong> na wederzijdse interesse worden bepaalde profielgegevens gedeeld om contact mogelijk te maken
            </li>
            <li>
              <strong>Sub-processors:</strong> Neon (database), Cloudflare (opslag), Resend (e-mail), Railway (hosting). Allemaal binnen EU/EER of onder GDPR-conforme contracten.
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
              <strong>Inzage en data-portabiliteit (Art. 15+20):</strong> download je gegevens via{' '}
              <Link href="/dashboard/account" className="text-primary hover:underline">
                /dashboard/account
              </Link>
            </li>
            <li>
              <strong>Rectificatie (Art. 16):</strong> bewerk je profiel op elk moment
            </li>
            <li>
              <strong>Vergetelheid (Art. 17):</strong> verwijder je account zelf via de instellingen
            </li>
            <li>
              <strong>Beperking (Art. 18):</strong> deactiveer je account
            </li>
            <li>
              <strong>Bezwaar (Art. 21):</strong> contacteer ons
            </li>
            <li>
              <strong>Klacht:</strong> Gegevensbeschermingsautoriteit, Drukpersstraat 35, 1000 Brussel
            </li>
          </ul>

          <h2>7. Beveiliging</h2>
          <p>
            Wachtwoorden worden gehasht met bcrypt. Sessies verlopen via httpOnly-cookies met SameSite=Lax in productie. Alle verkeer verloopt via HTTPS. We voeren periodieke veiligheids-audits uit.
          </p>

          <h2>8. Wijzigingen aan dit beleid</h2>
          <p>
            We laten je per e-mail weten wanneer er substantiële wijzigingen zijn aan dit privacybeleid.
          </p>
        </article>
      </div>
    </div>
  );
}
