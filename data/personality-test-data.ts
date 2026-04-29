// DISC-gebaseerde persoonlijkheidstest voor Jobhulp
// D = Dominant, I = Invloedrijk, S = Stabiel, C = Conscientieus

export interface PersonalityQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    type: 'D' | 'I' | 'S' | 'C';
  }[];
}

export interface PersonalityType {
  type: 'D' | 'I' | 'S' | 'C';
  name: string;
  title: string;
  description: string;
  strengths: string[];
  challenges: string[];
  idealWorkEnvironment: string[];
  communicationStyle: string;
  color: string;
}

export const personalityTypes: Record<string, PersonalityType> = {
  D: {
    type: 'D',
    name: 'Dominant',
    title: 'De Doener',
    description: 'Je bent resultaatgericht, direct en houdt van uitdagingen. Je neemt graag de leiding en focust op het behalen van doelen.',
    strengths: [
      'Besluitvaardig',
      'Resultaatgericht',
      'Probleemoplossend',
      'Zelfverzekerd',
      'Competitief'
    ],
    challenges: [
      'Kan ongeduldig overkomen',
      'Soms te direct',
      'Kan details over het hoofd zien'
    ],
    idealWorkEnvironment: [
      'Autonomie en vrijheid',
      'Uitdagende projecten',
      'Snelle besluitvorming',
      'Competitieve sfeer'
    ],
    communicationStyle: 'Direct, to-the-point, focust op resultaten',
    color: '#dc3545'
  },
  I: {
    type: 'I',
    name: 'Invloedrijk',
    title: 'De Inspirator',
    description: 'Je bent enthousiast, optimistisch en sociaal. Je inspireert anderen en bouwt makkelijk relaties op.',
    strengths: [
      'Enthousiast',
      'Creatief',
      'Overtuigend',
      'Teamspeler',
      'Positief'
    ],
    challenges: [
      'Kan moeite hebben met details',
      'Soms impulsief',
      'Kan afgeleid raken'
    ],
    idealWorkEnvironment: [
      'Sociale interactie',
      'Creatieve vrijheid',
      'Erkenning en waardering',
      'Dynamische omgeving'
    ],
    communicationStyle: 'Expressief, enthousiast, vertelt graag verhalen',
    color: '#ffc107'
  },
  S: {
    type: 'S',
    name: 'Stabiel',
    title: 'De Supporter',
    description: 'Je bent betrouwbaar, geduldig en een echte teamspeler. Je zorgt voor harmonie en stabiliteit in het team.',
    strengths: [
      'Betrouwbaar',
      'Geduldig',
      'Goede luisteraar',
      'Loyaal',
      'Ondersteunend'
    ],
    challenges: [
      'Kan moeite hebben met verandering',
      'Soms te meegaand',
      'Kan conflicten vermijden'
    ],
    idealWorkEnvironment: [
      'Stabiele omgeving',
      'Duidelijke verwachtingen',
      'Harmonieus team',
      'Waardering voor bijdragen'
    ],
    communicationStyle: 'Rustig, ondersteunend, luistert goed',
    color: '#28a745'
  },
  C: {
    type: 'C',
    name: 'Consciëntieus',
    title: 'De Analist',
    description: 'Je bent nauwkeurig, analytisch en houdt van kwaliteit. Je werkt systematisch en let op details.',
    strengths: [
      'Nauwkeurig',
      'Analytisch',
      'Systematisch',
      'Kwaliteitsgericht',
      'Objectief'
    ],
    challenges: [
      'Kan perfectionistisch zijn',
      'Soms te kritisch',
      'Kan besluiteloos zijn'
    ],
    idealWorkEnvironment: [
      'Duidelijke processen',
      'Tijd voor analyse',
      'Hoge kwaliteitsstandaarden',
      'Onafhankelijk werken'
    ],
    communicationStyle: 'Feitelijk, gedetailleerd, vraagt door',
    color: '#007bff'
  }
};

