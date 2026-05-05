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
export type AttemptOutcome = ProficiencyLevel | 'failed';
export type ExperienceLevel = 'junior' | 'medior' | 'senior';
export type WorkType = 'fulltime' | 'parttime' | 'freelance' | 'internship' | 'temporary';
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

// Matching
export interface SkillMatchDetail {
  skillId: string;
  skillName: string;
  requiredLevel: ProficiencyLevel;
  candidateLevel: ProficiencyLevel | null;
  isTested: boolean;
  score: number; // 0-100
}

export interface MatchScore {
  overall: number; // 0-100
  skillsScore: number;
  personalityScore: number;
  preferencesScore: number;
  skillDetails: SkillMatchDetail[];
}

export type InterestState = 'pending' | 'interested' | 'not_interested' | null;

export interface MatchPublicProfile {
  firstName: string | null;
  city: string | null;
  bio: string | null;
  avatarUrl: string | null;
  mbtiType: MbtiType | null;
  profileCompleteness: number;
}

export interface JobMatch {
  candidateProfileId: string;
  matchScore: MatchScore;
  publicProfile: MatchPublicProfile;
  interestState: {
    candidate: InterestState;
    employer: InterestState;
  };
  chatRoomId: string | null;
}

export interface JobWithEmployer extends Job {
  employerName: string;
  employerLogoUrl: string | null;
  sectorName: string;
}

export interface CandidateMatch {
  job: JobWithEmployer;
  matchScore: MatchScore;
  interestState: {
    candidate: InterestState;
    employer: InterestState;
  };
  chatRoomId: string | null;
}

export interface JobWithEmployerFull extends JobWithSkills {
  employerName: string;
  employerLogoUrl: string | null;
  employerCity: string | null;
  sectorName: string;
}

export interface EmployerSkillTestWithStatus extends EmployerSkillTest {
  candidateStatus: 'not_started' | 'passed' | 'failed';
  lastAttemptAt: string | null;
  lastScore: number | null;
}

export interface MatchDetail {
  job: JobWithEmployerFull;
  matchScore: MatchScore;
  interestState: {
    candidate: InterestState;
    employer: InterestState;
  };
  candidateInterestedAt: string | null;
  chatRoomId: string | null;
  employerSkillTests: EmployerSkillTestWithStatus[];
}

// Notifications
export type NotificationType =
  | 'employer_showed_interest'
  | 'candidate_showed_interest'
  | 'mutual_interest'
  | 'chat_first_message_received'
  | 'chat_unlocked'
  | 'employer_test_passed'
  | 'employer_test_failed'
  | 'personality_test_completed'
  | 'job_closing_soon'
  | 'job_auto_closed'
  | 'profile_incomplete_reminder';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  data: Record<string, unknown>;
  title: string;
  body: string | null;
  linkUrl: string | null;
  readAt: string | null;
  emailSentAt: string | null;
  createdAt: string;
}

export interface NotificationPreferences {
  userId: string;
  employerInterest: boolean;
  candidateInterest: boolean;
  mutualInterest: boolean;
  chatMessages: boolean;
  testResults: boolean;
  jobLifecycle: boolean;
  profileReminders: boolean;
  emailEnabled: boolean;
  updatedAt: string;
}

// Chat
export type ChatSenderSide = 'candidate' | 'employer' | 'system';
export type ChatRoomStatus = 'locked' | 'open' | 'archived';

export interface ChatRoom {
  id: string;
  matchInterestId: string;
  candidateUserId: string;
  employerUserId: string;
  status: ChatRoomStatus;
  lastMessageAt: string | null;
  lastMessagePreview: string | null;
  candidateUnreadCount: number;
  employerUnreadCount: number;
  unlockedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  chatRoomId: string;
  senderUserId: string | null;
  senderSide: ChatSenderSide;
  body: string;
  readByCandidateAt: string | null;
  readByEmployerAt: string | null;
  createdAt: string;
}

export interface ChatRoomCounterpart {
  userId: string;
  side: 'candidate' | 'employer';
  displayName: string;
  avatarUrl: string | null;
}

export interface ChatGatingTest {
  employerSkillTestId: string;
  title: string;
  skillName: string;
}

export interface ChatRoomView {
  room: ChatRoom;
  job: { id: string; title: string; status: string };
  counterpart: ChatRoomCounterpart;
  myUnreadCount: number;
  gating: {
    pendingTests: ChatGatingTest[];
    failedTests: ChatGatingTest[];
  };
}

export interface ChatRoomDetailView extends ChatRoomView {
  messages: ChatMessage[];
}

export interface ChatPollResponse {
  room: ChatRoom;
  messages: ChatMessage[];
}

// Admin
export interface AdminUserListItem {
  id: string;
  email: string;
  userType: UserType;
  isVerified: boolean;
  isActive: boolean;
  isAdmin: boolean;
  deletedAt: string | null;
  createdAt: string;
  lastLogin: string | null;
  displayName: string | null;
}

export interface AdminUserDetail {
  user: AdminUserListItem;
  candidate: Record<string, unknown> | null;
  employer: Record<string, unknown> | null;
}

export interface AdminJobListItem {
  id: string;
  title: string;
  status: JobStatus;
  employerId: string;
  employerName: string | null;
  city: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export type AuditAction =
  | 'admin_user_deactivate'
  | 'admin_user_reactivate'
  | 'admin_user_force_delete'
  | 'admin_job_pause'
  | 'admin_job_resume'
  | 'admin_job_close'
  | 'admin_grant_admin'
  | 'admin_revoke_admin'
  | 'user_data_export'
  | 'user_account_delete'
  | 'user_account_restore';

export interface AuditLogEntry {
  id: string;
  actorUserId: string | null;
  action: AuditAction;
  targetType: string | null;
  targetId: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
}

// ===========================================================================
// Homepage feed types
// ===========================================================================

export type FeedItemReason = 'random' | 'sector_click' | 'profile_match' | 'recent';

export type RemotePreference = 'onsite' | 'hybrid' | 'remote';

export interface HomepageFeedItem {
  id: string;
  title: string;
  city: string | null;
  workType: WorkType;
  remotePreference: RemotePreference;
  publishedAt: string | null;
  primarySectorId: string | null;
  primarySectorName: string | null;
  employerName: string;
  employerLogoUrl: string | null;
  matchScore: number | null;
  reason: FeedItemReason;
}

export interface HomepageFeedResponse {
  items: HomepageFeedItem[];
  mode: 'anonymous' | 'candidate' | 'employer';
}

export interface HomepageSector {
  id: string;
  name: string;
  homepageSlug: string;
  color: string;
  icon: string;
  activeJobsCount: number;
  matchedJobsCount: number | null;
}

export interface HomepageSectorsResponse {
  items: HomepageSector[];
  mode: 'anonymous' | 'candidate' | 'employer';
}

export interface HomepageCitiesResponse {
  cities: string[];
}

export interface SectorBySlugResponse {
  sector: HomepageSector;
}
