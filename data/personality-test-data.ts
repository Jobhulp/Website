// MBTI Persoonlijkheidstest voor Jobhulp
// 16 types: INTJ, INTP, ENTJ, ENTP, INFJ, INFP, ENFJ, ENFP, ISTJ, ISFJ, ESTJ, ESFJ, ISTP, ISFP, ESTP, ESFP

export interface MBTIQuestion {
  id: number;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  question: string;
  optionA: { text: string; type: 'E' | 'S' | 'T' | 'J' };
  optionB: { text: string; type: 'I' | 'N' | 'F' | 'P' };
}

export const personalityQuestions: MBTIQuestion[] = [
  // Extraversion (E) vs Introversion (I)
  {
    id: 1,
    dimension: 'EI',
    question: 'Na een lange werkdag voel je je het meest opgeladen door...',
    optionA: { text: 'Tijd doorbrengen met collega\'s of vrienden', type: 'E' },
    optionB: { text: 'Rustig alleen zijn om te ontspannen', type: 'I' },
  },
  {
    id: 2,
    dimension: 'EI',
    question: 'Tijdens een brainstormsessie werk je het liefst...',
    optionA: { text: 'In een groep waar ideeen snel worden uitgewisseld', type: 'E' },
    optionB: { text: 'Eerst alleen nadenken, dan delen met de groep', type: 'I' },
  },
  {
    id: 3,
    dimension: 'EI',
    question: 'Op een netwerkevenement...',
    optionA: { text: 'Spreek je gemakkelijk nieuwe mensen aan', type: 'E' },
    optionB: { text: 'Wacht je tot anderen het gesprek starten', type: 'I' },
  },
  {
    id: 4,
    dimension: 'EI',
    question: 'Je werkt het beste wanneer...',
    optionA: { text: 'Er veel interactie en beweging is', type: 'E' },
    optionB: { text: 'Je rustig en ongestoord kunt focussen', type: 'I' },
  },
  {
    id: 5,
    dimension: 'EI',
    question: 'Bij het verwerken van nieuwe informatie...',
    optionA: { text: 'Praat je erover met anderen om het te begrijpen', type: 'E' },
    optionB: { text: 'Denk je er eerst zelf rustig over na', type: 'I' },
  },

  // Sensing (S) vs Intuition (N)
  {
    id: 6,
    dimension: 'SN',
    question: 'Bij het oplossen van een probleem focus je vooral op...',
    optionA: { text: 'Concrete feiten en bewezen methodes', type: 'S' },
    optionB: { text: 'Nieuwe mogelijkheden en innovatieve aanpakken', type: 'N' },
  },
  {
    id: 7,
    dimension: 'SN',
    question: 'Je beschrijft jezelf eerder als...',
    optionA: { text: 'Praktisch en realistisch', type: 'S' },
    optionB: { text: 'Creatief en visionair', type: 'N' },
  },
  {
    id: 8,
    dimension: 'SN',
    question: 'Bij het leren van iets nieuws...',
    optionA: { text: 'Wil je stapsgewijze instructies en voorbeelden', type: 'S' },
    optionB: { text: 'Wil je eerst het grote plaatje begrijpen', type: 'N' },
  },
  {
    id: 9,
    dimension: 'SN',
    question: 'In gesprekken ben je meer gericht op...',
    optionA: { text: 'Wat er nu speelt en concrete details', type: 'S' },
    optionB: { text: 'Toekomstmogelijkheden en abstracte ideeen', type: 'N' },
  },
  {
    id: 10,
    dimension: 'SN',
    question: 'Je vertrouwt het meest op...',
    optionA: { text: 'Je eigen ervaring en waarnemingen', type: 'S' },
    optionB: { text: 'Je intuitie en voorgevoel', type: 'N' },
  },

  // Thinking (T) vs Feeling (F)
  {
    id: 11,
    dimension: 'TF',
    question: 'Bij het nemen van een belangrijke beslissing...',
    optionA: { text: 'Analyseer je objectief de voor- en nadelen', type: 'T' },
    optionB: { text: 'Overweeg je hoe het anderen zal beinvloeden', type: 'F' },
  },
  {
    id: 12,
    dimension: 'TF',
    question: 'In een conflict geef je de voorkeur aan...',
    optionA: { text: 'Eerlijk en direct zijn, ook als het pijnlijk is', type: 'T' },
    optionB: { text: 'Diplomatisch zijn en de relatie bewaren', type: 'F' },
  },
  {
    id: 13,
    dimension: 'TF',
    question: 'Je vindt het belangrijker dat een beslissing...',
    optionA: { text: 'Logisch en rechtvaardig is', type: 'T' },
    optionB: { text: 'Rekening houdt met ieders gevoelens', type: 'F' },
  },
  {
    id: 14,
    dimension: 'TF',
    question: 'Feedback geven doe je door...',
    optionA: { text: 'Direct te zeggen wat beter kan', type: 'T' },
    optionB: { text: 'Eerst het positieve te benoemen', type: 'F' },
  },
  {
    id: 15,
    dimension: 'TF',
    question: 'Op werk waardeer je het meest...',
    optionA: { text: 'Competentie en resultaten', type: 'T' },
    optionB: { text: 'Harmonie en samenwerking', type: 'F' },
  },

  // Judging (J) vs Perceiving (P)
  {
    id: 16,
    dimension: 'JP',
    question: 'Je agenda en planning zijn meestal...',
    optionA: { text: 'Gestructureerd en goed gepland', type: 'J' },
    optionB: { text: 'Flexibel met ruimte voor spontaniteit', type: 'P' },
  },
  {
    id: 17,
    dimension: 'JP',
    question: 'Deadlines...',
    optionA: { text: 'Haal je ruim op tijd omdat je vooruit plant', type: 'J' },
    optionB: { text: 'Haal je, maar vaak op het laatste moment', type: 'P' },
  },
  {
    id: 18,
    dimension: 'JP',
    question: 'Je voelt je het beste wanneer...',
    optionA: { text: 'Dingen zijn afgerond en beslissingen genomen', type: 'J' },
    optionB: { text: 'Je opties openhoudt en flexibel blijft', type: 'P' },
  },
  {
    id: 19,
    dimension: 'JP',
    question: 'Bij een project begin je...',
    optionA: { text: 'Met een duidelijk plan en structuur', type: 'J' },
    optionB: { text: 'En laat je het zich organisch ontwikkelen', type: 'P' },
  },
  {
    id: 20,
    dimension: 'JP',
    question: 'Onverwachte veranderingen in plannen...',
    optionA: { text: 'Vind je vervelend en verstorend', type: 'J' },
    optionB: { text: 'Vind je vaak juist interessant', type: 'P' },
  },
];

