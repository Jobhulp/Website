# Jobhulp Backend Specificatie

> Complete technische specificatie voor de backend implementatie van het Jobhulp platform.
> Dit document bevat alle database schemas, API endpoints, business logic en implementatie details.

---

## Inhoudsopgave

1. [Technologie Stack](#1-technologie-stack)
2. [Project Structuur](#2-project-structuur)
3. [Database Schema](#3-database-schema)
4. [API Endpoints](#4-api-endpoints)
5. [Authentication & Authorization](#5-authentication--authorization)
6. [Matching Algoritme](#6-matching-algoritme)
7. [Business Logic](#7-business-logic)
8. [Validatie Schemas](#8-validatie-schemas)
9. [Error Handling](#9-error-handling)
10. [Background Jobs](#10-background-jobs)
11. [Testing](#11-testing)
12. [Deployment](#12-deployment)

---

## 1. Technologie Stack

### Core

| Component | Technologie | Reden |
|-----------|-------------|-------|
| **Runtime** | Node.js 20+ | LTS, performance |
| **Framework** | Next.js 15 (App Router) | API Routes, Server Actions |
| **Database** | Supabase (PostgreSQL 15) | Managed, RLS, Realtime |
| **Auth** | Supabase Auth | Geïntegreerd, JWT |
| **ORM** | Geen (raw SQL via Supabase client) | Performance, controle |
| **Validation** | Zod | Type-safe, runtime validation |
| **File Storage** | Vercel Blob | Avatars, CV uploads |

### Aanvullend

| Component | Technologie | Gebruik |
|-----------|-------------|---------|
| **Caching** | Upstash Redis | Match scores, sessions |
| **Email** | Resend | Transactional emails |
| **Background Jobs** | Vercel Cron + Inngest | Match berekeningen, reminders |
| **Monitoring** | Vercel Analytics + Sentry | Performance, errors |
| **Rate Limiting** | Upstash Ratelimit | API bescherming |

### Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Vercel Blob
BLOB_READ_WRITE_TOKEN=vercel_blob_...

# Upstash Redis
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxx

# Resend
RESEND_API_KEY=re_xxx

# App
NEXT_PUBLIC_APP_URL=https://jobhulp.be
JWT_SECRET=xxx
```

---

## 2. Project Structuur

```
/app
  /api
    /auth
      /register/route.ts
      /login/route.ts
      /logout/route.ts
      /forgot-password/route.ts
      /reset-password/route.ts
      /verify-email/route.ts
      /me/route.ts
    /candidate
      /profile/route.ts
      /skills/route.ts
      /skills/[skillId]/route.ts
      /education/route.ts
      /education/[id]/route.ts
      /experience/route.ts
      /experience/[id]/route.ts
    /employer
      /profile/route.ts
      /jobs/route.ts
      /jobs/[id]/route.ts
      /jobs/[id]/skills/route.ts
      /jobs/[id]/status/route.ts
    /tests
      /personality
        /questions/route.ts
        /submit/route.ts
        /result/route.ts
      /skills
        /[skillId]/questions/route.ts
        /[skillId]/submit/route.ts
        /results/route.ts
    /matches
      /route.ts
      /mutual/route.ts
      /[id]/route.ts
      /[id]/interest/route.ts
      /[id]/messages/route.ts
    /jobs/route.ts
    /jobs/[id]/route.ts
    /candidates/route.ts
    /candidates/[id]/route.ts
    /skills/route.ts
    /notifications/route.ts
    /analytics/route.ts

/lib
  /supabase
    /client.ts           # Browser client
    /server.ts           # Server client
    /admin.ts            # Service role client
  /validators
    /auth.ts
    /candidate.ts
    /employer.ts
    /jobs.ts
    /tests.ts
  /services
    /auth.service.ts
    /candidate.service.ts
    /employer.service.ts
    /job.service.ts
    /match.service.ts
    /test.service.ts
    /notification.service.ts
    /email.service.ts
  /utils
    /api-response.ts
    /errors.ts
    /rate-limit.ts
    /cache.ts
  /types
    /database.ts         # Generated from Supabase
    /api.ts
  /constants
    /index.ts

/scripts
  /seed-skills.ts        # Seed skill categories en skills
  /seed-questions.ts     # Seed test vragen
  /calculate-matches.ts  # Batch match berekeningen
```

---

## 3. Database Schema

### 3.1 Complete SQL Schema

```sql
-- ============================================
-- EXTENSIONS
-- ============================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";  -- Voor fuzzy search

-- ============================================
-- ENUMS
-- ============================================
CREATE TYPE user_type AS ENUM ('candidate', 'employer');
CREATE TYPE work_type AS ENUM ('fulltime', 'parttime', 'freelance', 'internship');
CREATE TYPE remote_preference AS ENUM ('onsite', 'hybrid', 'remote', 'flexible');
CREATE TYPE experience_level AS ENUM ('junior', 'medior', 'senior');
CREATE TYPE company_size AS ENUM ('1-10', '11-50', '51-200', '201-500', '500+');
CREATE TYPE work_environment AS ENUM ('formal', 'casual', 'startup', 'corporate');
CREATE TYPE job_status AS ENUM ('draft', 'active', 'paused', 'closed');
CREATE TYPE salary_type AS ENUM ('yearly', 'monthly', 'hourly');
CREATE TYPE question_type AS ENUM ('multiple_choice', 'scenario', 'self_assessment');
CREATE TYPE notification_type AS ENUM ('new_match', 'mutual_match', 'new_message', 'profile_view', 'test_reminder', 'job_alert');

-- ============================================
-- USERS & AUTHENTICATION
-- ============================================

-- Basis gebruikers tabel (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  user_type user_type NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

-- Index voor snelle lookups
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_type ON public.users(user_type);

-- ============================================
-- CANDIDATE PROFILES
-- ============================================

CREATE TABLE public.candidate_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  
  -- Persoonlijke info
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  date_of_birth DATE,
  
  -- Locatie
  street_address VARCHAR(255),
  city VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100) DEFAULT 'België',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Profiel
  bio TEXT,
  avatar_url VARCHAR(500),
  cv_url VARCHAR(500),
  linkedin_url VARCHAR(255),
  portfolio_url VARCHAR(255),
  
  -- Voorkeuren
  desired_salary_min INTEGER,
  desired_salary_max INTEGER,
  desired_salary_type salary_type DEFAULT 'monthly',
  work_types work_type[] DEFAULT '{}',
  remote_preference remote_preference,
  willing_to_relocate BOOLEAN DEFAULT FALSE,
  max_commute_km INTEGER,
  available_from DATE,
  
  -- MBTI Resultaten
  mbti_type VARCHAR(4),
  mbti_percentages JSONB,
  mbti_completed_at TIMESTAMPTZ,
  
  -- Meta
  profile_completeness INTEGER DEFAULT 0,
  is_searchable BOOLEAN DEFAULT TRUE,  -- Zichtbaar voor werkgevers
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_candidate_user ON public.candidate_profiles(user_id);
CREATE INDEX idx_candidate_location ON public.candidate_profiles(city);
CREATE INDEX idx_candidate_mbti ON public.candidate_profiles(mbti_type);
CREATE INDEX idx_candidate_searchable ON public.candidate_profiles(is_searchable) WHERE is_searchable = TRUE;

-- Full text search index
CREATE INDEX idx_candidate_search ON public.candidate_profiles 
  USING GIN (to_tsvector('dutch', COALESCE(first_name, '') || ' ' || COALESCE(last_name, '') || ' ' || COALESCE(bio, '')));

-- ============================================
-- EMPLOYER PROFILES
-- ============================================

CREATE TABLE public.employer_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  
  -- Bedrijfsinfo
  company_name VARCHAR(255) NOT NULL,
  company_logo_url VARCHAR(500),
  kvk_number VARCHAR(20),  -- KBO nummer in België
  btw_number VARCHAR(20),
  
  -- Contact
  contact_person_name VARCHAR(200),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(20),
  
  -- Locatie
  street_address VARCHAR(255),
  city VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100) DEFAULT 'België',
  
  -- Bedrijfsdetails
  company_size company_size,
  industry VARCHAR(100),
  founded_year INTEGER,
  website VARCHAR(255),
  linkedin_url VARCHAR(255),
  description TEXT,
  
  -- Cultuur (voor matching)
  culture_values TEXT[],
  work_environment work_environment,
  benefits TEXT[],
  
  -- Status
  is_verified BOOLEAN DEFAULT FALSE,
  verification_documents JSONB,
  
  -- Abonnement (voor toekomstige monetisatie)
  subscription_tier VARCHAR(50) DEFAULT 'free',
  subscription_expires_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_employer_user ON public.employer_profiles(user_id);
CREATE INDEX idx_employer_company ON public.employer_profiles(company_name);
CREATE INDEX idx_employer_industry ON public.employer_profiles(industry);
CREATE INDEX idx_employer_verified ON public.employer_profiles(is_verified);

-- Full text search
CREATE INDEX idx_employer_search ON public.employer_profiles 
  USING GIN (to_tsvector('dutch', COALESCE(company_name, '') || ' ' || COALESCE(description, '')));

-- ============================================
-- SKILLS SYSTEEM
-- ============================================

-- Skill categorieën
CREATE TABLE public.skill_categories (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  color VARCHAR(7) NOT NULL,  -- Hex color
  icon VARCHAR(50) NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Skills master lijst
CREATE TABLE public.skills (
  id VARCHAR(50) PRIMARY KEY,
  category_id VARCHAR(50) NOT NULL REFERENCES public.skill_categories(id),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  aliases TEXT[],  -- Alternatieve namen voor search
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_skills_category ON public.skills(category_id);
CREATE INDEX idx_skills_search ON public.skills USING GIN (to_tsvector('simple', name || ' ' || COALESCE(array_to_string(aliases, ' '), '')));

-- Kandidaat skills (geselecteerde skills)
CREATE TABLE public.candidate_skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id UUID NOT NULL REFERENCES public.candidate_profiles(id) ON DELETE CASCADE,
  skill_id VARCHAR(50) NOT NULL REFERENCES public.skills(id),
  
  -- Matching preference
  use_for_matching BOOLEAN DEFAULT TRUE,
  
  -- Test resultaten
  is_tested BOOLEAN DEFAULT FALSE,
  test_score INTEGER CHECK (test_score >= 0 AND test_score <= 100),
  skill_level experience_level,
  tested_at TIMESTAMPTZ,
  test_attempts INTEGER DEFAULT 0,
  
  -- Zelf-opgegeven ervaring (jaren)
  self_reported_years DECIMAL(3,1),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(candidate_id, skill_id)
);

CREATE INDEX idx_candidate_skills_candidate ON public.candidate_skills(candidate_id);
CREATE INDEX idx_candidate_skills_skill ON public.candidate_skills(skill_id);
CREATE INDEX idx_candidate_skills_matching ON public.candidate_skills(use_for_matching) WHERE use_for_matching = TRUE;
CREATE INDEX idx_candidate_skills_level ON public.candidate_skills(skill_level);

-- ============================================
-- SKILL TEST VRAGEN
-- ============================================

CREATE TABLE public.skill_questions (
  id SERIAL PRIMARY KEY,
  skill_id VARCHAR(50) NOT NULL REFERENCES public.skills(id),
  question_text TEXT NOT NULL,
  question_type question_type NOT NULL,
  difficulty experience_level NOT NULL,
  options JSONB NOT NULL,  -- [{text: "...", points: 4, isCorrect: true/false}]
  explanation TEXT,  -- Uitleg na beantwoording (optioneel)
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_questions_skill ON public.skill_questions(skill_id);
CREATE INDEX idx_questions_difficulty ON public.skill_questions(difficulty);
CREATE INDEX idx_questions_active ON public.skill_questions(is_active) WHERE is_active = TRUE;

-- Kandidaat test antwoorden (voor analyse en herkansing beperking)
CREATE TABLE public.candidate_test_answers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id UUID NOT NULL REFERENCES public.candidate_profiles(id) ON DELETE CASCADE,
  skill_id VARCHAR(50) NOT NULL REFERENCES public.skills(id),
  question_id INTEGER NOT NULL REFERENCES public.skill_questions(id),
  test_session_id UUID NOT NULL,  -- Groepeert antwoorden per test poging
  selected_option_index INTEGER NOT NULL,
  points_earned INTEGER NOT NULL,
  time_spent_seconds INTEGER,
  answered_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_answers_candidate ON public.candidate_test_answers(candidate_id);
CREATE INDEX idx_answers_session ON public.candidate_test_answers(test_session_id);

-- ============================================
-- MBTI TEST VRAGEN
-- ============================================

CREATE TABLE public.mbti_questions (
  id SERIAL PRIMARY KEY,
  dimension VARCHAR(2) NOT NULL CHECK (dimension IN ('EI', 'SN', 'TF', 'JP')),
  question_text TEXT NOT NULL,
  option_a_text TEXT NOT NULL,  -- Linkerkant van spectrum
  option_b_text TEXT NOT NULL,  -- Rechterkant van spectrum
  option_a_dimension CHAR(1) NOT NULL,  -- E, S, T, of J
  option_b_dimension CHAR(1) NOT NULL,  -- I, N, F, of P
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_mbti_dimension ON public.mbti_questions(dimension);

-- ============================================
-- JOBS
-- ============================================

CREATE TABLE public.jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employer_id UUID NOT NULL REFERENCES public.employer_profiles(id) ON DELETE CASCADE,
  
  -- Basis info
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(300) UNIQUE,  -- URL-friendly versie
  description TEXT NOT NULL,
  responsibilities TEXT,
  requirements TEXT,
  nice_to_have TEXT,
  
  -- Locatie
  location_city VARCHAR(100),
  location_country VARCHAR(100) DEFAULT 'België',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Job details
  work_type work_type NOT NULL,
  remote_option remote_preference NOT NULL,
  experience_level experience_level NOT NULL,
  
  -- Salaris
  salary_min INTEGER,
  salary_max INTEGER,
  salary_type salary_type DEFAULT 'monthly',
  show_salary BOOLEAN DEFAULT TRUE,
  
  -- Extra's
  benefits TEXT[],
  
  -- Matching preferences
  preferred_mbti VARCHAR(4)[],
  min_match_score INTEGER DEFAULT 0,  -- Minimum score om te tonen
  
  -- Status & meta
  status job_status DEFAULT 'draft',
  views_count INTEGER DEFAULT 0,
  applications_count INTEGER DEFAULT 0,
  
  -- Publicatie
  published_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_jobs_employer ON public.jobs(employer_id);
CREATE INDEX idx_jobs_status ON public.jobs(status);
CREATE INDEX idx_jobs_location ON public.jobs(location_city);
CREATE INDEX idx_jobs_experience ON public.jobs(experience_level);
CREATE INDEX idx_jobs_work_type ON public.jobs(work_type);
CREATE INDEX idx_jobs_active ON public.jobs(status, expires_at) WHERE status = 'active';

-- Full text search
CREATE INDEX idx_jobs_search ON public.jobs 
  USING GIN (to_tsvector('dutch', COALESCE(title, '') || ' ' || COALESCE(description, '')));

-- Slug generation trigger
CREATE OR REPLACE FUNCTION generate_job_slug()
RETURNS TRIGGER AS $$
BEGIN
  NEW.slug := LOWER(REGEXP_REPLACE(NEW.title, '[^a-zA-Z0-9]+', '-', 'g')) || '-' || SUBSTRING(NEW.id::TEXT, 1, 8);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_job_slug
  BEFORE INSERT ON public.jobs
  FOR EACH ROW
  EXECUTE FUNCTION generate_job_slug();

-- ============================================
-- JOB SKILLS (Vereiste skills per job)
-- ============================================

CREATE TABLE public.job_skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  skill_id VARCHAR(50) NOT NULL REFERENCES public.skills(id),
  
  required_level experience_level NOT NULL,
  is_required BOOLEAN DEFAULT TRUE,  -- Required vs nice-to-have
  weight INTEGER DEFAULT 1 CHECK (weight >= 1 AND weight <= 5),  -- Belangrijkheid
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(job_id, skill_id)
);

CREATE INDEX idx_job_skills_job ON public.job_skills(job_id);
CREATE INDEX idx_job_skills_skill ON public.job_skills(skill_id);

-- ============================================
-- MATCHES
-- ============================================

CREATE TABLE public.matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id UUID NOT NULL REFERENCES public.candidate_profiles(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  
  -- Scores
  overall_score INTEGER NOT NULL CHECK (overall_score >= 0 AND overall_score <= 100),
  skills_score INTEGER NOT NULL CHECK (skills_score >= 0 AND skills_score <= 100),
  personality_score INTEGER NOT NULL CHECK (personality_score >= 0 AND personality_score <= 100),
  preferences_score INTEGER NOT NULL CHECK (preferences_score >= 0 AND preferences_score <= 100),
  
  -- Gedetailleerde breakdown
  score_breakdown JSONB NOT NULL,
  
  -- Interest status
  candidate_interested BOOLEAN DEFAULT FALSE,
  employer_interested BOOLEAN DEFAULT FALSE,
  is_mutual_match BOOLEAN DEFAULT FALSE,
  
  -- Timestamps
  candidate_interested_at TIMESTAMPTZ,
  employer_interested_at TIMESTAMPTZ,
  mutual_match_at TIMESTAMPTZ,
  
  -- Candidate heeft job gezien
  candidate_viewed_at TIMESTAMPTZ,
  -- Employer heeft kandidaat gezien
  employer_viewed_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(candidate_id, job_id)
);

-- Indexes
CREATE INDEX idx_matches_candidate ON public.matches(candidate_id);
CREATE INDEX idx_matches_job ON public.matches(job_id);
CREATE INDEX idx_matches_score ON public.matches(overall_score DESC);
CREATE INDEX idx_matches_mutual ON public.matches(is_mutual_match) WHERE is_mutual_match = TRUE;
CREATE INDEX idx_matches_candidate_interested ON public.matches(candidate_id, candidate_interested) WHERE candidate_interested = TRUE;
CREATE INDEX idx_matches_employer_interested ON public.matches(job_id, employer_interested) WHERE employer_interested = TRUE;

-- Trigger voor mutual match
CREATE OR REPLACE FUNCTION check_mutual_match()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.candidate_interested = TRUE AND NEW.employer_interested = TRUE AND OLD.is_mutual_match = FALSE THEN
    NEW.is_mutual_match := TRUE;
    NEW.mutual_match_at := NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_mutual_match
  BEFORE UPDATE ON public.matches
  FOR EACH ROW
  EXECUTE FUNCTION check_mutual_match();

-- ============================================
-- MESSAGES (alleen bij mutual match)
-- ============================================

CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id UUID NOT NULL REFERENCES public.matches(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.users(id),
  
  message_text TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ,
  
  -- Attachments (optioneel)
  attachments JSONB,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_messages_match ON public.messages(match_id);
CREATE INDEX idx_messages_sender ON public.messages(sender_id);
CREATE INDEX idx_messages_unread ON public.messages(match_id, is_read) WHERE is_read = FALSE;

-- ============================================
-- EDUCATION & EXPERIENCE
-- ============================================

CREATE TABLE public.candidate_education (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id UUID NOT NULL REFERENCES public.candidate_profiles(id) ON DELETE CASCADE,
  
  institution_name VARCHAR(255) NOT NULL,
  degree VARCHAR(255),
  field_of_study VARCHAR(255),
  description TEXT,
  
  start_date DATE,
  end_date DATE,
  is_current BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_education_candidate ON public.candidate_education(candidate_id);

CREATE TABLE public.candidate_experience (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id UUID NOT NULL REFERENCES public.candidate_profiles(id) ON DELETE CASCADE,
  
  company_name VARCHAR(255) NOT NULL,
  job_title VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  
  start_date DATE,
  end_date DATE,
  is_current BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_experience_candidate ON public.candidate_experience(candidate_id);

-- ============================================
-- NOTIFICATIONS
-- ============================================

CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  
  type notification_type NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT,
  
  -- Referentie data
  data JSONB,  -- {job_id: "...", match_id: "...", candidate_id: "..."}
  
  -- Status
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ,
  
  -- Email verstuurd?
  email_sent BOOLEAN DEFAULT FALSE,
  email_sent_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON public.notifications(user_id);
CREATE INDEX idx_notifications_unread ON public.notifications(user_id, is_read) WHERE is_read = FALSE;
CREATE INDEX idx_notifications_type ON public.notifications(type);

-- ============================================
-- SAVED JOBS & CANDIDATES
-- ============================================

CREATE TABLE public.saved_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id UUID NOT NULL REFERENCES public.candidate_profiles(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(candidate_id, job_id)
);

CREATE TABLE public.saved_candidates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employer_id UUID NOT NULL REFERENCES public.employer_profiles(id) ON DELETE CASCADE,
  candidate_id UUID NOT NULL REFERENCES public.candidate_profiles(id) ON DELETE CASCADE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(employer_id, candidate_id)
);

-- ============================================
-- ACTIVITY LOG
-- ============================================

CREATE TABLE public.activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  
  action VARCHAR(50) NOT NULL,
  entity_type VARCHAR(50),
  entity_id UUID,
  
  metadata JSONB,
  ip_address INET,
  user_agent TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_activity_user ON public.activity_log(user_id);
CREATE INDEX idx_activity_action ON public.activity_log(action);
CREATE INDEX idx_activity_entity ON public.activity_log(entity_type, entity_id);
CREATE INDEX idx_activity_date ON public.activity_log(created_at DESC);

-- Partitioning voor activity_log (optioneel, voor grote datasets)
-- CREATE INDEX idx_activity_date ON public.activity_log(created_at DESC);

-- ============================================
-- VIEWS
-- ============================================

-- View voor kandidaat zoekresultaten (werkgevers)
CREATE VIEW public.candidate_search_view AS
SELECT 
  cp.id,
  cp.user_id,
  cp.first_name,
  cp.last_name,
  cp.city,
  cp.avatar_url,
  cp.bio,
  cp.mbti_type,
  cp.work_types,
  cp.remote_preference,
  cp.desired_salary_min,
  cp.desired_salary_max,
  cp.available_from,
  cp.profile_completeness,
  cp.created_at,
  COALESCE(
    (SELECT json_agg(json_build_object(
      'skill_id', cs.skill_id,
      'skill_name', s.name,
      'category_id', s.category_id,
      'category_color', sc.color,
      'skill_level', cs.skill_level,
      'is_tested', cs.is_tested
    ))
    FROM public.candidate_skills cs
    JOIN public.skills s ON s.id = cs.skill_id
    JOIN public.skill_categories sc ON sc.id = s.category_id
    WHERE cs.candidate_id = cp.id AND cs.use_for_matching = TRUE),
    '[]'
  ) AS skills
FROM public.candidate_profiles cp
WHERE cp.is_searchable = TRUE;

-- View voor job zoekresultaten (kandidaten)
CREATE VIEW public.job_search_view AS
SELECT 
  j.id,
  j.employer_id,
  j.title,
  j.slug,
  j.description,
  j.location_city,
  j.work_type,
  j.remote_option,
  j.experience_level,
  j.salary_min,
  j.salary_max,
  j.salary_type,
  j.show_salary,
  j.status,
  j.published_at,
  j.expires_at,
  ep.company_name,
  ep.company_logo_url,
  ep.industry,
  COALESCE(
    (SELECT json_agg(json_build_object(
      'skill_id', js.skill_id,
      'skill_name', s.name,
      'category_color', sc.color,
      'required_level', js.required_level,
      'is_required', js.is_required,
      'weight', js.weight
    ))
    FROM public.job_skills js
    JOIN public.skills s ON s.id = js.skill_id
    JOIN public.skill_categories sc ON sc.id = s.category_id
    WHERE js.job_id = j.id),
    '[]'
  ) AS required_skills
FROM public.jobs j
JOIN public.employer_profiles ep ON ep.id = j.employer_id
WHERE j.status = 'active' 
  AND (j.expires_at IS NULL OR j.expires_at > NOW());

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_test_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_candidates ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own data" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Candidate profiles policies
CREATE POLICY "Candidates can view own profile" ON public.candidate_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Candidates can update own profile" ON public.candidate_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Candidates can insert own profile" ON public.candidate_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Employers can view searchable candidates" ON public.candidate_profiles
  FOR SELECT USING (
    is_searchable = TRUE 
    AND EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND user_type = 'employer'
    )
  );

-- Employer profiles policies
CREATE POLICY "Employers can view own profile" ON public.employer_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Employers can update own profile" ON public.employer_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Employers can insert own profile" ON public.employer_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Everyone can view employer profiles" ON public.employer_profiles
  FOR SELECT USING (TRUE);

-- Jobs policies
CREATE POLICY "Employers can manage own jobs" ON public.jobs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.employer_profiles 
      WHERE id = employer_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Everyone can view active jobs" ON public.jobs
  FOR SELECT USING (status = 'active');

-- Matches policies
CREATE POLICY "Candidates can view own matches" ON public.matches
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.candidate_profiles 
      WHERE id = candidate_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Employers can view matches for own jobs" ON public.matches
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.jobs j
      JOIN public.employer_profiles ep ON ep.id = j.employer_id
      WHERE j.id = job_id AND ep.user_id = auth.uid()
    )
  );

-- Messages policies  
CREATE POLICY "Users can view messages in their matches" ON public.messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.matches m
      WHERE m.id = match_id 
        AND m.is_mutual_match = TRUE
        AND (
          EXISTS (SELECT 1 FROM public.candidate_profiles WHERE id = m.candidate_id AND user_id = auth.uid())
          OR EXISTS (
            SELECT 1 FROM public.jobs j
            JOIN public.employer_profiles ep ON ep.id = j.employer_id
            WHERE j.id = m.job_id AND ep.user_id = auth.uid()
          )
        )
    )
  );

CREATE POLICY "Users can send messages in their mutual matches" ON public.messages
  FOR INSERT WITH CHECK (
    sender_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.matches m
      WHERE m.id = match_id AND m.is_mutual_match = TRUE
    )
  );

-- Notifications policies
CREATE POLICY "Users can view own notifications" ON public.notifications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications" ON public.notifications
  FOR UPDATE USING (user_id = auth.uid());

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to relevant tables
CREATE TRIGGER trigger_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trigger_candidate_updated_at BEFORE UPDATE ON public.candidate_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trigger_employer_updated_at BEFORE UPDATE ON public.employer_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trigger_jobs_updated_at BEFORE UPDATE ON public.jobs FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trigger_matches_updated_at BEFORE UPDATE ON public.matches FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Calculate profile completeness
CREATE OR REPLACE FUNCTION calculate_profile_completeness(p_candidate_id UUID)
RETURNS INTEGER AS $$
DECLARE
  completeness INTEGER := 0;
  v_profile RECORD;
  v_skills_count INTEGER;
  v_education_count INTEGER;
  v_experience_count INTEGER;
BEGIN
  SELECT * INTO v_profile FROM public.candidate_profiles WHERE id = p_candidate_id;
  
  IF v_profile IS NULL THEN RETURN 0; END IF;
  
  -- Basis info (30%)
  IF v_profile.first_name IS NOT NULL THEN completeness := completeness + 5; END IF;
  IF v_profile.last_name IS NOT NULL THEN completeness := completeness + 5; END IF;
  IF v_profile.phone IS NOT NULL THEN completeness := completeness + 5; END IF;
  IF v_profile.city IS NOT NULL THEN completeness := completeness + 5; END IF;
  IF v_profile.bio IS NOT NULL AND LENGTH(v_profile.bio) > 50 THEN completeness := completeness + 10; END IF;
  
  -- Avatar (10%)
  IF v_profile.avatar_url IS NOT NULL THEN completeness := completeness + 10; END IF;
  
  -- Skills (20%)
  SELECT COUNT(*) INTO v_skills_count FROM public.candidate_skills WHERE candidate_id = p_candidate_id;
  IF v_skills_count >= 5 THEN completeness := completeness + 20;
  ELSIF v_skills_count >= 3 THEN completeness := completeness + 15;
  ELSIF v_skills_count >= 1 THEN completeness := completeness + 10;
  END IF;
  
  -- MBTI (15%)
  IF v_profile.mbti_type IS NOT NULL THEN completeness := completeness + 15; END IF;
  
  -- Education (10%)
  SELECT COUNT(*) INTO v_education_count FROM public.candidate_education WHERE candidate_id = p_candidate_id;
  IF v_education_count >= 1 THEN completeness := completeness + 10; END IF;
  
  -- Experience (10%)
  SELECT COUNT(*) INTO v_experience_count FROM public.candidate_experience WHERE candidate_id = p_candidate_id;
  IF v_experience_count >= 1 THEN completeness := completeness + 10; END IF;
  
  -- Voorkeuren (5%)
  IF v_profile.work_types IS NOT NULL AND array_length(v_profile.work_types, 1) > 0 THEN 
    completeness := completeness + 5; 
  END IF;
  
  RETURN LEAST(completeness, 100);
END;
$$ LANGUAGE plpgsql;

-- Trigger to update profile completeness
CREATE OR REPLACE FUNCTION trigger_update_profile_completeness()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.candidate_profiles 
  SET profile_completeness = calculate_profile_completeness(NEW.candidate_id)
  WHERE id = NEW.candidate_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_skills_completeness 
  AFTER INSERT OR DELETE ON public.candidate_skills 
  FOR EACH ROW EXECUTE FUNCTION trigger_update_profile_completeness();
```

---

## 4. API Endpoints

### 4.1 Authentication

#### POST /api/auth/register

```typescript
// Request
interface RegisterRequest {
  email: string;
  password: string;
  userType: 'candidate' | 'employer';
  // Candidate specific
  firstName?: string;
  lastName?: string;
  // Employer specific
  companyName?: string;
}

// Response
interface RegisterResponse {
  success: boolean;
  user: {
    id: string;
    email: string;
    userType: string;
  };
  message: string;
}

// Implementation
export async function POST(request: Request) {
  const body = await request.json();
  
  // Validate
  const validated = registerSchema.parse(body);
  
  // Create user in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: validated.email,
    password: validated.password,
    options: {
      data: {
        user_type: validated.userType,
      },
    },
  });
  
  if (authError) throw new ApiError(400, authError.message);
  
  // Create user record
  const { error: userError } = await supabaseAdmin
    .from('users')
    .insert({
      id: authData.user!.id,
      email: validated.email,
      user_type: validated.userType,
    });
  
  if (userError) throw new ApiError(500, 'Failed to create user record');
  
  // Create profile based on user type
  if (validated.userType === 'candidate') {
    await supabaseAdmin.from('candidate_profiles').insert({
      user_id: authData.user!.id,
      first_name: validated.firstName,
      last_name: validated.lastName,
    });
  } else {
    await supabaseAdmin.from('employer_profiles').insert({
      user_id: authData.user!.id,
      company_name: validated.companyName,
    });
  }
  
  // Send verification email
  await emailService.sendVerificationEmail(validated.email);
  
  return Response.json({
    success: true,
    user: {
      id: authData.user!.id,
      email: validated.email,
      userType: validated.userType,
    },
    message: 'Registratie succesvol. Controleer je email voor verificatie.',
  });
}
```

#### POST /api/auth/login

```typescript
// Request
interface LoginRequest {
  email: string;
  password: string;
}

// Response
interface LoginResponse {
  success: boolean;
  user: User;
  session: {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
  };
}

// Implementation
export async function POST(request: Request) {
  const body = await request.json();
  const validated = loginSchema.parse(body);
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email: validated.email,
    password: validated.password,
  });
  
  if (error) {
    throw new ApiError(401, 'Ongeldige inloggegevens');
  }
  
  // Update last login
  await supabaseAdmin
    .from('users')
    .update({ last_login: new Date().toISOString() })
    .eq('id', data.user.id);
  
  // Get full user with profile
  const user = await userService.getUserWithProfile(data.user.id);
  
  return Response.json({
    success: true,
    user,
    session: {
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
      expiresAt: data.session.expires_at,
    },
  });
}
```

### 4.2 Candidate Profile

#### GET /api/candidate/profile

```typescript
// Response
interface CandidateProfileResponse {
  profile: CandidateProfile;
  skills: CandidateSkill[];
  education: Education[];
  experience: Experience[];
  completeness: number;
}

// Implementation
export async function GET(request: Request) {
  const user = await requireAuth(request, 'candidate');
  
  const [profile, skills, education, experience] = await Promise.all([
    candidateService.getProfile(user.id),
    candidateService.getSkills(user.candidateProfileId),
    candidateService.getEducation(user.candidateProfileId),
    candidateService.getExperience(user.candidateProfileId),
  ]);
  
  return Response.json({
    profile,
    skills,
    education,
    experience,
    completeness: profile.profile_completeness,
  });
}
```

#### PUT /api/candidate/profile

```typescript
// Request
interface UpdateCandidateProfileRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  city?: string;
  bio?: string;
  desiredSalaryMin?: number;
  desiredSalaryMax?: number;
  workTypes?: WorkType[];
  remotePreference?: RemotePreference;
  availableFrom?: string;
  isSearchable?: boolean;
}

// Implementation
export async function PUT(request: Request) {
  const user = await requireAuth(request, 'candidate');
  const body = await request.json();
  const validated = updateCandidateProfileSchema.parse(body);
  
  const { data, error } = await supabase
    .from('candidate_profiles')
    .update({
      first_name: validated.firstName,
      last_name: validated.lastName,
      phone: validated.phone,
      city: validated.city,
      bio: validated.bio,
      desired_salary_min: validated.desiredSalaryMin,
      desired_salary_max: validated.desiredSalaryMax,
      work_types: validated.workTypes,
      remote_preference: validated.remotePreference,
      available_from: validated.availableFrom,
      is_searchable: validated.isSearchable,
    })
    .eq('user_id', user.id)
    .select()
    .single();
  
  if (error) throw new ApiError(500, 'Profiel kon niet worden bijgewerkt');
  
  // Recalculate profile completeness
  await supabaseAdmin.rpc('calculate_profile_completeness', {
    p_candidate_id: data.id,
  });
  
  // Recalculate matches if searchable changed
  if (validated.isSearchable !== undefined) {
    await matchService.queueMatchRecalculation(data.id);
  }
  
  return Response.json({ success: true, profile: data });
}
```

#### POST /api/candidate/skills

```typescript
// Request
interface UpdateSkillsRequest {
  skills: {
    skillId: string;
    useForMatching: boolean;
  }[];
}

// Implementation
export async function POST(request: Request) {
  const user = await requireAuth(request, 'candidate');
  const body = await request.json();
  const validated = updateSkillsSchema.parse(body);
  
  const candidateId = user.candidateProfileId;
  
  // Get current skills
  const { data: currentSkills } = await supabase
    .from('candidate_skills')
    .select('skill_id')
    .eq('candidate_id', candidateId);
  
  const currentSkillIds = currentSkills?.map(s => s.skill_id) || [];
  const newSkillIds = validated.skills.map(s => s.skillId);
  
  // Skills to remove
  const toRemove = currentSkillIds.filter(id => !newSkillIds.includes(id));
  
  // Skills to add
  const toAdd = validated.skills.filter(s => !currentSkillIds.includes(s.skillId));
  
  // Skills to update
  const toUpdate = validated.skills.filter(s => currentSkillIds.includes(s.skillId));
  
  // Execute in transaction
  await supabaseAdmin.rpc('update_candidate_skills', {
    p_candidate_id: candidateId,
    p_remove: toRemove,
    p_add: toAdd.map(s => ({ skill_id: s.skillId, use_for_matching: s.useForMatching })),
    p_update: toUpdate.map(s => ({ skill_id: s.skillId, use_for_matching: s.useForMatching })),
  });
  
  // Queue match recalculation
  await matchService.queueMatchRecalculation(candidateId);
  
  return Response.json({ success: true });
}
```

### 4.3 Skill Tests

#### GET /api/tests/skills/[skillId]/questions

```typescript
// Response
interface SkillQuestionsResponse {
  skill: {
    id: string;
    name: string;
    categoryName: string;
    categoryColor: string;
  };
  questions: {
    id: number;
    questionText: string;
    questionType: QuestionType;
    difficulty: ExperienceLevel;
    options: {
      text: string;
      // Points zijn verborgen voor de client
    }[];
  }[];
  previousAttempt?: {
    score: number;
    level: ExperienceLevel;
    testedAt: string;
  };
}

// Implementation
export async function GET(
  request: Request,
  { params }: { params: { skillId: string } }
) {
  const user = await requireAuth(request, 'candidate');
  const { skillId } = params;
  
  // Get skill info
  const skill = await supabase
    .from('skills')
    .select(`
      id,
      name,
      skill_categories (
        name,
        color
      )
    `)
    .eq('id', skillId)
    .single();
  
  if (!skill.data) throw new ApiError(404, 'Skill niet gevonden');
  
  // Get questions (random selection, mix of difficulties)
  const questions = await supabase
    .from('skill_questions')
    .select('id, question_text, question_type, difficulty, options')
    .eq('skill_id', skillId)
    .eq('is_active', true);
  
  // Select 4-6 questions with balanced difficulty
  const selectedQuestions = selectBalancedQuestions(questions.data, {
    junior: 2,
    medior: 2,
    senior: 2,
  });
  
  // Remove points from options (hide from client)
  const sanitizedQuestions = selectedQuestions.map(q => ({
    ...q,
    options: q.options.map((o: any) => ({ text: o.text })),
  }));
  
  // Get previous attempt
  const previousAttempt = await supabase
    .from('candidate_skills')
    .select('test_score, skill_level, tested_at')
    .eq('candidate_id', user.candidateProfileId)
    .eq('skill_id', skillId)
    .eq('is_tested', true)
    .single();
  
  return Response.json({
    skill: {
      id: skill.data.id,
      name: skill.data.name,
      categoryName: skill.data.skill_categories.name,
      categoryColor: skill.data.skill_categories.color,
    },
    questions: sanitizedQuestions,
    previousAttempt: previousAttempt.data ? {
      score: previousAttempt.data.test_score,
      level: previousAttempt.data.skill_level,
      testedAt: previousAttempt.data.tested_at,
    } : undefined,
  });
}
```

#### POST /api/tests/skills/[skillId]/submit

```typescript
// Request
interface SubmitSkillTestRequest {
  answers: {
    questionId: number;
    selectedOptionIndex: number;
    timeSpentSeconds?: number;
  }[];
}

// Response
interface SubmitSkillTestResponse {
  success: boolean;
  result: {
    score: number;  // 0-100
    level: ExperienceLevel;
    breakdown: {
      questionId: number;
      correct: boolean;
      pointsEarned: number;
      maxPoints: number;
    }[];
  };
}

// Implementation
export async function POST(
  request: Request,
  { params }: { params: { skillId: string } }
) {
  const user = await requireAuth(request, 'candidate');
  const { skillId } = params;
  const body = await request.json();
  const validated = submitSkillTestSchema.parse(body);
  
  const candidateId = user.candidateProfileId;
  const testSessionId = crypto.randomUUID();
  
  // Get questions with correct answers
  const questionIds = validated.answers.map(a => a.questionId);
  const { data: questions } = await supabase
    .from('skill_questions')
    .select('id, options, difficulty')
    .in('id', questionIds);
  
  if (!questions || questions.length !== validated.answers.length) {
    throw new ApiError(400, 'Ongeldige vragen');
  }
  
  // Calculate score
  let totalPoints = 0;
  let maxPoints = 0;
  const breakdown: any[] = [];
  const answersToInsert: any[] = [];
  
  for (const answer of validated.answers) {
    const question = questions.find(q => q.id === answer.questionId);
    if (!question) continue;
    
    const selectedOption = question.options[answer.selectedOptionIndex];
    const pointsEarned = selectedOption?.points || 0;
    const questionMaxPoints = Math.max(...question.options.map((o: any) => o.points));
    
    totalPoints += pointsEarned;
    maxPoints += questionMaxPoints;
    
    breakdown.push({
      questionId: question.id,
      correct: pointsEarned === questionMaxPoints,
      pointsEarned,
      maxPoints: questionMaxPoints,
    });
    
    answersToInsert.push({
      candidate_id: candidateId,
      skill_id: skillId,
      question_id: question.id,
      test_session_id: testSessionId,
      selected_option_index: answer.selectedOptionIndex,
      points_earned: pointsEarned,
      time_spent_seconds: answer.timeSpentSeconds,
    });
  }
  
  // Calculate percentage and level
  const scorePercentage = Math.round((totalPoints / maxPoints) * 100);
  const level = calculateSkillLevel(scorePercentage);
  
  // Save answers
  await supabaseAdmin.from('candidate_test_answers').insert(answersToInsert);
  
  // Update candidate skill
  await supabaseAdmin
    .from('candidate_skills')
    .upsert({
      candidate_id: candidateId,
      skill_id: skillId,
      is_tested: true,
      test_score: scorePercentage,
      skill_level: level,
      tested_at: new Date().toISOString(),
      test_attempts: supabase.sql`test_attempts + 1`,
    }, {
      onConflict: 'candidate_id,skill_id',
    });
  
  // Queue match recalculation
  await matchService.queueMatchRecalculation(candidateId);
  
  // Log activity
  await logActivity(user.id, 'skill_test_completed', 'skill', skillId, {
    score: scorePercentage,
    level,
  });
  
  return Response.json({
    success: true,
    result: {
      score: scorePercentage,
      level,
      breakdown,
    },
  });
}

// Helper function
function calculateSkillLevel(score: number): ExperienceLevel {
  if (score >= 80) return 'senior';
  if (score >= 55) return 'medior';
  return 'junior';
}
```

### 4.4 Jobs

#### GET /api/jobs

```typescript
// Query parameters
interface JobSearchParams {
  q?: string;              // Zoekterm
  skills?: string;         // Comma-separated skill IDs
  location?: string;
  workType?: WorkType;
  remote?: RemotePreference;
  experienceLevel?: ExperienceLevel;
  salaryMin?: number;
  salaryMax?: number;
  minScore?: number;       // Minimum match score (alleen voor ingelogde kandidaten)
  page?: number;
  limit?: number;
  sortBy?: 'match' | 'date' | 'salary';
}

// Response
interface JobSearchResponse {
  jobs: {
    id: string;
    title: string;
    slug: string;
    description: string;
    company: {
      name: string;
      logoUrl: string;
      industry: string;
    };
    location: string;
    workType: WorkType;
    remoteOption: RemotePreference;
    experienceLevel: ExperienceLevel;
    salary?: {
      min: number;
      max: number;
      type: SalaryType;
    };
    requiredSkills: {
      skillId: string;
      skillName: string;
      requiredLevel: ExperienceLevel;
      isRequired: boolean;
    }[];
    matchScore?: number;  // Alleen voor ingelogde kandidaten
    publishedAt: string;
  }[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Implementation
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params = parseJobSearchParams(searchParams);
  
  // Check if user is logged in (optional)
  const user = await getOptionalAuth(request);
  const candidateId = user?.candidateProfileId;
  
  // Build query
  let query = supabase
    .from('job_search_view')
    .select('*', { count: 'exact' });
  
  // Apply filters
  if (params.q) {
    query = query.textSearch('title_description', params.q, {
      type: 'websearch',
      config: 'dutch',
    });
  }
  
  if (params.location) {
    query = query.ilike('location_city', `%${params.location}%`);
  }
  
  if (params.workType) {
    query = query.eq('work_type', params.workType);
  }
  
  if (params.remote) {
    query = query.eq('remote_option', params.remote);
  }
  
  if (params.experienceLevel) {
    query = query.eq('experience_level', params.experienceLevel);
  }
  
  if (params.salaryMin) {
    query = query.gte('salary_max', params.salaryMin);
  }
  
  if (params.salaryMax) {
    query = query.lte('salary_min', params.salaryMax);
  }
  
  // Pagination
  const page = params.page || 1;
  const limit = Math.min(params.limit || 20, 50);
  const offset = (page - 1) * limit;
  
  query = query.range(offset, offset + limit - 1);
  
  // Execute query
  const { data: jobs, count, error } = await query;
  
  if (error) throw new ApiError(500, 'Zoeken mislukt');
  
  // Calculate match scores if candidate is logged in
  let jobsWithScores = jobs;
  if (candidateId) {
    jobsWithScores = await Promise.all(
      jobs.map(async (job) => {
        const match = await matchService.getOrCalculateMatch(candidateId, job.id);
        return {
          ...job,
          matchScore: match?.overall_score,
        };
      })
    );
    
    // Filter by minimum score
    if (params.minScore) {
      jobsWithScores = jobsWithScores.filter(
        j => j.matchScore && j.matchScore >= params.minScore!
      );
    }
    
    // Sort by match score if requested
    if (params.sortBy === 'match') {
      jobsWithScores.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    }
  }
  
  // Sort by date or salary
  if (params.sortBy === 'date') {
    jobsWithScores.sort((a, b) => 
      new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    );
  } else if (params.sortBy === 'salary') {
    jobsWithScores.sort((a, b) => (b.salary_max || 0) - (a.salary_max || 0));
  }
  
  // Format response
  const formattedJobs = jobsWithScores.map(formatJobResponse);
  
  return Response.json({
    jobs: formattedJobs,
    pagination: {
      page,
      limit,
      total: count || 0,
      totalPages: Math.ceil((count || 0) / limit),
    },
  });
}
```

#### POST /api/employer/jobs

```typescript
// Request
interface CreateJobRequest {
  title: string;
  description: string;
  responsibilities?: string;
  requirements?: string;
  niceToHave?: string;
  locationCity?: string;
  workType: WorkType;
  remoteOption: RemotePreference;
  experienceLevel: ExperienceLevel;
  salaryMin?: number;
  salaryMax?: number;
  salaryType?: SalaryType;
  showSalary?: boolean;
  benefits?: string[];
  preferredMbti?: string[];
  skills: {
    skillId: string;
    requiredLevel: ExperienceLevel;
    isRequired: boolean;
    weight?: number;
  }[];
  status?: 'draft' | 'active';
}

// Implementation
export async function POST(request: Request) {
  const user = await requireAuth(request, 'employer');
  const body = await request.json();
  const validated = createJobSchema.parse(body);
  
  // Create job
  const { data: job, error: jobError } = await supabase
    .from('jobs')
    .insert({
      employer_id: user.employerProfileId,
      title: validated.title,
      description: validated.description,
      responsibilities: validated.responsibilities,
      requirements: validated.requirements,
      nice_to_have: validated.niceToHave,
      location_city: validated.locationCity,
      work_type: validated.workType,
      remote_option: validated.remoteOption,
      experience_level: validated.experienceLevel,
      salary_min: validated.salaryMin,
      salary_max: validated.salaryMax,
      salary_type: validated.salaryType,
      show_salary: validated.showSalary ?? true,
      benefits: validated.benefits,
      preferred_mbti: validated.preferredMbti,
      status: validated.status || 'draft',
      published_at: validated.status === 'active' ? new Date().toISOString() : null,
      expires_at: validated.status === 'active' 
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()  // 30 dagen
        : null,
    })
    .select()
    .single();
  
  if (jobError) throw new ApiError(500, 'Vacature kon niet worden aangemaakt');
  
  // Add skills
  if (validated.skills.length > 0) {
    const jobSkills = validated.skills.map(s => ({
      job_id: job.id,
      skill_id: s.skillId,
      required_level: s.requiredLevel,
      is_required: s.isRequired,
      weight: s.weight || 1,
    }));
    
    await supabase.from('job_skills').insert(jobSkills);
  }
  
  // Queue match calculations if job is active
  if (job.status === 'active') {
    await matchService.queueJobMatchCalculations(job.id);
  }
  
  // Log activity
  await logActivity(user.id, 'job_created', 'job', job.id);
  
  return Response.json({ success: true, job });
}
```

### 4.5 Matches

#### GET /api/matches

```typescript
// Query parameters
interface MatchesParams {
  type?: 'all' | 'interested' | 'mutual';
  minScore?: number;
  page?: number;
  limit?: number;
}

// Response (voor kandidaat)
interface CandidateMatchesResponse {
  matches: {
    id: string;
    job: {
      id: string;
      title: string;
      company: string;
      companyLogo: string;
      location: string;
    };
    scores: {
      overall: number;
      skills: number;
      personality: number;
      preferences: number;
    };
    status: {
      candidateInterested: boolean;
      employerInterested: boolean;
      isMutual: boolean;
    };
    createdAt: string;
  }[];
  pagination: Pagination;
}

// Implementation (kandidaat)
export async function GET(request: Request) {
  const user = await requireAuth(request);
  const { searchParams } = new URL(request.url);
  const params = parseMatchesParams(searchParams);
  
  if (user.userType === 'candidate') {
    return getCandidateMatches(user.candidateProfileId, params);
  } else {
    return getEmployerMatches(user.employerProfileId, params);
  }
}

async function getCandidateMatches(candidateId: string, params: MatchesParams) {
  let query = supabase
    .from('matches')
    .select(`
      id,
      overall_score,
      skills_score,
      personality_score,
      preferences_score,
      candidate_interested,
      employer_interested,
      is_mutual_match,
      created_at,
      jobs (
        id,
        title,
        location_city,
        employer_profiles (
          company_name,
          company_logo_url
        )
      )
    `, { count: 'exact' })
    .eq('candidate_id', candidateId)
    .order('overall_score', { ascending: false });
  
  // Filter by type
  if (params.type === 'interested') {
    query = query.eq('candidate_interested', true);
  } else if (params.type === 'mutual') {
    query = query.eq('is_mutual_match', true);
  }
  
  // Filter by minimum score
  if (params.minScore) {
    query = query.gte('overall_score', params.minScore);
  }
  
  // Pagination
  const page = params.page || 1;
  const limit = Math.min(params.limit || 20, 50);
  query = query.range((page - 1) * limit, page * limit - 1);
  
  const { data, count, error } = await query;
  
  if (error) throw new ApiError(500, 'Matches ophalen mislukt');
  
  return Response.json({
    matches: data.map(formatCandidateMatch),
    pagination: {
      page,
      limit,
      total: count || 0,
      totalPages: Math.ceil((count || 0) / limit),
    },
  });
}
```

#### POST /api/matches/[id]/interest

```typescript
// Implementation
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await requireAuth(request);
  const { id: matchId } = params;
  
  // Get match
  const { data: match, error } = await supabase
    .from('matches')
    .select('*, jobs(*)')
    .eq('id', matchId)
    .single();
  
  if (error || !match) throw new ApiError(404, 'Match niet gevonden');
  
  // Verify authorization
  const isCandidate = user.userType === 'candidate' && match.candidate_id === user.candidateProfileId;
  const isEmployer = user.userType === 'employer' && match.jobs.employer_id === user.employerProfileId;
  
  if (!isCandidate && !isEmployer) {
    throw new ApiError(403, 'Geen toegang tot deze match');
  }
  
  // Update interest
  const updateField = isCandidate ? 'candidate_interested' : 'employer_interested';
  const timestampField = isCandidate ? 'candidate_interested_at' : 'employer_interested_at';
  
  const { data: updatedMatch } = await supabase
    .from('matches')
    .update({
      [updateField]: true,
      [timestampField]: new Date().toISOString(),
    })
    .eq('id', matchId)
    .select()
    .single();
  
  // Check if mutual match was created
  if (updatedMatch.is_mutual_match && !match.is_mutual_match) {
    // Send notifications to both parties
    await Promise.all([
      notificationService.create({
        userId: match.candidate_id,
        type: 'mutual_match',
        title: 'Match!',
        message: `Je hebt een match met ${match.jobs.title}`,
        data: { matchId, jobId: match.job_id },
      }),
      notificationService.create({
        userId: match.jobs.employer_id,
        type: 'mutual_match',
        title: 'Match!',
        message: `Je hebt een match voor ${match.jobs.title}`,
        data: { matchId, candidateId: match.candidate_id },
      }),
    ]);
  }
  
  // Log activity
  await logActivity(user.id, 'interest_shown', 'match', matchId);
  
  return Response.json({
    success: true,
    isMutualMatch: updatedMatch.is_mutual_match,
  });
}
```

### 4.6 Messages

#### GET /api/matches/[id]/messages

```typescript
// Response
interface MessagesResponse {
  messages: {
    id: string;
    senderId: string;
    senderName: string;
    senderAvatar?: string;
    text: string;
    isRead: boolean;
    createdAt: string;
  }[];
  match: {
    id: string;
    candidateName: string;
    companyName: string;
    jobTitle: string;
  };
}

// Implementation
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await requireAuth(request);
  const { id: matchId } = params;
  
  // Get match and verify it's mutual
  const { data: match } = await supabase
    .from('matches')
    .select(`
      *,
      candidate_profiles (
        first_name,
        last_name,
        avatar_url,
        user_id
      ),
      jobs (
        title,
        employer_profiles (
          company_name,
          company_logo_url,
          user_id
        )
      )
    `)
    .eq('id', matchId)
    .eq('is_mutual_match', true)
    .single();
  
  if (!match) throw new ApiError(404, 'Match niet gevonden of nog geen mutual match');
  
  // Verify access
  const candidateUserId = match.candidate_profiles.user_id;
  const employerUserId = match.jobs.employer_profiles.user_id;
  
  if (user.id !== candidateUserId && user.id !== employerUserId) {
    throw new ApiError(403, 'Geen toegang tot deze conversatie');
  }
  
  // Get messages
  const { data: messages } = await supabase
    .from('messages')
    .select('*')
    .eq('match_id', matchId)
    .order('created_at', { ascending: true });
  
  // Mark as read
  await supabase
    .from('messages')
    .update({ is_read: true, read_at: new Date().toISOString() })
    .eq('match_id', matchId)
    .neq('sender_id', user.id)
    .eq('is_read', false);
  
  // Format messages with sender info
  const formattedMessages = messages.map(msg => ({
    id: msg.id,
    senderId: msg.sender_id,
    senderName: msg.sender_id === candidateUserId 
      ? `${match.candidate_profiles.first_name} ${match.candidate_profiles.last_name}`
      : match.jobs.employer_profiles.company_name,
    senderAvatar: msg.sender_id === candidateUserId
      ? match.candidate_profiles.avatar_url
      : match.jobs.employer_profiles.company_logo_url,
    text: msg.message_text,
    isRead: msg.is_read,
    createdAt: msg.created_at,
  }));
  
  return Response.json({
    messages: formattedMessages,
    match: {
      id: match.id,
      candidateName: `${match.candidate_profiles.first_name} ${match.candidate_profiles.last_name}`,
      companyName: match.jobs.employer_profiles.company_name,
      jobTitle: match.jobs.title,
    },
  });
}
```

#### POST /api/matches/[id]/messages

```typescript
// Request
interface SendMessageRequest {
  text: string;
}

// Implementation
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await requireAuth(request);
  const { id: matchId } = params;
  const body = await request.json();
  const validated = sendMessageSchema.parse(body);
  
  // Verify mutual match and access
  const { data: match } = await supabase
    .from('matches')
    .select(`
      *,
      candidate_profiles (user_id),
      jobs (employer_profiles (user_id))
    `)
    .eq('id', matchId)
    .eq('is_mutual_match', true)
    .single();
  
  if (!match) throw new ApiError(404, 'Match niet gevonden of nog geen mutual match');
  
  const candidateUserId = match.candidate_profiles.user_id;
  const employerUserId = match.jobs.employer_profiles.user_id;
  
  if (user.id !== candidateUserId && user.id !== employerUserId) {
    throw new ApiError(403, 'Geen toegang');
  }
  
  // Create message
  const { data: message, error } = await supabase
    .from('messages')
    .insert({
      match_id: matchId,
      sender_id: user.id,
      message_text: validated.text,
    })
    .select()
    .single();
  
  if (error) throw new ApiError(500, 'Bericht kon niet worden verzonden');
  
  // Send notification to recipient
  const recipientId = user.id === candidateUserId ? employerUserId : candidateUserId;
  await notificationService.create({
    userId: recipientId,
    type: 'new_message',
    title: 'Nieuw bericht',
    message: validated.text.substring(0, 100),
    data: { matchId },
  });
  
  return Response.json({ success: true, message });
}
```

---

## 5. Authentication & Authorization

### 5.1 Middleware

```typescript
// /lib/middleware/auth.ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { ApiError } from '@/lib/utils/errors';

export interface AuthUser {
  id: string;
  email: string;
  userType: 'candidate' | 'employer';
  candidateProfileId?: string;
  employerProfileId?: string;
}

export async function requireAuth(
  request: Request,
  requiredType?: 'candidate' | 'employer'
): Promise<AuthUser> {
  const cookieStore = cookies();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
  
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error || !session) {
    throw new ApiError(401, 'Niet ingelogd');
  }
  
  // Get user with profile
  const { data: user } = await supabase
    .from('users')
    .select(`
      id,
      email,
      user_type,
      candidate_profiles (id),
      employer_profiles (id)
    `)
    .eq('id', session.user.id)
    .single();
  
  if (!user) {
    throw new ApiError(401, 'Gebruiker niet gevonden');
  }
  
  // Check required type
  if (requiredType && user.user_type !== requiredType) {
    throw new ApiError(403, `Alleen voor ${requiredType === 'candidate' ? 'kandidaten' : 'werkgevers'}`);
  }
  
  return {
    id: user.id,
    email: user.email,
    userType: user.user_type,
    candidateProfileId: user.candidate_profiles?.[0]?.id,
    employerProfileId: user.employer_profiles?.[0]?.id,
  };
}

export async function getOptionalAuth(request: Request): Promise<AuthUser | null> {
  try {
    return await requireAuth(request);
  } catch {
    return null;
  }
}
```

### 5.2 Rate Limiting

```typescript
// /lib/utils/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { ApiError } from './errors';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Different rate limits for different endpoints
const limiters = {
  auth: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '1 m'),  // 5 per minuut
    analytics: true,
    prefix: 'ratelimit:auth',
  }),
  api: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, '1 m'),  // 100 per minuut
    analytics: true,
    prefix: 'ratelimit:api',
  }),
  search: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(30, '1 m'),  // 30 per minuut
    analytics: true,
    prefix: 'ratelimit:search',
  }),
};

