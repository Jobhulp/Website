// Vaardighedentest voor Jobhulp
// Test het niveau van kandidaten in verschillende domeinen

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  questions: SkillQuestion[];
}

export interface SkillQuestion {
  id: number;
  question: string;
  type: 'multiple_choice' | 'scenario' | 'self_assessment';
  options: SkillOption[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface SkillOption {
  text: string;
  points: number;
  isCorrect?: boolean;
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'communication',
    name: 'Communicatie',
    description: 'Test je schriftelijke en mondelinge communicatievaardigheden',
    icon: 'fa-comments',
    questions: [
      {
        id: 1,
        question: 'Hoe zou je een complex technisch probleem uitleggen aan een niet-technische collega?',
        type: 'scenario',
        difficulty: 'intermediate',
        options: [
          { text: 'Ik gebruik vakjargon om precies te zijn', points: 1 },
          { text: 'Ik gebruik een analogie of vergelijking uit het dagelijks leven', points: 4 },
          { text: 'Ik verwijs ze door naar iemand anders', points: 0 },
          { text: 'Ik gebruik visuele hulpmiddelen en simpele taal', points: 3 }
        ]
      },
      {
        id: 2,
        question: 'Je krijgt kritische feedback op je werk. Hoe reageer je?',
        type: 'scenario',
        difficulty: 'intermediate',
        options: [
          { text: 'Ik verdedig mijn keuzes uitgebreid', points: 1 },
          { text: 'Ik luister, vraag door en bedank voor de feedback', points: 4 },
          { text: 'Ik neem het persoonlijk en voel me aangevallen', points: 0 },
          { text: 'Ik beloof het te verbeteren zonder echt te luisteren', points: 1 }
        ]
      },
      {
        id: 3,
        question: 'Hoe bereid je je voor op een belangrijke presentatie?',
        type: 'self_assessment',
        difficulty: 'beginner',
        options: [
          { text: 'Ik improviseer ter plekke', points: 1 },
          { text: 'Ik schrijf alles woord voor woord uit', points: 2 },
          { text: 'Ik bereid kernpunten voor en oefen meerdere keren', points: 4 },
          { text: 'Ik maak alleen slides zonder te oefenen', points: 1 }
        ]
      }
    ]
  },
  {
    id: 'problem_solving',
    name: 'Probleemoplossend denken',
    description: 'Test je analytische en oplossingsgerichte vaardigheden',
    icon: 'fa-lightbulb',
    questions: [
      {
        id: 4,
        question: 'Een project loopt vast door een onverwacht probleem. Wat is je eerste stap?',
        type: 'scenario',
        difficulty: 'intermediate',
        options: [
          { text: 'Direct aan een oplossing beginnen werken', points: 2 },
          { text: 'Het probleem analyseren en de oorzaak achterhalen', points: 4 },
          { text: 'Wachten tot iemand anders het oplost', points: 0 },
          { text: 'Het probleem escaleren naar management', points: 1 }
        ]
      },
      {
        id: 5,
        question: 'Hoe prioriteer je taken wanneer alles urgent lijkt?',
        type: 'self_assessment',
        difficulty: 'advanced',
        options: [
          { text: 'Ik werk aan wat het meest interessant is', points: 1 },
          { text: 'Ik gebruik een matrix (urgentie vs. impact) om te prioriteren', points: 4 },
          { text: 'Ik werk alles tegelijk aan', points: 0 },
          { text: 'Ik vraag mijn manager om elke beslissing', points: 2 }
        ]
      },
      {
        id: 6,
        question: 'Je hebt 4 taken: A (2 uur, deadline morgen), B (1 uur, deadline vandaag), C (3 uur, geen deadline), D (30 min, deadline volgende week). In welke volgorde pak je ze aan?',
        type: 'multiple_choice',
        difficulty: 'advanced',
        options: [
          { text: 'A, B, C, D', points: 1, isCorrect: false },
          { text: 'B, A, D, C', points: 4, isCorrect: true },
          { text: 'C, A, B, D', points: 0, isCorrect: false },
          { text: 'D, B, A, C', points: 2, isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'teamwork',
    name: 'Samenwerking',
    description: 'Test je vermogen om effectief in teams te werken',
    icon: 'fa-users',
    questions: [
      {
        id: 7,
        question: 'Een teamlid levert consequent te laat werk aan. Hoe ga je hiermee om?',
        type: 'scenario',
        difficulty: 'advanced',
        options: [
          { text: 'Ik negeer het en doe extra werk om te compenseren', points: 0 },
          { text: 'Ik klaag bij de manager', points: 1 },
          { text: 'Ik bespreek het privé en vraag of ik kan helpen', points: 4 },
          { text: 'Ik confronteer ze in de groep', points: 1 }
        ]
      },
      {
        id: 8,
        question: 'Wat is jouw typische rol in een teamproject?',
        type: 'self_assessment',
        difficulty: 'beginner',
        options: [
          { text: 'Ik neem de leiding en coördineer', points: 3 },
          { text: 'Ik focus op mijn eigen taken', points: 2 },
          { text: 'Ik help waar nodig en verbind teamleden', points: 4 },
          { text: 'Ik wacht tot taken worden toegewezen', points: 1 }
        ]
      },
      {
        id: 9,
        question: 'Er is onenigheid in het team over de aanpak. Wat doe je?',
        type: 'scenario',
        difficulty: 'intermediate',
        options: [
          { text: 'Ik druk mijn mening door', points: 1 },
          { text: 'Ik faciliteer een discussie om tot consensus te komen', points: 4 },
          { text: 'Ik volg de meerderheid', points: 2 },
          { text: 'Ik trek me terug uit de discussie', points: 0 }
        ]
      }
    ]
  },
  {
    id: 'digital_skills',
    name: 'Digitale vaardigheden',
    description: 'Test je kennis van digitale tools en technologie',
    icon: 'fa-laptop-code',
    questions: [
      {
        id: 10,
        question: 'Welke tool zou je gebruiken om samen aan een document te werken?',
        type: 'multiple_choice',
        difficulty: 'beginner',
        options: [
          { text: 'Een Word document via email versturen', points: 1, isCorrect: false },
          { text: 'Google Docs of Microsoft 365 online', points: 4, isCorrect: true },
          { text: 'Het document printen en rondgeven', points: 0, isCorrect: false },
          { text: 'Telefonisch bespreken', points: 1, isCorrect: false }
        ]
      },
      {
        id: 11,
        question: 'Je computer werkt traag. Wat probeer je eerst?',
        type: 'multiple_choice',
        difficulty: 'beginner',
        options: [
          { text: 'Direct IT bellen', points: 1, isCorrect: false },
          { text: 'Een nieuwe computer kopen', points: 0, isCorrect: false },
          { text: 'Onnodige programmas sluiten en herstarten', points: 4, isCorrect: true },
          { text: 'Doorgaan en hopen dat het beter wordt', points: 0, isCorrect: false }
        ]
      },
      {
        id: 12,
        question: 'Hoe ga je om met het leren van nieuwe software?',
        type: 'self_assessment',
        difficulty: 'intermediate',
        options: [
          { text: 'Ik wacht tot iemand me het uitlegt', points: 1 },
          { text: 'Ik zoek tutorials en experimenteer zelf', points: 4 },
          { text: 'Ik lees de hele handleiding eerst', points: 3 },
          { text: 'Ik vermijd nieuwe software zoveel mogelijk', points: 0 }
        ]
      }
    ]
  },
  {
    id: 'adaptability',
    name: 'Aanpassingsvermogen',
    description: 'Test hoe je omgaat met verandering en onzekerheid',
    icon: 'fa-sync-alt',
    questions: [
      {
        id: 13,
        question: 'Halverwege een project veranderen de eisen compleet. Hoe reageer je?',
        type: 'scenario',
        difficulty: 'advanced',
        options: [
          { text: 'Ik klaag over het gebrek aan planning', points: 1 },
          { text: 'Ik analyseer de impact en stel een nieuw plan voor', points: 4 },
          { text: 'Ik doe alsof er niets is veranderd', points: 0 },
          { text: 'Ik vraag om meer tijd zonder plan', points: 1 }
        ]
      },
      {
        id: 14,
        question: 'Hoe sta je tegenover het werken buiten je comfortzone?',
        type: 'self_assessment',
        difficulty: 'intermediate',
        options: [
          { text: 'Ik vermijd het zoveel mogelijk', points: 0 },
          { text: 'Ik zie het als kans om te groeien', points: 4 },
          { text: 'Ik doe het alleen als het moet', points: 2 },
          { text: 'Het maakt me nerveus maar ik probeer het', points: 3 }
        ]
      },
      {
        id: 15,
        question: 'Je moet plotseling een taak overnemen van een zieke collega. Wat doe je?',
        type: 'scenario',
        difficulty: 'intermediate',
        options: [
          { text: 'Ik weiger omdat het niet mijn werk is', points: 0 },
          { text: 'Ik neem het over en vraag om context waar nodig', points: 4 },
          { text: 'Ik wacht tot de collega terugkomt', points: 0 },
          { text: 'Ik neem het over maar klaag erover', points: 1 }
        ]
      }
    ]
  }
];

export interface SkillResult {
  categoryId: string;
  score: number;
  maxScore: number;
  percentage: number;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface OverallSkillResult {
  results: SkillResult[];
  overallPercentage: number;
  overallLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  completedAt: string;
  strengths: string[];
  improvements: string[];
}

export const calculateSkillLevel = (percentage: number): 'beginner' | 'intermediate' | 'advanced' | 'expert' => {
  if (percentage >= 90) return 'expert';
  if (percentage >= 70) return 'advanced';
  if (percentage >= 50) return 'intermediate';
  return 'beginner';
};

export const levelLabels: Record<string, { label: string; color: string }> = {
  beginner: { label: 'Beginner', color: '#6c757d' },
  intermediate: { label: 'Gevorderd', color: '#ffc107' },
  advanced: { label: 'Expert', color: '#28a745' },
  expert: { label: 'Meester', color: '#007bff' }
};

export const calculateOverallResult = (answers: Record<number, number>): OverallSkillResult => {
  const results: SkillResult[] = [];
  
  skillCategories.forEach(category => {
    let categoryScore = 0;
    let maxPossible = 0;
    
    category.questions.forEach(q => {
      const answer = answers[q.id];
      if (answer !== undefined) {
        categoryScore += answer;
      }
      maxPossible += 4; // Max points per question
    });
    
    const percentage = maxPossible > 0 ? Math.round((categoryScore / maxPossible) * 100) : 0;
    
    results.push({
      categoryId: category.id,
      score: categoryScore,
      maxScore: maxPossible,
      percentage,
      level: calculateSkillLevel(percentage)
    });
  });
  
  const totalScore = results.reduce((sum, r) => sum + r.score, 0);
  const totalMaxScore = results.reduce((sum, r) => sum + r.maxScore, 0);
  const overallPercentage = Math.round((totalScore / totalMaxScore) * 100);
  
  // Determine strengths and improvements
  const sortedResults = [...results].sort((a, b) => b.percentage - a.percentage);
  const strengths = sortedResults.slice(0, 2).map(r => {
    const category = skillCategories.find(c => c.id === r.categoryId);
    return category?.name || '';
  });
  const improvements = sortedResults.slice(-2).reverse().map(r => {
    const category = skillCategories.find(c => c.id === r.categoryId);
    return category?.name || '';
  });
  
  return {
    results,
    overallPercentage,
    overallLevel: calculateSkillLevel(overallPercentage),
    completedAt: new Date().toISOString(),
    strengths,
    improvements
  };
};
