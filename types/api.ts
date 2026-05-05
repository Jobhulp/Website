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

// Employer profile
export interface EmployerProfile {
  id: string;
  userId: string;
  companyName: string;
  companyLogoUrl: string | null;
  companySize: '1-10' | '11-50' | '51-200' | '201-500' | '500+' | null;
  industry: string | null;
  website: string | null;
  description: string | null;
  location: string | null;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}
