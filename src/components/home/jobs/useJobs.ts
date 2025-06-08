/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';

interface Job {
  id: string;
  title: string;
  location: string;
  postedAt: string;
  companyLogo: string;
  category: string;
  type: string;
  isFeatured?: boolean;
}

interface Candidate {
  id: string;
  name: string;
  location: string;
  avatar: string;
  role: string;
  rate: string;
}

export const useJobs = () => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'candidates'>('jobs');
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: '1',
      title: 'Data Center Support Specialist Engineer',
      location: 'London, United Kingdom',
      postedAt: '2018-10-14 12:00:00',
      companyLogo: './img/client2.png',
      category: 'IT Contractor',
      type: 'Part Time',
      isFeatured: true
    },
    {
      id: '2',
      title: 'Visualizer, web designer Max 3Ds, Cinema 4D',
      location: 'New York, USA',
      postedAt: '2018-10-14 12:00:00',
      companyLogo: './img/client3.png',
      category: 'Digital & Creative',
      type: 'Full Time',
      isFeatured: true
    },
    {
      id: '3',
      title: 'Regional Sales Manager',
      location: 'Melbourne, Australia',
      postedAt: '2018-10-14 12:00:00',
      companyLogo: './img/client4.png',
      category: 'Sales & Marketing',
      type: 'Temporary'
    },
    {
      id: '4',
      title: 'Front End and Back End Developer',
      location: 'California, USA',
      postedAt: '2018-10-14 12:00:00',
      companyLogo: './img/client5.png',
      category: 'Web Development',
      type: 'Internship',
      isFeatured: true
    },
    {
      id: '5',
      title: 'Professional Copywriter for Commercial Advertising',
      location: 'Cologne, Germany',
      postedAt: '2018-10-14 12:00:00',
      companyLogo: './img/client6.png',
      category: 'Writing',
      type: 'Freelance'
    },
    {
      id: '6',
      title: 'Front End and Back End Developer',
      location: 'London, United Kingdom',
      postedAt: '2018-10-14 12:00:00',
      companyLogo: './img/client7.png',
      category: 'Web Development',
      type: 'Part Time'
    }
  ]);

  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: '1',
      name: 'Jerry Thomas',
      location: 'London, United Kingdom',
      avatar: './img/author2.jpg',
      role: 'Web Developer',
      rate: '$45 / hour'
    },
    {
      id: '2',
      name: 'Catherine White',
      location: 'New York, USA',
      avatar: './img/author3.jpg',
      role: 'UX/UI Designer',
      rate: '$60 / Hour'
    }
  ]);

  const handleTabChange = (tab: 'jobs' | 'candidates') => {
    setActiveTab(tab);
  };

  const handleLoadMore = () => {
    // Implement load more functionality here
    console.log('Loading more items...');
  };

  const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
    return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  };

  return {
    activeTab,
    jobs,
    candidates,
    handleTabChange,
    handleLoadMore,
    formatTimeAgo
  };
};