export interface MBTITypeInfo {
  type: string;
  name: string;
  nickname: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  workStyle: string;
  idealEnvironment: string;
  famousPeople: string[];
  careers: string[];
  color: string;
}

export const personalityTypes: Record<string, MBTITypeInfo> = {
  'INTJ': {
    type: 'INTJ',
    name: 'De Architect',
    nickname: 'Strategisch Denker',
    description: 'Vindingrijke strategen met een plan voor alles. Onafhankelijke denkers die streven naar competentie en kennis.',
    strengths: ['Strategisch denken', 'Onafhankelijk', 'Vastberaden', 'Ambitieus', 'Innovatief'],
    weaknesses: ['Kan arrogant overkomen', 'Ongeduldig met inefficientie', 'Moeite met emoties'],
    workStyle: 'Je werkt het beste alleen of in kleine teams met competente mensen. Je houdt van complexe problemen en langetermijnplanning.',
    idealEnvironment: 'Een intellectueel stimulerende omgeving met autonomie en minimale bureaucratie.',
    famousPeople: ['Elon Musk', 'Mark Zuckerberg', 'Isaac Newton'],
    careers: ['Strateeg', 'Data Scientist', 'Software Architect', 'Onderzoeker'],
    color: '#6366f1',
  },
  'INTP': {
    type: 'INTP',
    name: 'De Denker',
    nickname: 'Logisch Analist',
    description: 'Innovatieve uitvinders met een onuitputtelijke dorst naar kennis. Logische probleemoplossers die patronen zien waar anderen dat niet doen.',
    strengths: ['Analytisch', 'Objectief', 'Origineel', 'Open-minded', 'Eerlijk'],
    weaknesses: ['Kan afstandelijk zijn', 'Moeite met routine', 'Uitstelgedrag'],
    workStyle: 'Je analyseert problemen tot in detail en zoekt naar de meest elegante oplossing.',
    idealEnvironment: 'Vrijheid om te experimenteren, intellectuele uitdagingen, minimale sociale verplichtingen.',
    famousPeople: ['Albert Einstein', 'Bill Gates', 'Marie Curie'],
    careers: ['Onderzoeker', 'Developer', 'Filosoof', 'Analist'],
    color: '#8b5cf6',
  },
  'ENTJ': {
    type: 'ENTJ',
    name: 'De Commandant',
    nickname: 'Besluitvaardige Leider',
    description: 'Gedreven leiders die altijd een weg vinden. Strategisch, energiek en zeer vastberaden in het bereiken van doelen.',
    strengths: ['Leiderschap', 'Strategisch', 'Efficient', 'Zelfverzekerd', 'Energiek'],
    weaknesses: ['Kan dominant zijn', 'Ongeduldig', 'Moeite met emotionele situaties'],
    workStyle: 'Je neemt graag de leiding en organiseert mensen en processen om doelen te bereiken.',
    idealEnvironment: 'Leidinggevende positie met duidelijke doelen en competente teamleden.',
    famousPeople: ['Steve Jobs', 'Margaret Thatcher', 'Gordon Ramsay'],
    careers: ['CEO', 'Ondernemer', 'Manager', 'Consultant'],
    color: '#dc2626',
  },
  'ENTP': {
    type: 'ENTP',
    name: 'De Debater',
    nickname: 'Visionair Innovator',
    description: 'Slimme en nieuwsgierige denkers die geen uitdaging uit de weg gaan. Ondernemend en creatief in het vinden van oplossingen.',
    strengths: ['Innovatief', 'Snel van begrip', 'Charismatisch', 'Energiek', 'Debatteren'],
    weaknesses: ['Kan argumentatief zijn', 'Moeite met follow-through', 'Ongeduldig met details'],
    workStyle: 'Je genereert ideeen en lost problemen creatief op. Routine en details zijn niet je sterkste punt.',
    idealEnvironment: 'Dynamische omgeving met nieuwe uitdagingen en mogelijkheden om te innoveren.',
    famousPeople: ['Thomas Edison', 'Leonardo da Vinci', 'Richard Branson'],
    careers: ['Ondernemer', 'Innovator', 'Advocaat', 'Creative Director'],
    color: '#f59e0b',
  },
  'INFJ': {
    type: 'INFJ',
    name: 'De Advocaat',
    nickname: 'Inzichtvolle Idealist',
    description: 'Stille visionairs met sterke idealen. Gedreven door een diep gevoel van integriteit en een verlangen om anderen te helpen.',
    strengths: ['Inzichtelijk', 'Principieel', 'Creatief', 'Gepassioneerd', 'Altruistisch'],
    weaknesses: ['Perfectionistisch', 'Kan zich terugtrekken', 'Gevoelig voor kritiek'],
    workStyle: 'Je werkt het beste aan projecten die aansluiten bij je waarden. Je hebt een sterke visie en inspireert anderen.',
    idealEnvironment: 'Betekenisvol werk met positieve impact, harmonieuze sfeer, ruimte voor creativiteit.',
    famousPeople: ['Martin Luther King Jr.', 'Nelson Mandela', 'Mother Teresa'],
    careers: ['Counselor', 'HR Manager', 'Schrijver', 'Non-profit leider'],
    color: '#059669',
  },
  'INFP': {
    type: 'INFP',
    name: 'De Bemiddelaar',
    nickname: 'Idealist met Empathie',
    description: 'Poetische, vriendelijke altruisten, altijd bereid om te helpen voor een goed doel. Diepzinnig en authentiek.',
    strengths: ['Empathisch', 'Creatief', 'Open-minded', 'Loyaal', 'Idealistisch'],
    weaknesses: ['Te idealistisch', 'Neemt dingen persoonlijk', 'Moeite met kritiek'],
    workStyle: 'Je zoekt betekenis in je werk en wilt bijdragen aan iets groters. Authenticiteit is essentieel.',
    idealEnvironment: 'Creatieve vrijheid, flexibele werkuren, werk dat aansluit bij persoonlijke waarden.',
    famousPeople: ['William Shakespeare', 'J.R.R. Tolkien', 'Princess Diana'],
    careers: ['Schrijver', 'Psycholoog', 'Designer', 'Maatschappelijk werker'],
    color: '#10b981',
  },
  'ENFJ': {
    type: 'ENFJ',
    name: 'De Protagonist',
    nickname: 'Charismatische Leider',
    description: 'Charismatische en inspirerende leiders, in staat om hun toehoorders te boeien. Natuurlijke mentors.',
    strengths: ['Charismatisch', 'Empathisch', 'Betrouwbaar', 'Natuurlijke leider', 'Altruistisch'],
    weaknesses: ['Te zelfopofferend', 'Gevoelig voor kritiek', 'Kan te idealistisch zijn'],
    workStyle: 'Je inspireert en motiveert anderen. Je bent een natuurlijke coach en haalt het beste uit mensen.',
    idealEnvironment: 'Samenwerkende omgeving waar je anderen kunt helpen groeien.',
    famousPeople: ['Barack Obama', 'Oprah Winfrey', 'Martin Luther King Jr.'],
    careers: ['Coach', 'HR Director', 'Leraar', 'Politicus'],
    color: '#0891b2',
  },
  'ENFP': {
    type: 'ENFP',
    name: 'De Campagnevoerder',
    nickname: 'Enthousiaste Inspirator',
    description: 'Enthousiaste, creatieve en sociaal vaardige vrije geesten. Altijd in staat om een reden te vinden om te glimlachen.',
    strengths: ['Enthousiast', 'Creatief', 'Sociaal', 'Optimistisch', 'Energiek'],
    weaknesses: ['Moeite met focus', 'Kan overweldigd raken', 'Moeite met praktische details'],
    workStyle: 'Je brengt energie en creativiteit naar elk project. Je inspireert anderen met je enthousiasme.',
    idealEnvironment: 'Creatieve, flexibele omgeving met veel menselijk contact en variatie.',
    famousPeople: ['Robin Williams', 'Walt Disney', 'Robert Downey Jr.'],
    careers: ['Marketing', 'PR Specialist', 'Eventmanager', 'Creatief ondernemer'],
    color: '#ec4899',
  },
  'ISTJ': {
    type: 'ISTJ',
    name: 'De Logisticus',
    nickname: 'Betrouwbare Organisator',
    description: 'Praktische en feitgerichte individuen, wiens betrouwbaarheid niet in twijfel kan worden getrokken.',
    strengths: ['Betrouwbaar', 'Praktisch', 'Georganiseerd', 'Eerlijk', 'Gedisciplineerd'],
    weaknesses: ['Kan koppig zijn', 'Ongevoelig overkomen', 'Moeite met verandering'],
    workStyle: 'Je werkt methodisch en houdt van duidelijke structuur. Je levert altijd kwaliteit.',
    idealEnvironment: 'Gestructureerde omgeving met duidelijke verwachtingen en procedures.',
    famousPeople: ['Angela Merkel', 'Warren Buffett', 'Queen Elizabeth II'],
    careers: ['Accountant', 'Projectmanager', 'Kwaliteitsmanager', 'Jurist'],
    color: '#475569',
  },
  'ISFJ': {
    type: 'ISFJ',
    name: 'De Beschermer',
    nickname: 'Toegewijde Helper',
    description: 'Zeer toegewijde en warme beschermers, altijd klaar om degenen die ze liefhebben te verdedigen.',
    strengths: ['Ondersteunend', 'Betrouwbaar', 'Geduldig', 'Observant', 'Loyaal'],
    weaknesses: ['Te bescheiden', 'Moeite met verandering', 'Kan zich overladen'],
    workStyle: 'Je bent de stille kracht achter elk team. Je zorgt ervoor dat alles soepel verloopt.',
    idealEnvironment: 'Stabiele, harmonieuze werkomgeving waar je bijdrage wordt gewaardeerd.',
    famousPeople: ['Beyonce', 'Kate Middleton', 'Halle Berry'],
    careers: ['Verpleegkundige', 'HR Medewerker', 'Administratief manager', 'Leraar'],
    color: '#64748b',
  },
  'ESTJ': {
    type: 'ESTJ',
    name: 'De Directeur',
    nickname: 'Efficiente Organisator',
    description: 'Uitstekende beheerders, ongeevenaaard in het managen van zaken of mensen.',
    strengths: ['Georganiseerd', 'Loyaal', 'Hardwerkend', 'Betrouwbaar', 'Direct'],
    weaknesses: ['Kan inflexibel zijn', 'Moeite met emoties', 'Kan te dominant zijn'],
    workStyle: 'Je houdt van orde en structuur. Je organiseert mensen en processen efficient.',
    idealEnvironment: 'Traditionele, gestructureerde organisatie met duidelijke hierarchie.',
    famousPeople: ['Judge Judy', 'Frank Sinatra', 'Michelle Obama'],
    careers: ['Operations Manager', 'Militair', 'Rechter', 'Financieel manager'],
    color: '#78716c',
  },
  'ESFJ': {
    type: 'ESFJ',
    name: 'De Consul',
    nickname: 'Zorgzame Coordinator',
    description: 'Buitengewoon zorgzame, sociale en populaire mensen, altijd bereid om te helpen.',
    strengths: ['Zorgzaam', 'Loyaal', 'Warm', 'Betrouwbaar', 'Praktisch'],
    weaknesses: ['Te behoefte aan goedkeuring', 'Gevoelig voor kritiek', 'Moeite met conflict'],
    workStyle: 'Je creeert harmonie en zorgt voor anderen. Je bent de sociale lijm van elk team.',
    idealEnvironment: 'Vriendelijke, cooperatieve omgeving met veel menselijk contact.',
    famousPeople: ['Taylor Swift', 'Bill Clinton', 'Jennifer Lopez'],
    careers: ['Office Manager', 'Event Planner', 'Sales', 'Healthcare'],
    color: '#a1a1aa',
  },
  'ISTP': {
    type: 'ISTP',
    name: 'De Virtuoos',
    nickname: 'Praktische Probleemoplosser',
    description: 'Gedurfde en praktische experimenteerders, meesters van allerlei soorten tools.',
    strengths: ['Praktisch', 'Observant', 'Analytisch', 'Aanpasbaar', 'Kalm onder druk'],
    weaknesses: ['Kan afstandelijk zijn', 'Ongeduldig', 'Risicovol gedrag'],
    workStyle: 'Je lost problemen praktisch op en werkt graag met je handen. Je bent kalm in crisissituaties.',
    idealEnvironment: 'Hands-on werk met vrijheid en variatie, minimale bureaucratie.',
    famousPeople: ['Michael Jordan', 'Tom Cruise', 'Clint Eastwood'],
    careers: ['Ingenieur', 'Monteur', 'Piloot', 'IT Specialist'],
    color: '#71717a',
  },
  'ISFP': {
    type: 'ISFP',
    name: 'De Avonturier',
    nickname: 'Creatieve Kunstenaar',
    description: 'Flexibele en charmante kunstenaars, altijd klaar om iets nieuws te ontdekken en te ervaren.',
    strengths: ['Creatief', 'Gevoelig', 'Charmant', 'Flexibel', 'Artistiek'],
    weaknesses: ['Te gevoelig', 'Moeite met planning', 'Vermijdt conflict'],
    workStyle: 'Je uit je creativiteit door je werk. Je hebt vrijheid nodig om te experimenteren.',
    idealEnvironment: 'Creatieve, flexibele omgeving met esthetische elementen.',
    famousPeople: ['Michael Jackson', 'Britney Spears', 'Frida Kahlo'],
    careers: ['Designer', 'Fotograaf', 'Chef', 'Therapeut'],
    color: '#a3a3a3',
  },
  'ESTP': {
    type: 'ESTP',
    name: 'De Ondernemer',
    nickname: 'Energieke Doener',
    description: 'Slimme, energieke en zeer perceptieve mensen die echt genieten van het leven aan de rand.',
    strengths: ['Energiek', 'Perceptief', 'Direct', 'Sociaal', 'Rationeel'],
    weaknesses: ['Ongeduldig', 'Risicovol', 'Moeite met langetermijn'],
    workStyle: 'Je bent action-oriented en lost problemen snel en praktisch op. Je gedijt onder druk.',
    idealEnvironment: 'Dynamische, snelle omgeving met veel actie en variatie.',
    famousPeople: ['Donald Trump', 'Madonna', 'Ernest Hemingway'],
    careers: ['Sales Executive', 'Ondernemer', 'Marketing', 'Sportcoach'],
    color: '#ef4444',
  },
  'ESFP': {
    type: 'ESFP',
    name: 'De Entertainer',
    nickname: 'Spontane Performer',
    description: 'Spontane, energieke en enthousiaste mensen - het leven is nooit saai in hun buurt.',
    strengths: ['Enthousiast', 'Sociaal', 'Observant', 'Praktisch', 'Origineel'],
    weaknesses: ['Gevoelig voor kritiek', 'Moeite met focus', 'Impulsief'],
    workStyle: 'Je brengt plezier en energie naar elke situatie. Je bent een natuurlijke entertainer.',
    idealEnvironment: 'Sociale, energieke omgeving met veel interactie en variatie.',
    famousPeople: ['Marilyn Monroe', 'Jamie Oliver', 'Adele'],
    careers: ['Sales', 'PR', 'Eventmanager', 'Entertainer'],
    color: '#f97316',
  },
};