export async function rateLimit(
  identifier: string,
  type: keyof typeof limiters = 'api'
) {
  const limiter = limiters[type];
  const { success, limit, remaining, reset } = await limiter.limit(identifier);
  
  if (!success) {
    throw new ApiError(429, 'Te veel verzoeken. Probeer later opnieuw.', {
      limit,
      remaining,
      reset: new Date(reset).toISOString(),
    });
  }
  
  return { limit, remaining, reset };
}
```

---

## 6. Matching Algoritme

### 6.1 Match Service

```typescript
// /lib/services/match.service.ts
import { supabaseAdmin } from '@/lib/supabase/admin';
import { redis } from '@/lib/utils/cache';

interface MatchScores {
  overall: number;
  skills: number;
  personality: number;
  preferences: number;
}

interface SkillScoreBreakdown {
  skillId: string;
  skillName: string;
  required: ExperienceLevel;
  actual: ExperienceLevel | null;
  isTested: boolean;
  score: number;
  weight: number;
}

interface MatchBreakdown {
  skills: SkillScoreBreakdown[];
  personality: {
    candidateMbti: string | null;
    preferredMbti: string[];
    isMatch: boolean;
    score: number;
  };
  preferences: {
    location: { match: boolean; score: number };
    salary: { match: boolean; score: number };
    workType: { match: boolean; score: number };
    remote: { match: boolean; score: number };
  };
}

