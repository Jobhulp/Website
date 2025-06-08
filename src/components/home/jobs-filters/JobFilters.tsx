'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import type { StylesConfig, GroupBase, SingleValue } from 'react-select';
import Input from '../../ui/Input';
import Tabs from '../../ui/Tabs';

const Select = dynamic(() => import('react-select'), { ssr: false }) as React.ComponentType<{
  options: Option[];
  value: Option;
  onChange: (option: Option | null) => void;
  styles: StylesConfig<Option, false, GroupBase<Option>>;
  isSearchable: boolean;
  classNamePrefix: string;
  id: string;
  instanceId?: string;
  placeholder?: string;
}>;

interface JobFiltersProps {
  onSearch?: (filters: {
    keywords: string;
    specialism: string;
    location: string;
  }) => void;
}

interface Option {
  value: string;
  label: string;
}

const specialismOptions: Option[] = [
  { value: 'all', label: 'Alle specialismen' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'full-time', label: 'Full Time' },
  { value: 'internship', label: 'Stage' },
  { value: 'part-time', label: 'Part Time' },
  { value: 'temporary', label: 'Tijdelijk' },
];

const locationOptions: Option[] = [
  { value: 'all', label: 'Alle Locaties' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'full-time', label: 'Full Time' },
  { value: 'internship', label: 'Stage' },
  { value: 'part-time', label: 'Part Time' },
  { value: 'temporary', label: 'Tijdelijk' },
];

const customSelectStyles: StylesConfig<Option, false, GroupBase<Option>> = {
  control: (base) => ({
    ...base,
    minHeight: '38px',
    backgroundColor: '#fff',
    borderColor: '#ced4da',
    '&:hover': {
      borderColor: '#ced4da'
    }
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? '#0d6efd' : '#fff',
    color: state.isSelected ? '#fff' : '#212529',
    '&:hover': {
      backgroundColor: state.isSelected ? '#0d6efd' : '#e9ecef'
    }
  })
};

// Type guard for react-select single value
function isOption(option: SingleValue<Option>): option is Option {
  return option !== null && typeof option === 'object' && 'value' in option && 'label' in option;
}

export const JobFilters: React.FC<JobFiltersProps> = () => {
  const [activeTab, setActiveTab] = useState<'find' | 'candidate'>('find');
  const [candidateSpecialism, setCandidateSpecialism] = useState<Option>(specialismOptions[0]);
  const [candidateLocation, setCandidateLocation] = useState<Option>(locationOptions[0]);
  const [findKeywords, setFindKeywords] = useState('');
  const [findSpecialism, setFindSpecialism] = useState<Option>(specialismOptions[0]);
  const [findLocation, setFindLocation] = useState<Option>(locationOptions[0]);

  const tabList = [
    { label: 'Vind een Job', value: 'find' },
    { label: 'Zoek een kandidaat', value: 'candidate' },
  ];

  return (
    <section>
      <div className="tabs tabs--primary negative-margin-top-63">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <Tabs
                tabs={tabList}
                activeTab={activeTab}
                onTabChange={tab => setActiveTab(tab as 'find' | 'candidate')}
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
                  <div className="tab-pane active" id="find" role="tabpanel" aria-labelledby="find-tab">
                    <form className="form--search">
                      <div className="row">
                        <div className="col-md-4 col-sm-6 col-xs-12 mb-3 mb-md-0">
                          <Input
                            name="name"
                            placeholder="Keywords"
                            type="text"
                            value={findKeywords}
                            onChange={e => setFindKeywords(e.target.value)}
                          />
                          <div className="c-grey fs-14">* Zoekwoorden bijv. webdesign</div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12 mb-3 mb-md-0">
                          <Select
                            instanceId="find-specialism"
                            id="select1"
                            classNamePrefix="puzzle--select"
                            options={specialismOptions}
                            value={findSpecialism}
                            onChange={(option: Option | null) => { if (isOption(option)) setFindSpecialism(option); }}
                            styles={customSelectStyles}
                            isSearchable={false}
                            placeholder="Alle specialismen"
                          />
                          <div className="c-grey fs-14">* Filter op specialismen bijv. ontwikkelaar</div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12 mb-3 mb-md-0">
                          <Select
                            instanceId="find-location"
                            id="select2"
                            classNamePrefix="puzzle--select"
                            options={locationOptions}
                            value={findLocation}
                            onChange={(option: Option | null) => { if (isOption(option)) setFindLocation(option); }}
                            styles={customSelectStyles}
                            isSearchable={false}
                            placeholder="Alle Locaties"
                          />
                        </div>
                        <div className="col-md-2 col-sm-6 col-xs-12 mb-3 mb-md-0">
                          <button type="button" className="crumina-button button--dark button--xl">Zoeken</button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
                {activeTab === 'candidate' && (
                  <div className="tab-pane active" id="candidate" role="tabpanel" aria-labelledby="candidate-tab">
                    <form className="form--search">
                      <div className="row">
                        <div className="col-md-4 col-sm-6 col-xs-12 mb-3 mb-md-0">
                          <input name="name" placeholder="Keywords" type="text"/>
                          <div className="c-grey fs-14">* Search keywords e.g. web design</div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12 mb-3 mb-md-0">
                          <Select
                            id="select3"
                            classNamePrefix="puzzle--select"
                            options={specialismOptions}
                            value={candidateSpecialism}
                            onChange={(option: Option | null) => { if (isOption(option)) setCandidateSpecialism(option); }}
                            styles={customSelectStyles}
                            isSearchable={false}
                            placeholder="All Specialisms"
                          />
                          <div className="c-grey fs-14">* Filter by specialisms e.g. developer</div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12 mb-3 mb-md-0">
                          <Select
                            id="select4"
                            classNamePrefix="puzzle--select"
                            options={locationOptions}
                            value={candidateLocation}
                            onChange={(option: Option | null) => { if (isOption(option)) setCandidateLocation(option); }}
                            styles={customSelectStyles}
                            isSearchable={false}
                            placeholder="All Locations"
                          />
                        </div>
                        <div className="col-md-2 col-sm-6 col-xs-12 mb-3 mb-md-0">
                          <button type="button" className="crumina-button button--dark button--xl">Search</button>
                        </div>
                      </div>
                    </form>
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
