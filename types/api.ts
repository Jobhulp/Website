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