export class MatchService {
  
  /**
   * Calculate match score between candidate and job
   */
  async calculateMatch(
    candidateId: string,
    jobId: string
  ): Promise<{ scores: MatchScores; breakdown: MatchBreakdown }> {
    
    // Fetch all needed data in parallel
    const [candidate, job, candidateSkills, jobSkills] = await Promise.all([
      this.getCandidate(candidateId),
      this.getJob(jobId),
      this.getCandidateSkills(candidateId),
      this.getJobSkills(jobId),
    ]);
    
    // Calculate individual scores
    const skillsResult = this.calculateSkillsScore(candidateSkills, jobSkills);
    const personalityResult = this.calculatePersonalityScore(candidate, job);
    const preferencesResult = this.calculatePreferencesScore(candidate, job);
    
    // Weighted average
    // Skills: 50%, Personality: 25%, Preferences: 25%
    const overall = Math.round(
      skillsResult.score * 0.50 +
      personalityResult.score * 0.25 +
      preferencesResult.score * 0.25
    );
    
    return {
      scores: {
        overall,
        skills: skillsResult.score,
        personality: personalityResult.score,
        preferences: preferencesResult.score,
      },
      breakdown: {
        skills: skillsResult.breakdown,
        personality: personalityResult.breakdown,
        preferences: preferencesResult.breakdown,
      },
    };
  }
  