export interface PersonalityResult {
  type: string;
  scores: {
    E: number; I: number;
    S: number; N: number;
    T: number; F: number;
    J: number; P: number;
  };
  percentages: {
    EI: number; // percentage E (100 = full E, 0 = full I)
    SN: number;
    TF: number;
    JP: number;
  };
  completedAt: string;
}

export const calculatePersonalityResult = (answers: Record<number, 'A' | 'B'>): PersonalityResult => {
  const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  
  personalityQuestions.forEach((question) => {
    const answer = answers[question.id];
    if (answer === 'A') {
      scores[question.optionA.type]++;
    } else if (answer === 'B') {
      scores[question.optionB.type]++;
    }
  });

  const type = 
    (scores.E >= scores.I ? 'E' : 'I') +
    (scores.S >= scores.N ? 'S' : 'N') +
    (scores.T >= scores.F ? 'T' : 'F') +
    (scores.J >= scores.P ? 'J' : 'P');

  const percentages = {
    EI: Math.round((scores.E / (scores.E + scores.I || 1)) * 100),
    SN: Math.round((scores.S / (scores.S + scores.N || 1)) * 100),
    TF: Math.round((scores.T / (scores.T + scores.F || 1)) * 100),
    JP: Math.round((scores.J / (scores.J + scores.P || 1)) * 100),
  };

  return { 
    type, 
    scores, 
    percentages,
    completedAt: new Date().toISOString()
  };
};

// Dimensie labels voor UI
export const dimensionLabels = {
  EI: { left: 'Extravert', right: 'Introvert', leftCode: 'E', rightCode: 'I' },
  SN: { left: 'Observant', right: 'Intuitief', leftCode: 'S', rightCode: 'N' },
  TF: { left: 'Denkend', right: 'Voelend', leftCode: 'T', rightCode: 'F' },
  JP: { left: 'Beoordelend', right: 'Waarnemend', leftCode: 'J', rightCode: 'P' },
};
