'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api-client';
import type { SectorCategory, WorkType, ExperienceLevel, RemotePreference } from '@/types/api';

// Belgian provinces
const BELGIAN_PROVINCES = [
  'Antwerpen',
  'Brussel',
  'Henegouwen',
  'Limburg',
  'Luik',
  'Luxemburg',
  'Namen',
  'Oost-Vlaanderen',
  'Vlaams-Brabant',
  'Waals-Brabant',
  'West-Vlaanderen',
];

const WORK_TYPES: { value: WorkType; label: string; color: string }[] = [
  { value: 'fulltime', label: 'Voltijds', color: 'green' },
  { value: 'parttime', label: 'Deeltijds', color: 'blue-dark' },
  { value: 'freelance', label: 'Freelance', color: 'blue' },
  { value: 'temporary', label: 'Tijdelijk', color: 'red' },
  { value: 'internship', label: 'Stage', color: 'yellow' },
];

const EXPERIENCE_LEVELS: { value: ExperienceLevel; label: string }[] = [
  { value: 'junior', label: 'Junior (0-2 jaar)' },
  { value: 'medior', label: 'Medior (2-5 jaar)' },
  { value: 'senior', label: 'Senior (5+ jaar)' },
];

const REMOTE_OPTIONS: { value: RemotePreference | 'all'; label: string }[] = [
  { value: 'all', label: 'Alle werkvormen' },
  { value: 'onsite', label: 'Op locatie' },
  { value: 'hybrid', label: 'Hybride' },
  { value: 'remote', label: 'Volledig remote' },
];

const SALARY_RANGES = [
  { value: '', label: 'Alle salarissen' },
  { value: '0-2000', label: '€0 - €2.000' },
  { value: '2000-3000', label: '€2.000 - €3.000' },
  { value: '3000-4000', label: '€3.000 - €4.000' },
  { value: '4000-5000', label: '€4.000 - €5.000' },
  { value: '5000+', label: '€5.000+' },
];

interface Filters {
  keyword: string;
  sectorId: string;
  province: string;
  workTypes: WorkType[];
  experienceLevel: ExperienceLevel | '';
  remotePreference: RemotePreference | 'all';
  salaryRange: string;
}