  /**
   * Skills Score Calculation (0-100)
   */
  private calculateSkillsScore(
    candidateSkills: CandidateSkill[],
    jobSkills: JobSkill[]
  ): { score: number; breakdown: SkillScoreBreakdown[] } {
    
    if (jobSkills.length === 0) {
      return { score: 75, breakdown: [] };  // No skills required = neutral score
    }
    
    const breakdown: SkillScoreBreakdown[] = [];
    let totalWeightedScore = 0;
    let totalWeight = 0;
    
    for (const jobSkill of jobSkills) {
      const candidateSkill = candidateSkills.find(
        cs => cs.skill_id === jobSkill.skill_id && cs.use_for_matching
      );
      
      let skillScore = 0;
      
      if (candidateSkill) {
        // Candidate has this skill
        if (candidateSkill.is_tested && candidateSkill.skill_level) {
          // Tested - use actual level
          skillScore = this.calculateLevelMatch(
            candidateSkill.skill_level,
            jobSkill.required_level
          );
        } else {
          // Not tested - partial credit (60%)
          skillScore = 60;
        }
      } else {
        // Candidate doesn't have this skill
        skillScore = jobSkill.is_required ? 0 : 30;  // Nice-to-have gets some points
      }
      
      const weight = jobSkill.weight * (jobSkill.is_required ? 2 : 1);
      totalWeightedScore += skillScore * weight;
      totalWeight += weight;
      
      breakdown.push({
        skillId: jobSkill.skill_id,
        skillName: jobSkill.skill_name,
        required: jobSkill.required_level,
        actual: candidateSkill?.skill_level || null,
        isTested: candidateSkill?.is_tested || false,
        score: skillScore,
        weight: jobSkill.weight,
      });
    }
    
    const finalScore = totalWeight > 0 
      ? Math.round(totalWeightedScore / totalWeight)
      : 75;
    
    return { score: finalScore, breakdown };
  }
  
