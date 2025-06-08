'use client';

import React from 'react';
import { useJobs } from './useJobs';
import Tabs from './Tabs';

type TabId = 'jobs' | 'candidates';

interface JobCardProps {
	job: {
		id: string;
		title: string;
		location: string;
		postedAt: string;
		companyLogo: string;
		category: string;
		type: string;
		isFeatured?: boolean;
	};
	formatTimeAgo: (date: string) => string;
}

const JobCard: React.FC<JobCardProps> = ({ job, formatTimeAgo }) => (
	<div className="col-lg-12 sorting-item">
		<div className={`ui-card ${job.isFeatured ? 'featured-vacancies' : ''}`}>
			<div className="ui-card-content">
				<div className="vacancies-title-location">
					<a href={`05_job_details.html?id=${job.id}`} className="vacancies-title h6">{job.title}</a>
					<div className="vacancies-location">
						<time className="published" dateTime={job.postedAt}>{formatTimeAgo(job.postedAt)}</time>
						{job.location}
					</div>
				</div>
				<a href={`05_job_details.html?id=${job.id}`} className="logo-company">
					<img className="logo" src={job.companyLogo.src} title="company" alt="company logo" />
				</a>
			</div>
			<div className="ui-card-footer">
				<a href="#" className="link--uppercase-wide fs-12">{job.category}</a>
				<button type="button" className={`crumina-button button--${getButtonColor(job.type)} button--xxs button--uppercase-wide`}>
					{job.type}
				</button>
			</div>
		</div>
	</div>
);

interface CandidateCardProps {
	candidate: {
		id: string;
		name: string;
		location: string;
		avatar: string;
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

const getButtonColor = (type: string): string => {
	const colorMap: { [key: string]: string } = {
		'Part Time': 'blue-dark',
		'Full Time': 'green',
		'Temporary': 'red',
		'Internship': 'yellow',
		'Freelance': 'blue'
	};
	return colorMap[type] || 'blue-dark';
};

const Jobs: React.FC = () => {
	const {
		activeTab,
		jobs,
		candidates,
		handleTabChange,
		handleLoadMore,
		formatTimeAgo
	} = useJobs();

	const tabItems = [
		{
			id: 'jobs' as TabId,
			label: 'Op zoek naar een job',
			count: '69.368 Open Posities',
			icon: {
				dark: 'img/svg/11_employer_dark_tab.svg',
				light: 'img/svg/12_employer_white_tab.svg',
				alt: 'man'
			}
		},
		{
			id: 'candidates' as TabId,
			label: 'Neem een werknemer aan',
			count: '238.900 Kandidaten',
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
				onTabChange={handleTabChange}
			/>

			<div className="tab-content">
				<div className="container">
					<div className="row pb80">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<div className={`tab-pane ${activeTab === 'jobs' ? 'active' : ''}`} id="home" role="tabpanel" aria-labelledby="home-tab">
								<div className="d-flex justify-content-between align-items-center flex-wrap mb60">
									<button type="button" className="crumina-button button--dark button--m button--with-icon button--icon-left my-2">
										<i className="puzzle-icon far fa-pencil" />Meld u aan als werknemer
									</button>
									<button type="button" className="crumina-button button--dark button--m button--bordered button--with-icon button--icon-left my-2">
										<i className="puzzle-icon far fa-at" />E-mail me banen zoals deze
									</button>
								</div>

								<div className="row sorting-container mb40" id="vacancies-grid" data-layout="fitRows">
									{jobs.map(job => (
										<JobCard key={job.id} job={job} formatTimeAgo={formatTimeAgo} />
									))}
								</div>

								<div className="row justify-content-center">
									<div className="col-auto">
										<a
											href="#"
											className="crumina-button button--grey button--xl load-more-button"
											data-load-link="vacancies-to-load.html"
											data-container="vacancies-grid"
											onClick={handleLoadMore}
										>
											Load More Listings
										</a>
									</div>
								</div>
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