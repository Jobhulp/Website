'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { HomepageFeedItem, WorkType } from '@/types/api';

interface Props {
  item: HomepageFeedItem;
}

// WorkType label mapping (Nederlands)
const workTypeLabels: Record<WorkType, string> = {
  fulltime: 'Voltijds',
  parttime: 'Deeltijds',
  freelance: 'Freelance',
  internship: 'Stage',
  temporary: 'Tijdelijk',
};

// WorkType button color mapping
const workTypeColors: Record<WorkType, string> = {
  fulltime: 'button--green',
  parttime: 'button--blue-dark',
  freelance: 'button--blue',
  internship: 'button--yellow',
  temporary: 'button--red',
};

/**
 * Format relative time in Dutch
 */
function formatRelativeTime(dateString: string | null): string {
  if (!dateString) return '';

  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'vandaag';
  if (diffDays === 1) return 'gisteren';
  if (diffDays < 7) return `${diffDays} dagen geleden`;
  if (diffDays < 14) return '1 week geleden';
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weken geleden`;
  if (diffDays < 60) return '1 maand geleden';
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} maanden geleden`;
  return `${Math.floor(diffDays / 365)} jaar geleden`;
}

/**
 * Get initials from employer name for fallback avatar
 */
function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function JobFeedCard({ item }: Props) {
  const {
    id,
    title,
    city,
    workType,
    publishedAt,
    primarySectorName,
    employerName,
    employerLogoUrl,
    matchScore,
    reason,
  } = item;

  return (
    <div className="job-feed-card">
      <Link href={`/jobs/details/${id}`} className="job-feed-card__link">
        <div className="ui-card h-100">
          {/* Match score badge */}
          {matchScore !== null && (
            <div className="job-feed-card__match-badge">
              {Math.round(matchScore)}% match
            </div>
          )}

          {/* Profile match indicator */}
          {reason === 'profile_match' && (
            <div className="job-feed-card__profile-match" title="Past bij je profiel">
              <i className="fas fa-check-circle" />
            </div>
          )}

          <div className="ui-card-content">
            {/* Logo */}
            <div className="logo-company">
              {employerLogoUrl ? (
                <Image
                  src={employerLogoUrl}
                  alt={`${employerName} logo`}
                  width={60}
                  height={60}
                  className="logo"
                  style={{ objectFit: 'contain' }}
                />
              ) : (
                <div className="logo-fallback">
                  {getInitials(employerName)}
                </div>
              )}
            </div>

            {/* Title and location */}
            <div className="vacancies-title-location">
              <span className="vacancies-title h6">{title}</span>
              <div className="vacancies-location">
                <time className="published" dateTime={publishedAt || undefined}>
                  {formatRelativeTime(publishedAt)}
                </time>
                {city && <span className="city">{city}</span>}
              </div>
              <div className="employer-name">{employerName}</div>
            </div>
          </div>

          <div className="ui-card-footer">
            {primarySectorName && (
              <span className="link--uppercase-wide fs-12">{primarySectorName}</span>
            )}
            <span
              className={`crumina-button ${workTypeColors[workType]} button--xxs button--uppercase-wide`}
            >
              {workTypeLabels[workType]}
            </span>
          </div>
        </div>
      </Link>

      <style jsx>{`
        .job-feed-card {
          position: relative;
          height: 100%;
        }

        .job-feed-card__link {
          display: block;
          height: 100%;
          text-decoration: none;
          color: inherit;
        }

        .job-feed-card__link:hover .ui-card {
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
          transform: translateY(-2px);
        }

        .job-feed-card .ui-card {
          position: relative;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }

        .job-feed-card__match-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: #007bff;
          color: #fff;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 12px;
          z-index: 1;
        }

        .job-feed-card__profile-match {
          position: absolute;
          top: 12px;
          left: 12px;
          color: #28a745;
          font-size: 16px;
          z-index: 1;
        }

        .logo-fallback {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #e9ecef;
          border-radius: 8px;
          font-weight: 700;
          font-size: 18px;
          color: #6c757d;
        }

        .vacancies-location {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          font-size: 13px;
          color: #6c757d;
        }

        .vacancies-location .published {
          color: #007bff;
        }

        .vacancies-location .city::before {
          content: '•';
          margin-right: 8px;
        }

        .employer-name {
          font-size: 13px;
          color: #6c757d;
          margin-top: 4px;
        }

        .ui-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
        }
      `}</style>
    </div>
  );
}

export default JobFeedCard;