export const personalityQuestions: PersonalityQuestion[] = [
  {
    id: 1,
    question: 'Hoe benader je een nieuw project?',
    options: [
      { text: 'Ik neem de leiding en bepaal direct de richting', type: 'D' },
      { text: 'Ik brainstorm enthousiast met het team', type: 'I' },
      { text: 'Ik luister eerst naar ieders input', type: 'S' },
      { text: 'Ik analyseer alle details voordat ik begin', type: 'C' }
    ]
  },
  {
    id: 2,
    question: 'Wat motiveert je het meest op werk?',
    options: [
      { text: 'Resultaten behalen en doelen overtreffen', type: 'D' },
      { text: 'Erkenning krijgen en anderen inspireren', type: 'I' },
      { text: 'Bijdragen aan een harmonieus team', type: 'S' },
      { text: 'Perfect werk afleveren met hoge kwaliteit', type: 'C' }
    ]
  },
  {
    id: 3,
    question: 'Hoe ga je om met conflicten?',
    options: [
      { text: 'Ik confronteer het probleem direct', type: 'D' },
      { text: 'Ik probeer de sfeer positief te houden', type: 'I' },
      { text: 'Ik zoek naar compromissen', type: 'S' },
      { text: 'Ik analyseer de feiten objectief', type: 'C' }
    ]
  },
  {
    id: 4,
    question: 'Welke werkomgeving past het beste bij jou?',
    options: [
      { text: 'Snel, competitief en uitdagend', type: 'D' },
      { text: 'Creatief, sociaal en dynamisch', type: 'I' },
      { text: 'Stabiel, ondersteunend en harmonieus', type: 'S' },
      { text: 'Gestructureerd, rustig en kwaliteitsgericht', type: 'C' }
    ]
  },
  {
    id: 5,
    question: 'Hoe neem je beslissingen?',
    options: [
      { text: 'Snel en decisief, op basis van mijn intuïtie', type: 'D' },
      { text: 'Enthousiast, vaak op gevoel', type: 'I' },
      { text: 'Zorgvuldig, rekening houdend met anderen', type: 'S' },
      { text: 'Analytisch, na grondig onderzoek', type: 'C' }
    ]
  },
  {
    id: 6,
    question: 'Wat beschrijft jouw communicatiestijl het beste?',
    options: [
      { text: 'Direct en to-the-point', type: 'D' },
      { text: 'Expressief en enthousiast', type: 'I' },
      { text: 'Vriendelijk en ondersteunend', type: 'S' },
      { text: 'Precies en feitelijk', type: 'C' }
    ]
  },
  {
    id: 7,
    question: 'Hoe ga je om met deadlines?',
    options: [
      { text: 'Ik haal ze altijd, desnoods door anderen te pushen', type: 'D' },
      { text: 'Ik motiveer het team om samen te finishen', type: 'I' },
      { text: 'Ik werk gestaag en vraag om hulp indien nodig', type: 'S' },
      { text: 'Ik plan vooruit zodat alles perfect is', type: 'C' }
    ]
  },
  {
    id: 8,
    question: 'Wat doe je het liefst in een team?',
    options: [
      { text: 'De leiding nemen en richting geven', type: 'D' },
      { text: 'Ideeën pitchen en enthousiasme creëren', type: 'I' },
      { text: 'Anderen helpen en ondersteunen', type: 'S' },
      { text: 'Analyseren en kwaliteit bewaken', type: 'C' }
    ]
  },
  {
    id: 9,
    question: 'Hoe reageer je op verandering?',
    options: [
      { text: 'Ik zie het als een kans om te winnen', type: 'D' },
      { text: 'Ik ben enthousiast over nieuwe mogelijkheden', type: 'I' },
      { text: 'Ik pas me aan, maar heb tijd nodig', type: 'S' },
      { text: 'Ik analyseer eerst alle voor- en nadelen', type: 'C' }
    ]
  },
  {
    id: 10,
    question: 'Wat is je grootste sterkte?',
    options: [
      { text: 'Doorzettingsvermogen en daadkracht', type: 'D' },
      { text: 'Creativiteit en overtuigingskracht', type: 'I' },
      { text: 'Betrouwbaarheid en empathie', type: 'S' },
      { text: 'Nauwkeurigheid en analytisch denken', type: 'C' }
    ]
  },
  {
    id: 11,
    question: 'Hoe leer je het liefst nieuwe dingen?',
    options: [
      { text: 'Door het gewoon te doen en te experimenteren', type: 'D' },
      { text: 'Door te discussiëren en ideeën uit te wisselen', type: 'I' },
      { text: 'Door stap voor stap begeleiding te krijgen', type: 'S' },
      { text: 'Door handleidingen en documentatie te bestuderen', type: 'C' }
    ]
  },
  {
    id: 12,
    question: 'Wat vind je het meest frustrerend op werk?',
    options: [
      { text: 'Traagheid en gebrek aan actie', type: 'D' },
      { text: 'Saaiheid en routine', type: 'I' },
      { text: 'Conflicten en onzekerheid', type: 'S' },
      { text: 'Slordigheid en lage kwaliteit', type: 'C' }
    ]
  }
];

export interface PersonalityResult {
  primaryType: 'D' | 'I' | 'S' | 'C';
  secondaryType: 'D' | 'I' | 'S' | 'C';
  scores: {
    D: number;
    I: number;
    S: number;
    C: number;
  };
  completedAt: string;
}

export const calculatePersonalityResult = (answers: Record<number, 'D' | 'I' | 'S' | 'C'>): PersonalityResult => {
  const scores = { D: 0, I: 0, S: 0, C: 0 };
  
  Object.values(answers).forEach(type => {
    scores[type]++;
  });

  // Convert to percentages
  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  const percentages = {
    D: Math.round((scores.D / total) * 100),
    I: Math.round((scores.I / total) * 100),
    S: Math.round((scores.S / total) * 100),
    C: Math.round((scores.C / total) * 100)
  };

  // Find primary and secondary types
  const sorted = Object.entries(percentages).sort((a, b) => b[1] - a[1]);
  
  return {
    primaryType: sorted[0][0] as 'D' | 'I' | 'S' | 'C',
    secondaryType: sorted[1][0] as 'D' | 'I' | 'S' | 'C',
    scores: percentages,
    completedAt: new Date().toISOString()
  };
};
