'use client';

export default function TermsPage() {
  const today = new Date().toLocaleDateString('nl-BE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-3xl px-4">
        {/* Placeholder banner */}
        <div className="mb-8 rounded-lg border border-amber-300 bg-amber-50 p-4">
          <p className="text-sm text-amber-800">
            <strong>Let op:</strong> Dit is een placeholder-document. Laat deze
            voorwaarden nakijken door een jurist voordat je live gaat.
          </p>
        </div>

        <article className="prose prose-gray max-w-none">
          <h1>Gebruiksvoorwaarden</h1>
          <p className="text-gray-500">Laatst bijgewerkt: {today}</p>

          <h2>1. Aanvaarding van de voorwaarden</h2>
          <p>
            Door je te registreren of Jobhulp te gebruiken ga je akkoord met deze
            voorwaarden en met ons{' '}
            <a href="/privacy" className="text-primary hover:underline">
              privacybeleid
            </a>
            .
          </p>

          <h2>2. Beschrijving van de dienst</h2>
          <p>
            Jobhulp is een online platform dat jobzoekers (&quot;kandidaten&quot;) en
            werkgevers samenbrengt op basis van vaardigheden, persoonlijkheid en
            voorkeuren. Wij faciliteren de match en bieden communicatie-tools,
            maar zijn geen partij bij eventuele arbeidsovereenkomsten.
          </p>

          <h2>3. Account-vereisten</h2>
          <p>Om Jobhulp te gebruiken moet je:</p>
          <ul>
            <li>Minimaal 16 jaar oud zijn</li>
            <li>Accurate en waarheidsgetrouwe informatie verstrekken</li>
            <li>Slechts een account per persoon aanmaken</li>
            <li>
              Bij bedrijfsaccounts: een bevoegd vertegenwoordiger zijn van het
              bedrijf
            </li>
            <li>Je login-gegevens niet delen met derden</li>
          </ul>

          <h2>4. Aanvaardbaar gebruik</h2>
          <p>Je gaat akkoord om Jobhulp niet te gebruiken voor:</p>
          <ul>
            <li>Het verstrekken van frauduleuze of misleidende informatie</li>
            <li>Discriminatie op basis van beschermde kenmerken</li>
            <li>Het versturen van spam of ongewenste berichten</li>
            <li>Het lastigvallen of intimideren van andere gebruikers</li>
            <li>
              Ongeautoriseerde toegang tot systemen (hacking) of geautomatiseerd
              verzamelen van data (scraping)
            </li>
            <li>Het schenden van auteursrechten of andere intellectuele eigendomsrechten</li>
          </ul>

          <h2>5. Inhoud die je deelt</h2>
          <p>
            Door inhoud te plaatsen (zoals profielgegevens, cv&apos;s, vacatureteksten)
            verleen je ons een niet-exclusieve, wereldwijde licentie om die
            inhoud weer te geven en te verwerken in het kader van onze diensten.
            Je behoudt het volledige eigendomsrecht over je inhoud.
          </p>

          <h2>6. Werkgevers — extra voorwaarden</h2>
          <p>Als werkgever ga je daarnaast akkoord met het volgende:</p>
          <ul>
            <li>
              Vacatureteksten zijn waarheidsgetrouw en niet discriminerend
            </li>
            <li>
              Werkgevertoetsen worden uitsluitend gebruikt voor legitieme
              selectiedoeleinden
            </li>
            <li>
              Persoonsgegevens van kandidaten worden alleen gebruikt voor de
              specifieke vacature waarvoor de kandidaat zich heeft aangemeld
            </li>
          </ul>

          <h2>7. Tarieven</h2>
          <p>
            [Beschrijf hier het prijsmodel — gratis tier voor kandidaten,
            abonnement voor werkgevers, etc.]
          </p>

          <h2>8. Beëindiging</h2>
          <p>
            Je kan je account op elk moment verwijderen via je{' '}
            <a href="/dashboard/account" className="text-primary hover:underline">
              account-instellingen
            </a>
            . Wij behouden ons het recht voor om accounts op te schorten of te
            beëindigen bij schending van deze voorwaarden.
          </p>

          <h2>9. Beperking van aansprakelijkheid</h2>
          <p>
            Jobhulp wordt geleverd &quot;as is&quot;. Wij garanderen niet dat de dienst
            ononderbroken of foutloos is. Onze totale aansprakelijkheid is
            beperkt tot het bedrag dat je in de afgelopen 12 maanden hebt
            betaald, of €100 indien dit hoger is, behalve waar de wet dit
            verbiedt.
          </p>

          <h2>10. Intellectuele eigendom</h2>
          <p>
            De software, het matching-algoritme, de skill-tests en de
            persoonlijkheidstest zijn eigendom van [bedrijfsnaam]. Ongeautoriseerd
            gebruik, reproductie of reverse engineering is verboden.
          </p>

          <h2>11. Wijzigingen aan deze voorwaarden</h2>
          <p>
            Substantiële wijzigingen worden per e-mail aangekondigd, minstens 30
            dagen voordat ze van kracht worden. Door de dienst te blijven
            gebruiken na die datum, ga je akkoord met de gewijzigde voorwaarden.
          </p>

          <h2>12. Toepasselijk recht en geschillen</h2>
          <p>
            Op deze voorwaarden is Belgisch recht van toepassing. Geschillen
            worden voorgelegd aan de bevoegde rechtbanken te [stad]. Voor
            consumenten: je kan ook terecht bij het Europees ODR-platform op{' '}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              ec.europa.eu/consumers/odr
            </a>
            .
          </p>

          <hr className="my-8" />

          <p className="text-sm text-gray-500">
            Zie ook:{' '}
            <a href="/privacy" className="text-primary hover:underline">
              Privacybeleid
            </a>{' '}
            |{' '}
            <a href="/" className="text-primary hover:underline">
              Terug naar home
            </a>
          </p>
        </article>
      </div>
    </main>
  );
}