  /**
   * Calculate level match score
   */
  private calculateLevelMatch(
    candidateLevel: ExperienceLevel,
    requiredLevel: ExperienceLevel
  ): number {
    const levels = { junior: 1, medior: 2, senior: 3 };
    const candidateNum = levels[candidateLevel];
    const requiredNum = levels[requiredLevel];
    
    if (candidateNum >= requiredNum) {
      return 100;  // Meets or exceeds requirement
    }
    
    const diff = requiredNum - candidateNum;
    if (diff === 1) return 65;  // One level below
    return 35;  // Two levels below
  }
  
  /**
   * Personality Score Calculation (0-100)
   */
  private calculatePersonalityScore(
    candidate: Candidate,
    job: Job
  ): { score: number; breakdown: any } {
    
    const candidateMbti = candidate.mbti_type;
    const preferredMbti = job.preferred_mbti || [];
    
    // No preference set = neutral score
    if (preferredMbti.length === 0) {
      return {
        score: 75,
        breakdown: {
          candidateMbti,
          preferredMbti,
          isMatch: true,
          score: 75,
        },
      };
    }
    
    // Candidate hasn't taken test
    if (!candidateMbti) {
      return {
        score: 50,
        breakdown: {
          candidateMbti: null,
          preferredMbti,
          isMatch: false,
          score: 50,
        },
      };
    }
    
    // Exact match
    if (preferredMbti.includes(candidateMbti)) {
      return {
        score: 100,
        breakdown: {
          candidateMbti,
          preferredMbti,
          isMatch: true,
          score: 100,
        },
      };
    }
    
    // Partial match (same temperament group)
    const temperamentScore = this.calculateTemperamentMatch(candidateMbti, preferredMbti);
    
    return {
      score: temperamentScore,
      breakdown: {
        candidateMbti,
        preferredMbti,
        isMatch: false,
        score: temperamentScore,
      },
    };
  }
  
