// Demo data voor Jobhulp matching platform

export interface JobMatch {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  salary: string;
  type: string;
  matchScore: number;
  matchReasons: string[];
  missingSkills: string[];
  postedDate: string;
  mutualInterest: boolean;
  candidateInterested: boolean;
  employerInterested: boolean;
}

export interface CandidateMatch {
  id: string;
  name: string;
  avatar: string;
  title: string;
  location: string;
  salary: string;
  skills: string[];
  matchScore: number;
  matchReasons: string[];
  missingSkills: string[];
  availableFrom: string;
  mutualInterest: boolean;
  candidateInterested: boolean;
  employerInterested: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  title: string;
  location: string;
  salary: string;
  skills: string[];
  workStyle: string[];
  preferences: {
    remote: boolean;
    partTime: boolean;
    freelance: boolean;
  };
  completeness: number;
}

export interface CompanyProfile {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  size: string;
  description: string;
  culture: string[];
  openJobs: number;
}

// Demo Jobs voor kandidaten
export const demoJobMatches: JobMatch[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechVision NV',
    companyLogo: '/img/company-logo1.png',
    location: 'Antwerpen',
    salary: '€55.000 - €70.000',
    type: 'Full Time',
    matchScore: 94,
    matchReasons: ['React expertise', 'Remote work mogelijk', 'Teamcultuur past', 'Salarisverwachting matcht'],
    missingSkills: ['GraphQL ervaring'],
    postedDate: '2 dagen geleden',
    mutualInterest: true,
    candidateInterested: true,
    employerInterested: true,
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    company: 'InnovateBE',
    companyLogo: '/img/company-logo2.png',
    location: 'Brussel',
    salary: '€50.000 - €65.000',
    type: 'Full Time',
    matchScore: 87,
    matchReasons: ['JavaScript skills', 'Startup mentaliteit', 'Groei mogelijkheden'],
    missingSkills: ['Python backend', 'DevOps kennis'],
    postedDate: '1 week geleden',
    mutualInterest: false,
    candidateInterested: true,
    employerInterested: false,
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    company: 'DesignFirst',
    companyLogo: '/img/company-logo3.png',
    location: 'Gent',
    salary: '€45.000 - €55.000',
    type: 'Part Time',
    matchScore: 82,
    matchReasons: ['Design skills', 'Creatieve omgeving', 'Flexibele uren'],
    missingSkills: ['Figma advanced', 'Motion design'],
    postedDate: '3 dagen geleden',
    mutualInterest: false,
    candidateInterested: false,
    employerInterested: true,
  },
  {
    id: '4',
    title: 'React Native Developer',
    company: 'MobileFirst BV',
    companyLogo: '/img/company-logo4.png',
    location: 'Leuven',
    salary: '€52.000 - €68.000',
    type: 'Full Time',
    matchScore: 79,
    matchReasons: ['React kennis', 'Mobile interesse', 'Jong team'],
    missingSkills: ['iOS native', 'Android native'],
    postedDate: '5 dagen geleden',
    mutualInterest: false,
    candidateInterested: false,
    employerInterested: false,
  },
  {
    id: '5',
    title: 'Frontend Lead',
    company: 'ScaleTech',
    companyLogo: '/img/company-logo5.png',
    location: 'Hasselt',
    salary: '€65.000 - €80.000',
    type: 'Full Time',
    matchScore: 76,
    matchReasons: ['Leadership skills', 'Technische expertise', 'Strategische rol'],
    missingSkills: ['Team management ervaring', 'Enterprise projecten'],
    postedDate: '1 dag geleden',
    mutualInterest: false,
    candidateInterested: false,
    employerInterested: false,
  },
];

