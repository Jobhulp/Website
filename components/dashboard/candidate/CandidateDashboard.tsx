"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { demoJobMatches, demoUserProfile, demoCandidateStats, demoPersonalityResult, demoSkillsResult, mbtiTypeInfo, skillLevelInfo } from '../../../data/demo-data';
import MatchScore from '../../common/match-score/MatchScore';

type TabId = 'matches' | 'interested' | 'mutual' | 'profile' | 'tests';

const CandidateDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('matches');
  const [jobInterests, setJobInterests] = useState<Record<string, boolean>>(
    demoJobMatches.reduce((acc, job) => ({ ...acc, [job.id]: job.candidateInterested }), {})
  );

  const handleToggleInterest = (jobId: string) => {
    setJobInterests(prev => ({ ...prev, [jobId]: !prev[jobId] }));
  };

  const filteredJobs = demoJobMatches.filter(job => {
    if (activeTab === 'interested') return jobInterests[job.id];
    if (activeTab === 'mutual') return job.mutualInterest || (jobInterests[job.id] && job.employerInterested);
    return true;
  });

  return (
    <div className="main-content-wrapper">
      <div className="header--spacer" style={{ height: '142px', backgroundColor: '#121214' }}></div>

      {/* Dashboard Header */}
      <section className="bg-dark-themes py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 col-md-12">
              <div className="d-flex align-items-center">
                <div className="avatar avatar--100 mr-4">
                  <img src={demoUserProfile.avatar} alt={demoUserProfile.name} style={{ borderRadius: '50%', width: '100px', height: '100px', objectFit: 'cover' }} />
                </div>
                <div>
                  <h1 className="text-white mb-2">Welkom terug, {demoUserProfile.name.split(' ')[0]}!</h1>
                  <p className="text-white mb-0" style={{ opacity: 0.8 }}>
                    {demoUserProfile.title} - {demoUserProfile.location}
                  </p>
                  <div className="mt-2">
                    <span className="badge bg-yellow c-dark mr-2" style={{ padding: '6px 12px', borderRadius: '20px', fontWeight: 600 }}>
                      Profiel {demoUserProfile.completeness}% compleet
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 mt-4 mt-lg-0">
              <div className="d-flex justify-content-lg-end">
                <Link href="/dashboard/candidate/profile" className="crumina-button button--yellow button--m">
                  Profiel bewerken
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-light-grey py-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-2 col-md-4 col-6 mb-3">
              <div className="info-box info-box--numbers text-center p-3 bg-white" style={{ borderRadius: '10px' }}>
                <span className="info-box-number c-blue" style={{ fontSize: '32px' }}>{demoCandidateStats.totalMatches}</span>
                <h6 className="mb-0">Totale Matches</h6>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-6 mb-3">
              <div className="info-box info-box--numbers text-center p-3 bg-white" style={{ borderRadius: '10px' }}>
                <span className="info-box-number c-green" style={{ fontSize: '32px' }}>{demoCandidateStats.newMatches}</span>
                <h6 className="mb-0">Nieuwe Matches</h6>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-6 mb-3">
              <div className="info-box info-box--numbers text-center p-3 bg-white" style={{ borderRadius: '10px' }}>
                <span className="info-box-number c-yellow" style={{ fontSize: '32px' }}>{demoCandidateStats.mutualMatches}</span>
                <h6 className="mb-0">Mutual Matches</h6>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-6 mb-3">
              <div className="info-box info-box--numbers text-center p-3 bg-white" style={{ borderRadius: '10px' }}>
                <span className="info-box-number" style={{ fontSize: '32px', color: '#6c757d' }}>{demoCandidateStats.profileViews}</span>
                <h6 className="mb-0">Profielweergaven</h6>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-6 mb-3">
              <div className="info-box info-box--numbers text-center p-3 bg-white" style={{ borderRadius: '10px' }}>
                <span className="info-box-number c-green" style={{ fontSize: '32px' }}>{demoCandidateStats.interestReceived}</span>
                <h6 className="mb-0">Interesse ontvangen</h6>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-6 mb-3">
              <div className="info-box info-box--numbers text-center p-3 bg-white" style={{ borderRadius: '10px' }}>
                <span className="info-box-number c-blue" style={{ fontSize: '32px' }}>{demoCandidateStats.interestSent}</span>
                <h6 className="mb-0">Interesse getoond</h6>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="medium-padding120 bg-light-grey">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-lg-3 col-md-12 mb-4">
              <div className="bg-white p-4" style={{ borderRadius: '10px' }}>
                <h5 className="mb-4">Dashboard Menu</h5>
                <ul className="list-unstyled">
                  <li className="mb-3">
                    <button 
                      onClick={() => setActiveTab('matches')}
                      className={`btn btn-link text-left w-100 p-2 ${activeTab === 'matches' ? 'bg-yellow c-dark' : ''}`}
                      style={{ textDecoration: 'none', borderRadius: '5px', border: 'none', textAlign: 'left' }}
                    >
                      <i className="far fa-star mr-2"></i> Alle Matches
                    </button>
                  </li>
                  <li className="mb-3">
                    <button 
                      onClick={() => setActiveTab('interested')}
                      className={`btn btn-link text-left w-100 p-2 ${activeTab === 'interested' ? 'bg-yellow c-dark' : ''}`}
                      style={{ textDecoration: 'none', borderRadius: '5px', border: 'none', textAlign: 'left' }}
                    >
                      <i className="far fa-heart mr-2"></i> Mijn Interesse
                    </button>
                  </li>
                  <li className="mb-3">
                    <button 
                      onClick={() => setActiveTab('mutual')}
                      className={`btn btn-link text-left w-100 p-2 ${activeTab === 'mutual' ? 'bg-yellow c-dark' : ''}`}
                      style={{ textDecoration: 'none', borderRadius: '5px', border: 'none', textAlign: 'left' }}
                    >
                      <i className="far fa-handshake mr-2"></i> Mutual Matches
                      {demoCandidateStats.mutualMatches > 0 && (
                        <span className="badge bg-green c-white ml-2" style={{ borderRadius: '10px', padding: '2px 8px' }}>
                          {demoCandidateStats.mutualMatches}
                        </span>
                      )}
                    </button>
                  </li>
                  <li className="mb-3">
                    <button 
                      onClick={() => setActiveTab('profile')}
                      className={`btn btn-link text-left w-100 p-2 ${activeTab === 'profile' ? 'bg-yellow c-dark' : ''}`}
                      style={{ textDecoration: 'none', borderRadius: '5px', border: 'none', textAlign: 'left' }}
                    >
                      <i className="far fa-user mr-2"></i> Mijn Profiel
                    </button>
                  </li>
                  <li className="mb-3">
                    <button 
                      onClick={() => setActiveTab('tests')}
                      className={`btn btn-link text-left w-100 p-2 ${activeTab === 'tests' ? 'bg-yellow c-dark' : ''}`}
                      style={{ textDecoration: 'none', borderRadius: '5px', border: 'none', textAlign: 'left' }}
                    >
                      <i className="far fa-clipboard-check mr-2"></i> Mijn Testen
                      {(!demoPersonalityResult.completed || !demoSkillsResult.completed) && (
                        <span className="badge bg-red c-white ml-2" style={{ borderRadius: '10px', padding: '2px 8px' }}>!</span>
                      )}
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="col-lg-9 col-md-12">
              {activeTab === 'tests' ? (
                /* Tests Tab */
                <div>
                  <h3 className="mb-4">Mijn Testen</h3>
                  <p className="c-grey mb-4">
                    Je testresultaten helpen werkgevers om te begrijpen wie je bent en hoe je werkt. 
                    Dit verbetert de kwaliteit van je matches.
                  </p>

                  <div className="row">
                    {/* Personality Test Card - MBTI */}
                    <div className="col-md-6 mb-4">
                      <div className="bg-white p-4 h-100" style={{ borderRadius: '10px' }}>
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div className="d-flex align-items-center">
                            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: demoPersonalityResult.completed ? mbtiTypeInfo[demoPersonalityResult.type]?.color || '#6366f1' : '#e9ecef', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <span className="text-white" style={{ fontSize: '14px', fontWeight: '700' }}>
                                {demoPersonalityResult.completed ? demoPersonalityResult.type : 'MBTI'}
                              </span>
                            </div>
                            <div className="ml-3">
                              <h5 className="mb-0">Persoonlijkheidstest</h5>
                              <small className="c-grey">MBTI - 16 Types</small>
                            </div>
                          </div>
                          {demoPersonalityResult.completed && (
                            <span className="badge bg-green c-white" style={{ padding: '4px 10px', borderRadius: '12px' }}>
                              <i className="far fa-check mr-1"></i>Voltooid
                            </span>
                          )}
                        </div>

                        {demoPersonalityResult.completed ? (
                          <>
                            <div className="text-center mb-3">
                              <h4 className="mb-1" style={{ color: mbtiTypeInfo[demoPersonalityResult.type]?.color || '#6366f1', fontSize: '28px', letterSpacing: '4px' }}>
                                {demoPersonalityResult.type}
                              </h4>
                              <span className="c-grey">{mbtiTypeInfo[demoPersonalityResult.type]?.name || 'Onbekend type'}</span>
                            </div>

                            <div className="mb-3">
                              {[
                                { key: 'EI', left: 'E', right: 'I', value: demoPersonalityResult.percentages.EI },
                                { key: 'SN', left: 'S', right: 'N', value: demoPersonalityResult.percentages.SN },
                                { key: 'TF', left: 'T', right: 'F', value: demoPersonalityResult.percentages.TF },
                                { key: 'JP', left: 'J', right: 'P', value: demoPersonalityResult.percentages.JP },
                              ].map((dim) => (
                                <div key={dim.key} className="mb-2">
                                  <div className="d-flex justify-content-between mb-1" style={{ fontSize: '12px' }}>
                                    <span style={{ fontWeight: dim.value >= 50 ? '700' : '400' }}>{dim.left}</span>
                                    <span style={{ fontWeight: dim.value < 50 ? '700' : '400' }}>{dim.right}</span>
                                  </div>
                                  <div style={{ background: '#e9ecef', borderRadius: '5px', height: '8px', overflow: 'hidden', position: 'relative' }}>
                                    <div style={{ position: 'absolute', left: 0, width: `${dim.value}%`, height: '100%', background: '#dc2626', borderRadius: '5px 0 0 5px' }}></div>
                                    <div style={{ position: 'absolute', right: 0, width: `${100 - dim.value}%`, height: '100%', background: '#6366f1', borderRadius: '0 5px 5px 0' }}></div>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <Link href="/tests/personality" className="crumina-button button--dark button--bordered button--s w-100 text-center">
                              Test opnieuw doen
                            </Link>
                          </>
                        ) : (
                          <>
                            <p className="c-grey mb-3" style={{ fontSize: '14px' }}>
                              Ontdek je MBTI type (zoals ENTJ, INFP). Dit helpt werkgevers begrijpen hoe je in hun team past.
                            </p>
                            <Link href="/tests/personality" className="crumina-button button--yellow button--m w-100 text-center">
                              Start test
                            </Link>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Skills Test Card */}
                    <div className="col-md-6 mb-4">
                      <div className="bg-white p-4 h-100" style={{ borderRadius: '10px' }}>
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div className="d-flex align-items-center">
                            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: demoSkillsResult.completed ? skillLevelInfo[demoSkillsResult.overallLevel].color : '#e9ecef', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <i className="fas fa-chart-line text-white" style={{ fontSize: '20px' }}></i>
                            </div>
                            <div className="ml-3">
                              <h5 className="mb-0">Vaardighedentest</h5>
                              <small className="c-grey">5 Categorieen</small>
                            </div>
                          </div>
                          {demoSkillsResult.completed && (
                            <span className="badge bg-green c-white" style={{ padding: '4px 10px', borderRadius: '12px' }}>
                              <i className="far fa-check mr-1"></i>Voltooid
                            </span>
                          )}
                        </div>

                        {demoSkillsResult.completed ? (
                          <>
                            <div className="text-center mb-3">
                              <h4 className="mb-1" style={{ color: skillLevelInfo[demoSkillsResult.overallLevel].color }}>
                                {demoSkillsResult.overallPercentage}%
                              </h4>
                              <span className="c-grey">{skillLevelInfo[demoSkillsResult.overallLevel].label}</span>
                            </div>

                            <div className="mb-3">
                              {demoSkillsResult.results.slice(0, 4).map((result) => (
                                <div key={result.categoryId} className="mb-2">
                                  <div className="d-flex justify-content-between mb-1" style={{ fontSize: '12px' }}>
                                    <span>{result.categoryName}</span>
                                    <span>{result.percentage}%</span>
                                  </div>
                                  <div style={{ background: '#e9ecef', borderRadius: '5px', height: '8px', overflow: 'hidden' }}>
                                    <div style={{ width: `${result.percentage}%`, height: '100%', background: skillLevelInfo[result.level as keyof typeof skillLevelInfo]?.color || '#6c757d', borderRadius: '5px' }}></div>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <Link href="/tests/skills" className="crumina-button button--dark button--bordered button--s w-100 text-center">
                              Test opnieuw doen
                            </Link>
                          </>
                        ) : (
                          <>
                            <p className="c-grey mb-3" style={{ fontSize: '14px' }}>
                              Test je niveau in communicatie, probleemoplossend denken, samenwerking en meer.
                            </p>
                            <Link href="/tests/skills" className="crumina-button button--blue button--m w-100 text-center">
                              Start test
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Test benefits info */}
                  <div className="bg-white p-4 mt-2" style={{ borderRadius: '10px' }}>
                    <h5 className="mb-3"><i className="far fa-info-circle c-blue mr-2"></i>Waarom testen belangrijk zijn</h5>
                    <div className="row">
                      <div className="col-md-4 mb-3 mb-md-0">
                        <div className="d-flex align-items-start">
                          <i className="far fa-chart-line c-green mr-2 mt-1"></i>
                          <div>
                            <strong>Hogere matchscores</strong>
                            <p className="mb-0 c-grey" style={{ fontSize: '13px' }}>Testen verhogen je gemiddelde matchscore met 15-20%</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 mb-3 mb-md-0">
                        <div className="d-flex align-items-start">
                          <i className="far fa-eye c-blue mr-2 mt-1"></i>
                          <div>
                            <strong>Meer zichtbaarheid</strong>
                            <p className="mb-0 c-grey" style={{ fontSize: '13px' }}>Profielen met testen worden 3x vaker bekeken</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="d-flex align-items-start">
                          <i className="far fa-handshake c-yellow mr-2 mt-1"></i>
                          <div>
                            <strong>Betere fit</strong>
                            <p className="mb-0 c-grey" style={{ fontSize: '13px' }}>Werkgevers begrijpen beter of je past bij hun team</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : activeTab !== 'profile' ? (
                <>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="mb-0">
                      {activeTab === 'matches' && 'Jouw Job Matches'}
                      {activeTab === 'interested' && 'Jobs waar je interesse hebt getoond'}
                      {activeTab === 'mutual' && 'Mutual Matches - Klaar voor contact!'}
                    </h3>
                    <span className="c-grey">{filteredJobs.length} resultaten</span>
                  </div>

                  {activeTab === 'mutual' && filteredJobs.length > 0 && (
                    <div className="alert bg-green c-white mb-4 p-3" style={{ borderRadius: '10px' }}>
                      <i className="far fa-check-circle mr-2"></i>
                      Bij deze matches hebben zowel jij als de werkgever interesse getoond. Je kunt nu contact opnemen!
                    </div>
                  )}

                  {/* Job Cards */}
                  {filteredJobs.map((job) => (
                    <div key={job.id} className="ui-card mb-4" style={{ borderRadius: '10px', overflow: 'hidden' }}>
                      <div className="ui-card-content p-4">
                        <div className="row align-items-center">
                          <div className="col-lg-7 col-md-12">
                            <div className="d-flex align-items-start">
                              <div className="company-logo mr-3" style={{ width: '60px', height: '60px', background: '#f5f5f5', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <i className="far fa-building" style={{ fontSize: '24px', color: '#6c757d' }}></i>
                              </div>
                              <div>
                                <h4 className="mb-1">
                                  <Link href={`/jobs/job-details?id=${job.id}`} className="c-dark">
                                    {job.title}
                                  </Link>
                                </h4>
                                <p className="mb-2 c-grey">
                                  <strong>{job.company}</strong> - {job.location}
                                </p>
                                <div className="d-flex flex-wrap gap-2 mb-2">
                                  <span className="badge bg-light-grey c-dark" style={{ padding: '4px 10px', borderRadius: '15px', fontSize: '12px' }}>
                                    {job.type}
                                  </span>
                                  <span className="badge bg-light-grey c-dark" style={{ padding: '4px 10px', borderRadius: '15px', fontSize: '12px' }}>
                                    {job.salary}
                                  </span>
                                  <span className="c-grey" style={{ fontSize: '12px' }}>
                                    {job.postedDate}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-6 col-6 mt-3 mt-lg-0">
                            <div className="d-flex flex-column align-items-center">
                              <MatchScore score={job.matchScore} size="medium" />
                            </div>
                          </div>
                          <div className="col-lg-2 col-md-6 col-6 mt-3 mt-lg-0">
                            <div className="d-flex flex-column gap-2">
                              {(job.mutualInterest || (jobInterests[job.id] && job.employerInterested)) ? (
                                <button className="crumina-button button--green button--s w-100">
                                  <i className="far fa-envelope mr-1"></i> Contact
                                </button>
                              ) : (
                                <button 
                                  onClick={() => handleToggleInterest(job.id)}
                                  className={`crumina-button ${jobInterests[job.id] ? 'button--dark' : 'button--yellow'} button--s w-100`}
                                >
                                  <i className={`${jobInterests[job.id] ? 'fas' : 'far'} fa-heart mr-1`}></i>
                                  {jobInterests[job.id] ? 'Interesse' : 'Interesse'}
                                </button>
                              )}
                              <Link href={`/jobs/job-details?id=${job.id}`} className="crumina-button button--dark button--bordered button--s w-100 text-center">
                                Details
                              </Link>
                            </div>
                          </div>
                        </div>

                        {/* Match Details */}
                        <div className="mt-4 pt-3" style={{ borderTop: '1px solid #e9ecef' }}>
                          <div className="row">
                            <div className="col-md-6">
                              <h6 className="c-green mb-2">
                                <i className="far fa-check-circle mr-1"></i> Waarom je matcht:
                              </h6>
                              <ul className="list-unstyled mb-0">
                                {job.matchReasons.map((reason, idx) => (
                                  <li key={idx} className="c-grey" style={{ fontSize: '13px' }}>
                                    - {reason}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            {job.missingSkills.length > 0 && (
                              <div className="col-md-6">
                                <h6 className="c-yellow mb-2">
                                  <i className="far fa-lightbulb mr-1"></i> Aandachtspunten:
                                </h6>
                                <ul className="list-unstyled mb-0">
                                  {job.missingSkills.map((skill, idx) => (
                                    <li key={idx} className="c-grey" style={{ fontSize: '13px' }}>
                                      - {skill}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                          {job.employerInterested && !jobInterests[job.id] && (
                            <div className="mt-3 p-2 bg-green c-white" style={{ borderRadius: '5px', fontSize: '13px' }}>
                              <i className="far fa-bell mr-1"></i> Dit bedrijf heeft interesse in jou! Toon jouw interesse om contact te maken.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredJobs.length === 0 && (
                    <div className="text-center py-5">
                      <i className="far fa-search" style={{ fontSize: '48px', color: '#6c757d' }}></i>
                      <h4 className="mt-3">Geen matches gevonden</h4>
                      <p className="c-grey">Probeer een andere filter of wacht op nieuwe matches.</p>
                    </div>
                  )}
                </>
              ) : (
                /* Profile Tab */
                <div className="bg-white p-4" style={{ borderRadius: '10px' }}>
                  <h3 className="mb-4">Mijn Profiel</h3>
                  
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <h5>Persoonlijke informatie</h5>
                      <ul className="list-unstyled">
                        <li className="mb-2"><strong>Naam:</strong> {demoUserProfile.name}</li>
                        <li className="mb-2"><strong>Email:</strong> {demoUserProfile.email}</li>
                        <li className="mb-2"><strong>Locatie:</strong> {demoUserProfile.location}</li>
                        <li className="mb-2"><strong>Functie:</strong> {demoUserProfile.title}</li>
                        <li className="mb-2"><strong>Salarisverwachting:</strong> {demoUserProfile.salary}</li>
                      </ul>
                    </div>
                    <div className="col-md-6 mb-4">
                      <h5>Voorkeuren</h5>
                      <ul className="list-unstyled">
                        <li className="mb-2">
                          <i className={`far ${demoUserProfile.preferences.remote ? 'fa-check-circle c-green' : 'fa-times-circle c-red'} mr-2`}></i>
                          Remote werken
                        </li>
                        <li className="mb-2">
                          <i className={`far ${demoUserProfile.preferences.partTime ? 'fa-check-circle c-green' : 'fa-times-circle c-red'} mr-2`}></i>
                          Part-time
                        </li>
                        <li className="mb-2">
                          <i className={`far ${demoUserProfile.preferences.freelance ? 'fa-check-circle c-green' : 'fa-times-circle c-red'} mr-2`}></i>
                          Freelance
                        </li>
                      </ul>
                    </div>
                  </div>

                  <h5>Skills</h5>
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    {demoUserProfile.skills.map((skill, idx) => (
                      <span key={idx} className="badge bg-yellow c-dark" style={{ padding: '8px 16px', borderRadius: '20px', fontSize: '14px' }}>
                        {skill}
                      </span>
                    ))}
                  </div>

                  <h5>Werkstijl</h5>
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    {demoUserProfile.workStyle.map((style, idx) => (
                      <span key={idx} className="badge bg-light-grey c-dark" style={{ padding: '8px 16px', borderRadius: '20px', fontSize: '14px' }}>
                        {style}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 pt-4" style={{ borderTop: '1px solid #e9ecef' }}>
                    <Link href="/dashboard/candidate/profile/edit" className="crumina-button button--yellow button--m">
                      Profiel bewerken
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CandidateDashboard;