  /**
   * MBTI Temperament matching
   * NT (Analysts), NF (Diplomats), SJ (Sentinels), SP (Explorers)
   */
  private calculateTemperamentMatch(
    candidateMbti: string,
    preferredMbti: string[]
  ): number {
    const getTemperament = (mbti: string) => {
      const n = mbti[1] === 'N';
      const t = mbti[2] === 'T';
      const j = mbti[3] === 'J';
      
      if (n && t) return 'NT';
      if (n && !t) return 'NF';
      if (!n && j) return 'SJ';
      return 'SP';
    };
    
    const candidateTemp = getTemperament(candidateMbti);
    const preferredTemps = preferredMbti.map(getTemperament);
    
    if (preferredTemps.includes(candidateTemp)) {
      return 75;  // Same temperament group
    }
    
    return 50;  // Different temperament
  }
  
  /**
   * Preferences Score Calculation (0-100)
   */
  private calculatePreferencesScore(
    candidate: Candidate,
    job: Job
  ): { score: number; breakdown: any } {
    
    const breakdown = {
      location: { match: false, score: 0 },
      salary: { match: false, score: 0 },
      workType: { match: false, score: 0 },
      remote: { match: false, score: 0 },
    };
    
    // Location (25%)
    if (candidate.city && job.location_city) {
      const sameCity = candidate.city.toLowerCase() === job.location_city.toLowerCase();
      const willingToRelocate = candidate.willing_to_relocate;
      
      if (sameCity) {
        breakdown.location = { match: true, score: 100 };
      } else if (willingToRelocate) {
        breakdown.location = { match: true, score: 75 };
      } else {
        breakdown.location = { match: false, score: 40 };
      }
    } else {
      breakdown.location = { match: true, score: 75 };  // No data = neutral
    }
    
    // Salary (25%)
    if (candidate.desired_salary_min && job.salary_max) {
      if (job.salary_max >= candidate.desired_salary_min) {
        breakdown.salary = { match: true, score: 100 };
      } else {
        const ratio = job.salary_max / candidate.desired_salary_min;
        breakdown.salary = { match: false, score: Math.round(ratio * 100) };
      }
    } else {
      breakdown.salary = { match: true, score: 75 };
    }
    
    // Work Type (25%)
    if (candidate.work_types && candidate.work_types.length > 0) {
      if (candidate.work_types.includes(job.work_type)) {
        breakdown.workType = { match: true, score: 100 };
      } else {
        breakdown.workType = { match: false, score: 30 };
      }
    } else {
      breakdown.workType = { match: true, score: 75 };
    }
    
    // Remote Preference (25%)
    if (candidate.remote_preference) {
      const compatibleRemote = this.isRemoteCompatible(
        candidate.remote_preference,
        job.remote_option
      );
      breakdown.remote = { match: compatibleRemote, score: compatibleRemote ? 100 : 40 };
    } else {
      breakdown.remote = { match: true, score: 75 };
    }
    
    // Calculate weighted average
    const score = Math.round(
      breakdown.location.score * 0.25 +
      breakdown.salary.score * 0.25 +
      breakdown.workType.score * 0.25 +
      breakdown.remote.score * 0.25
    );
    
    return { score, breakdown };
  }
  
