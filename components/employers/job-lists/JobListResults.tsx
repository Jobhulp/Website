'use client';

import React from 'react';
import Link from 'next/link';
import type { JobWithEmployer, WorkType } from '@/types/api';
import FeaturedJobsSlider from './FeaturedJobsSlider';

const WORK_TYPE_STYLES: Record<WorkType, { label: string; class: string }> = {
  fulltime: { label: 'Voltijds', class: 'button--green' },
  parttime: { label: 'Deeltijds', class: 'button--blue-dark' },
  freelance: { label: 'Freelance', class: 'button--blue' },
  temporary: { label: 'Tijdelijk', class: 'button--red' },
  internship: { label: 'Stage', class: 'button--yellow' },
};

interface JobListResultsProps {
  jobs: JobWithEmployer[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const JobListResults: React.FC<JobListResultsProps> = ({
  jobs,
  loading,
  error,
  totalCount,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('...');
      }
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      
      pages.push(totalPages);
    }
    
    return pages;
  };

  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return null;
    if (min && max) return `€${min.toLocaleString()} - €${max.toLocaleString()}`;
    if (min) return `Vanaf €${min.toLocaleString()}`;
    if (max) return `Tot €${max.toLocaleString()}`;
    return null;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Vandaag';
    if (diffDays === 1) return 'Gisteren';
    if (diffDays < 7) return `${diffDays} dagen geleden`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weken geleden`;
    return date.toLocaleDateString('nl-BE', { day: 'numeric', month: 'short' });
  };

  return (
    <section id="job-results" className="bg-light-grey pb120">
      <div className="container">
        <div className="row mb40">
          <div className="col-lg-8">
            {/* Results header */}
            <div className="d-flex justify-content-between align-items-center mb40">
              <h3 className="mb-0 mt-0">
                {loading ? 'Zoeken...' : `${totalCount} vacature${totalCount !== 1 ? 's' : ''} gevonden`}
              </h3>
              {!loading && totalCount > 0 && (
                <span className="c-grey">
                  Pagina {currentPage} van {totalPages}
                </span>
              )}
            </div>

            {/* Loading state */}
            {loading && (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Laden...</span>
                </div>
                <p className="mt-3 c-grey">Vacatures laden...</p>
              </div>
            )}

            {/* Error state */}
            {error && !loading && (
              <div className="alert alert-danger" role="alert">
                <i className="far fa-exclamation-circle me-2"></i>
                {error}
              </div>
            )}

            {/* Empty state */}
            {!loading && !error && jobs.length === 0 && (
              <div className="text-center py-5">
                <i className="far fa-search fa-3x c-grey mb-3"></i>
                <h4>Geen vacatures gevonden</h4>
                <p className="c-grey">
                  Probeer andere zoektermen of pas je filters aan.
                </p>
              </div>
            )}

            {/* Job listings */}
            {!loading && !error && jobs.map((job) => {
              const workTypeStyle = WORK_TYPE_STYLES[job.workType] || { label: job.workType, class: 'button--grey' };
              const salary = formatSalary(job.salaryMin, job.salaryMax);
              
              return (
                <div className="ui-card featured-vacancies mb-4" key={job.id}>
                  <div className="ui-card-content">
                    <div className="vacancies-title-location">
                      <Link href={`/jobs/${job.id}`} className="vacancies-title h6">
                        {job.title}
                      </Link>
                      <div className="vacancies-location">
                        <time className="published">{formatDate(job.createdAt)}</time>
                        <i className="far fa-map-marker-alt me-1"></i>
                        {job.city || 'België'}
                        {job.remotePreference === 'remote' && (
                          <span className="badge bg-success ms-2" style={{ fontSize: '10px' }}>Remote</span>
                        )}
                        {job.remotePreference === 'hybrid' && (
                          <span className="badge bg-info ms-2" style={{ fontSize: '10px' }}>Hybride</span>
                        )}
                      </div>
                      {salary && (
                        <div className="vacancies-salary mt-1">
                          <i className="far fa-euro-sign me-1"></i>
                          <span className="c-grey">{salary}/maand</span>
                        </div>
                      )}
                    </div>
                    {job.employerLogoUrl ? (
                      <Link href={`/employers/${job.employerId}`} className="logo-company">
                        <img 
                          className="logo" 
                          src={job.employerLogoUrl} 
                          alt={job.employerName || 'Bedrijf'} 
                        />
                      </Link>
                    ) : (
                      <div className="logo-company d-flex align-items-center justify-content-center" 
                           style={{ 
                             width: '60px', 
                             height: '60px', 
                             background: '#f0f0f0', 
                             borderRadius: '8px',
                             fontSize: '24px',
                             fontWeight: 'bold',
                             color: '#666'
                           }}>
                        {job.employerName?.charAt(0) || 'J'}
                      </div>
                    )}
                  </div>
                  <div className="ui-card-footer">
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                      <Link href={`/jobs?sectorId=${job.sectorId}`} className="link--uppercase-wide fs-12">
                        {job.sectorName || 'Algemeen'}
                      </Link>
                      {job.experienceLevel && (
                        <span className="badge bg-light text-dark" style={{ fontSize: '10px' }}>
                          {job.experienceLevel === 'junior' ? 'Junior' : 
                           job.experienceLevel === 'medior' ? 'Medior' : 'Senior'}
                        </span>
                      )}
                    </div>
                    <button 
                      type="button" 
                      className={`crumina-button ${workTypeStyle.class} button--xxs button--uppercase-wide`}
                    >
                      {workTypeStyle.label}
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="row mt-4">
                <div className="col-lg-12">
                  <nav className="navigation d-flex align-items-center justify-content-center gap-2">
                    <button 
                      onClick={() => onPageChange(1)}
                      disabled={currentPage === 1}
                      className="page-numbers btn-start"
                      aria-label="Eerste pagina"
                    >
                      <i className="puzzle-icon fal fa-angle-double-left"></i>
                    </button>
                    <button 
                      onClick={() => onPageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="page-numbers btn--prev"
                      aria-label="Vorige pagina"
                    >
                      <i className="puzzle-icon fal fa-angle-left"></i>
                    </button>
                    
                    {getPageNumbers().map((page, idx) => (
                      typeof page === 'number' ? (
                        <button
                          key={idx}
                          onClick={() => onPageChange(page)}
                          className={`page-numbers ${currentPage === page ? 'current' : ''}`}
                        >
                          <span>{page}</span>
                        </button>
                      ) : (
                        <span key={idx} className="page-numbers dots">...</span>
                      )
                    ))}
                    
                    <button 
                      onClick={() => onPageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="page-numbers btn--next"
                      aria-label="Volgende pagina"
                    >
                      <i className="puzzle-icon fal fa-angle-right"></i>
                    </button>
                    <button 
                      onClick={() => onPageChange(totalPages)}
                      disabled={currentPage === totalPages}
                      className="page-numbers btn-end"
                      aria-label="Laatste pagina"
                    >
                      <i className="puzzle-icon fal fa-angle-double-right"></i>
                    </button>
                    <span className="page-numbers all-pages">{totalPages} Pagina&apos;s</span>
                  </nav>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="col-lg-4 mt-4 mt-lg-0">
            <aside aria-label="sidebar" className="sidebar sidebar-right">
              <FeaturedJobsSlider />
              
              {/* CTA Banner */}
              <div className="widget w-banner widget-sidebar mt-4">
                <div className="banner-content" style={{ background: '#1a1a2e', padding: '30px', borderRadius: '12px' }}>
                  <h4 className="widget-title" style={{ color: '#fff' }}>
                    Ontvang jobs in je mailbox
                  </h4>
                  <p style={{ color: '#9ca3af', fontSize: '14px' }}>
                    Mis geen enkele vacature die bij je past.
                  </p>
                  <Link 
                    href="/register?type=candidate" 
                    className="crumina-button button--yellow button--m w-100 mt-3"
                  >
                    Gratis aanmelden
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobListResults;
