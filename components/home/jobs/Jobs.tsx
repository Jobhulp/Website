'use client';

import React, { useState } from 'react';
import type { StaticImageData } from 'next/image';
import Tabs from './Tabs';
import { JobFeedSection } from '@/components/homepage/job-feed-section';
import author2 from '@/assets/img/author2.jpg';
import author3 from '@/assets/img/author3.jpg';
import type { WorkType } from '@/types/api';

type TabId = 'jobs' | 'candidates';

interface JobsProps {
  workTypes?: WorkType[];
  city?: string;
  onClearFilters?: () => void;
}

interface CandidateCardProps {
  candidate: {
    id: string;
    name: string;
    location: string;
    avatar: StaticImageData;
    role: string;
    rate: string;
  };
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => (
  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
    <div className="ui-card featured-vacancies">
      <div className="ui-card-content">
        <div className="vacancies-title-location">
          <a href={`10_candidate_details.html?id=${candidate.id}`} className="vacancies-title h6">{candidate.name}</a>
          <div className="vacancies-location">{candidate.location}</div>
        </div>
        <a href={`10_candidate_details.html?id=${candidate.id}`} className="avatar avatar--80">
          <img src={candidate.avatar.src} title="user" alt="user avatar" />
        </a>
      </div>
      <div className="ui-card-footer">
        <a href="#" className="link--uppercase-wide fs-12">{candidate.role}</a>
        <a href="#" className="link--uppercase-wide link--uppercase-wide link--bold fs-12">{candidate.rate}</a>
      </div>
    </div>
  </div>
);

// Hardcoded candidates for now
const candidates = [
  {
    id: '1',
    name: 'Jerry Thomas',
    location: 'London, United Kingdom',
    avatar: author2,
    role: 'Web Developer',
    rate: '$45 / hour'
  },
  {
    id: '2',
    name: 'Catherine White',
    location: 'New York, USA',
    avatar: author3,
    role: 'UX/UI Designer',
    rate: '$60 / Hour'
  }
];

const Jobs: React.FC<JobsProps> = ({ workTypes = [], city, onClearFilters }) => {
  const [activeTab, setActiveTab] = useState<TabId>('jobs');

  const tabItems = [
    {
      id: 'jobs' as TabId,
      label: 'Openstaande Jobs',
      count: '69.368 Matches mogelijk',
      icon: {
        dark: 'img/svg/11_employer_dark_tab.svg',
        light: 'img/svg/12_employer_white_tab.svg',
        alt: 'man'
      }
    },
    {
      id: 'candidates' as TabId,
      label: 'Beschikbare Kandidaten',
      count: '238.900 Profielen',
      icon: {
        dark: 'img/svg/09_freelancer_dark_tab.svg',
        light: 'img/svg/10_freelancer_white_tab.svg',
        alt: 'man'
      }
    }
  ];

  return (
    <section>
      <div className="tabs tabs--with-icon">
        <Tabs<TabId>
          items={tabItems}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="tab-content">
          <div className="container">
            <div className="row pb80">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className={`tab-pane ${activeTab === 'jobs' ? 'active' : ''}`} id="home" role="tabpanel" aria-labelledby="home-tab">
                  <div className="d-flex justify-content-between align-items-center flex-wrap mb60">
                    <button type="button" className="crumina-button button--dark button--m button--with-icon button--icon-left my-2">
                      <i className="puzzle-icon far fa-pencil" />Maak je profiel aan
                    </button>
                    <button type="button" className="crumina-button button--dark button--m button--bordered button--with-icon button--icon-left my-2">
                      <i className="puzzle-icon far fa-at" />Ontvang matches per e-mail
                    </button>
                  </div>

                  <JobFeedSection 
                    workTypes={workTypes} 
                    city={city} 
                    limit={6}
                    onClearFilters={onClearFilters}
                  />
                </div>

                <div className={`tab-pane ${activeTab === 'candidates' ? 'active' : ''}`} id="profile" role="tabpanel" aria-labelledby="profile-tab">
                  <div className="row">
                    {candidates.map(candidate => (
                      <CandidateCard key={candidate.id} candidate={candidate} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Jobs;
