'use client';

import React, { useState, useEffect } from 'react';
import Tabs from '../../ui/Tabs';
import { api } from '@/lib/api-client';
import type { HomepageCitiesResponse, WorkType } from '@/types/api';

interface JobFiltersProps {
  onFiltersChange?: (filters: {
    workTypes: WorkType[];
    city: string;
    keywords: string;
  }) => void;
}

const WORK_TYPE_CONFIG: { value: WorkType; label: string; color: string }[] = [
  { value: 'parttime', label: 'Part Time', color: 'blue-dark' },
  { value: 'fulltime', label: 'Full Time', color: 'green' },
  { value: 'temporary', label: 'Temporary', color: 'red' },
  { value: 'internship', label: 'Internship', color: 'yellow' },
  { value: 'freelance', label: 'Freelance', color: 'blue' },
];

export const JobFilters: React.FC<JobFiltersProps> = ({ onFiltersChange }) => {
  const [activeTab, setActiveTab] = useState<'find' | 'candidate'>('find');
  
  // Filter state
  const [keywords, setKeywords] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedWorkTypes, setSelectedWorkTypes] = useState<WorkType[]>([]);
  
  // Cities from API
  const [cities, setCities] = useState<string[]>([]);
  const [citiesLoading, setCitiesLoading] = useState(true);

  // Fetch cities on mount
  useEffect(() => {
    async function fetchCities() {
      try {
        const response = await api.get<HomepageCitiesResponse>('/homepage/cities');
        setCities(response.cities);
      } catch {
        // Fallback to empty - cities dropdown will just show "Alle locaties"
        setCities([]);
      } finally {
        setCitiesLoading(false);
      }
    }
    fetchCities();
  }, []);

  // Notify parent of filter changes
  useEffect(() => {
    onFiltersChange?.({
      workTypes: selectedWorkTypes,
      city: selectedCity,
      keywords,
    });
  }, [selectedWorkTypes, selectedCity, keywords, onFiltersChange]);

  const handleWorkTypeToggle = (workType: WorkType) => {
    setSelectedWorkTypes((prev) =>
      prev.includes(workType)
        ? prev.filter((wt) => wt !== workType)
        : [...prev, workType]
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filters are already applied via useEffect, but this could trigger additional search logic
  };

  const tabList = [
    { label: 'Ik zoek een job', value: 'find' },
    { label: 'Ik zoek een kandidaat', value: 'candidate' },
  ];

  const renderFilterForm = (idPrefix: string) => (
    <form className="form--search" onSubmit={handleSearch}>
      <div className="row">
        <div className="col-md-4 mb-3">
          <input
            name="keywords"
            placeholder="Zoekwoorden (bv. webdesign)"
            type="text"
            className="input input-bordered w-full"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </div>
        <div className="col-md-3 mb-3">
          <select
            id={`${idPrefix}-specialism`}
            className="puzzle--select w-full"
            value=""
            disabled
          >
            <option value="">Alle specialismen</option>
          </select>
        </div>
        <div className="col-md-3 mb-3">
          <select
            id={`${idPrefix}-location`}
            className="puzzle--select w-full"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={citiesLoading}
          >
            <option value="">Alle locaties</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-2 mb-3">
          <button
            type="submit"
            className="crumina-button button--dark button--xl w-full"
          >
            Zoeken
          </button>
        </div>
      </div>
      <div className="row mt-4 mt-md-0">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="checkboxes-wrap">
            {WORK_TYPE_CONFIG.map(({ value, label, color }) => (
              <div key={value} className={`checkbox checkbox--${color}`}>
                <label>
                  <input
                    type="checkbox"
                    name={`workType-${value}`}
                    checked={selectedWorkTypes.includes(value)}
                    onChange={() => handleWorkTypeToggle(value)}
                  />
                  <span className="checkbox-material">
                    <span className="check"></span>
                  </span>
                  {label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );

  return (
    <section>
      <div className="tabs tabs--primary negative-margin-top-63">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <Tabs
                tabs={tabList}
                activeTab={activeTab}
                onTabChange={(tab) => setActiveTab(tab as 'find' | 'candidate')}
                className="tabs--primary negative-margin-top-63"
              />
            </div>
          </div>
        </div>
        <div className="tab-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                {activeTab === 'find' && (
                  <div
                    className="tab-pane active"
                    id="find"
                    role="tabpanel"
                    aria-labelledby="find-tab"
                  >
                    {renderFilterForm('find')}
                  </div>
                )}
                {activeTab === 'candidate' && (
                  <div
                    className="tab-pane active"
                    id="candidate"
                    role="tabpanel"
                    aria-labelledby="candidate-tab"
                  >
                    {renderFilterForm('candidate')}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