// Demo Kandidaten voor werkgevers
export const demoCandidateMatches: CandidateMatch[] = [
  {
    id: '1',
    name: 'Emma Janssens',
    avatar: '/img/author1.jpg',
    title: 'Senior Frontend Developer',
    location: 'Antwerpen',
    salary: '€55.000 - €65.000',
    skills: ['React', 'TypeScript', 'Node.js', 'CSS', 'Git'],
    matchScore: 92,
    matchReasons: ['Alle vereiste skills', 'Cultuur fit', 'Beschikbaar direct', 'Salaris binnen budget'],
    missingSkills: ['GraphQL'],
    availableFrom: 'Direct beschikbaar',
    mutualInterest: true,
    candidateInterested: true,
    employerInterested: true,
  },
  {
    id: '2',
    name: 'Thomas De Vries',
    avatar: '/img/author2.jpg',
    title: 'Full Stack Developer',
    location: 'Brussel',
    salary: '€50.000 - €60.000',
    skills: ['JavaScript', 'Python', 'React', 'Django', 'PostgreSQL'],
    matchScore: 88,
    matchReasons: ['Sterke backend skills', 'Teamplayer', 'Leergierig'],
    missingSkills: ['TypeScript', 'AWS'],
    availableFrom: 'Over 2 weken',
    mutualInterest: false,
    candidateInterested: true,
    employerInterested: false,
  },
  {
    id: '3',
    name: 'Lisa Van den Berg',
    avatar: '/img/author3.jpg',
    title: 'UI/UX Designer',
    location: 'Gent',
    salary: '€45.000 - €55.000',
    skills: ['Figma', 'Adobe XD', 'CSS', 'User Research', 'Prototyping'],
    matchScore: 85,
    matchReasons: ['Design expertise', 'User-centered aanpak', 'Portfolio indrukwekkend'],
    missingSkills: ['Frontend development', 'Motion design'],
    availableFrom: 'Over 1 maand',
    mutualInterest: false,
    candidateInterested: false,
    employerInterested: true,
  },
  {
    id: '4',
    name: 'Jan Peeters',
    avatar: '/img/author4.jpg',
    title: 'Backend Developer',
    location: 'Mechelen',
    salary: '€48.000 - €58.000',
    skills: ['Java', 'Spring Boot', 'MySQL', 'Docker', 'Kubernetes'],
    matchScore: 78,
    matchReasons: ['Solide backend kennis', 'Enterprise ervaring'],
    missingSkills: ['Frontend skills', 'Cloud native'],
    availableFrom: 'Direct beschikbaar',
    mutualInterest: false,
    candidateInterested: false,
    employerInterested: false,
  },
  {
    id: '5',
    name: 'Sarah Claes',
    avatar: '/img/author5.jpg',
    title: 'DevOps Engineer',
    location: 'Leuven',
    salary: '€55.000 - €70.000',
    skills: ['AWS', 'Terraform', 'Docker', 'CI/CD', 'Python'],
    matchScore: 74,
    matchReasons: ['DevOps expertise', 'Automation skills'],
    missingSkills: ['Frontend kennis', 'Specifieke stack ervaring'],
    availableFrom: 'Over 3 weken',
    mutualInterest: false,
    candidateInterested: false,
    employerInterested: false,
  },
];

// Demo Gebruikersprofiel
export const demoUserProfile: UserProfile = {
  id: '1',
  name: 'Pieter Vermeulen',
  email: 'pieter.vermeulen@email.com',
  avatar: '/img/author10.jpg',
  title: 'Frontend Developer',
  location: 'Antwerpen',
  salary: '€50.000 - €65.000',
  skills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML', 'Git', 'Node.js'],
  workStyle: ['Remote friendly', 'Agile teams', 'Innovatief'],
  preferences: {
    remote: true,
    partTime: false,
    freelance: false,
  },
  completeness: 85,
};

// Demo Bedrijfsprofiel
export const demoCompanyProfile: CompanyProfile = {
  id: '1',
  name: 'TechVision NV',
  logo: '/img/company-logo1.png',
  industry: 'Software Development',
  location: 'Antwerpen',
  size: '50-100 medewerkers',
  description: 'TechVision is een innovatief softwarebedrijf dat zich richt op het bouwen van cutting-edge webapplicaties voor enterprise klanten.',
  culture: ['Innovatief', 'Remote-first', 'Continuous learning', 'Open communicatie'],
  openJobs: 5,
};

// Demo Jobs van een werkgever
export const demoEmployerJobs: JobMatch[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechVision NV',
    companyLogo: '/img/company-logo1.png',
    location: 'Antwerpen',
    salary: '€55.000 - €70.000',
    type: 'Full Time',
    matchScore: 0,
    matchReasons: [],
    missingSkills: [],
    postedDate: '2 dagen geleden',
    mutualInterest: false,
    candidateInterested: false,
    employerInterested: false,
  },
  {
    id: '2',
    title: 'Backend Developer',
    company: 'TechVision NV',
    companyLogo: '/img/company-logo1.png',
    location: 'Antwerpen (Hybrid)',
    salary: '€50.000 - €65.000',
    type: 'Full Time',
    matchScore: 0,
    matchReasons: [],
    missingSkills: [],
    postedDate: '1 week geleden',
    mutualInterest: false,
    candidateInterested: false,
    employerInterested: false,
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    company: 'TechVision NV',
    companyLogo: '/img/company-logo1.png',
    location: 'Remote',
    salary: '€45.000 - €55.000',
    type: 'Part Time',
    matchScore: 0,
    matchReasons: [],
    missingSkills: [],
    postedDate: '3 dagen geleden',
    mutualInterest: false,
    candidateInterested: false,
    employerInterested: false,
  },
];

