'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Tabs from './Tabs';
import { JobFeedSection } from '@/components/homepage/job-feed-section';
import { CandidatesFeedSection } from '@/components/homepage/candidates-feed-section';
import { api } from '@/lib/api-client';
import type { WorkType, CandidatesCountResponse } from '@/types/api';

type TabId = 'jobs' | 'candidates';

interface JobsProps {
  workTypes?: WorkType[];
  city?: string;
  onClearFilters?: () => void;
  onTabChange?: (tab: 'jobs' | 'candidates') => void;
}

const Jobs: React.FC<JobsProps> = ({ workTypes = [], city, onClearFilters, onTabChange }) => {
  const [activeTab, setActiveTab] = useState<TabId>('jobs');
  const [jobsCount, setJobsCount] = useState<number | null>(null);
  const [candidatesCount, setCandidatesCount] = useState<{ count: number; isFloor: boolean } | null>(null);

  // Notify parent of tab changes
  useEffect(() => {
    onTabChange?.(activeTab);
  }, [activeTab, onTabChange]);

  // Fetch candidates count on mount
  useEffect(() => {
    async function fetchCandidatesCount() {
      try {
        const response = await api.get<CandidatesCountResponse>('/homepage/candidates-count');
        setCandidatesCount({ count: response.count, isFloor: response.isFloor });
      } catch {
        // Silently fail - count is optional
      }
    }
    fetchCandidatesCount();
  }, []);

  // Format count labels
  const jobsCountLabel = jobsCount !== null 
    ? `${jobsCount.toLocaleString('nl-NL')} actief`
    : 'Jobs laden...';
  
  const candidatesCountLabel = candidatesCount !== null
    ? candidatesCount.isFloor
      ? `${candidatesCount.count.toLocaleString('nl-NL')}+ Profielen`
      : `${candidatesCount.count.toLocaleString('nl-NL')} Profielen`
    : 'Profielen laden...';

  const tabItems = [
    {
      id: 'jobs' as TabId,
      label: 'Openstaande Jobs',
      count: jobsCountLabel,
      icon: {
        dark: 'img/svg/11_employer_dark_tab.svg',
        light: 'img/svg/12_employer_white_tab.svg',
        alt: 'briefcase'
      }
    },
    {
      id: 'candidates' as TabId,
      label: 'Beschikbare Kandidaten',
      count: candidatesCountLabel,
      icon: {
        dark: 'img/svg/09_freelancer_dark_tab.svg',
        light: 'img/svg/10_freelancer_white_tab.svg',
        alt: 'person'
      }
    }
  ];

  // Callback to update jobs count from JobFeedSection
  const handleJobsLoaded = (count: number) => {
    setJobsCount(count);
  };

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
                {/* Jobs Tab */}
                <div 
                  className={`tab-pane ${activeTab === 'jobs' ? 'active' : ''}`} 
                  id="jobs-tab" 
                  role="tabpanel" 
                  aria-labelledby="jobs-tab"
                  style={{ display: activeTab === 'jobs' ? 'block' : 'none' }}
                >
                  <div className="d-flex justify-content-between align-items-center flex-wrap mb60">
                    <Link href="/candidates/submit-resume" className="crumina-button button--dark button--m button--with-icon button--icon-left my-2">
                      <i className="puzzle-icon far fa-pencil" />Maak je profiel aan
                    </Link>
                    <Link href="/register?type=candidate&subscribe=matches" className="crumina-button button--dark button--m button--bordered button--with-icon button--icon-left my-2">
                      <i className="puzzle-icon far fa-at" />Ontvang matches per e-mail
                    </Link>
                  </div>

                  <JobFeedSection 
                    workTypes={workTypes} 
                    city={city} 
                    limit={6}
                    onClearFilters={onClearFilters}
                    onItemsLoaded={handleJobsLoaded}
                  />
                </div>

                {/* Candidates Tab */}
                <div 
                  className={`tab-pane ${activeTab === 'candidates' ? 'active' : ''}`} 
                  id="candidates-tab" 
                  role="tabpanel" 
                  aria-labelledby="candidates-tab"
                  style={{ display: activeTab === 'candidates' ? 'block' : 'none' }}
                >
                  <div className="d-flex justify-content-between align-items-center flex-wrap mb60">
                    <Link href="/dashboard/employer/jobs/new" className="crumina-button button--dark button--m button--with-icon button--icon-left my-2">
                      <i className="puzzle-icon far fa-building" />Plaats een vacature
                    </Link>
                    <Link href="/candidates/candidate-lists" className="crumina-button button--dark button--m button--bordered button--with-icon button--icon-left my-2">
                      <i className="puzzle-icon far fa-search" />Zoek kandidaten
                    </Link>
                  </div>

                  <CandidatesFeedSection 
                    workTypes={workTypes} 
                    city={city} 
                    limit={6}
                    onClearFilters={onClearFilters}
                  />
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