const JobSearchTabs: React.FC = () => {
  const [sectors, setSectors] = useState<SectorCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    keyword: '',
    sectorId: '',
    province: '',
    workTypes: [],
    experienceLevel: '',
    remotePreference: 'all',
    salaryRange: '',
  });

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const response = await api.get<{ categories: SectorCategory[] }>('/skills/categories');
        setSectors(response.categories);
      } catch (error) {
        console.error('Failed to fetch sectors:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSectors();
  }, []);

  const handleWorkTypeToggle = (workType: WorkType) => {
    setFilters(prev => ({
      ...prev,
      workTypes: prev.workTypes.includes(workType)
        ? prev.workTypes.filter(t => t !== workType)
        : [...prev.workTypes, workType],
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Build query params and update URL/fetch results
    const params = new URLSearchParams();
    if (filters.keyword) params.set('q', filters.keyword);
    if (filters.sectorId) params.set('sector', filters.sectorId);
    if (filters.province) params.set('province', filters.province);
    if (filters.workTypes.length) params.set('workTypes', filters.workTypes.join(','));
    if (filters.experienceLevel) params.set('experience', filters.experienceLevel);
    if (filters.remotePreference !== 'all') params.set('remote', filters.remotePreference);
    if (filters.salaryRange) params.set('salary', filters.salaryRange);
    
    // For now, just log - would normally update URL or call parent
    console.log('Search filters:', Object.fromEntries(params));
  };

  const handleReset = () => {
    setFilters({
      keyword: '',
      sectorId: '',
      province: '',
      workTypes: [],
      experienceLevel: '',
      remotePreference: 'all',
      salaryRange: '',
    });
  };

  const activeFilterCount = [
    filters.sectorId,
    filters.province,
    filters.workTypes.length > 0,
    filters.experienceLevel,
    filters.remotePreference !== 'all',
    filters.salaryRange,
  ].filter(Boolean).length;

  return (
    <section>
      <div className="tabs tabs--border-primary negative-margin-top-115">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="d-flex align-items-center justify-content-between flex-wrap mb-3">
                <h2 className="h2 mb-0 c-dark">Vind je ideale job</h2>
                <span className="c-grey fs-14">
                  <i className="far fa-briefcase mr-2"></i>
                  150+ actieve vacatures
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="tab-content">
          <div className="container">
            <div className="row pb-4">
              <div className="col-lg-12">
                <form className="form--search" onSubmit={handleSearch}>
                  {/* Main search row */}
                  <div 
                    className="p-4 rounded-lg mb-4"
                    style={{ background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
                  >
                    <div className="row align-items-end">
                      <div className="col-lg-4 col-md-6 mb-3 mb-lg-0">
                        <label className="form-label fw-600 mb-2 c-dark">
                          <i className="far fa-search mr-2 c-primary"></i>
                          Zoekterm
                        </label>
                        <input
                          type="text"
                          placeholder="Functie, skill of bedrijf..."
                          className="input input-bordered w-full"
                          value={filters.keyword}
                          onChange={(e) => setFilters(prev => ({ ...prev, keyword: e.target.value }))}
                        />
                      </div>
                      
                      <div className="col-lg-3 col-md-6 mb-3 mb-lg-0">
                        <label className="form-label fw-600 mb-2 c-dark">
                          <i className="far fa-industry mr-2 c-primary"></i>
                          Sector
                        </label>
                        <select
                          className="puzzle--select w-full"
                          value={filters.sectorId}
                          onChange={(e) => setFilters(prev => ({ ...prev, sectorId: e.target.value }))}
                          disabled={loading}
                        >
                          <option value="">Alle sectoren</option>
                          {sectors.map(sector => (
                            <option key={sector.id} value={sector.id}>
                              {sector.name} ({sector.skillCount})
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="col-lg-3 col-md-6 mb-3 mb-lg-0">
                        <label className="form-label fw-600 mb-2 c-dark">
                          <i className="far fa-map-marker-alt mr-2 c-primary"></i>
                          Regio
                        </label>
                        <select
                          className="puzzle--select w-full"
                          value={filters.province}
                          onChange={(e) => setFilters(prev => ({ ...prev, province: e.target.value }))}
                        >
                          <option value="">Heel België</option>
                          {BELGIAN_PROVINCES.map(province => (
                            <option key={province} value={province}>{province}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="col-lg-2 col-md-6">
                        <button 
                          type="submit" 
                          className="crumina-button button--primary button--l w-full"
                        >
                          <i className="far fa-search mr-2"></i>
                          Zoeken
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Toggle advanced filters */}
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <button
                      type="button"
                      className="btn btn-link p-0 d-flex align-items-center"
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      style={{ textDecoration: 'none' }}
                    >
                      <i className={`far fa-sliders-h mr-2 c-primary`}></i>
                      <span className="c-dark fw-500">
                        Geavanceerde filters
                        {activeFilterCount > 0 && (
                          <span 
                            className="ml-2 badge"
                            style={{ 
                              background: '#4ade80', 
                              color: '#fff',
                              padding: '2px 8px',
                              borderRadius: '10px',
                              fontSize: '12px'
                            }}
                          >
                            {activeFilterCount}
                          </span>
                        )}
                      </span>
                      <i className={`far fa-chevron-${showAdvanced ? 'up' : 'down'} ml-2 c-grey`}></i>
                    </button>

                    {activeFilterCount > 0 && (
                      <button
                        type="button"
                        className="btn btn-link p-0 c-grey fs-14"
                        onClick={handleReset}
                        style={{ textDecoration: 'none' }}
                      >
                        <i className="far fa-times mr-1"></i>
                        Filters wissen
                      </button>
                    )}
                  </div>

                  {/* Advanced filters panel */}
                  {showAdvanced && (
                    <div 
                      className="p-4 rounded-lg mb-4"
                      style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
                    >
                      <div className="row">
                        {/* Work type */}
                        <div className="col-lg-12 mb-4">
                          <label className="form-label fw-600 mb-3 c-dark">
                            <i className="far fa-clock mr-2 c-primary"></i>
                            Type contract
                          </label>
                          <div className="d-flex flex-wrap gap-2">
                            {WORK_TYPES.map(type => (
                              <button
                                key={type.value}
                                type="button"
                                onClick={() => handleWorkTypeToggle(type.value)}
                                className={`crumina-button button--xxs ${
                                  filters.workTypes.includes(type.value)
                                    ? `button--${type.color}`
                                    : 'button--bordered'
                                }`}
                                style={{ 
                                  transition: 'all 0.2s',
                                  opacity: filters.workTypes.includes(type.value) ? 1 : 0.7
                                }}
                              >
                                {filters.workTypes.includes(type.value) && (
                                  <i className="far fa-check mr-1"></i>
                                )}
                                {type.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Experience & Remote & Salary */}
                        <div className="col-lg-4 col-md-6 mb-3">
                          <label className="form-label fw-600 mb-2 c-dark">
                            <i className="far fa-user-tie mr-2 c-primary"></i>
                            Ervaringsniveau
                          </label>
                          <select
                            className="puzzle--select w-full"
                            value={filters.experienceLevel}
                            onChange={(e) => setFilters(prev => ({ 
                              ...prev, 
                              experienceLevel: e.target.value as ExperienceLevel | '' 
                            }))}
                          >
                            <option value="">Alle niveaus</option>
                            {EXPERIENCE_LEVELS.map(level => (
                              <option key={level.value} value={level.value}>{level.label}</option>
                            ))}
                          </select>
                        </div>

                        <div className="col-lg-4 col-md-6 mb-3">
                          <label className="form-label fw-600 mb-2 c-dark">
                            <i className="far fa-home mr-2 c-primary"></i>
                            Werklocatie
                          </label>
                          <select
                            className="puzzle--select w-full"
                            value={filters.remotePreference}
                            onChange={(e) => setFilters(prev => ({ 
                              ...prev, 
                              remotePreference: e.target.value as RemotePreference | 'all' 
                            }))}
                          >
                            {REMOTE_OPTIONS.map(option => (
                              <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                          </select>
                        </div>

                        <div className="col-lg-4 col-md-6 mb-3">
                          <label className="form-label fw-600 mb-2 c-dark">
                            <i className="far fa-euro-sign mr-2 c-primary"></i>
                            Salaris (bruto/maand)
                          </label>
                          <select
                            className="puzzle--select w-full"
                            value={filters.salaryRange}
                            onChange={(e) => setFilters(prev => ({ ...prev, salaryRange: e.target.value }))}
                          >
                            {SALARY_RANGES.map(range => (
                              <option key={range.value} value={range.value}>{range.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Quick filter tags */}
                      <div className="mt-3 pt-3" style={{ borderTop: '1px solid #e2e8f0' }}>
                        <span className="c-grey fs-14 mr-3">Populair:</span>
                        <button
                          type="button"
                          className="crumina-button button--bordered button--xxs mr-2 mb-2"
                          onClick={() => setFilters(prev => ({ ...prev, remotePreference: 'remote' }))}
                        >
                          <i className="far fa-laptop-house mr-1"></i>
                          Remote jobs
                        </button>
                        <button
                          type="button"
                          className="crumina-button button--bordered button--xxs mr-2 mb-2"
                          onClick={() => setFilters(prev => ({ ...prev, experienceLevel: 'junior' }))}
                        >
                          <i className="far fa-seedling mr-1"></i>
                          Starter-friendly
                        </button>
                        <button
                          type="button"
                          className="crumina-button button--bordered button--xxs mr-2 mb-2"
                          onClick={() => setFilters(prev => ({ ...prev, salaryRange: '4000-5000' }))}
                        >
                          <i className="far fa-coins mr-1"></i>
                          €4k+ salaris
                        </button>
                        <button
                          type="button"
                          className="crumina-button button--bordered button--xxs mr-2 mb-2"
                          onClick={() => setFilters(prev => ({ ...prev, workTypes: ['parttime'] }))}
                        >
                          <i className="far fa-hourglass-half mr-1"></i>
                          Deeltijds mogelijk
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Active filter pills */}
                  {activeFilterCount > 0 && !showAdvanced && (
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      {filters.sectorId && (
                        <span className="badge d-flex align-items-center" style={{ background: '#e0e7ff', color: '#4f46e5', padding: '6px 12px', borderRadius: '20px' }}>
                          {sectors.find(s => s.id === filters.sectorId)?.name}
                          <button 
                            type="button"
                            className="ml-2 p-0 border-0 bg-transparent"
                            onClick={() => setFilters(prev => ({ ...prev, sectorId: '' }))}
                            style={{ lineHeight: 1 }}
                          >
                            <i className="far fa-times" style={{ color: '#4f46e5' }}></i>
                          </button>
                        </span>
                      )}
                      {filters.province && (
                        <span className="badge d-flex align-items-center" style={{ background: '#dcfce7', color: '#166534', padding: '6px 12px', borderRadius: '20px' }}>
                          {filters.province}
                          <button 
                            type="button"
                            className="ml-2 p-0 border-0 bg-transparent"
                            onClick={() => setFilters(prev => ({ ...prev, province: '' }))}
                            style={{ lineHeight: 1 }}
                          >
                            <i className="far fa-times" style={{ color: '#166534' }}></i>
                          </button>
                        </span>
                      )}
                      {filters.workTypes.map(wt => (
                        <span key={wt} className="badge d-flex align-items-center" style={{ background: '#fef3c7', color: '#b45309', padding: '6px 12px', borderRadius: '20px' }}>
                          {WORK_TYPES.find(t => t.value === wt)?.label}
                          <button 
                            type="button"
                            className="ml-2 p-0 border-0 bg-transparent"
                            onClick={() => handleWorkTypeToggle(wt)}
                            style={{ lineHeight: 1 }}
                          >
                            <i className="far fa-times" style={{ color: '#b45309' }}></i>
                          </button>
                        </span>
                      ))}
                      {filters.experienceLevel && (
                        <span className="badge d-flex align-items-center" style={{ background: '#f3e8ff', color: '#7c3aed', padding: '6px 12px', borderRadius: '20px' }}>
                          {EXPERIENCE_LEVELS.find(l => l.value === filters.experienceLevel)?.label}
                          <button 
                            type="button"
                            className="ml-2 p-0 border-0 bg-transparent"
                            onClick={() => setFilters(prev => ({ ...prev, experienceLevel: '' }))}
                            style={{ lineHeight: 1 }}
                          >
                            <i className="far fa-times" style={{ color: '#7c3aed' }}></i>
                          </button>
                        </span>
                      )}
                      {filters.remotePreference !== 'all' && (
                        <span className="badge d-flex align-items-center" style={{ background: '#cffafe', color: '#0891b2', padding: '6px 12px', borderRadius: '20px' }}>
                          {REMOTE_OPTIONS.find(o => o.value === filters.remotePreference)?.label}
                          <button 
                            type="button"
                            className="ml-2 p-0 border-0 bg-transparent"
                            onClick={() => setFilters(prev => ({ ...prev, remotePreference: 'all' }))}
                            style={{ lineHeight: 1 }}
                          >
                            <i className="far fa-times" style={{ color: '#0891b2' }}></i>
                          </button>
                        </span>
                      )}
                      {filters.salaryRange && (
                        <span className="badge d-flex align-items-center" style={{ background: '#fee2e2', color: '#dc2626', padding: '6px 12px', borderRadius: '20px' }}>
                          {SALARY_RANGES.find(r => r.value === filters.salaryRange)?.label}
                          <button 
                            type="button"
                            className="ml-2 p-0 border-0 bg-transparent"
                            onClick={() => setFilters(prev => ({ ...prev, salaryRange: '' }))}
                            style={{ lineHeight: 1 }}
                          >
                            <i className="far fa-times" style={{ color: '#dc2626' }}></i>
                          </button>
                        </span>
                      )}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobSearchTabs;
