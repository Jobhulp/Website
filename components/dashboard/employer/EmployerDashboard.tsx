"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { demoCandidateMatches, demoCompanyProfile, demoEmployerStats, demoEmployerJobs } from '../../../data/demo-data';
import MatchScore from '../../common/match-score/MatchScore';

type TabId = 'candidates' | 'interested' | 'mutual' | 'jobs' | 'company';

const EmployerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('candidates');
  const [candidateInterests, setCandidateInterests] = useState<Record<string, boolean>>(
    demoCandidateMatches.reduce((acc, candidate) => ({ ...acc, [candidate.id]: candidate.employerInterested }), {})
  );

  const handleToggleInterest = (candidateId: string) => {
    setCandidateInterests(prev => ({ ...prev, [candidateId]: !prev[candidateId] }));
  };

  const filteredCandidates = demoCandidateMatches.filter(candidate => {
    if (activeTab === 'interested') return candidateInterests[candidate.id];
    if (activeTab === 'mutual') return candidate.mutualInterest || (candidateInterests[candidate.id] && candidate.candidateInterested);
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
                <div className="company-logo mr-4" style={{ width: '100px', height: '100px', background: '#fff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="far fa-building" style={{ fontSize: '40px', color: '#6c757d' }}></i>
                </div>
                <div>
                  <h1 className="text-white mb-2">{demoCompanyProfile.name}</h1>
                  <p className="text-white mb-0" style={{ opacity: 0.8 }}>
                    {demoCompanyProfile.industry} - {demoCompanyProfile.location}
                  </p>
                  <div className="mt-2">
                    <span className="badge bg-yellow c-dark mr-2" style={{ padding: '6px 12px', borderRadius: '20px', fontWeight: 600 }}>
                      {demoCompanyProfile.openJobs} actieve vacatures
                    </span>
                    <span className="badge bg-green c-white" style={{ padding: '6px 12px', borderRadius: '20px', fontWeight: 600 }}>
                      {demoCompanyProfile.size}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 mt-4 mt-lg-0">
              <div className="d-flex justify-content-lg-end gap-2">
                <Link href="/dashboard/employer/job/new" className="crumina-button button--yellow button--m">
                  + Nieuwe Job
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
                <span className="info-box-number c-blue" style={{ fontSize: '32px' }}>{demoEmployerStats.totalCandidates}</span>
                <h6 className="mb-0">Totale Kandidaten</h6>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-6 mb-3">
              <div className="info-box info-box--numbers text-center p-3 bg-white" style={{ borderRadius: '10px' }}>
                <span className="info-box-number c-green" style={{ fontSize: '32px' }}>{demoEmployerStats.newCandidates}</span>
                <h6 className="mb-0">Nieuwe Matches</h6>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-6 mb-3">
              <div className="info-box info-box--numbers text-center p-3 bg-white" style={{ borderRadius: '10px' }}>
                <span className="info-box-number c-yellow" style={{ fontSize: '32px' }}>{demoEmployerStats.mutualMatches}</span>
                <h6 className="mb-0">Mutual Matches</h6>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-6 mb-3">
              <div className="info-box info-box--numbers text-center p-3 bg-white" style={{ borderRadius: '10px' }}>
                <span className="info-box-number" style={{ fontSize: '32px', color: '#6c757d' }}>{demoEmployerStats.activeJobs}</span>
                <h6 className="mb-0">Actieve Jobs</h6>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-6 mb-3">
              <div className="info-box info-box--numbers text-center p-3 bg-white" style={{ borderRadius: '10px' }}>
                <span className="info-box-number c-green" style={{ fontSize: '32px' }}>{demoEmployerStats.interestReceived}</span>
                <h6 className="mb-0">Interesse ontvangen</h6>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-6 mb-3">
              <div className="info-box info-box--numbers text-center p-3 bg-white" style={{ borderRadius: '10px' }}>
                <span className="info-box-number c-blue" style={{ fontSize: '32px' }}>{demoEmployerStats.interestSent}</span>
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
                      onClick={() => setActiveTab('candidates')}
                      className={`btn btn-link text-left w-100 p-2 ${activeTab === 'candidates' ? 'bg-yellow c-dark' : ''}`}
                      style={{ textDecoration: 'none', borderRadius: '5px', border: 'none', textAlign: 'left' }}
                    >
                      <i className="far fa-users mr-2"></i> Alle Kandidaten
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
                      {demoEmployerStats.mutualMatches > 0 && (
                        <span className="badge bg-green c-white ml-2" style={{ borderRadius: '10px', padding: '2px 8px' }}>
                          {demoEmployerStats.mutualMatches}
                        </span>
                      )}
                    </button>
                  </li>
                  <li className="mb-3">
                    <button 
                      onClick={() => setActiveTab('jobs')}
                      className={`btn btn-link text-left w-100 p-2 ${activeTab === 'jobs' ? 'bg-yellow c-dark' : ''}`}
                      style={{ textDecoration: 'none', borderRadius: '5px', border: 'none', textAlign: 'left' }}
                    >
                      <i className="far fa-briefcase mr-2"></i> Mijn Vacatures
                    </button>
                  </li>
                  <li className="mb-3">
                    <button 
                      onClick={() => setActiveTab('company')}
                      className={`btn btn-link text-left w-100 p-2 ${activeTab === 'company' ? 'bg-yellow c-dark' : ''}`}
                      style={{ textDecoration: 'none', borderRadius: '5px', border: 'none', textAlign: 'left' }}
                    >
                      <i className="far fa-building mr-2"></i> Bedrijfsprofiel
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="col-lg-9 col-md-12">
              {(activeTab === 'candidates' || activeTab === 'interested' || activeTab === 'mutual') && (
                <>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="mb-0">
                      {activeTab === 'candidates' && 'Kandidaat Matches'}
                      {activeTab === 'interested' && 'Kandidaten waar je interesse hebt getoond'}
                      {activeTab === 'mutual' && 'Mutual Matches - Klaar voor contact!'}
                    </h3>
                    <span className="c-grey">{filteredCandidates.length} resultaten</span>
                  </div>

                  {activeTab === 'mutual' && filteredCandidates.length > 0 && (
                    <div className="alert bg-green c-white mb-4 p-3" style={{ borderRadius: '10px' }}>
                      <i className="far fa-check-circle mr-2"></i>
                      Bij deze matches hebben zowel jij als de kandidaat interesse getoond. Je kunt nu contact opnemen!
                    </div>
                  )}

                  {/* Candidate Cards */}
                  {filteredCandidates.map((candidate) => (
                    <div key={candidate.id} className="ui-card mb-4" style={{ borderRadius: '10px', overflow: 'hidden' }}>
                      <div className="ui-card-content p-4">
                        <div className="row align-items-center">
                          <div className="col-lg-7 col-md-12">
                            <div className="d-flex align-items-start">
                              <div className="avatar mr-3" style={{ width: '60px', height: '60px' }}>
                                <img 
                                  src={candidate.avatar} 
                                  alt={candidate.name}
                                  style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }}
                                />
                              </div>
                              <div>
                                <h4 className="mb-1">
                                  <Link href={`/candidates/candidate-details?id=${candidate.id}`} className="c-dark">
                                    {candidate.name}
                                  </Link>
                                </h4>
                                <p className="mb-2 c-grey">
                                  <strong>{candidate.title}</strong> - {candidate.location}
                                </p>
                                <div className="d-flex flex-wrap gap-2 mb-2">
                                  <span className="badge bg-light-grey c-dark" style={{ padding: '4px 10px', borderRadius: '15px', fontSize: '12px' }}>
                                    {candidate.salary}
                                  </span>
                                  <span className="badge bg-light-grey c-dark" style={{ padding: '4px 10px', borderRadius: '15px', fontSize: '12px' }}>
                                    {candidate.availableFrom}
                                  </span>
                                </div>
                                <div className="d-flex flex-wrap gap-1">
                                  {candidate.skills.slice(0, 4).map((skill, idx) => (
                                    <span key={idx} className="badge bg-yellow c-dark" style={{ padding: '3px 8px', borderRadius: '10px', fontSize: '11px' }}>
                                      {skill}
                                    </span>
                                  ))}
                                  {candidate.skills.length > 4 && (
                                    <span className="badge bg-light-grey c-grey" style={{ padding: '3px 8px', borderRadius: '10px', fontSize: '11px' }}>
                                      +{candidate.skills.length - 4}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-6 col-6 mt-3 mt-lg-0">
                            <div className="d-flex flex-column align-items-center">
                              <MatchScore score={candidate.matchScore} size="medium" />
                            </div>
                          </div>
                          <div className="col-lg-2 col-md-6 col-6 mt-3 mt-lg-0">
                            <div className="d-flex flex-column gap-2">
                              {(candidate.mutualInterest || (candidateInterests[candidate.id] && candidate.candidateInterested)) ? (
                                <button className="crumina-button button--green button--s w-100">
                                  <i className="far fa-envelope mr-1"></i> Contact
                                </button>
                              ) : (
                                <button 
                                  onClick={() => handleToggleInterest(candidate.id)}
                                  className={`crumina-button ${candidateInterests[candidate.id] ? 'button--dark' : 'button--yellow'} button--s w-100`}
                                >
                                  <i className={`${candidateInterests[candidate.id] ? 'fas' : 'far'} fa-heart mr-1`}></i>
                                  {candidateInterests[candidate.id] ? 'Interesse' : 'Interesse'}
                                </button>
                              )}
                              <Link href={`/candidates/candidate-details?id=${candidate.id}`} className="crumina-button button--dark button--bordered button--s w-100 text-center">
                                Profiel
                              </Link>
                            </div>
                          </div>
                        </div>

                        {/* Match Details */}
                        <div className="mt-4 pt-3" style={{ borderTop: '1px solid #e9ecef' }}>
                          <div className="row">
                            <div className="col-md-6">
                              <h6 className="c-green mb-2">
                                <i className="far fa-check-circle mr-1"></i> Waarom deze kandidaat matcht:
                              </h6>
                              <ul className="list-unstyled mb-0">
                                {candidate.matchReasons.map((reason, idx) => (
                                  <li key={idx} className="c-grey" style={{ fontSize: '13px' }}>
                                    - {reason}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            {candidate.missingSkills.length > 0 && (
                              <div className="col-md-6">
                                <h6 className="c-yellow mb-2">
                                  <i className="far fa-lightbulb mr-1"></i> Aandachtspunten:
                                </h6>
                                <ul className="list-unstyled mb-0">
                                  {candidate.missingSkills.map((skill, idx) => (
                                    <li key={idx} className="c-grey" style={{ fontSize: '13px' }}>
                                      - {skill}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                          {candidate.candidateInterested && !candidateInterests[candidate.id] && (
                            <div className="mt-3 p-2 bg-green c-white" style={{ borderRadius: '5px', fontSize: '13px' }}>
                              <i className="far fa-bell mr-1"></i> Deze kandidaat heeft interesse in jouw bedrijf! Toon jouw interesse om contact te maken.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredCandidates.length === 0 && (
                    <div className="text-center py-5">
                      <i className="far fa-search" style={{ fontSize: '48px', color: '#6c757d' }}></i>
                      <h4 className="mt-3">Geen kandidaten gevonden</h4>
                      <p className="c-grey">Probeer een andere filter of wacht op nieuwe matches.</p>
                    </div>
                  )}
                </>
              )}

              {activeTab === 'jobs' && (
                <>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="mb-0">Mijn Vacatures</h3>
                    <Link href="/dashboard/employer/job/new" className="crumina-button button--yellow button--s">
                      + Nieuwe Job
                    </Link>
                  </div>

                  {demoEmployerJobs.map((job) => (
                    <div key={job.id} className="ui-card mb-4" style={{ borderRadius: '10px', overflow: 'hidden' }}>
                      <div className="ui-card-content p-4">
                        <div className="row align-items-center">
                          <div className="col-lg-8 col-md-12">
                            <h4 className="mb-1">{job.title}</h4>
                            <p className="mb-2 c-grey">
                              {job.location} - {job.type} - {job.salary}
                            </p>
                            <span className="c-grey" style={{ fontSize: '12px' }}>Geplaatst: {job.postedDate}</span>
                          </div>
                          <div className="col-lg-4 col-md-12 mt-3 mt-lg-0">
                            <div className="d-flex justify-content-lg-end gap-2">
                              <Link href={`/dashboard/employer/job/${job.id}/candidates`} className="crumina-button button--yellow button--s">
                                Kandidaten bekijken
                              </Link>
                              <Link href={`/dashboard/employer/job/${job.id}/edit`} className="crumina-button button--dark button--bordered button--s">
                                Bewerken
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {activeTab === 'company' && (
                <div className="bg-white p-4" style={{ borderRadius: '10px' }}>
                  <h3 className="mb-4">Bedrijfsprofiel</h3>
                  
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <h5>Bedrijfsinformatie</h5>
                      <ul className="list-unstyled">
                        <li className="mb-2"><strong>Naam:</strong> {demoCompanyProfile.name}</li>
                        <li className="mb-2"><strong>Industrie:</strong> {demoCompanyProfile.industry}</li>
                        <li className="mb-2"><strong>Locatie:</strong> {demoCompanyProfile.location}</li>
                        <li className="mb-2"><strong>Grootte:</strong> {demoCompanyProfile.size}</li>
                      </ul>
                    </div>
                    <div className="col-md-6 mb-4">
                      <h5>Over ons</h5>
                      <p className="c-grey">{demoCompanyProfile.description}</p>
                    </div>
                  </div>

                  <h5>Bedrijfscultuur</h5>
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    {demoCompanyProfile.culture.map((item, idx) => (
                      <span key={idx} className="badge bg-yellow c-dark" style={{ padding: '8px 16px', borderRadius: '20px', fontSize: '14px' }}>
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 pt-4" style={{ borderTop: '1px solid #e9ecef' }}>
                    <Link href="/dashboard/employer/company/edit" className="crumina-button button--yellow button--m">
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

export default EmployerDashboard;
