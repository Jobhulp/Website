'use client';

import React from 'react';
import Link from 'next/link';
import type { JobWithEmployer, WorkType } from '@/types/api';

const WORK_TYPE_STYLES: Record<WorkType, { label: string; class: string }> = {
  fulltime: { label: 'Voltijds', class: 'button--green' },
  parttime: { label: 'Deeltijds', class: 'button--blue-dark' },
  freelance: { label: 'Freelance', class: 'button--blue' },
  temporary: { label: 'Tijdelijk', class: 'button--red' },
  internship: { label: 'Stage', class: 'button--yellow' },
};

interface JobListGridProps {
  jobs: JobWithEmployer[];
  loading: boolean;
}

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

const JobListGrid: React.FC<JobListGridProps> = ({ jobs, loading }) => (
  <section className="bg-light-grey pb120">
    <div className="container">
      <div className="row mb20">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <h3 className="mb40 mt-0">
            {loading ? 'Zoeken...' : `${jobs.length} vacature${jobs.length !== 1 ? 's' : ''} gevonden`}
          </h3>
        </div>

        {loading && (
          <div className="col-12 text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Laden...</span>
            </div>
          </div>
        )}

        {!loading && jobs.length === 0 && (
          <div className="col-12 text-center py-5">
            <i className="far fa-search fa-3x c-grey mb-3"></i>
            <h4>Geen vacatures gevonden</h4>
            <p className="c-grey">Probeer andere zoektermen of pas je filters aan.</p>
          </div>
        )}

        {!loading && jobs.map((job) => {
          const workTypeStyle = WORK_TYPE_STYLES[job.workType] || { label: job.workType, class: 'button--grey' };
          
          return (
            <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mb40" key={job.id}>
              <div className="ui-card featured-vacancies h-100">
                <div className="ui-card-content">
                  <div className="vacancies-title-location">
                    <Link href={`/jobs/${job.id}`} className="vacancies-title h6">
                      {job.title}
                    </Link>
                    <div className="vacancies-location">
                      <time className="published">{formatDate(job.createdAt)}</time>
                      <i className="far fa-map-marker-alt me-1"></i>
                      {job.city || 'België'}
                    </div>
                  </div>
                  {job.employerLogoUrl ? (
                    <Link href={`/employers/${job.employerId}`} className="logo-company w-100">
                      <img className="logo" src={job.employerLogoUrl} alt={job.employerName || 'Bedrijf'} />
                    </Link>
                  ) : (
                    <div 
                      className="logo-company d-flex align-items-center justify-content-center w-100" 
                      style={{ 
                        height: '60px', 
                        background: '#f0f0f0', 
                        borderRadius: '8px',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#666'
                      }}
                    >
                      {job.employerName?.charAt(0) || 'J'}
                    </div>
                  )}
                </div>
                <div className="ui-card-footer">
                  <Link href={`/jobs?sectorId=${job.sectorId}`} className="link--uppercase-wide fs-12">
                    {job.sectorName || 'Algemeen'}
                  </Link>
                  <button 
                    type="button" 
                    className={`crumina-button ${workTypeStyle.class} button--xxs button--uppercase-wide`}
                  >
                    {workTypeStyle.label}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default JobListGrid;
