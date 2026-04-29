// Vaardighedentest voor Jobhulp
// Kandidaten kiezen hun gewenste jobrichting en krijgen specifieke vragen

export interface JobDirection {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  categories: SkillCategory[];
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  questions: SkillQuestion[];
}

export interface SkillQuestion {
  id: number;
  question: string;
  type: 'multiple_choice' | 'scenario' | 'self_assessment';
  options: SkillOption[];
  difficulty: 'junior' | 'medior' | 'senior';
}

export interface SkillOption {
  text: string;
  points: number;
  isCorrect?: boolean;
}

// Alle beschikbare jobrichtingen
export const jobDirections: JobDirection[] = [
  {
    id: 'it_development',
    name: 'IT & Development',
    description: 'Software development, webontwikkeling, devops',
    icon: 'fa-code',
    color: '#6366f1',
    categories: [
      {
        id: 'programming',
        name: 'Programmeren',
        description: 'Basiskennis van programmeren en softwareontwikkeling',
        questions: [
          {
            id: 101,
            question: 'Wat is het verschil tussen een array en een object in JavaScript?',
            type: 'multiple_choice',
            difficulty: 'junior',
            options: [
              { text: 'Er is geen verschil, het zijn synoniemen', points: 0 },
              { text: 'Arrays zijn geordende lijsten met index, objects zijn key-value pairs', points: 4, isCorrect: true },
              { text: 'Arrays kunnen alleen strings bevatten', points: 1 },
              { text: 'Objects zijn sneller dan arrays', points: 1 }
            ]
          },
          {
            id: 102,
            question: 'Een API retourneert een 404 error. Wat betekent dit?',
            type: 'multiple_choice',
            difficulty: 'junior',
            options: [
              { text: 'De server is offline', points: 1 },
              { text: 'Je bent niet geautoriseerd', points: 1 },
              { text: 'De gevraagde resource bestaat niet', points: 4, isCorrect: true },
              { text: 'Er is een syntax error in je code', points: 0 }
            ]
          },
          {
            id: 103,
            question: 'Wat is het doel van versiebeheer (Git)?',
            type: 'multiple_choice',
            difficulty: 'junior',
            options: [
              { text: 'Code sneller laten draaien', points: 0 },
              { text: 'Wijzigingen bijhouden en samenwerken aan code', points: 4, isCorrect: true },
              { text: 'Automatisch bugs oplossen', points: 0 },
              { text: 'Code compileren naar machine code', points: 0 }
            ]
          },
          {
            id: 104,
            question: 'Je moet kiezen tussen een SQL en NoSQL database. Wanneer kies je SQL?',
            type: 'scenario',
            difficulty: 'medior',
            options: [
              { text: 'Altijd, SQL is beter', points: 1 },
              { text: 'Bij gestructureerde data met relaties en behoefte aan ACID compliance', points: 4 },
              { text: 'Als je veel ongestructureerde documenten hebt', points: 0 },
              { text: 'NoSQL is altijd sneller dus nooit SQL kiezen', points: 0 }
            ]
          },
          {
            id: 105,
            question: 'Hoe zou je een applicatie met hoge beschikbaarheid ontwerpen?',
            type: 'scenario',
            difficulty: 'senior',
            options: [
              { text: 'Een krachtige server is genoeg', points: 0 },
              { text: 'Load balancing, redundantie, failover en monitoring implementeren', points: 4 },
              { text: 'De code heel goed testen', points: 1 },
              { text: 'Gebruikers vragen later terug te komen bij problemen', points: 0 }
            ]
          }
        ]
      },
      {
        id: 'problem_solving_it',
        name: 'Probleemoplossing',
        description: 'Debuggen en technische problemen analyseren',
        questions: [
          {
            id: 106,
            question: 'Een applicatie crasht in productie. Wat is je eerste stap?',
            type: 'scenario',
            difficulty: 'medior',
            options: [
              { text: 'Direct de code aanpassen en deployen', points: 0 },
              { text: 'Logs bekijken en de error analyseren', points: 4 },
              { text: 'Wachten tot het vanzelf oplost', points: 0 },
              { text: 'De server herstarten', points: 2 }
            ]
          },
          {
            id: 107,
            question: 'Hoe debug je een memory leak in een applicatie?',
            type: 'multiple_choice',
            difficulty: 'senior',
            options: [
              { text: 'Meer RAM toevoegen aan de server', points: 1 },
              { text: 'Profiling tools gebruiken om memory allocatie te analyseren', points: 4, isCorrect: true },
              { text: 'De applicatie vaker herstarten', points: 0 },
              { text: 'Alle code opnieuw schrijven', points: 0 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'marketing',
    name: 'Marketing & Communicatie',
    description: 'Digital marketing, content, branding',
    icon: 'fa-bullhorn',
    color: '#ec4899',
    categories: [
      {
        id: 'digital_marketing',
        name: 'Digital Marketing',
        description: 'Online marketing strategieen en tools',
        questions: [
          {
            id: 201,
            question: 'Wat meet de CTR (Click-Through Rate)?',
            type: 'multiple_choice',
            difficulty: 'junior',
            options: [
              { text: 'Het aantal bezoekers op je website', points: 1 },
              { text: 'Het percentage mensen dat klikt na het zien van een ad/link', points: 4, isCorrect: true },
              { text: 'De totale omzet van een campagne', points: 0 },
              { text: 'Hoe lang mensen op je pagina blijven', points: 0 }
            ]
          },
          {
            id: 202,
            question: 'Wat is het verschil tussen SEO en SEA?',
            type: 'multiple_choice',
            difficulty: 'junior',
            options: [
              { text: 'Er is geen verschil', points: 0 },
              { text: 'SEO is organisch, SEA is betaald adverteren in zoekmachines', points: 4, isCorrect: true },
              { text: 'SEO is voor social media, SEA voor websites', points: 0 },
              { text: 'SEA is gratis, SEO is betaald', points: 0 }
            ]
          },
          {
            id: 203,
            question: 'Een campagne heeft hoge impressies maar lage conversies. Wat analyseer je?',
            type: 'scenario',
            difficulty: 'medior',
            options: [
              { text: 'Het budget verhogen', points: 1 },
              { text: 'Targeting, landingspagina en call-to-action analyseren', points: 4 },
              { text: 'De campagne stoppen', points: 0 },
              { text: 'Meer impressies kopen', points: 0 }
            ]
          },
          {
            id: 204,
            question: 'Hoe bepaal je de juiste marketing mix voor een B2B softwarebedrijf?',
            type: 'scenario',
            difficulty: 'senior',
            options: [
              { text: 'Focus alleen op social media ads', points: 1 },
              { text: 'Analyseer buyer journey, test kanalen en meet ROI per kanaal', points: 4 },
              { text: 'Kopieer wat concurrenten doen', points: 1 },
              { text: 'Kies het goedkoopste kanaal', points: 0 }
            ]
          },
          {
            id: 205,
            question: 'Wat is A/B testing?',
            type: 'multiple_choice',
            difficulty: 'junior',
            options: [
              { text: 'Twee versies vergelijken om te zien welke beter presteert', points: 4, isCorrect: true },
              { text: 'Afwisselen tussen twee campagnes', points: 1 },
              { text: 'Twee markten tegelijk targeten', points: 0 },
              { text: 'Een backup maken van je campagne', points: 0 }
            ]
          }
        ]
      },
      {
        id: 'content_creation',
        name: 'Content Creatie',
        description: 'Copywriting en content strategie',
        questions: [
          {
            id: 206,
            question: 'Wat maakt een goede headline?',
            type: 'self_assessment',
            difficulty: 'junior',
            options: [
              { text: 'Zo lang mogelijk met veel details', points: 0 },
              { text: 'Kort, pakkend en waarde-gedreven', points: 4 },
              { text: 'Veel uitroeptekens en hoofdletters', points: 0 },
              { text: 'Alleen de productnaam noemen', points: 1 }
            ]
          },
          {
            id: 207,
            question: 'Hoe ontwikkel je een content kalender voor een jaar?',
            type: 'scenario',
            difficulty: 'medior',
            options: [
              { text: 'Elke dag iets bedenken', points: 0 },
              { text: 'Themas, seizoenen, events en doelgroep behoeften mappen', points: 4 },
              { text: 'Alleen posts over producten plannen', points: 1 },
              { text: 'Concurrenten kopieren', points: 0 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'sales',
    name: 'Sales & Business Development',
    description: 'Verkoop, accountmanagement, business development',
    icon: 'fa-handshake',
    color: '#f59e0b',
    categories: [
      {
        id: 'sales_skills',
        name: 'Verkoopvaardigheden',
        description: 'Technieken en strategieen voor verkoop',
        questions: [
          {
            id: 301,
            question: 'Een prospect zegt "te duur". Hoe reageer je?',
            type: 'scenario',
            difficulty: 'junior',
            options: [
              { text: 'Direct korting aanbieden', points: 1 },
              { text: 'Vragen welke waarde ze zoeken en ROI uitleggen', points: 4 },
              { text: 'Zeggen dat de prijs vast staat', points: 0 },
              { text: 'De concurrent benoemen die goedkoper is', points: 0 }
            ]
          },
          {
            id: 302,
            question: 'Wat is SPIN selling?',
            type: 'multiple_choice',
            difficulty: 'medior',
            options: [
              { text: 'Snel pitchen en doorschakelen', points: 0 },
              { text: 'Situation, Problem, Implication, Need-payoff vragen stellen', points: 4, isCorrect: true },
              { text: 'Producten ronddraaien tot iets past', points: 0 },
              { text: 'Social media gebruiken voor sales', points: 0 }
            ]
          },
          {
            id: 303,
            question: 'Hoe bouw je een sales pipeline op voor een nieuw product?',
            type: 'scenario',
            difficulty: 'senior',
            options: [
              { text: 'Koud bellen tot je klanten hebt', points: 1 },
              { text: 'ICP definieren, multi-channel outreach, nurturing en opvolging systematiseren', points: 4 },
              { text: 'Wachten tot marketing leads binnenbrengt', points: 0 },
              { text: 'Alleen via LinkedIn connecten', points: 1 }
            ]
          },
          {
            id: 304,
            question: 'Wat is de belangrijkste KPI voor een B2B sales team?',
            type: 'multiple_choice',
            difficulty: 'medior',
            options: [
              { text: 'Aantal cold calls per dag', points: 1 },
              { text: 'Conversieratio en gemiddelde dealwaarde', points: 4, isCorrect: true },
              { text: 'Aantal LinkedIn connecties', points: 0 },
              { text: 'Hoeveel emails verstuurd', points: 1 }
            ]
          },
          {
            id: 305,
            question: 'Een grote deal dreigt te mislukken in de finale fase. Wat doe je?',
            type: 'scenario',
            difficulty: 'senior',
            options: [
              { text: 'Accepteren en doorgaan naar de volgende prospect', points: 0 },
              { text: 'Objections identificeren, stakeholders betrekken en nieuwe waarde tonen', points: 4 },
              { text: 'De prijs halveren', points: 1 },
              { text: 'De prospect onder druk zetten', points: 0 }
            ]
          }
        ]
      },
      {
        id: 'relationship_management',
        name: 'Relatiebeheer',
        description: 'Klantrelaties onderhouden en uitbouwen',
        questions: [
          {
            id: 306,
            question: 'Hoe voorkom je klantchurn?',
            type: 'scenario',
            difficulty: 'medior',
            options: [
              { text: 'Lagere prijzen aanbieden', points: 1 },
              { text: 'Proactief contact, waarde leveren en problemen vroeg signaleren', points: 4 },
              { text: 'Wachten tot ze klagen', points: 0 },
              { text: 'Langere contracten pushen', points: 1 }
            ]
          },
          {
            id: 307,
            question: 'Een klant is ontevreden maar heeft niet opgezegd. Wat is je aanpak?',
            type: 'scenario',
            difficulty: 'junior',
            options: [
              { text: 'Afwachten, ze hebben niet opgezegd', points: 0 },
              { text: 'Persoonlijk gesprek voeren en actieplan maken', points: 4 },
              { text: 'Korting aanbieden zonder gesprek', points: 1 },
              { text: 'Het account overdragen aan een collega', points: 0 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'finance',
    name: 'Finance & Accounting',
    description: 'Boekhouding, financial analysis, controlling',
    icon: 'fa-chart-pie',
    color: '#059669',
    categories: [
      {
        id: 'accounting_basics',
        name: 'Boekhouden',
        description: 'Basis boekhoudprincipes',
        questions: [
          {
            id: 401,
            question: 'Wat is het verschil tussen debet en credit?',
            type: 'multiple_choice',
            difficulty: 'junior',
            options: [
              { text: 'Debet is wat je betaalt, credit is wat je ontvangt', points: 1 },
              { text: 'Debet verhoogt activa/kosten, credit verhoogt passiva/opbrengsten', points: 4, isCorrect: true },
              { text: 'Er is geen verschil', points: 0 },
              { text: 'Credit is altijd negatief', points: 0 }
            ]
          },
          {
            id: 402,
            question: 'Wat toont een balans?',
            type: 'multiple_choice',
            difficulty: 'junior',
            options: [
              { text: 'De winst over een periode', points: 0 },
              { text: 'Activa, passiva en eigen vermogen op een moment', points: 4, isCorrect: true },
              { text: 'Alleen de bankrekening', points: 0 },
              { text: 'De omzet per product', points: 0 }
            ]
          },
          {
            id: 403,
            question: 'Hoe bereken je de current ratio?',
            type: 'multiple_choice',
            difficulty: 'medior',
            options: [
              { text: 'Totale activa / totale passiva', points: 1 },
              { text: 'Vlottende activa / kortlopende schulden', points: 4, isCorrect: true },
              { text: 'Winst / omzet', points: 0 },
              { text: 'Kas / schulden', points: 1 }
            ]
          },
          {
            id: 404,
            question: 'Een bedrijf heeft negatieve werkkapitaal. Wat betekent dit?',
            type: 'scenario',
            difficulty: 'senior',
            options: [
              { text: 'Het bedrijf is failliet', points: 0 },
              { text: 'Kortlopende schulden zijn hoger dan vlottende activa - liquiditeitsrisico', points: 4 },
              { text: 'Het bedrijf maakt verlies', points: 1 },
              { text: 'Dit is altijd slecht', points: 1 }
            ]
          },
          {
            id: 405,
            question: 'Hoe zou je een cashflow forecast opstellen voor 12 maanden?',
            type: 'scenario',
            difficulty: 'senior',
            options: [
              { text: 'Vorig jaar kopieren', points: 0 },
              { text: 'Omzet, kosten, investeringen en seizoenspatronen modelleren met scenarios', points: 4 },
              { text: 'Alleen de bankafschriften bekijken', points: 1 },
              { text: 'De accountant laten doen', points: 0 }
            ]
          }
        ]
      },
      {
        id: 'financial_analysis',
        name: 'Financiele Analyse',
        description: 'Cijfers interpreteren en rapporteren',
        questions: [
          {
            id: 406,
            question: 'Wat zegt een hoge debt-to-equity ratio?',
            type: 'multiple_choice',
            difficulty: 'medior',
            options: [
              { text: 'Het bedrijf is winstgevend', points: 0 },
              { text: 'Veel schuld ten opzichte van eigen vermogen - hoger risico', points: 4, isCorrect: true },
              { text: 'Het bedrijf groeit snel', points: 1 },
              { text: 'Investeerders zijn tevreden', points: 0 }
            ]
          },
          {
            id: 407,
            question: 'Hoe presenteer je financiele resultaten aan niet-financiele stakeholders?',
            type: 'self_assessment',
            difficulty: 'medior',
            options: [
              { text: 'Alle details en formules tonen', points: 0 },
              { text: 'Visueel, met focus op key metrics en business impact', points: 4 },
              { text: 'Alleen de eindcijfers noemen', points: 1 },
              { text: 'Een lange spreadsheet mailen', points: 0 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'hr',
    name: 'HR & Recruitment',
    description: 'Human resources, werving, people management',
    icon: 'fa-users-cog',
    color: '#8b5cf6',
    categories: [
      {
        id: 'recruitment',
        name: 'Werving & Selectie',
        description: 'Kandidaten vinden en selecteren',
        questions: [
          {
            id: 501,
            question: 'Wat is de belangrijkste factor bij het beoordelen van een kandidaat?',
            type: 'self_assessment',
            difficulty: 'junior',
            options: [
              { text: 'Alleen het CV en opleiding', points: 1 },
              { text: 'Combinatie van skills, culture fit en groeipotentieel', points: 4 },
              { text: 'Hoeveel ervaring in jaren', points: 1 },
              { text: 'Of ze beschikbaar zijn', points: 0 }
            ]
          },
          {
            id: 502,
            question: 'Een hiring manager wil alleen kandidaten van top-universiteiten. Wat doe je?',
            type: 'scenario',
            difficulty: 'medior',
            options: [
              { text: 'Dit volgen zonder vragen', points: 0 },
              { text: 'Data tonen over diverse sourcing en bias bespreken', points: 4 },
              { text: 'Alleen deze kandidaten zoeken', points: 1 },
              { text: 'De vacature weigeren', points: 0 }
            ]
          },
          {
            id: 503,
            question: 'Hoe verbeter je de time-to-hire zonder kwaliteit te verliezen?',
            type: 'scenario',
            difficulty: 'senior',
            options: [
              { text: 'Minder interviews doen', points: 1 },
              { text: 'Proces stroomlijnen, talent pools bouwen en stakeholder alignment', points: 4 },
              { text: 'Hogere salarissen bieden', points: 1 },
              { text: 'Eerste beschikbare kandidaat aannemen', points: 0 }
            ]
          }
        ]
      },
      {
        id: 'hr_operations',
        name: 'HR Operations',
        description: 'Dagelijkse HR processen',
        questions: [
          {
            id: 504,
            question: 'Een medewerker klaagt over een collega. Eerste stap?',
            type: 'scenario',
            difficulty: 'junior',
            options: [
              { text: 'De collega direct aanspreken', points: 1 },
              { text: 'Luisteren, documenteren en procedure volgen', points: 4 },
              { text: 'Zeggen dat ze het zelf moeten oplossen', points: 0 },
              { text: 'Direct naar management escaleren', points: 1 }
            ]
          },
          {
            id: 505,
            question: 'Hoe meet je employee engagement effectief?',
            type: 'multiple_choice',
            difficulty: 'medior',
            options: [
              { text: 'Jaarlijkse enquete is genoeg', points: 1 },
              { text: 'Combinatie van surveys, 1-on-1s, exit interviews en metrics', points: 4, isCorrect: true },
              { text: 'Kijken of mensen op tijd komen', points: 0 },
              { text: 'Alleen vertrekcijfers bekijken', points: 1 }
            ]
          },
          {
            id: 506,
            question: 'Een team heeft hoog verloop. Wat analyseer je eerst?',
            type: 'scenario',
            difficulty: 'senior',
            options: [
              { text: 'Hogere salarissen voorstellen', points: 1 },
              { text: 'Exit data, manager effectiviteit, werkdruk en groeipad analyseren', points: 4 },
              { text: 'Sneller nieuwe mensen aannemen', points: 0 },
              { text: 'Het team herstructureren', points: 1 }
            ]
          },
          {
            id: 507,
            question: 'Wat is het doel van een goede onboarding?',
            type: 'multiple_choice',
            difficulty: 'junior',
            options: [
              { text: 'Papierwerk afhandelen', points: 1 },
              { text: 'Nieuwe medewerkers productief en engaged maken', points: 4, isCorrect: true },
              { text: 'Regels uitleggen', points: 1 },
              { text: 'IT toegang regelen', points: 1 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'operations',
    name: 'Operations & Logistiek',
    description: 'Supply chain, operations management, logistics',
    icon: 'fa-cogs',
    color: '#0891b2',
    categories: [
      {
        id: 'supply_chain',
        name: 'Supply Chain',
        description: 'Inkoop en supply chain management',
        questions: [
          {
            id: 601,
            question: 'Wat is het bullwhip effect?',
            type: 'multiple_choice',
            difficulty: 'medior',
            options: [
              { text: 'Prijzen stijgen door schaarste', points: 0 },
              { text: 'Kleine vraagschommelingen versterken upstream in de supply chain', points: 4, isCorrect: true },
              { text: 'Leveranciers worden sneller', points: 0 },
              { text: 'Voorraad raakt op', points: 1 }
            ]
          },
          {
            id: 602,
            question: 'Hoe bepaal je optimale voorraadniveaus?',
            type: 'scenario',
            difficulty: 'medior',
            options: [
              { text: 'Zo veel mogelijk inkopen voor korting', points: 0 },
              { text: 'Vraagvoorspelling, leadtimes en servicelevels balanceren', points: 4 },
              { text: 'Zo min mogelijk voor lage kosten', points: 1 },
              { text: 'Wat de leverancier adviseert', points: 0 }
            ]
          },
          {
            id: 603,
            question: 'Een kritieke leverancier kan niet leveren. Wat doe je?',
            type: 'scenario',
            difficulty: 'senior',
            options: [
              { text: 'Wachten tot ze weer kunnen', points: 0 },
              { text: 'Backup leveranciers activeren en productie herprioriteren', points: 4 },
              { text: 'Productie stoppen', points: 0 },
              { text: 'Klanten informeren over vertraging', points: 2 }
            ]
          }
        ]
      },
      {
        id: 'process_improvement',
        name: 'Procesverbetering',
        description: 'Lean en continuous improvement',
        questions: [
          {
            id: 604,
            question: 'Wat is een KPI?',
            type: 'multiple_choice',
            difficulty: 'junior',
            options: [
              { text: 'Een type vergadering', points: 0 },
              { text: 'Key Performance Indicator - meetbare prestatiemaat', points: 4, isCorrect: true },
              { text: 'Een software systeem', points: 0 },
              { text: 'Een kwaliteitscertificaat', points: 0 }
            ]
          },
          {
            id: 605,
            question: 'Een proces heeft veel handmatige stappen en fouten. Aanpak?',
            type: 'scenario',
            difficulty: 'medior',
            options: [
              { text: 'Meer mensen aannemen', points: 0 },
              { text: 'Process mapping, bottlenecks identificeren en automatiseren', points: 4 },
              { text: 'Strengere controles invoeren', points: 1 },
              { text: 'Training geven', points: 2 }
            ]
          },
          {
            id: 606,
            question: 'Wat is het doel van een PDCA cyclus?',
            type: 'multiple_choice',
            difficulty: 'junior',
            options: [
              { text: 'Project management', points: 0 },
              { text: 'Continue verbetering door Plan-Do-Check-Act', points: 4, isCorrect: true },
              { text: 'Productie planning', points: 0 },
              { text: 'Personeelsplanning', points: 0 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'customer_service',
    name: 'Customer Service & Support',
    description: 'Klantenservice, support, helpdesk',
    icon: 'fa-headset',
    color: '#10b981',
    categories: [
      {
        id: 'customer_handling',
        name: 'Klantcontact',
        description: 'Effectief communiceren met klanten',
        questions: [
          {
            id: 701,
            question: 'Een klant is boos en schreeuwt. Wat doe je?',
            type: 'scenario',
            difficulty: 'junior',
            options: [
              { text: 'Terugpraten op dezelfde toon', points: 0 },
              { text: 'Kalm blijven, empathie tonen en naar oplossing werken', points: 4 },
              { text: 'De verbinding verbreken', points: 0 },
              { text: 'Direct een manager erbij halen', points: 1 }
            ]
          },
          {
            id: 702,
            question: 'Een klant vraagt iets wat niet kan volgens het beleid. Hoe reageer je?',
            type: 'scenario',
            difficulty: 'medior',
            options: [
              { text: 'Zeggen dat het niet kan, punt', points: 0 },
              { text: 'Uitleggen waarom niet en alternatieven bieden', points: 4 },
              { text: 'Een uitzondering maken', points: 1 },
              { text: 'Doorverbinden naar iemand anders', points: 1 }
            ]
          },
          {
            id: 703,
            question: 'Wat is het belangrijkste in klantenservice?',
            type: 'self_assessment',
            difficulty: 'junior',
            options: [
              { text: 'Zo snel mogelijk afhandelen', points: 1 },
              { text: 'Klant tevreden en probleem opgelost', points: 4 },
              { text: 'Procedures volgen', points: 2 },
              { text: 'Niets beloven', points: 0 }
            ]
          }
        ]
      },
      {
        id: 'problem_resolution',
        name: 'Probleemoplossing',
        description: 'Klantproblemen analyseren en oplossen',
        questions: [
          {
            id: 704,
            question: 'Je kunt een probleem niet zelf oplossen. Wat doe je?',
            type: 'scenario',
            difficulty: 'junior',
            options: [
              { text: 'Zeggen dat je het niet weet', points: 0 },
              { text: 'Escaleren en klant op de hoogte houden', points: 4 },
              { text: 'De klant zelf laten uitzoeken', points: 0 },
              { text: 'Iets verzinnen', points: 0 }
            ]
          },
          {
            id: 705,
            question: 'Hetzelfde probleem komt vaak terug bij verschillende klanten. Actie?',
            type: 'scenario',
            difficulty: 'medior',
            options: [
              { text: 'Blijven oplossen per klant', points: 1 },
              { text: 'Patroon documenteren en structurele oplossing voorstellen', points: 4 },
              { text: 'Wachten tot iemand anders het opmerkt', points: 0 },
              { text: 'FAQ updaten', points: 2 }
            ]
          },
          {
            id: 706,
            question: 'Hoe meet je klanttevredenheid effectief?',
            type: 'multiple_choice',
            difficulty: 'medior',
            options: [
              { text: 'Aantal klachten tellen', points: 1 },
              { text: 'NPS, CSAT en CES surveys combineren met feedback analyse', points: 4, isCorrect: true },
              { text: 'Aannemen dat geen klachten = tevreden', points: 0 },
              { text: 'Alleen reviews lezen', points: 1 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'design',
    name: 'Design & Creative',
    description: 'UX/UI design, graphic design, creative',
    icon: 'fa-paint-brush',
    color: '#f43f5e',
    categories: [
      {
        id: 'ux_design',
        name: 'UX Design',
        description: 'User experience en interactie design',
        questions: [
          {
            id: 801,
            question: 'Wat is het verschil tussen UX en UI?',
            type: 'multiple_choice',
            difficulty: 'junior',
            options: [
              { text: 'Het zijn synoniemen', points: 0 },
              { text: 'UX is de totale ervaring, UI is de visuele interface', points: 4, isCorrect: true },
              { text: 'UI is belangrijker dan UX', points: 0 },
              { text: 'UX gaat alleen over websites', points: 0 }
            ]
          },
          {
            id: 802,
            question: 'Hoe valideer je een design beslissing?',
            type: 'scenario',
            difficulty: 'medior',
            options: [
              { text: 'Persoonlijke voorkeur', points: 0 },
              { text: 'User research, testing en data analyse', points: 4 },
              { text: 'Wat de klant vraagt', points: 1 },
              { text: 'Trends volgen', points: 1 }
            ]
          },
          {
            id: 803,
            question: 'Een stakeholder wil een feature die slecht is voor de UX. Wat doe je?',
            type: 'scenario',
            difficulty: 'senior',
            options: [
              { text: 'Gewoon uitvoeren', points: 0 },
              { text: 'Data en user impact presenteren, alternatieven voorstellen', points: 4 },
              { text: 'Weigeren zonder uitleg', points: 0 },
              { text: 'Compromis zonder onderbouwing', points: 1 }
            ]
          }
        ]
      },
      {
        id: 'visual_design',
        name: 'Visual Design',
        description: 'Grafisch ontwerp en branding',
        questions: [
          {
            id: 804,
            question: 'Wat maakt een sterk logo?',
            type: 'self_assessment',
            difficulty: 'junior',
            options: [
              { text: 'Veel kleuren en details', points: 0 },
              { text: 'Simpel, herkenbaar en schaalbaar', points: 4 },
              { text: 'Lijken op bekende merken', points: 0 },
              { text: 'Trendy effecten gebruiken', points: 1 }
            ]
          },
          {
            id: 805,
            question: 'Hoe kies je een kleurenpalet voor een merk?',
            type: 'scenario',
            difficulty: 'medior',
            options: [
              { text: 'Favoriete kleuren kiezen', points: 0 },
              { text: 'Merkwaarden, doelgroep en psychologie onderzoeken', points: 4 },
              { text: 'Kijken wat concurrenten doen', points: 1 },
              { text: 'Trendy kleuren van dit jaar', points: 1 }
            ]
          },
          {
            id: 806,
            question: 'Wat is het belang van witruimte in design?',
            type: 'multiple_choice',
            difficulty: 'junior',
            options: [
              { text: 'Verspilling van ruimte', points: 0 },
              { text: 'Verbetert leesbaarheid en focus', points: 4, isCorrect: true },
              { text: 'Alleen voor minimalistische designs', points: 1 },
              { text: 'Maakt paginas langer', points: 0 }
            ]
          }
        ]
      }
    ]
  }
];

  // Nieuwe sectoren die overeenkomen met homepage
  {
    id: 'healthcare',
    name: 'Gezondheidszorg',
    description: 'Verpleging, zorgcoordinatie, medische administratie',
    icon: 'fa-heartbeat',
    color: '#ef4444',
    categories: [
      {
        id: 'patient_care',
        name: 'Patientenzorg',
        description: 'Omgang met patienten en zorgverlening',
        questions: [
          {
            id: 901,
            question: 'Een patient is verward en wil het ziekenhuis verlaten. Wat doe je?',
            type: 'scenario',
            difficulty: 'junior',
            options: [
              { text: 'De patient fysiek tegenhouden', points: 0 },
              { text: 'Rustig praten, geruststellend en de-escaleren, hulp inschakelen', points: 4 },
              { text: 'De patient laten gaan', points: 0 },
              { text: 'Direct sedatie toedienen', points: 0 }
            ]
          },
          {
            id: 902,
            question: 'Wat is het belangrijkste bij het overdragen van een patient aan een collega?',
            type: 'multiple_choice',
            difficulty: 'junior',
            options: [
              { text: 'Snel zijn zodat je op tijd naar huis kunt', points: 0 },
              { text: 'Volledige, accurate informatie over status, medicatie en aandachtspunten', points: 4, isCorrect: true },
              { text: 'Alleen de naam en kamernummer', points: 0 },
              { text: 'Alles in het dossier laten staan', points: 1 }
            ]
          },
          {
            id: 903,
            question: 'Een familielid vraagt medische informatie over een patient. Hoe reageer je?',
            type: 'scenario',
            difficulty: 'medior',
            options: [
              { text: 'Alle informatie delen, het is familie', points: 0 },
              { text: 'Privacy respecteren, toestemming patient checken, protocol volgen', points: 4 },
              { text: 'Niks zeggen en doorverwijzen', points: 2 },
              { text: 'Alleen goede nieuws delen', points: 0 }
            ]
          },
          {
            id: 904,
            question: 'Je merkt dat een collega een medicatiefout maakt. Wat doe je?',
            type: 'scenario',
            difficulty: 'medior',
            options: [
              { text: 'Niks zeggen om de collega niet in problemen te brengen', points: 0 },
              { text: 'Direct ingrijpen, fout corrigeren en melden volgens protocol', points: 4 },
              { text: 'Later een anonieme klacht indienen', points: 1 },
              { text: 'Wachten of er iets misgaat', points: 0 }
            ]
          },
          {
            id: 905,
            question: 'Hoe ga je om met een terminale patient en hun familie?',
            type: 'self_assessment',
            difficulty: 'senior',
            options: [
              { text: 'Professionele afstand houden en alleen medische zorg bieden', points: 1 },
              { text: 'Empathisch zijn, luisteren, comfort bieden en wensen respecteren', points: 4 },
              { text: 'Optimistisch blijven ook als de situatie ernstig is', points: 0 },
              { text: 'Emotionele gesprekken vermijden', points: 0 }
            ]
          }
        ]
      },
      {
        id: 'medical_admin',
        name: 'Medische Administratie',
        description: 'Dossierbeheer en zorgcoordinatie',
        questions: [
          {
            id: 906,
            question: 'Wat is het doel van een EPD (Elektronisch Patient Dossier)?',
            type: 'multiple_choice',
            difficulty: 'junior',
            options: [
              { text: 'Papierwerk verminderen', points: 1 },
              { text: 'Centrale, toegankelijke patientinformatie voor betere zorg', points: 4, isCorrect: true },
              { text: 'Facturatie automatiseren', points: 1 },
              { text: 'Privacy verminderen', points: 0 }
            ]
          },
          {
            id: 907,
            question: 'Een verzekering weigert een behandeling te vergoeden. Wat is je aanpak?',
            type: 'scenario',
            difficulty: 'medior',
            options: [
              { text: 'Accepteren en patient informeren', points: 1 },
              { text: 'Medische noodzaak documenteren en bezwaar indienen', points: 4 },
              { text: 'Een andere diagnose invullen', points: 0 },
              { text: 'De patient zelf laten betalen', points: 0 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'automotive',
    name: 'Automotive & Techniek',
    description: 'Monteur, technicus, autobedrijf',
    icon: 'fa-car',
    color: '#3b82f6',
    categories: [
      {
        id: 'technical_skills',
        name: 'Technische Vaardigheden',
        description: 'Diagnose en reparatie',
        questions: [
          {
            id: 1001,
            question: 'Een klant meldt dat de motor "raar klinkt". Eerste stap?',
            type: 'scenario',
            difficulty: 'junior',
            options: [
              { text: 'Direct de motor openmaken', points: 0 },
              { text: 'Luisteren, doorvragen, diagnose stellen', points: 4 },
              { text: 'Zeggen dat het normaal is', points: 0 },
              { text: 'Een nieuwe motor voorstellen', points: 0 }
            ]
          },
          {
            id: 1002,
            question: 'Wat is OBD-II?',
            type: 'multiple_choice',
            difficulty: 'junior',
            options: [
              { text: 'Een type motorolie', points: 0 },
              { text: 'On-Board Diagnostics systeem voor foutcodes', points: 4, isCorrect: true },
              { text: 'Een remsysteem', points: 0 },
              { text: 'Een type brandstof', points: 0 }
            ]
          },
          {
            id: 1003,
            question: 'Een hybride voertuig geeft een storing in het batterijsysteem. Aanpak?',
            type: 'scenario',
            difficulty: 'medior',
            options: [
              { text: 'Batterij direct vervangen', points: 1 },
              { text: 'Diagnose uitlezen, cellen testen, oorzaak bepalen', points: 4 },
              { text: 'Klant doorverwijzen naar de dealer', points: 1 },
              { text: 'Resetten en afwachten', points: 0 }
            ]
          },
          {
            id: 1004,
            question: 'Wat zijn de veiligheidsrisicos bij het werken aan elektrische voertuigen?',
            type: 'multiple_choice',
            difficulty: 'medior',
            options: [
              { text: 'Er zijn geen speciale risicos', points: 0 },
              { text: 'Hoge spanning, elektrocutiegevaar, speciale procedures nodig', points: 4, isCorrect: true },
              { text: 'Alleen brandgevaar', points: 1 },
              { text: 'Risicos alleen bij ongelukken', points: 0 }
            ]
          },
          {
            id: 1005,
            question: 'Een klant wil een modificatie die niet straatlegaal is. Hoe reageer je?',
            type: 'scenario',
            difficulty: 'senior',
            options: [
              { text: 'Uitvoeren, de klant is verantwoordelijk', points: 0 },
              { text: 'Uitleggen waarom niet, legale alternatieven voorstellen', points: 4 },
              { text: 'Weigeren zonder uitleg', points: 1 },
              { text: 'Doorverwijzen naar een andere garage', points: 1 }
            ]
          }
        ]
      },
      {
        id: 'customer_automotive',
        name: 'Klantcontact Automotive',
        description: 'Communicatie met klanten',
        questions: [
          {
            id: 1006,
            question: 'Een reparatie valt duurder uit dan de offerte. Wat doe je?',
            type: 'scenario',
            difficulty: 'medior',
            options: [
              { text: 'Factureren zonder overleg', points: 0 },
              { text: 'Klant informeren voor uitvoering, goedkeuring vragen', points: 4 },
              { text: 'Het verschil zelf betalen', points: 0 },
              { text: 'Minder werk uitvoeren om binnen budget te blijven', points: 0 }
            ]
          },
          {
            id: 1007,
            question: 'Hoe leg je een technisch probleem uit aan een niet-technische klant?',
            type: 'self_assessment',
            difficulty: 'junior',
            options: [
              { text: 'Technische termen gebruiken zodat ze het serieus nemen', points: 0 },
              { text: 'Eenvoudige taal, vergelijkingen en visuele uitleg', points: 4 },
              { text: 'Alleen zeggen wat het kost', points: 1 },
              { text: 'Zeggen dat ze het niet hoeven te begrijpen', points: 0 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'construction',
    name: 'Bouw & Constructie',
    description: 'Bouwvakker, projectleider, installateur',
    icon: 'fa-hard-hat',
    color: '#f97316',
    categories: [
      {
        id: 'construction_skills',
        name: 'Bouwvaardigheden',
        description: 'Technische kennis en uitvoering',
        questions: [
          {
            id: 1101,
            question: 'Wat controleer je voor je begint met een bouwproject?',
            type: 'multiple_choice',
            difficulty: 'junior',
            options: [
              { text: 'Of het mooi weer is', points: 0 },
              { text: 'Vergunningen, tekeningen, veiligheid en materialen', points: 4, isCorrect: true },
              { text: 'Of de klant thuis is', points: 0 },
              { text: 'Alleen het adres', points: 0 }
            ]
          },
          {
            id: 1102,
            question: 'Je ontdekt een afwijking van de bouwtekening. Wat doe je?',
            type: 'scenario',
            difficulty: 'medior',
            options: [
              { text: 'Doorgaan zoals getekend', points: 0 },
              { text: 'Stop, documenteren en overleggen met projectleider', points: 4 },
              { text: 'Zelf aanpassen wat logisch lijkt', points: 1 },
              { text: 'Negeren als het klein is', points: 0 }
            ]
          },
          {
            id: 1103,
            question: 'Wat is een belangrijke factor bij het plannen van werkzaamheden?',
            type: 'multiple_choice',
            difficulty: 'junior',
            options: [
              { text: 'Alleen snelheid', points: 0 },
              { text: 'Volgorde, afhankelijkheden en weersomstandigheden', points: 4, isCorrect: true },
              { text: 'Hoeveel mensen beschikbaar zijn', points: 2 },
              { text: 'Wanneer materiaal arriveert', points: 2 }
            ]
          },
          {
            id: 1104,
            question: 'Een onderaannemer levert slecht werk. Hoe ga je hiermee om?',
            type: 'scenario',
            difficulty: 'senior',
            options: [
              { text: 'Zelf herstellen om tijd te besparen', points: 1 },
              { text: 'Documenteren, bespreken, herstel eisen en escaleren indien nodig', points: 4 },
              { text: 'Accepteren om conflict te vermijden', points: 0 },
              { text: 'Direct contract opzeggen', points: 0 }
            ]
          },
          {
            id: 1105,
            question: 'Hoe zorg je voor een veilige bouwplaats?',
            type: 'self_assessment',
            difficulty: 'junior',
            options: [
              { text: 'PBMs dragen is genoeg', points: 1 },
              { text: 'VGM-plan, toolbox meetings, signalering en continue aandacht', points: 4 },
              { text: 'Ervaren mensen hoeven geen veiligheidsmaatregelen', points: 0 },
              { text: 'Alleen bij gevaarlijk werk opletten', points: 0 }
            ]
          }
        ]
      },
      {
        id: 'project_coordination',
        name: 'Projectcoordinatie',
        description: 'Planning en coordinatie',
        questions: [
          {
            id: 1106,
            question: 'Het project loopt achter op schema. Wat analyseer je eerst?',
            type: 'scenario',
            difficulty: 'senior',
            options: [
              { text: 'Langer werken met het team', points: 1 },
              { text: 'Oorzaken identificeren, kritieke pad analyseren, bijsturen', points: 4 },
              { text: 'De deadline verschuiven', points: 1 },
              { text: 'Meer mensen inhuren', points: 1 }
            ]
          },
          {
            id: 1107,
            question: 'Wat is een kritiek pad in projectplanning?',
            type: 'multiple_choice',
            difficulty: 'medior',
            options: [
              { text: 'Het gevaarlijkste deel van de bouw', points: 0 },
              { text: 'De langste reeks afhankelijke taken die de einddatum bepaalt', points: 4, isCorrect: true },
              { text: 'Het pad naar de nooduitgang', points: 0 },
              { text: 'De belangrijkste klant', points: 0 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'real_estate',
    name: 'Vastgoed & Makelaardij',
    description: 'Makelaar, taxateur, vastgoedbeheer',
    icon: 'fa-home',
    color: '#14b8a6',
    categories: [
      {
        id: 'sales_real_estate',
        name: 'Vastgoedverkoop',
        description: 'Verkoop en aankoop begeleiding',
        questions: [
          {
            id: 1201,
            question: 'Een koper wil bieden onder de vraagprijs. Hoe communiceer je dit naar de verkoper?',
            type: 'scenario',
            difficulty: 'junior',
            options: [
              { text: 'Zeggen dat het bod belachelijk is', points: 0 },
              { text: 'Objectief presenteren met marktcontext en advies', points: 4 },
              { text: 'Het bod niet doorgeven', points: 0 },
              { text: 'Direct afwijzen namens de verkoper', points: 0 }
            ]
          },
          {
            id: 1202,
            question: 'Wat bepaalt voornamelijk de waarde van een woning?',
            type: 'multiple_choice',
            difficulty: 'junior',
            options: [
              { text: 'Alleen de grootte', points: 1 },
              { text: 'Locatie, staat, marktomstandigheden en vergelijkbare verkopen', points: 4, isCorrect: true },
              { text: 'Wat de verkoper wil hebben', points: 0 },
              { text: 'De aankoopprijs plus inflatie', points: 0 }
            ]
          },
          {
            id: 1203,
            question: 'Tijdens een bezichtiging ontdek je een gebrek dat de verkoper niet heeft gemeld. Wat doe je?',
            type: 'scenario',
            difficulty: 'medior',
            options: [
              { text: 'Negeren en hopen dat de koper het niet ziet', points: 0 },
              { text: 'Met verkoper bespreken en zorgen voor correcte informatieverstrekking', points: 4 },
              { text: 'Direct aan de koper vertellen', points: 2 },
              { text: 'De verkoper adviseren het snel te repareren', points: 1 }
            ]
          },
          {
            id: 1204,
            question: 'Hoe ga je om met een biedingsoorlog (meerdere geinteresseerden)?',
            type: 'scenario',
            difficulty: 'senior',
            options: [
              { text: 'Hoogste bod automatisch accepteren', points: 1 },
              { text: 'Transparant proces, alle bieders informeren, beste totaalplaatje adviseren', points: 4 },
              { text: 'Kopers tegen elkaar uitspelen', points: 0 },
              { text: 'Eerste bieder voorrang geven', points: 0 }
            ]
          }
        ]
      },
      {
        id: 'property_management',
        name: 'Vastgoedbeheer',
        description: 'Beheer en verhuur',
        questions: [
          {
            id: 1205,
            question: 'Een huurder betaalt al 2 maanden geen huur. Eerste stap?',
            type: 'scenario',
            difficulty: 'medior',
            options: [
              { text: 'Direct uitzettingsprocedure starten', points: 0 },
              { text: 'Contact opnemen, situatie bespreken, betalingsregeling overwegen', points: 4 },
              { text: 'Wachten tot het vanzelf oplost', points: 0 },
              { text: 'Borg inhouden en verder niks', points: 1 }
            ]
          },
          {
            id: 1206,
            question: 'Wat is belangrijk bij het selecteren van huurders?',
            type: 'multiple_choice',
            difficulty: 'junior',
            options: [
              { text: 'Alleen de eerste reageerder selecteren', points: 0 },
              { text: 'Inkomenscheck, referenties en huurgeschiedenis', points: 4, isCorrect: true },
              { text: 'Wie de meeste huur biedt', points: 1 },
              { text: 'Persoonlijke voorkeur', points: 0 }
            ]
          },
          {
            id: 1207,
            question: 'Hoe bepaal je of een huurverhoging redelijk is?',
            type: 'scenario',
            difficulty: 'medior',
            options: [
              { text: 'Maximale wettelijke verhoging doorvoeren', points: 1 },
              { text: 'Marktconforme huur, investeringen en wettelijke kaders afwegen', points: 4 },
              { text: 'Inflatie volgen', points: 2 },
              { text: 'Niet verhogen om huurders te behouden', points: 0 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'hospitality',
    name: 'Horeca & Hospitality',
    description: 'Restaurant, hotel, evenementen',
    icon: 'fa-utensils',
    color: '#a855f7',
    categories: [
      {
        id: 'service_hospitality',
        name: 'Service & Gastvrijheid',
        description: 'Gastervaring en service',
        questions: [
          {
            id: 1301,
            question: 'Een gast klaagt dat het eten te lang duurt. Hoe reageer je?',
            type: 'scenario',
            difficulty: 'junior',
            options: [
              { text: 'Zeggen dat de keuken druk is', points: 1 },
              { text: 'Excuseren, status checken, eventueel iets aanbieden', points: 4 },
              { text: 'Negeren en hopen dat het snel komt', points: 0 },
              { text: 'De keuken de schuld geven', points: 0 }
            ]
          },
          {
            id: 1302,
            question: 'Een gast heeft een allergische reactie op iets dat ze gegeten hebben. Wat doe je?',
            type: 'scenario',
            difficulty: 'medior',
            options: [
              { text: 'Zeggen dat ze hadden moeten waarschuwen', points: 0 },
              { text: 'Direct hulp bieden, 112 indien nodig, incident documenteren', points: 4 },
              { text: 'Een gratis drankje aanbieden', points: 0 },
              { text: 'De chef roepen', points: 1 }
            ]
          },
          {
            id: 1303,
            question: 'Wat maakt een goede gastervaring?',
            type: 'self_assessment',
            difficulty: 'junior',
            options: [
              { text: 'Snelle service', points: 2 },
              { text: 'Combinatie van aandacht, kwaliteit, sfeer en persoonlijke touch', points: 4 },
              { text: 'Lage prijzen', points: 0 },
              { text: 'Grote porties', points: 0 }
            ]
          },
          {
            id: 1304,
            question: 'Een VIP-gast heeft speciale wensen die lastig zijn. Aanpak?',
            type: 'scenario',
            difficulty: 'senior',
            options: [
              { text: 'Zeggen dat het niet kan', points: 0 },
              { text: 'Creatief meedenken, mogelijkheden zoeken, verwachtingen managen', points: 4 },
              { text: 'Alles beloven wat ze vragen', points: 0 },
              { text: 'De manager laten afhandelen', points: 1 }
            ]
          },
          {
            id: 1305,
            question: 'Het restaurant is overvol en gasten moeten wachten. Hoe manage je dit?',
            type: 'scenario',
            difficulty: 'medior',
            options: [
              { text: 'Zeggen dat ze moeten wachten', points: 0 },
              { text: 'Realistiche wachttijd geven, comfortabel laten wachten, updates geven', points: 4 },
              { text: 'Mensen wegsturen', points: 0 },
              { text: 'Tafels sneller omzetten door gasten te haasten', points: 0 }
            ]
          }
        ]
      },
      {
        id: 'operations_hospitality',
        name: 'Horeca Operations',
        description: 'Dagelijkse operatie en management',
        questions: [
          {
            id: 1306,
            question: 'Hoe manage je voorraadbeheer in een restaurant?',
            type: 'multiple_choice',
            difficulty: 'medior',
            options: [
              { text: 'Bestellen als iets op is', points: 0 },
              { text: 'FIFO, regelmatige inventaris, seizoensplanning en waste tracking', points: 4, isCorrect: true },
              { text: 'Grote voorraden aanhouden', points: 1 },
              { text: 'Leverancier laten bepalen', points: 0 }
            ]
          },
          {
            id: 1307,
            question: 'Een medewerker meldt zich vlak voor de drukke avondservice ziek. Wat doe je?',
            type: 'scenario',
            difficulty: 'junior',
            options: [
              { text: 'Boos worden en zeggen dat het niet kan', points: 0 },
              { text: 'Vervanging zoeken, taken herverdelen, team informeren', points: 4 },
              { text: 'Minder gasten aannemen', points: 1 },
              { text: 'Zelf alle taken overnemen', points: 1 }
            ]
          }
        ]
      }
    ]
  },

// Helper functions
export interface SkillResult {
  categoryId: string;
  categoryName: string;
  score: number;
  maxScore: number;
  percentage: number;
  level: 'junior' | 'medior' | 'senior';
}

export interface DirectionResult {
  directionId: string;
  directionName: string;
  results: SkillResult[];
  overallPercentage: number;
  overallLevel: 'junior' | 'medior' | 'senior';
  completedAt: string;
  strengths: string[];
  improvements: string[];
}

export const calculateSkillLevel = (percentage: number): 'junior' | 'medior' | 'senior' => {
  if (percentage >= 80) return 'senior';
  if (percentage >= 55) return 'medior';
  return 'junior';
};

export const levelLabels: Record<string, { label: string; color: string; description: string }> = {
  junior: { label: 'Junior', color: '#6c757d', description: 'Starter niveau - groeiend' },
  medior: { label: 'Medior', color: '#f59e0b', description: 'Ervaren - zelfstandig' },
  senior: { label: 'Senior', color: '#059669', description: 'Expert - leidend' }
};

export const calculateDirectionResult = (
  direction: JobDirection,
  answers: Record<number, number>
): DirectionResult => {
  const results: SkillResult[] = [];
  
  direction.categories.forEach(category => {
    let categoryScore = 0;
    let maxPossible = 0;
    
    category.questions.forEach(q => {
      const answer = answers[q.id];
      if (answer !== undefined) {
        categoryScore += answer;
      }
      maxPossible += 4;
    });
    
    const percentage = maxPossible > 0 ? Math.round((categoryScore / maxPossible) * 100) : 0;
    
    results.push({
      categoryId: category.id,
      categoryName: category.name,
      score: categoryScore,
      maxScore: maxPossible,
      percentage,
      level: calculateSkillLevel(percentage)
    });
  });
  
  const totalScore = results.reduce((sum, r) => sum + r.score, 0);
  const totalMaxScore = results.reduce((sum, r) => sum + r.maxScore, 0);
  const overallPercentage = Math.round((totalScore / totalMaxScore) * 100);
  
  const sortedResults = [...results].sort((a, b) => b.percentage - a.percentage);
  const strengths = sortedResults.slice(0, 1).map(r => r.categoryName);
  const improvements = sortedResults.slice(-1).map(r => r.categoryName);
  
  return {
    directionId: direction.id,
    directionName: direction.name,
    results,
    overallPercentage,
    overallLevel: calculateSkillLevel(overallPercentage),
    completedAt: new Date().toISOString(),
    strengths,
    improvements
  };
};
