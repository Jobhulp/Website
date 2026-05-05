export type UserType = 'candidate' | 'employer';

export interface SessionUser {
  id: string;
  email: string;
  userType: UserType;
  isVerified: boolean;
  isAdmin: boolean;
  profile: {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    companyName?: string | null;
  };
}

export interface AuthResponse {
  user: SessionUser;
}

export interface ApiErrorBody {
  statusCode: number;
  message: string;
  details?: Array<{ field: string; message: string }>;
}

// Enums
export type ProficiencyLevel = 'informed' | 'beginner' | 'advanced' | 'expert' | 'master';
export type ExperienceLevel = 'junior' | 'medior' | 'senior';
export type WorkType = 'full_time' | 'part_time' | 'freelance' | 'temporary';
export type MbtiType =
  | 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP'
  | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP'
  | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ'
  | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP';

// Candidate profile
export interface CandidateProfile {
  id: string;
  userId: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  dateOfBirth: string | null;
  streetAddress: string | null;
  postalCode: string | null;
  city: string | null;
  country: string | null;
  latitude: number | null;
  longitude: number | null;
  bio: string | null;
  avatarUrl: string | null;
  cvUrl: string | null;
  linkedinUrl: string | null;
  portfolioUrl: string | null;
  desiredSalaryMin: number | null;
  desiredSalaryMax: number | null;
  workTypes: WorkType[];
  maxCommuteKm: number | null;
  isSearchable: boolean;
  mbtiType: MbtiType | null;
  profileCompleteness: number;
  updatedAt: string;
}

export interface CandidateSkill {
  id: string;
  candidateId: string;
  skillId: string;
  skillName: string;
  sectorId: string;
  sectorName: string;
  proficiencyLevel: ProficiencyLevel;
  yearsExperience: number | null;
  testedAt: string | null;
  lastTestScore: number | null;
}

export interface CandidateExperience {
  id: string;
  candidateId: string;
  companyName: string;
  jobTitle: string;
  experienceLevel: ExperienceLevel;
  startDate: string;
  endDate: string | null;
  description: string | null;
  isCurrent: boolean;
}

export interface CandidateEducation {
  id: string;
  candidateId: string;
  institutionName: string;
  degree: string;
  fieldOfStudy: string | null;
  startDate: string;
  endDate: string | null;
  description: string | null;
}

export interface Sector {
  id: string;
  name: string;
  slug: string;
}

export interface Skill {
  id: string;
  sectorId: string;
  sectorName: string;
  name: string;
  slug: string;
}

// Personality test
export interface PersonalityQuestion {
  id: string;
  text: string;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  polarity: 'positive' | 'negative';
}

export interface PersonalityStatus {
  canTake: boolean;
  cooldownUntil: string | null;
  lastResult: {
    mbtiType: MbtiType;
    completedAt: string;
  } | null;
}

export interface PersonalityStartResponse {
  questions: PersonalityQuestion[];
  attemptId: string;
}

export interface PersonalityResultBreakdown {
  EI: number; // percentage towards E (0-100)
  SN: number; // percentage towards S (0-100)
  TF: number; // percentage towards T (0-100)
  JP: number; // percentage towards J (0-100)
}

export interface PersonalitySubmitResponse {
  mbtiType: MbtiType;
  breakdown: PersonalityResultBreakdown;
}

// Skill test
export interface SkillTestStatus {
  skillName: string;
  sectorName: string;
  currentLevel: ProficiencyLevel;
  canTake: Record<ProficiencyLevel, boolean>;
  cooldowns: Record<ProficiencyLevel, string | null>;
  attemptsThisMonth: number;
}

export interface SkillTestQuestion {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
  }[];
}

export interface SkillTestAttempt {
  id: string;
  skillId: string;
  attemptedLevel: ProficiencyLevel;
  startedAt: string;
  expiresAt: string;
}

export interface SkillTestStartResponse {
  attempt: SkillTestAttempt;
  questions: SkillTestQuestion[];
}

export interface SkillTestSubmitResponse {
  passed: boolean;
  score: number;
  achievedLevel: ProficiencyLevel;
  attemptedLevel: ProficiencyLevel;
}

export type SkillTestAttemptStatus = 'in_progress' | 'submitted' | 'abandoned' | 'expired';
export type SkillTestOutcome = 'failed' | 'passed_lower' | 'passed_attempted' | 'passed_higher';

export interface SkillTestAttemptFull {
  id: string;
  skillId: string;
  skillName: string;
  sectorName: string;
  attemptedLevel: ProficiencyLevel;
  status: SkillTestAttemptStatus;
  startedAt: string;
  deadlineAt: string;
  submittedAt: string | null;
  scorePercent: number | null;
  outcome: SkillTestOutcome | null;
  achievedLevel: ProficiencyLevel | null;
}

export interface SkillTestAttemptResponse {
  attempt: SkillTestAttemptFull;
  questions: SkillTestQuestion[];
}

export interface SkillTestPerQuestion {
  questionId: string;
  questionText: string;
  selectedOptionId: string | null;
  selectedOptionText: string | null;
  correctOptionId: string;
  correctOptionText: string;
  isCorrect: boolean;
}

export interface SkillTestSubmitFullResponse {
  attempt: SkillTestAttemptFull;
  scorePercent: number;
  outcome: SkillTestOutcome;
  attemptedLevel: ProficiencyLevel;
  perQuestion: SkillTestPerQuestion[];
}

// Employer profile
export interface EmployerProfile {
  id: string;
  userId: string;
  companyName: string;
  vatNumber: string | null;
  sectorId: string | null;
  websiteUrl: string | null;
  linkedinUrl: string | null;
  streetAddress: string | null;
  postalCode: string | null;
  city: string | null;
  country: string | null;
  latitude: number | null;
  longitude: number | null;
  description: string | null;
  cultureDescription: string | null;
  logoUrl: string | null;
  coverImageUrl: string | null;
  updatedAt: string;
}

export type JobStatus = 'draft' | 'active' | 'paused' | 'closed';

export interface Job {
  id: string;
  employerId: string;
  title: string;
  description: string;
  sectorId: string;
  city: string | null;
  country: string | null;
  latitude: number | null;
  longitude: number | null;
  workType: WorkType;
  experienceLevel: ExperienceLevel;
  salaryMin: number | null;
  salaryMax: number | null;
  status: JobStatus;
  publishedAt: string | null;
  closesAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface JobSkill {
  id: string;
  jobId: string;
  skillId: string;
  skillName: string;
  requiredLevel: ProficiencyLevel;
  weight: number;
}

export interface JobWithSkills extends Job {
  skills: JobSkill[];
}

export interface EmployerSkillTest {
  id: string;
  employerId: string;
  jobId: string;
  skillId: string;
  skillName: string;
  title: string;
  description: string | null;
  passThreshold: number;
  isActive: boolean;
  questionCount: number;
  createdAt: string;
}