// Dashboard statistieken
export const demoCandidateStats = {
  totalMatches: 24,
  newMatches: 5,
  mutualMatches: 3,
  profileViews: 47,
  interestReceived: 8,
  interestSent: 12,
};

export const demoEmployerStats = {
  totalCandidates: 156,
  newCandidates: 12,
  mutualMatches: 7,
  activeJobs: 3,
  interestReceived: 23,
  interestSent: 18,
};

// Demo Test Resultaten - MBTI
export interface DemoPersonalityResult {
  completed: boolean;
  type: string; // e.g., 'ENTJ', 'INFP'
  percentages: {
    EI: number; // E percentage (100 = full E, 0 = full I)
    SN: number;
    TF: number;
    JP: number;
  };
  completedAt: string;
}

export interface DemoSkillsResult {
  completed: boolean;
  directionId: string;
  directionName: string;
  directionIcon: string;
  directionColor: string;
  overallPercentage: number;
  overallLevel: 'junior' | 'medior' | 'senior';
  results: {
    categoryId: string;
    categoryName: string;
    percentage: number;
    level: string;
  }[];
  completedAt: string;
}

export const demoPersonalityResult: DemoPersonalityResult = {
  completed: true,
  type: 'ENTJ',
  percentages: {
    EI: 72, // 72% Extravert
    SN: 35, // 35% Sensing, 65% Intuitive
    TF: 68, // 68% Thinking
    JP: 81, // 81% Judging
  },
  completedAt: '2026-04-25T10:30:00Z',
};

export const demoSkillsResult: DemoSkillsResult = {
  completed: true,
  directionId: 'it_development',
  directionName: 'IT & Development',
  directionIcon: 'fa-code',
  directionColor: '#6366f1',
  overallPercentage: 78,
  overallLevel: 'medior',
  results: [
    { categoryId: 'programming', categoryName: 'Programmeren', percentage: 85, level: 'senior' },
    { categoryId: 'problem_solving_it', categoryName: 'Probleemoplossing', percentage: 71, level: 'medior' },
  ],
  completedAt: '2026-04-26T14:15:00Z',
};

// MBTI type info voor dashboard
export const mbtiTypeInfo: Record<string, { name: string; nickname: string; color: string }> = {
  'INTJ': { name: 'De Architect', nickname: 'Strategisch Denker', color: '#6366f1' },
  'INTP': { name: 'De Denker', nickname: 'Logisch Analist', color: '#8b5cf6' },
  'ENTJ': { name: 'De Commandant', nickname: 'Besluitvaardige Leider', color: '#dc2626' },
  'ENTP': { name: 'De Debater', nickname: 'Visionair Innovator', color: '#f59e0b' },
  'INFJ': { name: 'De Advocaat', nickname: 'Inzichtvolle Idealist', color: '#059669' },
  'INFP': { name: 'De Bemiddelaar', nickname: 'Idealist met Empathie', color: '#10b981' },
  'ENFJ': { name: 'De Protagonist', nickname: 'Charismatische Leider', color: '#0891b2' },
  'ENFP': { name: 'De Campagnevoerder', nickname: 'Enthousiaste Inspirator', color: '#ec4899' },
  'ISTJ': { name: 'De Logisticus', nickname: 'Betrouwbare Organisator', color: '#475569' },
  'ISFJ': { name: 'De Beschermer', nickname: 'Toegewijde Helper', color: '#64748b' },
  'ESTJ': { name: 'De Directeur', nickname: 'Efficiente Organisator', color: '#78716c' },
  'ESFJ': { name: 'De Consul', nickname: 'Zorgzame Coordinator', color: '#a1a1aa' },
  'ISTP': { name: 'De Virtuoos', nickname: 'Praktische Probleemoplosser', color: '#71717a' },
  'ISFP': { name: 'De Avonturier', nickname: 'Creatieve Kunstenaar', color: '#a3a3a3' },
  'ESTP': { name: 'De Ondernemer', nickname: 'Energieke Doener', color: '#ef4444' },
  'ESFP': { name: 'De Entertainer', nickname: 'Spontane Performer', color: '#f97316' },
};

export const skillLevelInfo: Record<string, { label: string; color: string }> = {
  beginner: { label: 'Beginner', color: '#6c757d' },
  intermediate: { label: 'Gevorderd', color: '#ffc107' },
  advanced: { label: 'Expert', color: '#28a745' },
  expert: { label: 'Meester', color: '#007bff' },
};
