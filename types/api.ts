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

// Candidate profile
export interface CandidateProfile {
  id: string;
  userId: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  location: string | null;
  bio: string | null;
  avatarUrl: string | null;
  desiredSalaryMin: number | null;
  desiredSalaryMax: number | null;
  workTypes: ('fulltime' | 'parttime' | 'freelance' | 'internship')[];
  remotePreference: 'onsite' | 'hybrid' | 'remote' | 'flexible' | null;
  availableFrom: string | null;
  mbtiType: string | null;
  mbtiPercentages: Record<string, number> | null;
  mbtiCompletedAt: string | null;
  profileCompleteness: number;
  createdAt: string;
  updatedAt: string;
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