  private isRemoteCompatible(
    candidatePref: RemotePreference,
    jobOption: RemotePreference
  ): boolean {
    if (candidatePref === 'flexible' || jobOption === 'flexible') return true;
    if (candidatePref === jobOption) return true;
    if (candidatePref === 'hybrid' && jobOption !== 'onsite') return true;
    return false;
  }
  
  /**
   * Get or calculate match (with caching)
   */
  async getOrCalculateMatch(
    candidateId: string,
    jobId: string
  ): Promise<Match | null> {
    // Try cache first
    const cacheKey = `match:${candidateId}:${jobId}`;
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);
    
    // Try database
    const { data: existing } = await supabaseAdmin
      .from('matches')
      .select('*')
      .eq('candidate_id', candidateId)
      .eq('job_id', jobId)
      .single();
    
    if (existing) {
      await redis.set(cacheKey, JSON.stringify(existing), { ex: 3600 });
      return existing;
    }
    
    // Calculate new match
    const { scores, breakdown } = await this.calculateMatch(candidateId, jobId);
    
    // Save to database
    const { data: match } = await supabaseAdmin
      .from('matches')
      .insert({
        candidate_id: candidateId,
        job_id: jobId,
        overall_score: scores.overall,
        skills_score: scores.skills,
        personality_score: scores.personality,
        preferences_score: scores.preferences,
        score_breakdown: breakdown,
      })
      .select()
      .single();
    
    // Cache
    if (match) {
      await redis.set(cacheKey, JSON.stringify(match), { ex: 3600 });
    }
    
    return match;
  }
  
  /**
   * Queue match recalculation (when profile changes)
   */
  async queueMatchRecalculation(candidateId: string) {
    // Invalidate cache
    const keys = await redis.keys(`match:${candidateId}:*`);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
    
    // Queue background job
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/jobs/recalculate-matches`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.CRON_SECRET}` },
      body: JSON.stringify({ candidateId }),
    });
  }
  
  /**
   * Queue job match calculations (when job is published)
   */
  async queueJobMatchCalculations(jobId: string) {
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/jobs/calculate-job-matches`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.CRON_SECRET}` },
      body: JSON.stringify({ jobId }),
    });
  }
  
  // Helper methods to fetch data
  private async getCandidate(id: string) {
    const { data } = await supabaseAdmin
      .from('candidate_profiles')
      .select('*')
      .eq('id', id)
      .single();
    return data;
  }
  
  private async getJob(id: string) {
    const { data } = await supabaseAdmin
      .from('jobs')
      .select('*')
      .eq('id', id)
      .single();
    return data;
  }
  
  private async getCandidateSkills(candidateId: string) {
    const { data } = await supabaseAdmin
      .from('candidate_skills')
      .select(`
        *,
        skills (name)
      `)
      .eq('candidate_id', candidateId);
    return data || [];
  }
  
  private async getJobSkills(jobId: string) {
    const { data } = await supabaseAdmin
      .from('job_skills')
      .select(`
        *,
        skills (name)
      `)
      .eq('job_id', jobId);
    return (data || []).map(s => ({
      ...s,
      skill_name: s.skills.name,
    }));
  }
}

export const matchService = new MatchService();
```

---

## 7. Business Logic

### 7.1 Notification Service

```typescript
// /lib/services/notification.service.ts
import { supabaseAdmin } from '@/lib/supabase/admin';
import { emailService } from './email.service';

interface CreateNotificationParams {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>;
  sendEmail?: boolean;
}

export class NotificationService {
  
  async create(params: CreateNotificationParams) {
    const { userId, type, title, message, data, sendEmail = true } = params;
    
    // Create notification
    const { data: notification, error } = await supabaseAdmin
      .from('notifications')
      .insert({
        user_id: userId,
        type,
        title,
        message,
        data,
      })
      .select()
      .single();
    
    if (error) {
      console.error('Failed to create notification:', error);
      return null;
    }
    
    // Send email if enabled
    if (sendEmail) {
      const { data: user } = await supabaseAdmin
        .from('users')
        .select('email')
        .eq('id', userId)
        .single();
      
      if (user) {
        await emailService.sendNotificationEmail(user.email, {
          type,
          title,
          message,
          data,
        });
        
        // Update notification
        await supabaseAdmin
          .from('notifications')
          .update({
            email_sent: true,
            email_sent_at: new Date().toISOString(),
          })
          .eq('id', notification.id);
      }
    }
    
    return notification;
  }
  
  async getUnreadCount(userId: string): Promise<number> {
    const { count } = await supabaseAdmin
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_read', false);
    
    return count || 0;
  }
  
  async markAsRead(notificationId: string, userId: string) {
    await supabaseAdmin
      .from('notifications')
      .update({
        is_read: true,
        read_at: new Date().toISOString(),
      })
      .eq('id', notificationId)
      .eq('user_id', userId);
  }
  
  async markAllAsRead(userId: string) {
    await supabaseAdmin
      .from('notifications')
      .update({
        is_read: true,
        read_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .eq('is_read', false);
  }
}

export const notificationService = new NotificationService();
```

### 7.2 Email Service

```typescript
// /lib/services/email.service.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface NotificationEmailData {
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>;
}

export class EmailService {
  private fromEmail = 'Jobhulp <noreply@jobhulp.be>';
  
  async sendVerificationEmail(email: string, verificationUrl: string) {
    await resend.emails.send({
      from: this.fromEmail,
      to: email,
      subject: 'Bevestig je email - Jobhulp',
      html: `
        <h1>Welkom bij Jobhulp!</h1>
        <p>Klik op de link hieronder om je email te bevestigen:</p>
        <a href="${verificationUrl}">Email bevestigen</a>
        <p>Deze link is 24 uur geldig.</p>
      `,
    });
  }
  
  async sendPasswordResetEmail(email: string, resetUrl: string) {
    await resend.emails.send({
      from: this.fromEmail,
      to: email,
      subject: 'Wachtwoord resetten - Jobhulp',
      html: `
        <h1>Wachtwoord resetten</h1>
        <p>Je hebt gevraagd om je wachtwoord te resetten.</p>
        <a href="${resetUrl}">Wachtwoord resetten</a>
        <p>Deze link is 1 uur geldig.</p>
        <p>Als je dit niet hebt aangevraagd, kun je deze email negeren.</p>
      `,
    });
  }
  
  async sendNotificationEmail(email: string, data: NotificationEmailData) {
    const subject = this.getEmailSubject(data.type, data.title);
    const html = this.getEmailTemplate(data);
    
    await resend.emails.send({
      from: this.fromEmail,
      to: email,
      subject,
      html,
    });
  }
  
  async sendMutualMatchEmail(
    email: string,
    matchData: { companyName?: string; jobTitle?: string; candidateName?: string }
  ) {
    const isCandidate = !!matchData.companyName;
    
    await resend.emails.send({
      from: this.fromEmail,
      to: email,
      subject: 'Je hebt een match! - Jobhulp',
      html: `
        <h1>Gefeliciteerd, je hebt een match!</h1>
        ${isCandidate 
          ? `<p>${matchData.companyName} is ook geïnteresseerd in jou voor de functie ${matchData.jobTitle}.</p>`
          : `<p>${matchData.candidateName} is ook geïnteresseerd in jouw vacature.</p>`
        }
        <p>Je kunt nu berichten uitwisselen.</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/messages">Bekijk je matches</a>
      `,
    });
  }
  
  private getEmailSubject(type: NotificationType, title: string): string {
    const prefixes: Record<NotificationType, string> = {
      new_match: '🎯 Nieuwe match',
      mutual_match: '🎉 Match!',
      new_message: '💬 Nieuw bericht',
      profile_view: '👀 Profielweergave',
      test_reminder: '📝 Test reminder',
      job_alert: '📢 Nieuwe vacature',
    };
    return `${prefixes[type]} - ${title}`;
  }
  
  private getEmailTemplate(data: NotificationEmailData): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #6366f1; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9fafb; }
          .button { display: inline-block; padding: 12px 24px; background: #6366f1; color: white; text-decoration: none; border-radius: 6px; }
          .footer { padding: 20px; text-align: center; color: #6b7280; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Jobhulp</h1>
          </div>
          <div class="content">
            <h2>${data.title}</h2>
            <p>${data.message}</p>
            <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="button">Bekijk op Jobhulp</a></p>
          </div>
          <div class="footer">
            <p>Je ontvangt deze email omdat je bent ingeschreven bij Jobhulp.</p>
            <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/settings/notifications">Email voorkeuren aanpassen</a></p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

export const emailService = new EmailService();
```

---

## 8. Validatie Schemas

```typescript
// /lib/validators/auth.ts
import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Ongeldig emailadres'),
  password: z
    .string()
    .min(8, 'Wachtwoord moet minimaal 8 tekens zijn')
    .regex(/[A-Z]/, 'Wachtwoord moet minimaal 1 hoofdletter bevatten')
    .regex(/[0-9]/, 'Wachtwoord moet minimaal 1 cijfer bevatten'),
  userType: z.enum(['candidate', 'employer']),
  firstName: z.string().min(2).max(100).optional(),
  lastName: z.string().min(2).max(100).optional(),
  companyName: z.string().min(2).max(255).optional(),
}).refine(data => {
  if (data.userType === 'candidate') {
    return data.firstName && data.lastName;
  }
  if (data.userType === 'employer') {
    return data.companyName;
  }
  return true;
}, {
  message: 'Verplichte velden ontbreken',
});

export const loginSchema = z.object({
  email: z.string().email('Ongeldig emailadres'),
  password: z.string().min(1, 'Wachtwoord is verplicht'),
});

// /lib/validators/candidate.ts
export const updateCandidateProfileSchema = z.object({
  firstName: z.string().min(2).max(100).optional(),
  lastName: z.string().min(2).max(100).optional(),
  phone: z.string().max(20).optional(),
  city: z.string().max(100).optional(),
  bio: z.string().max(2000).optional(),
  desiredSalaryMin: z.number().min(0).optional(),
  desiredSalaryMax: z.number().min(0).optional(),
  workTypes: z.array(z.enum(['fulltime', 'parttime', 'freelance', 'internship'])).optional(),
  remotePreference: z.enum(['onsite', 'hybrid', 'remote', 'flexible']).optional(),
  availableFrom: z.string().datetime().optional(),
  isSearchable: z.boolean().optional(),
}).refine(data => {
  if (data.desiredSalaryMin && data.desiredSalaryMax) {
    return data.desiredSalaryMax >= data.desiredSalaryMin;
  }
  return true;
}, {
  message: 'Maximum salaris moet groter zijn dan minimum',
});

export const updateSkillsSchema = z.object({
  skills: z.array(z.object({
    skillId: z.string(),
    useForMatching: z.boolean(),
  })).max(30, 'Maximaal 30 skills'),
});

// /lib/validators/jobs.ts
export const createJobSchema = z.object({
  title: z.string().min(5).max(255),
  description: z.string().min(50).max(10000),
  responsibilities: z.string().max(5000).optional(),
  requirements: z.string().max(5000).optional(),
  niceToHave: z.string().max(5000).optional(),
  locationCity: z.string().max(100).optional(),
  workType: z.enum(['fulltime', 'parttime', 'freelance', 'internship']),
  remoteOption: z.enum(['onsite', 'hybrid', 'remote', 'flexible']),
  experienceLevel: z.enum(['junior', 'medior', 'senior']),
  salaryMin: z.number().min(0).optional(),
  salaryMax: z.number().min(0).optional(),
  salaryType: z.enum(['yearly', 'monthly', 'hourly']).optional(),
  showSalary: z.boolean().optional(),
  benefits: z.array(z.string()).max(20).optional(),
  preferredMbti: z.array(z.string().length(4)).max(16).optional(),
  skills: z.array(z.object({
    skillId: z.string(),
    requiredLevel: z.enum(['junior', 'medior', 'senior']),
    isRequired: z.boolean(),
    weight: z.number().min(1).max(5).optional(),
  })).max(15, 'Maximaal 15 skills'),
  status: z.enum(['draft', 'active']).optional(),
});

// /lib/validators/tests.ts
export const submitSkillTestSchema = z.object({
  answers: z.array(z.object({
    questionId: z.number(),
    selectedOptionIndex: z.number().min(0).max(3),
    timeSpentSeconds: z.number().optional(),
  })).min(1).max(10),
});

export const submitMbtiTestSchema = z.object({
  answers: z.array(z.object({
    questionId: z.number(),
    selectedOption: z.enum(['a', 'b']),
    value: z.number().min(1).max(5),  // 1-5 scale
  })).length(20),
});
```

---

## 9. Error Handling

```typescript
// /lib/utils/errors.ts
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// /lib/utils/api-response.ts
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { ApiError } from './errors';

export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

export function errorResponse(error: unknown) {
  console.error('API Error:', error);
  
  // Zod validation error
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: 'Validatie fout',
        details: error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      },
      { status: 400 }
    );
  }
  
  // Custom API error
  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        error: error.message,
        details: error.details,
      },
      { status: error.statusCode }
    );
  }
  
  // Unknown error
  return NextResponse.json(
    { error: 'Er is een fout opgetreden' },
    { status: 500 }
  );
}

