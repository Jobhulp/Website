'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api-client';
import { useAuth } from '@/lib/auth-context';
import { Skeleton } from '@/components/ui/skeleton';
import { PROFICIENCY_LABELS } from '@/lib/proficiency';
import type { 
  CandidateProfile, 
  CandidateSkill, 
  CandidateExperience, 
  CandidateEducation,
  WorkType 
} from '@/types/api';

const WORK_TYPE_LABELS: Record<WorkType, string> = {
  fulltime: 'Voltijds',
  parttime: 'Deeltijds',
  freelance: 'Freelance',
  internship: 'Stage',
  temporary: 'Tijdelijk',
};

interface ProfileData {
  profile: CandidateProfile;
  skills: CandidateSkill[];
  experience: CandidateExperience[];
  education: CandidateEducation[];
}

const ResumePreview = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Redirect non-candidates
    if (user && user.userType !== 'candidate') {
      router.replace('/dashboard');
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const [profile, skills, experience, education] = await Promise.all([
          api.get<CandidateProfile>('/candidate/profile'),
          api.get<CandidateSkill[]>('/candidate/skills'),
          api.get<CandidateExperience[]>('/candidate/experience'),
          api.get<CandidateEducation[]>('/candidate/education'),
        ]);
        setData({ profile, skills, experience, education });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Kon profiel niet laden');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user, router]);

  // Format date range helper
  const formatDateRange = (startDate: string, endDate: string | null, isCurrent?: boolean) => {
    const start = new Date(startDate);
    const startStr = start.toLocaleDateString('nl-BE', { year: 'numeric', month: 'short' });
    
    if (isCurrent || !endDate) {
      return `${startStr} - Heden`;
    }
    
    const end = new Date(endDate);
    const endStr = end.toLocaleDateString('nl-BE', { year: 'numeric', month: 'short' });
    return `${startStr} - ${endStr}`;
  };

  // Get display name
  const getDisplayName = () => {
    if (!data?.profile) return 'Kandidaat';
    const { firstName, lastName } = data.profile;
    if (firstName && lastName) return `${firstName} ${lastName}`;
    if (firstName) return firstName;
    return 'Kandidaat';
  };

  // Group skills by sector
  const skillsBySector = data?.skills.reduce((acc, skill) => {
    if (!acc[skill.sectorName]) {
      acc[skill.sectorName] = [];
    }
    acc[skill.sectorName].push(skill);
    return acc;
  }, {} as Record<string, CandidateSkill[]>) || {};

  if (loading) {
    return (
      <div className="main-content-wrapper">
        <div className="header--spacer" style={{ height: "142.234px", backgroundColor: "rgb(18, 18, 20)" }}></div>
        <section className="stunning-header pb120 pt80 bg-dark-themes">
          <div className="container">
            <Skeleton className="h-8 w-64 bg-gray-700 mb-4" />
            <Skeleton className="h-12 w-96 bg-gray-700" />
          </div>
        </section>
        <section className="medium-padding40">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <Skeleton className="h-96 w-full" />
              </div>
              <div className="col-lg-4">
                <Skeleton className="h-64 w-full" />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="main-content-wrapper">
        <div className="header--spacer" style={{ height: "142.234px", backgroundColor: "rgb(18, 18, 20)" }}></div>
        <section className="stunning-header pb120 pt80 bg-dark-themes">
          <div className="container">
            <h1 className="page-title text-white">Profiel Preview</h1>
          </div>
        </section>
        <section className="medium-padding40">
          <div className="container">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-600 mb-4">{error || 'Kon profiel niet laden'}</p>
              <Link href="/dashboard/profile" className="crumina-button button--green">
                Ga naar profiel
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const { profile, skills, experience, education } = data;

  return (
    <div className="main-content-wrapper">
      <div className="header--spacer" style={{ height: "142.234px", backgroundColor: "rgb(18, 18, 20)" }}></div>
      <section className="stunning-header pb120 pt80 bg-dark-themes">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <ul className="breadcrumbs">
                <li className="breadcrumbs-item">
                  <Link href="/">Home<i className="puzzle-icon fal fa-angle-double-right"></i></Link>
                </li>
                <li className="breadcrumbs-item">
                  <Link href="/dashboard">Dashboard<i className="puzzle-icon fal fa-angle-double-right"></i></Link>
                </li>
                <li className="breadcrumbs-item">
                  <Link href="/dashboard/profile">Profiel<i className="puzzle-icon fal fa-angle-double-right"></i></Link>
                </li>
                <li className="breadcrumbs-item active">
                  <span>Preview</span>
                </li>
              </ul>

              <h1 className="page-title text-white mb60">Profiel Preview</h1>
              <p className="text-gray-300">Zo zien werkgevers jouw profiel</p>
            </div>
          </div>
        </div>
      </section>

      <section className="medium-padding40">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <Link href="/dashboard/profile" className="crumina-button button--green button--xxl button--uppercase-wide button--with-icon button--icon-left my-2">
                  <i className="puzzle-icon fal fa-long-arrow-left"></i>Bewerk Profiel
                </Link>
                <div className="d-flex gap-3 my-2">
                  <span className="text-muted d-flex align-items-center gap-2">
                    <span className="badge bg-success text-white px-3 py-2">
                      {profile.profileCompleteness}% Compleet
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light-grey stunning-bg2 pt200 pb120">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mt-5">
              <h2 className="h1 mb-5 text-white">{getDisplayName()}</h2>
              <div className="ui-card ui-card--column mb-0">
                <div className="ui-card-content">
                  {/* About Me */}
                  <h3 className="mb-3">Over mij</h3>
                  {profile.bio ? (
                    <p className="whitespace-pre-wrap">{profile.bio}</p>
                  ) : (
                    <p className="text-muted italic">Nog geen bio toegevoegd</p>
                  )}

                  {/* MBTI Personality */}
                  {profile.mbtiType && (
                    <>
                      <h4 className="mb-3 mt-5">Persoonlijkheidstype</h4>
                      <div className="d-inline-flex align-items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full">
                        <span className="font-bold text-lg">{profile.mbtiType}</span>
                      </div>
                    </>
                  )}

                  {/* Skills by Sector */}
                  {skills.length > 0 && (
                    <>
                      <h4 className="mb-3 mt-5">Vaardigheden</h4>
                      {Object.entries(skillsBySector).map(([sectorName, sectorSkills]) => (
                        <div key={sectorName} className="mb-4">
                          <h5 className="text-muted mb-2">{sectorName}</h5>
                          <div className="d-flex flex-wrap gap-2">
                            {sectorSkills.map((skill) => (
                              <span
                                key={skill.id}
                                className="badge bg-primary text-white px-3 py-2"
                                title={`${PROFICIENCY_LABELS[skill.proficiencyLevel]}${skill.yearsExperience ? ` - ${skill.yearsExperience} jaar` : ''}`}
                              >
                                {skill.skillName}
                                <span className="ms-1 opacity-75">
                                  ({PROFICIENCY_LABELS[skill.proficiencyLevel]})
                                </span>
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </>
                  )}

                  {skills.length === 0 && (
                    <>
                      <h4 className="mb-3 mt-5">Vaardigheden</h4>
                      <p className="text-muted italic">Nog geen vaardigheden toegevoegd</p>
                    </>
                  )}

                  {/* Education */}
                  <h4 className="mb-3 mt-5">Opleiding</h4>
                  {education.length > 0 ? (
                    <ul className="crumina-module crumina-list--with-border">
                      {education.map((edu) => (
                        <li key={edu.id}>
                          <h5>{edu.institutionName}</h5>
                          <div className="c-grey my-3">
                            {edu.degree}
                            {edu.fieldOfStudy && ` - ${edu.fieldOfStudy}`}
                            {' '}({formatDateRange(edu.startDate, edu.endDate)})
                          </div>
                          {edu.description && <p>{edu.description}</p>}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted italic">Nog geen opleidingen toegevoegd</p>
                  )}

                  {/* Experience */}
                  <h4 className="mb-3 mt-5">Werkervaring</h4>
                  {experience.length > 0 ? (
                    <ul className="crumina-module crumina-list--with-border">
                      {experience.map((exp) => (
                        <li key={exp.id}>
                          <h5>{exp.jobTitle}</h5>
                          <div className="c-grey my-3">
                            {exp.companyName} ({formatDateRange(exp.startDate, exp.endDate, exp.isCurrent)})
                          </div>
                          {exp.description && <p>{exp.description}</p>}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted italic">Nog geen werkervaring toegevoegd</p>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 pt120">
              <div className="crumina-sticky-sidebar">
                <div className="sidebar__inner">
                  <aside aria-label="sidebar" className="sidebar sidebar-right">
                    <div className="widget w-company widget-sidebar">
                      {/* Avatar */}
                      <div className="avatar avatar--280">
                        {profile.avatarUrl ? (
                          <img src={profile.avatarUrl} alt={getDisplayName()} />
                        ) : (
                          <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-6xl text-gray-400 font-bold">
                              {(profile.firstName?.[0] || profile.lastName?.[0] || '?').toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>

                      <ul className="summary-items">
                        {/* Location */}
                        {profile.city && (
                          <li className="summary-item">
                            <span className="summary-type">Locatie:</span>
                            <span className="summary-value">
                              {profile.city}
                              {profile.country && `, ${profile.country}`}
                            </span>
                          </li>
                        )}

                        {/* Salary Range */}
                        {(profile.desiredSalaryMin || profile.desiredSalaryMax) && (
                          <li className="summary-item">
                            <span className="summary-type">Gewenst salaris:</span>
                            <span className="summary-value">
                              {profile.desiredSalaryMin && profile.desiredSalaryMax
                                ? `€${profile.desiredSalaryMin.toLocaleString('nl-BE')} - €${profile.desiredSalaryMax.toLocaleString('nl-BE')}`
                                : profile.desiredSalaryMin
                                  ? `Vanaf €${profile.desiredSalaryMin.toLocaleString('nl-BE')}`
                                  : `Tot €${profile.desiredSalaryMax?.toLocaleString('nl-BE')}`}
                            </span>
                          </li>
                        )}

                        {/* Max Commute */}
                        {profile.maxCommuteKm && (
                          <li className="summary-item">
                            <span className="summary-type">Max. reisafstand:</span>
                            <span className="summary-value">{profile.maxCommuteKm} km</span>
                          </li>
                        )}

                        {/* Work Types */}
                        {profile.workTypes.length > 0 && (
                          <li className="summary-item">
                            <span className="summary-type">Beschikbaar voor:</span>
                            <span className="summary-value">
                              {profile.workTypes.map(wt => WORK_TYPE_LABELS[wt]).join(', ')}
                            </span>
                          </li>
                        )}

                        {/* Links */}
                        {profile.linkedinUrl && (
                          <li className="summary-item">
                            <span className="summary-type">LinkedIn:</span>
                            <span className="summary-value">
                              <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">
                                Bekijk profiel
                              </a>
                            </span>
                          </li>
                        )}

                        {profile.portfolioUrl && (
                          <li className="summary-item">
                            <span className="summary-type">Portfolio:</span>
                            <span className="summary-value">
                              <a href={profile.portfolioUrl} target="_blank" rel="noopener noreferrer">
                                Bekijk portfolio
                              </a>
                            </span>
                          </li>
                        )}

                        {profile.cvUrl && (
                          <li className="summary-item">
                            <span className="summary-type">CV:</span>
                            <span className="summary-value">
                              <a href={profile.cvUrl} target="_blank" rel="noopener noreferrer">
                                Download CV
                              </a>
                            </span>
                          </li>
                        )}
                      </ul>

                      {/* Searchable Status */}
                      <div className="mt-4 p-3 rounded-lg text-center" style={{
                        backgroundColor: profile.isSearchable ? '#dcfce7' : '#fef3c7',
                        border: `1px solid ${profile.isSearchable ? '#86efac' : '#fcd34d'}`
                      }}>
                        <span style={{ color: profile.isSearchable ? '#166534' : '#92400e' }}>
                          {profile.isSearchable 
                            ? '✓ Zichtbaar voor werkgevers' 
                            : '⚠ Niet zichtbaar voor werkgevers'}
                        </span>
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResumePreview;
