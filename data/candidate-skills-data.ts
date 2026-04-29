// Skill categories en individuele skills met test vragen
// Dit systeem laat kandidaten skills selecteren en test ze per skill

export interface SkillQuestion {
  id: number;
  question: string;
  difficulty: 'junior' | 'medior' | 'senior';
  options: {
    text: string;
    points: number;
    isCorrect?: boolean;
  }[];
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  questions: SkillQuestion[];
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  skills: Skill[];
}

export interface SkillTestResult {
  skillId: string;
  skillName: string;
  categoryId: string;
  percentage: number;
  level: 'junior' | 'medior' | 'senior';
  testedAt: string;
}

// Alle skill categorieen met skills en test vragen
export const skillCategories: SkillCategory[] = [
  {
    id: 'programming',
    name: 'Programmeren & Development',
    icon: 'fa-code',
    color: '#6366f1',
    skills: [
      {
        id: 'javascript',
        name: 'JavaScript',
        description: 'Frontend en backend scripting',
        questions: [
          {
            id: 1001,
            question: 'Wat is het verschil tussen "let" en "const" in JavaScript?',
            difficulty: 'junior',
            options: [
              { text: 'Geen verschil, beide zijn hetzelfde', points: 0 },
              { text: '"let" kan hergedefinieerd worden, "const" niet', points: 4, isCorrect: true },
              { text: '"const" is sneller', points: 0 },
              { text: '"let" wordt alleen in loops gebruikt', points: 1 }
            ]
          },
          {
            id: 1002,
            question: 'Wat doet de "map()" functie op een array?',
            difficulty: 'junior',
            options: [
              { text: 'Filtert elementen uit de array', points: 0 },
              { text: 'Retourneert een nieuwe array met getransformeerde elementen', points: 4, isCorrect: true },
              { text: 'Sorteert de array', points: 0 },
              { text: 'Voegt elementen samen tot één waarde', points: 0 }
            ]
          },
          {
            id: 1003,
            question: 'Wat is een Promise in JavaScript?',
            difficulty: 'medior',
            options: [
              { text: 'Een manier om variabelen te declareren', points: 0 },
              { text: 'Een object dat de uitkomst van een asynchrone operatie representeert', points: 4, isCorrect: true },
              { text: 'Een type loop', points: 0 },
              { text: 'Een error handling mechanisme', points: 1 }
            ]
          },
          {
            id: 1004,
            question: 'Hoe voorkom je een memory leak bij event listeners in een SPA?',
            difficulty: 'senior',
            options: [
              { text: 'Meer RAM toevoegen', points: 0 },
              { text: 'Event listeners verwijderen bij component unmount', points: 4, isCorrect: true },
              { text: 'Minder event listeners gebruiken', points: 1 },
              { text: 'De pagina regelmatig refreshen', points: 0 }
            ]
          }
        ]
      },
      {
        id: 'python',
        name: 'Python',
        description: 'Backend, data science, scripting',
        questions: [
          {
            id: 1101,
            question: 'Wat is het verschil tussen een list en een tuple in Python?',
            difficulty: 'junior',
            options: [
              { text: 'Geen verschil', points: 0 },
              { text: 'Lists zijn mutable, tuples zijn immutable', points: 4, isCorrect: true },
              { text: 'Tuples zijn sneller', points: 1 },
              { text: 'Lists kunnen alleen getallen bevatten', points: 0 }
            ]
          },
          {
            id: 1102,
            question: 'Wat doet een decorator in Python?',
            difficulty: 'medior',
            options: [
              { text: 'Maakt code mooier', points: 0 },
              { text: 'Voegt functionaliteit toe aan een functie zonder deze te wijzigen', points: 4, isCorrect: true },
              { text: 'Verwijdert bugs', points: 0 },
              { text: 'Comprimeert code', points: 0 }
            ]
          },
          {
            id: 1103,
            question: 'Hoe implementeer je een context manager in Python?',
            difficulty: 'senior',
            options: [
              { text: 'Met een while loop', points: 0 },
              { text: 'Met __enter__ en __exit__ methods of @contextmanager decorator', points: 4, isCorrect: true },
              { text: 'Met try/except', points: 1 },
              { text: 'Met import statements', points: 0 }
            ]
          }
        ]
      },
      {
        id: 'react',
        name: 'React',
        description: 'Frontend framework',
        questions: [
          {
            id: 1201,
            question: 'Wat is de functie van useState in React?',
            difficulty: 'junior',
            options: [
              { text: 'Data ophalen van een API', points: 0 },
              { text: 'State beheren in een functionele component', points: 4, isCorrect: true },
              { text: 'Styling toepassen', points: 0 },
              { text: 'Routes definiëren', points: 0 }
            ]
          },
          {
            id: 1202,
            question: 'Wanneer gebruik je useEffect met een lege dependency array?',
            difficulty: 'medior',
            options: [
              { text: 'Om elke render iets uit te voeren', points: 0 },
              { text: 'Om code alleen bij mount uit te voeren', points: 4, isCorrect: true },
              { text: 'Om state te updaten', points: 0 },
              { text: 'Om errors te vangen', points: 0 }
            ]
          },
          {
            id: 1203,
            question: 'Hoe optimaliseer je re-renders in een complexe React app?',
            difficulty: 'senior',
            options: [
              { text: 'Meer components maken', points: 0 },
              { text: 'useMemo, useCallback, React.memo en virtualisatie', points: 4, isCorrect: true },
              { text: 'Minder state gebruiken', points: 1 },
              { text: 'Snellere computer gebruiken', points: 0 }
            ]
          }
        ]
      },
      {
        id: 'sql',
        name: 'SQL & Databases',
        description: 'Database queries en design',
        questions: [
          {
            id: 1301,
            question: 'Wat is het verschil tussen INNER JOIN en LEFT JOIN?',
            difficulty: 'junior',
            options: [
              { text: 'Geen verschil', points: 0 },
              { text: 'INNER JOIN geeft alleen matches, LEFT JOIN ook niet-matches van links', points: 4, isCorrect: true },
              { text: 'LEFT JOIN is sneller', points: 0 },
              { text: 'INNER JOIN werkt alleen met 2 tabellen', points: 0 }
            ]
          },
          {
            id: 1302,
            question: 'Wat is database indexing en wanneer gebruik je het?',
            difficulty: 'medior',
            options: [
              { text: 'Een manier om data te sorteren', points: 1 },
              { text: 'Een datastructuur voor snellere lookups op vaak gebruikte kolommen', points: 4, isCorrect: true },
              { text: 'Een backup methode', points: 0 },
              { text: 'Een type constraint', points: 0 }
            ]
          },
          {
            id: 1303,
            question: 'Hoe optimaliseer je een query die miljoenen rows moet verwerken?',
            difficulty: 'senior',
            options: [
              { text: 'Meer RAM toevoegen', points: 0 },
              { text: 'Indexen, partitioning, query analysis en eventueel denormalisatie', points: 4, isCorrect: true },
              { text: 'De query opsplitsen in kleinere queries', points: 2 },
              { text: 'Een snellere database gebruiken', points: 0 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'marketing_skills',
    name: 'Marketing & Communicatie',
    icon: 'fa-bullhorn',
    color: '#ec4899',
    skills: [
      {
        id: 'seo',
        name: 'SEO',
        description: 'Zoekmachineoptimalisatie',
        questions: [
          {
            id: 2001,
            question: 'Wat is het belangrijkste doel van on-page SEO?',
            difficulty: 'junior',
            options: [
              { text: 'Meer backlinks krijgen', points: 0 },
              { text: 'Content en HTML optimaliseren voor zoekmachines', points: 4, isCorrect: true },
              { text: 'Social media shares verhogen', points: 0 },
              { text: 'Website snelheid verhogen', points: 1 }
            ]
          },
          {
            id: 2002,
            question: 'Wat is een canonieke URL en waarom is het belangrijk?',
            difficulty: 'medior',
            options: [
              { text: 'De kortste URL', points: 0 },
              { text: 'De voorkeursversie van een pagina om duplicate content te voorkomen', points: 4, isCorrect: true },
              { text: 'De homepage URL', points: 0 },
              { text: 'Een URL zonder parameters', points: 1 }
            ]
          },
          {
            id: 2003,
            question: 'Hoe ga je om met een plotselinge daling in organisch verkeer na een Google update?',
            difficulty: 'senior',
            options: [
              { text: 'Wachten tot het vanzelf herstelt', points: 0 },
              { text: 'Analyseren welke paginas/keywords geraakt zijn, vergelijken met guidelines, content audit', points: 4, isCorrect: true },
              { text: 'Meer content publiceren', points: 1 },
              { text: 'Naar Bing overschakelen', points: 0 }
            ]
          }
        ]
      },
      {
        id: 'social_media',
        name: 'Social Media Marketing',
        description: 'Social media strategie en uitvoering',
        questions: [
          {
            id: 2101,
            question: 'Wat is engagement rate?',
            difficulty: 'junior',
            options: [
              { text: 'Aantal volgers gedeeld door posts', points: 0 },
              { text: 'Interacties (likes, comments, shares) gedeeld door bereik of volgers', points: 4, isCorrect: true },
              { text: 'Aantal posts per dag', points: 0 },
              { text: 'Groei in volgers', points: 0 }
            ]
          },
          {
            id: 2102,
            question: 'Welke metrics zijn het belangrijkst voor een B2B LinkedIn campagne?',
            difficulty: 'medior',
            options: [
              { text: 'Alleen likes en volgers', points: 0 },
              { text: 'Leads, click-through rate, conversies en qualified engagement', points: 4, isCorrect: true },
              { text: 'Viral reach', points: 0 },
              { text: 'Post frequentie', points: 0 }
            ]
          },
          {
            id: 2103,
            question: 'Hoe ontwikkel je een crisis communicatieplan voor social media?',
            difficulty: 'senior',
            options: [
              { text: 'Negatieve comments verwijderen', points: 0 },
              { text: 'Escalatie protocol, response templates, monitoring, spokespersons en scenario planning', points: 4, isCorrect: true },
              { text: 'Account tijdelijk deactiveren', points: 0 },
              { text: 'PR bureau inhuren', points: 1 }
            ]
          }
        ]
      },
      {
        id: 'content_marketing',
        name: 'Content Marketing',
        description: 'Content strategie en creatie',
        questions: [
          {
            id: 2201,
            question: 'Wat is het doel van een content calendar?',
            difficulty: 'junior',
            options: [
              { text: 'Deadlines bijhouden', points: 1 },
              { text: 'Content planning, consistentie en strategische timing waarborgen', points: 4, isCorrect: true },
              { text: 'Team meetings plannen', points: 0 },
              { text: 'Budget bijhouden', points: 0 }
            ]
          },
          {
            id: 2202,
            question: 'Hoe bepaal je welke content topics prioriteit krijgen?',
            difficulty: 'medior',
            options: [
              { text: 'Wat de concurrent doet kopiëren', points: 0 },
              { text: 'Keyword research, buyer journey, business goals en audience needs combineren', points: 4, isCorrect: true },
              { text: 'Wat trending is op social media', points: 1 },
              { text: 'Wat het makkelijkst te maken is', points: 0 }
            ]
          }
        ]
      },
      {
        id: 'copywriting',
        name: 'Copywriting',
        description: 'Overtuigende teksten schrijven',
        questions: [
          {
            id: 2301,
            question: 'Wat is het belangrijkste element van een goede headline?',
            difficulty: 'junior',
            options: [
              { text: 'Zo lang mogelijk zijn', points: 0 },
              { text: 'Aandacht trekken en de kernboodschap overbrengen', points: 4, isCorrect: true },
              { text: 'Keywords bevatten', points: 1 },
              { text: 'Grappig zijn', points: 0 }
            ]
          },
          {
            id: 2302,
            question: 'Wat is het AIDA model in copywriting?',
            difficulty: 'medior',
            options: [
              { text: 'Een software tool', points: 0 },
              { text: 'Attention, Interest, Desire, Action - de fases van overtuiging', points: 4, isCorrect: true },
              { text: 'Een font type', points: 0 },
              { text: 'Een layout principe', points: 0 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'sales_skills',
    name: 'Sales & Business Development',
    icon: 'fa-handshake',
    color: '#f59e0b',
    skills: [
      {
        id: 'b2b_sales',
        name: 'B2B Sales',
        description: 'Business-to-business verkoop',
        questions: [
          {
            id: 3001,
            question: 'Wat is het belangrijkste in de discovery fase van een sales gesprek?',
            difficulty: 'junior',
            options: [
              { text: 'Je product presenteren', points: 0 },
              { text: 'Luisteren en de behoeften van de klant begrijpen', points: 4, isCorrect: true },
              { text: 'Een offerte maken', points: 0 },
              { text: 'Korting aanbieden', points: 0 }
            ]
          },
          {
            id: 3002,
            question: 'Hoe ga je om met de bezwaar "het is te duur"?',
            difficulty: 'medior',
            options: [
              { text: 'Direct korting geven', points: 0 },
              { text: 'Waarde verduidelijken, ROI tonen, en het echte bezwaar achterhalen', points: 4, isCorrect: true },
              { text: 'Concurrent bekritiseren', points: 0 },
              { text: 'Opgeven en naar volgende lead gaan', points: 0 }
            ]
          },
          {
            id: 3003,
            question: 'Hoe bouw je een effectieve account-based sales strategie?',
            difficulty: 'senior',
            options: [
              { text: 'Zoveel mogelijk mensen benaderen', points: 0 },
              { text: 'Target accounts identificeren, decision makers mappen, gepersonaliseerde aanpak per stakeholder', points: 4, isCorrect: true },
              { text: 'Focus op snelle deals', points: 0 },
              { text: 'Alleen met procurement praten', points: 0 }
            ]
          }
        ]
      },
      {
        id: 'negotiation',
        name: 'Onderhandelen',
        description: 'Deals sluiten en onderhandelen',
        questions: [
          {
            id: 3101,
            question: 'Wat is BATNA in onderhandelingen?',
            difficulty: 'medior',
            options: [
              { text: 'Een onderhandelingstechniek', points: 0 },
              { text: 'Best Alternative To a Negotiated Agreement - je alternatief als de deal niet doorgaat', points: 4, isCorrect: true },
              { text: 'Een type contract', points: 0 },
              { text: 'Een prijsstrategie', points: 0 }
            ]
          },
          {
            id: 3102,
            question: 'Hoe creëer je een win-win uitkomst in complexe onderhandelingen?',
            difficulty: 'senior',
            options: [
              { text: 'De andere partij laten winnen', points: 0 },
              { text: 'Belangen identificeren, creatieve oplossingen zoeken, waarde uitbreiden', points: 4, isCorrect: true },
              { text: 'Hard onderhandelen', points: 0 },
              { text: 'In het midden uitkomen', points: 1 }
            ]
          }
        ]
      },
      {
        id: 'crm',
        name: 'CRM & Pipeline Management',
        description: 'Salesforce, HubSpot, pipeline beheer',
        questions: [
          {
            id: 3201,
            question: 'Waarom is het belangrijk om CRM data up-to-date te houden?',
            difficulty: 'junior',
            options: [
              { text: 'Om je manager tevreden te houden', points: 0 },
              { text: 'Voor accurate forecasting, teamwerk en klantinzichten', points: 4, isCorrect: true },
              { text: 'Het is niet zo belangrijk', points: 0 },
              { text: 'Voor de jaarlijkse audit', points: 0 }
            ]
          },
          {
            id: 3202,
            question: 'Hoe bereken je de health van je sales pipeline?',
            difficulty: 'medior',
            options: [
              { text: 'Alleen totale waarde tellen', points: 0 },
              { text: 'Coverage ratio, velocity, conversion rates per stage en aging analyseren', points: 4, isCorrect: true },
              { text: 'Aantal deals tellen', points: 1 },
              { text: 'Vergelijken met vorige maand', points: 1 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'finance_skills',
    name: 'Finance & Accounting',
    icon: 'fa-chart-pie',
    color: '#059669',
    skills: [
      {
        id: 'financial_analysis',
        name: 'Financiele Analyse',
        description: 'Rapportage en analyse',
        questions: [
          {
            id: 4001,
            question: 'Wat meet de current ratio?',
            difficulty: 'junior',
            options: [
              { text: 'Winstgevendheid', points: 0 },
              { text: 'Liquiditeit - vermogen om korte termijn schulden te betalen', points: 4, isCorrect: true },
              { text: 'Groeisnelheid', points: 0 },
              { text: 'Marktaandeel', points: 0 }
            ]
          },
          {
            id: 4002,
            question: 'Hoe bereken je EBITDA en waarvoor wordt het gebruikt?',
            difficulty: 'medior',
            options: [
              { text: 'Omzet minus kosten', points: 0 },
              { text: 'Earnings Before Interest, Taxes, Depreciation, Amortization - operationele prestatie vergelijken', points: 4, isCorrect: true },
              { text: 'Netto winst plus belastingen', points: 1 },
              { text: 'Cash flow meting', points: 1 }
            ]
          },
          {
            id: 4003,
            question: 'Hoe voer je een DCF-analyse uit voor een bedrijfswaardering?',
            difficulty: 'senior',
            options: [
              { text: 'Omzet maal multiplier', points: 0 },
              { text: 'Toekomstige cash flows projecteren, WACC bepalen, terminal value berekenen, contant maken', points: 4, isCorrect: true },
              { text: 'Vergelijken met concurrenten', points: 1 },
              { text: 'Boekwaarde plus goodwill', points: 0 }
            ]
          }
        ]
      },
      {
        id: 'excel_finance',
        name: 'Excel voor Finance',
        description: 'Geavanceerd Excel gebruik',
        questions: [
          {
            id: 4101,
            question: 'Welke functie gebruik je voor lookups in grote datasets?',
            difficulty: 'junior',
            options: [
              { text: 'SUM', points: 0 },
              { text: 'VLOOKUP of INDEX/MATCH', points: 4, isCorrect: true },
              { text: 'IF', points: 0 },
              { text: 'COUNT', points: 0 }
            ]
          },
          {
            id: 4102,
            question: 'Wat is het voordeel van INDEX/MATCH boven VLOOKUP?',
            difficulty: 'medior',
            options: [
              { text: 'Het is sneller', points: 1 },
              { text: 'Kan naar links zoeken, flexibeler, breekt niet bij kolom inserties', points: 4, isCorrect: true },
              { text: 'Makkelijker te leren', points: 0 },
              { text: 'Werkt met tekst', points: 0 }
            ]
          }
        ]
      },
      {
        id: 'bookkeeping',
        name: 'Boekhouding',
        description: 'Dagelijkse boekhouding',
        questions: [
          {
            id: 4201,
            question: 'Wat is het verschil tussen debet en credit?',
            difficulty: 'junior',
            options: [
              { text: 'Debet is geld ontvangen, credit is geld uitgeven', points: 0 },
              { text: 'Debet verhoogt activa/kosten, credit verhoogt passiva/opbrengsten', points: 4, isCorrect: true },
              { text: 'Debet is positief, credit is negatief', points: 0 },
              { text: 'Er is geen verschil', points: 0 }
            ]
          },
          {
            id: 4202,
            question: 'Wat is het matching principle in accounting?',
            difficulty: 'medior',
            options: [
              { text: 'Inkomsten en uitgaven in dezelfde valuta', points: 0 },
              { text: 'Kosten toewijzen aan de periode waarin gerelateerde opbrengsten worden gerealiseerd', points: 4, isCorrect: true },
              { text: 'Balans moet in evenwicht zijn', points: 0 },
              { text: 'Facturen matchen met betalingen', points: 1 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'design_skills',
    name: 'Design & Creative',
    icon: 'fa-paint-brush',
    color: '#f43f5e',
    skills: [
      {
        id: 'ui_design',
        name: 'UI Design',
        description: 'User interface ontwerp',
        questions: [
          {
            id: 5001,
            question: 'Wat is het 60-30-10 regel in kleurgebruik?',
            difficulty: 'junior',
            options: [
              { text: 'RGB waarden', points: 0 },
              { text: '60% dominante kleur, 30% secundair, 10% accent', points: 4, isCorrect: true },
              { text: 'Schermresoluties', points: 0 },
              { text: 'Contrast ratio', points: 0 }
            ]
          },
          {
            id: 5002,
            question: 'Wat is een design system en waarom is het belangrijk?',
            difficulty: 'medior',
            options: [
              { text: 'Een collectie iconen', points: 0 },
              { text: 'Herbruikbare componenten, patronen en richtlijnen voor consistentie en efficientie', points: 4, isCorrect: true },
              { text: 'Een projectmanagement tool', points: 0 },
              { text: 'Een type software', points: 0 }
            ]
          }
        ]
      },
      {
        id: 'ux_design',
        name: 'UX Design',
        description: 'User experience ontwerp',
        questions: [
          {
            id: 5101,
            question: 'Wat is een user persona?',
            difficulty: 'junior',
            options: [
              { text: 'Een inlogprofiel', points: 0 },
              { text: 'Een fictieve representatie van je doelgebruiker', points: 4, isCorrect: true },
              { text: 'Een type wireframe', points: 0 },
              { text: 'Een gebruikersinterface element', points: 0 }
            ]
          },
          {
            id: 5102,
            question: 'Hoe valideer je een UX hypothese?',
            difficulty: 'medior',
            options: [
              { text: 'Vragen aan collega\'s', points: 0 },
              { text: 'Usability testing, A/B testing, analytics en user interviews', points: 4, isCorrect: true },
              { text: 'Best practices volgen', points: 1 },
              { text: 'Competitor analysis', points: 1 }
            ]
          }
        ]
      },
      {
        id: 'figma',
        name: 'Figma',
        description: 'Design tool',
        questions: [
          {
            id: 5201,
            question: 'Wat is het voordeel van auto-layout in Figma?',
            difficulty: 'junior',
            options: [
              { text: 'Mooiere kleuren', points: 0 },
              { text: 'Responsieve, flexibele layouts die automatisch aanpassen', points: 4, isCorrect: true },
              { text: 'Sneller exporteren', points: 0 },
              { text: 'Betere samenwerking', points: 0 }
            ]
          },
          {
            id: 5202,
            question: 'Hoe zet je een schaalbaar component library op in Figma?',
            difficulty: 'senior',
            options: [
              { text: 'Alles in één file', points: 0 },
              { text: 'Variants, tokens, nested components en duidelijke naamconventies', points: 4, isCorrect: true },
              { text: 'Zoveel mogelijk components maken', points: 0 },
              { text: 'Templates gebruiken', points: 1 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'management_skills',
    name: 'Management & Leiderschap',
    icon: 'fa-users-cog',
    color: '#8b5cf6',
    skills: [
      {
        id: 'project_management',
        name: 'Project Management',
        description: 'Projecten leiden en plannen',
        questions: [
          {
            id: 6001,
            question: 'Wat is het kritieke pad in projectplanning?',
            difficulty: 'medior',
            options: [
              { text: 'Het gevaarlijkste deel van het project', points: 0 },
              { text: 'De langste reeks afhankelijke taken die de einddatum bepaalt', points: 4, isCorrect: true },
              { text: 'De belangrijkste deliverables', points: 0 },
              { text: 'Het pad met de meeste resources', points: 0 }
            ]
          },
          {
            id: 6002,
            question: 'Hoe ga je om met scope creep?',
            difficulty: 'senior',
            options: [
              { text: 'Alle verzoeken accepteren', points: 0 },
              { text: 'Change request proces, impact analyse, stakeholder alignment', points: 4, isCorrect: true },
              { text: 'Alle verzoeken weigeren', points: 0 },
              { text: 'Het project verlengen', points: 1 }
            ]
          }
        ]
      },
      {
        id: 'team_leadership',
        name: 'Team Leiderschap',
        description: 'Teams leiden en motiveren',
        questions: [
          {
            id: 6101,
            question: 'Hoe geef je effectieve feedback aan een teamlid?',
            difficulty: 'junior',
            options: [
              { text: 'Alleen positieve dingen zeggen', points: 0 },
              { text: 'Specifiek, tijdig, constructief en gericht op gedrag, niet persoon', points: 4, isCorrect: true },
              { text: 'Wachten tot de jaarlijkse review', points: 0 },
              { text: 'Via email om confrontatie te vermijden', points: 0 }
            ]
          },
          {
            id: 6102,
            question: 'Een teamlid presteert onder verwachting. Hoe pak je dit aan?',
            difficulty: 'medior',
            options: [
              { text: 'Direct een waarschuwing geven', points: 0 },
              { text: 'Gesprek voeren, oorzaken begrijpen, verbeterplan maken, ondersteuning bieden', points: 4, isCorrect: true },
              { text: 'Negeren en hopen dat het verbetert', points: 0 },
              { text: 'Taken herverdelen naar anderen', points: 1 }
            ]
          }
        ]
      },
      {
        id: 'agile',
        name: 'Agile & Scrum',
        description: 'Agile methodologieën',
        questions: [
          {
            id: 6201,
            question: 'Wat is het doel van een sprint retrospective?',
            difficulty: 'junior',
            options: [
              { text: 'Werk plannen voor volgende sprint', points: 0 },
              { text: 'Reflecteren op wat goed ging en wat beter kan', points: 4, isCorrect: true },
              { text: 'Bugs bespreken', points: 0 },
              { text: 'Stakeholders updaten', points: 0 }
            ]
          },
          {
            id: 6202,
            question: 'Hoe bepaal je de velocity van een team?',
            difficulty: 'medior',
            options: [
              { text: 'Hoeveel uren gewerkt wordt', points: 0 },
              { text: 'Gemiddeld aantal story points per sprint over meerdere sprints', points: 4, isCorrect: true },
              { text: 'Aantal voltooide taken', points: 1 },
              { text: 'Teamgrootte maal dagen', points: 0 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'communication_skills',
    name: 'Communicatie & Soft Skills',
    icon: 'fa-comments',
    color: '#0891b2',
    skills: [
      {
        id: 'presentation',
        name: 'Presenteren',
        description: 'Overtuigend presenteren',
        questions: [
          {
            id: 7001,
            question: 'Wat is het belangrijkste bij het openen van een presentatie?',
            difficulty: 'junior',
            options: [
              { text: 'Jezelf voorstellen', points: 1 },
              { text: 'Aandacht grijpen en relevantie voor publiek duidelijk maken', points: 4, isCorrect: true },
              { text: 'De agenda tonen', points: 0 },
              { text: 'Bedanken dat ze er zijn', points: 0 }
            ]
          },
          {
            id: 7002,
            question: 'Hoe ga je om met moeilijke vragen tijdens een presentatie?',
            difficulty: 'medior',
            options: [
              { text: 'Zeggen dat je het niet weet', points: 0 },
              { text: 'Erkennen, parafraseren, eerlijk antwoorden of opvolging beloven', points: 4, isCorrect: true },
              { text: 'De vraag negeren', points: 0 },
              { text: 'De vraag terugstellen', points: 1 }
            ]
          }
        ]
      },
      {
        id: 'written_communication',
        name: 'Schriftelijke Communicatie',
        description: 'Professioneel schrijven',
        questions: [
          {
            id: 7101,
            question: 'Wat maakt een professionele email effectief?',
            difficulty: 'junior',
            options: [
              { text: 'Zo lang mogelijk zijn', points: 0 },
              { text: 'Duidelijk onderwerp, kernboodschap eerst, concrete actie', points: 4, isCorrect: true },
              { text: 'Formele taal gebruiken', points: 1 },
              { text: 'Cc\'en naar iedereen', points: 0 }
            ]
          },
          {
            id: 7102,
            question: 'Hoe structureer je een complex rapport?',
            difficulty: 'medior',
            options: [
              { text: 'Chronologisch', points: 1 },
              { text: 'Executive summary eerst, dan details, conclusies en aanbevelingen', points: 4, isCorrect: true },
              { text: 'Alles in één hoofdstuk', points: 0 },
              { text: 'Alleen bullet points', points: 0 }
            ]
          }
        ]
      },
      {
        id: 'problem_solving',
        name: 'Probleemoplossing',
        description: 'Analytisch denken',
        questions: [
          {
            id: 7201,
            question: 'Wat is de eerste stap bij het oplossen van een complex probleem?',
            difficulty: 'junior',
            options: [
              { text: 'Direct oplossingen bedenken', points: 0 },
              { text: 'Het probleem duidelijk definiëren en begrijpen', points: 4, isCorrect: true },
              { text: 'Hulp vragen', points: 1 },
              { text: 'Onderzoek doen', points: 2 }
            ]
          },
          {
            id: 7202,
            question: 'Je krijgt een urgent probleem maar hebt niet alle informatie. Wat doe je?',
            difficulty: 'senior',
            options: [
              { text: 'Wachten tot alle info er is', points: 0 },
              { text: 'Risico inschatten, beslissen met beschikbare info, itereren', points: 4, isCorrect: true },
              { text: 'De beslissing escaleren', points: 1 },
              { text: 'Niets doen is ook een keuze', points: 0 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'languages',
    name: 'Talen',
    icon: 'fa-language',
    color: '#14b8a6',
    skills: [
      {
        id: 'english',
        name: 'Engels',
        description: 'Zakelijk Engels',
        questions: [
          {
            id: 8001,
            question: 'Which sentence is grammatically correct?',
            difficulty: 'junior',
            options: [
              { text: 'The team have finished their project', points: 2 },
              { text: 'The team has finished its project', points: 4, isCorrect: true },
              { text: 'The team have finished its project', points: 1 },
              { text: 'The team has finished their project', points: 2 }
            ]
          },
          {
            id: 8002,
            question: 'What is the appropriate closing for a formal business email?',
            difficulty: 'junior',
            options: [
              { text: 'Cheers', points: 0 },
              { text: 'Kind regards', points: 4, isCorrect: true },
              { text: 'XOXO', points: 0 },
              { text: 'Later', points: 0 }
            ]
          }
        ]
      },
      {
        id: 'french',
        name: 'Frans',
        description: 'Zakelijk Frans',
        questions: [
          {
            id: 8101,
            question: 'Quelle est la formule de politesse correcte pour terminer un email professionnel?',
            difficulty: 'junior',
            options: [
              { text: 'Bisous', points: 0 },
              { text: 'Cordialement', points: 4, isCorrect: true },
              { text: 'Salut', points: 0 },
              { text: 'A plus', points: 0 }
            ]
          },
          {
            id: 8102,
            question: 'Comment dit-on "meeting" en français professionnel?',
            difficulty: 'junior',
            options: [
              { text: 'Un meeting', points: 1 },
              { text: 'Une réunion', points: 4, isCorrect: true },
              { text: 'Un rendez-vous', points: 2 },
              { text: 'Une assemblée', points: 1 }
            ]
          }
        ]
      },
      {
        id: 'german',
        name: 'Duits',
        description: 'Zakelijk Duits',
        questions: [
          {
            id: 8201,
            question: 'Welche Anrede ist für eine geschäftliche E-Mail an eine unbekannte Person korrekt?',
            difficulty: 'junior',
            options: [
              { text: 'Hallo', points: 0 },
              { text: 'Sehr geehrte Damen und Herren', points: 4, isCorrect: true },
              { text: 'Liebe Freunde', points: 0 },
              { text: 'Hi', points: 0 }
            ]
          }
        ]
      }
    ]
  }
];

// Helper functie: bereken resultaat per skill
export function calculateSkillResult(skill: Skill, answers: Record<number, number>): SkillTestResult {
  let totalPoints = 0;
  let maxPoints = 0;

  skill.questions.forEach(question => {
    const maxQuestionPoints = Math.max(...question.options.map(o => o.points));
    maxPoints += maxQuestionPoints;
    if (answers[question.id] !== undefined) {
      totalPoints += answers[question.id];
    }
  });

  const percentage = maxPoints > 0 ? Math.round((totalPoints / maxPoints) * 100) : 0;
  
  let level: 'junior' | 'medior' | 'senior';
  if (percentage >= 80) level = 'senior';
  else if (percentage >= 55) level = 'medior';
  else level = 'junior';

  return {
    skillId: skill.id,
    skillName: skill.name,
    categoryId: '',
    percentage,
    level,
    testedAt: new Date().toISOString()
  };
}

// Helper: get alle skills als flat array
export function getAllSkills(): (Skill & { categoryId: string; categoryName: string; categoryColor: string })[] {
  const skills: (Skill & { categoryId: string; categoryName: string; categoryColor: string })[] = [];
  
  skillCategories.forEach(category => {
    category.skills.forEach(skill => {
      skills.push({
        ...skill,
        categoryId: category.id,
        categoryName: category.name,
        categoryColor: category.color
      });
    });
  });
  
  return skills;
}

// Level labels
export const skillLevelLabels = {
  junior: { label: 'Junior', color: '#6c757d', description: 'Basiskennis aanwezig' },
  medior: { label: 'Medior', color: '#f59e0b', description: 'Goede werkervaring' },
  senior: { label: 'Senior', color: '#059669', description: 'Expert niveau' }
};