// Usage wrapper
export function withErrorHandling(
  handler: (request: Request, context?: any) => Promise<Response>
) {
  return async (request: Request, context?: any) => {
    try {
      return await handler(request, context);
    } catch (error) {
      return errorResponse(error);
    }
  };
}
```

---

## 10. Background Jobs

### 10.1 Cron Jobs

```typescript
// /app/api/cron/recalculate-matches/route.ts
// Runs daily to recalculate stale matches

import { supabaseAdmin } from '@/lib/supabase/admin';
import { matchService } from '@/lib/services/match.service';

export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  // Get matches older than 24 hours
  const { data: staleMatches } = await supabaseAdmin
    .from('matches')
    .select('candidate_id, job_id')
    .lt('updated_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
    .limit(100);
  
  if (!staleMatches || staleMatches.length === 0) {
    return Response.json({ message: 'No stale matches' });
  }
  
  // Recalculate
  let updated = 0;
  for (const match of staleMatches) {
    try {
      const { scores, breakdown } = await matchService.calculateMatch(
        match.candidate_id,
        match.job_id
      );
      
      await supabaseAdmin
        .from('matches')
        .update({
          overall_score: scores.overall,
          skills_score: scores.skills,
          personality_score: scores.personality,
          preferences_score: scores.preferences,
          score_breakdown: breakdown,
        })
        .eq('candidate_id', match.candidate_id)
        .eq('job_id', match.job_id);
      
      updated++;
    } catch (error) {
      console.error('Failed to recalculate match:', error);
    }
  }
  
  return Response.json({ updated });
}

// /app/api/cron/expire-jobs/route.ts
// Runs daily to expire old jobs

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  const { data, error } = await supabaseAdmin
    .from('jobs')
    .update({ status: 'closed' })
    .eq('status', 'active')
    .lt('expires_at', new Date().toISOString())
    .select('id');
  
  return Response.json({ expired: data?.length || 0 });
}

// /app/api/cron/send-reminders/route.ts
// Runs weekly to send test reminders

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  // Find candidates with untested skills
  const { data: candidates } = await supabaseAdmin
    .from('candidate_profiles')
    .select(`
      id,
      user_id,
      first_name,
      candidate_skills!inner (
        skill_id,
        is_tested
      )
    `)
    .eq('candidate_skills.is_tested', false)
    .eq('is_searchable', true);
  
  if (!candidates) return Response.json({ sent: 0 });
  
  let sent = 0;
  for (const candidate of candidates) {
    const untestedCount = candidate.candidate_skills.filter((s: any) => !s.is_tested).length;
    
    if (untestedCount > 0) {
      await notificationService.create({
        userId: candidate.user_id,
        type: 'test_reminder',
        title: 'Vergeet je skills niet te testen',
        message: `Je hebt nog ${untestedCount} skills die niet getest zijn. Test ze om betere matches te krijgen!`,
        data: { untestedCount },
      });
      sent++;
    }
  }
  
  return Response.json({ sent });
}
```

### 10.2 Vercel Cron Configuration

```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/cron/recalculate-matches",
      "schedule": "0 3 * * *"
    },
    {
      "path": "/api/cron/expire-jobs",
      "schedule": "0 0 * * *"
    },
    {
      "path": "/api/cron/send-reminders",
      "schedule": "0 10 * * 1"
    }
  ]
}
```

---

## 11. Testing

### 11.1 Test Setup

```typescript
// /tests/setup.ts
import { createClient } from '@supabase/supabase-js';

export const testSupabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function createTestCandidate(overrides = {}) {
  const { data: user } = await testSupabase.auth.admin.createUser({
    email: `test-${Date.now()}@example.com`,
    password: 'TestPassword123',
    email_confirm: true,
  });
  
  await testSupabase.from('users').insert({
    id: user.user!.id,
    email: user.user!.email,
    user_type: 'candidate',
  });
  
  const { data: profile } = await testSupabase
    .from('candidate_profiles')
    .insert({
      user_id: user.user!.id,
      first_name: 'Test',
      last_name: 'Candidate',
      ...overrides,
    })
    .select()
    .single();
  
  return { user: user.user, profile };
}

export async function createTestJob(employerId: string, overrides = {}) {
  const { data: job } = await testSupabase
    .from('jobs')
    .insert({
      employer_id: employerId,
      title: 'Test Job',
      description: 'Test description for the job',
      work_type: 'fulltime',
      remote_option: 'hybrid',
      experience_level: 'medior',
      status: 'active',
      ...overrides,
    })
    .select()
    .single();
  
  return job;
}

export async function cleanup(userId: string) {
  await testSupabase.auth.admin.deleteUser(userId);
}
```

### 11.2 Example Tests

```typescript
// /tests/match.service.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { matchService } from '@/lib/services/match.service';
import { createTestCandidate, createTestJob, cleanup, testSupabase } from './setup';

describe('MatchService', () => {
  let candidate: any;
  let employer: any;
  let job: any;
  
  beforeAll(async () => {
    // Create test candidate
    candidate = await createTestCandidate({
      mbti_type: 'ENTJ',
      city: 'Antwerpen',
      desired_salary_min: 3000,
      work_types: ['fulltime'],
      remote_preference: 'hybrid',
    });
    
    // Add skills to candidate
    await testSupabase.from('candidate_skills').insert([
      { candidate_id: candidate.profile.id, skill_id: 'javascript', is_tested: true, skill_level: 'senior' },
      { candidate_id: candidate.profile.id, skill_id: 'react', is_tested: true, skill_level: 'medior' },
    ]);
    
    // Create test employer and job
    employer = await createTestEmployer();
    job = await createTestJob(employer.profile.id, {
      location_city: 'Antwerpen',
      salary_min: 3000,
      salary_max: 4500,
      preferred_mbti: ['ENTJ', 'INTJ'],
    });
    
    // Add skills to job
    await testSupabase.from('job_skills').insert([
      { job_id: job.id, skill_id: 'javascript', required_level: 'senior', is_required: true },
      { job_id: job.id, skill_id: 'react', required_level: 'senior', is_required: true },
    ]);
  });
  
  afterAll(async () => {
    await cleanup(candidate.user.id);
    await cleanup(employer.user.id);
  });
  
  it('calculates correct match score', async () => {
    const result = await matchService.calculateMatch(
      candidate.profile.id,
      job.id
    );
    
    expect(result.scores.overall).toBeGreaterThan(70);
    expect(result.scores.skills).toBeLessThan(100); // React is medior, not senior
    expect(result.scores.personality).toBe(100); // ENTJ is preferred
    expect(result.scores.preferences).toBe(100); // All preferences match
  });
  
  it('includes correct breakdown', async () => {
    const result = await matchService.calculateMatch(
      candidate.profile.id,
      job.id
    );
    
    const jsSkill = result.breakdown.skills.find(s => s.skillId === 'javascript');
    expect(jsSkill).toBeDefined();
    expect(jsSkill!.score).toBe(100);
    expect(jsSkill!.actual).toBe('senior');
    
    const reactSkill = result.breakdown.skills.find(s => s.skillId === 'react');
    expect(reactSkill).toBeDefined();
    expect(reactSkill!.score).toBeLessThan(100);
    expect(reactSkill!.actual).toBe('medior');
  });
});
```

---

## 12. Deployment

### 12.1 Environment Setup

```bash
# 1. Create Supabase project
# https://supabase.com/dashboard

# 2. Run database migrations
npx supabase db push

# 3. Seed initial data
npm run seed:skills
npm run seed:questions

# 4. Set environment variables in Vercel
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
# ... etc

# 5. Deploy
vercel --prod
```

### 12.2 Monitoring

```typescript
// /lib/utils/monitoring.ts
import * as Sentry from '@sentry/nextjs';

export function captureError(error: Error, context?: Record<string, any>) {
  console.error(error);
  
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureException(error, {
      extra: context,
    });
  }
}

export function logEvent(name: string, data?: Record<string, any>) {
  if (process.env.NODE_ENV === 'production') {
    // Send to analytics
    fetch('/api/analytics/event', {
      method: 'POST',
      body: JSON.stringify({ name, data }),
    });
  }
}
```

### 12.3 Performance Checklist

- [ ] Database indexes on frequently queried columns
- [ ] Redis caching for match scores
- [ ] Pagination on all list endpoints
- [ ] Rate limiting on all endpoints
- [ ] Connection pooling for database
- [ ] Image optimization (avatars, logos)
- [ ] API response compression
- [ ] Edge caching for static data (skills, categories)

---

## Appendix: Quick Reference

### API Response Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request / Validation Error |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 429 | Rate Limited |
| 500 | Server Error |

### Matching Score Weights

| Factor | Weight | Description |
|--------|--------|-------------|
| Skills | 50% | Skill presence, level match, tested status |
| Personality | 25% | MBTI compatibility |
| Preferences | 25% | Location, salary, work type, remote |

### Skill Level Thresholds

| Score | Level |
|-------|-------|
| 0-54% | Junior |
| 55-79% | Medior |
| 80-100% | Senior |

---

*Document versie: 1.0*
*Laatste update: April 2026*
