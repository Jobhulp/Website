'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import type { CandidateFeedItem, WorkType, ProficiencyLevel } from '@/types/api';

interface Props {
  item: CandidateFeedItem;
  onClick?: () => void;
}

// WorkType label mapping (Nederlands)
const workTypeLabels: Record<WorkType, string> = {
  fulltime: 'Voltijds',
  parttime: 'Deeltijds',
  freelance: 'Freelance',
  internship: 'Stage',
  temporary: 'Tijdelijk',
};

// Proficiency level colors for skill pills
const proficiencyColors: Record<ProficiencyLevel, { bg: string; text: string }> = {
  informed: { bg: '#e9ecef', text: '#6c757d' },
  beginner: { bg: '#cfe2ff', text: '#084298' },
  advanced: { bg: '#d1e7dd', text: '#0f5132' },
  expert: { bg: '#e2d9f3', text: '#59359a' },
  master: { bg: '#fff3cd', text: '#856404' },
};

// Sector colors for avatar background
const sectorColors: Record<string, string> = {
  'IT & Development': '#007bff',
  'Gezondheidszorg': '#28a745',
  'Finance': '#6f42c1',
  'Marketing': '#fd7e14',
  'Sales': '#dc3545',
  'HR': '#e83e8c',
  'Engineering': '#20c997',
  'Administratie': '#6c757d',
  'Logistiek': '#17a2b8',
  'Onderwijs': '#ffc107',
  'Horeca': '#795548',
  'Bouw': '#ff5722',
  'Retail': '#9c27b0',
};

/**
 * Get sector initial and color for avatar placeholder
 */
function getSectorAvatar(sectorName: string | null): { initial: string; color: string } {
  if (!sectorName) {
    return { initial: '?', color: '#6c757d' };
  }
  const initial = sectorName.charAt(0).toUpperCase();
  const color = sectorColors[sectorName] || '#6c757d';
  return { initial, color };
}

/**
 * Format years of experience
 */
function formatExperience(years: number): string {
  if (years === 0) return 'Starter';
  if (years === 1) return '1 jaar ervaring';
  return `${years} jaar ervaring`;
}

export function CandidateFeedCard({ item, onClick }: Props) {
  const router = useRouter();
  const { user } = useAuth();

  const {
    id,
    displayTitle,
    yearsExperience,
    region,
    topSkills,
    primarySectorName,
    mbtiType,
    workTypes,
    profileAgeLabel,
    reason,
  } = item;

  const { initial, color } = getSectorAvatar(primarySectorName);
  const top3Skills = topSkills.slice(0, 3);

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    // If logged in as employer, navigate to candidate detail
    // For now, all users go to login with redirect (employer flow built later)
    if (user && user.userType === 'employer') {
      router.push(`/candidates/${id}`);
    } else {
      router.push('/login?redirect=/candidates');
    }
  };

  return (
    <div className="candidate-feed-card" onClick={handleClick}>
      <div className="ui-card h-100">
        {/* New profile indicator */}
        {reason === 'new_profile' && (
          <div className="candidate-feed-card__new-badge">
            Nieuw
          </div>
        )}

        {/* Sector match indicator */}
        {reason === 'sector_match' && (
          <div className="candidate-feed-card__match-indicator" title="Past bij je sector">
            <i className="fas fa-star" />
          </div>
        )}

        <div className="ui-card-content">
          {/* Sector-based avatar placeholder */}
          <div className="candidate-avatar" style={{ backgroundColor: color }}>
            {initial}
          </div>

          {/* Title and meta */}
          <div className="candidate-info">
            <span className="candidate-title h6">{displayTitle}</span>
            <div className="candidate-meta">
              <span className="experience">{formatExperience(yearsExperience)}</span>
              {region && <span className="region">regio {region}</span>}
            </div>
          </div>

          {/* Skills pills */}
          {top3Skills.length > 0 && (
            <div className="candidate-skills">
              {top3Skills.map((skill) => {
                const colors = proficiencyColors[skill.proficiencyLevel];
                return (
                  <span
                    key={skill.skillId}
                    className="skill-pill"
                    style={{ backgroundColor: colors.bg, color: colors.text }}
                    title={`${skill.skillName} - ${skill.proficiencyLevel}`}
                  >
                    {skill.skillName}
                  </span>
                );
              })}
            </div>
          )}
        </div>

        <div className="ui-card-footer">
          <div className="candidate-footer-left">
            {mbtiType && <span className="mbti-badge">{mbtiType}</span>}
            {workTypes.length > 0 && (
              <span className="work-types">
                {workTypes.map((wt) => workTypeLabels[wt]).join(', ')}
              </span>
            )}
          </div>
          
          {profileAgeLabel && profileAgeLabel !== '' && (
            <span
              className={`profile-age ${profileAgeLabel === 'Nieuw' ? 'profile-age--new' : ''}`}
            >
              {profileAgeLabel}
            </span>
          )}
        </div>
      </div>

      <style jsx>{`
        .candidate-feed-card {
          position: relative;
          height: 100%;
          cursor: pointer;
        }

        .candidate-feed-card:hover .ui-card {
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
          transform: translateY(-2px);
        }

        .candidate-feed-card .ui-card {
          position: relative;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
          display: flex;
          flex-direction: column;
        }

        .candidate-feed-card__new-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: #28a745;
          color: #fff;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 12px;
          z-index: 1;
        }

        .candidate-feed-card__match-indicator {
          position: absolute;
          top: 12px;
          left: 12px;
          color: #ffc107;
          font-size: 16px;
          z-index: 1;
        }

        .ui-card-content {
          flex: 1;
        }

        .candidate-avatar {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-weight: 700;
          font-size: 24px;
          color: #fff;
          margin-bottom: 12px;
        }

        .candidate-info {
          margin-bottom: 12px;
        }

        .candidate-title {
          display: block;
          margin-bottom: 4px;
          color: var(--body-font-color, #333);
        }

        .candidate-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          font-size: 13px;
          color: #6c757d;
        }

        .candidate-meta .region::before {
          content: '·';
          margin-right: 8px;
        }

        .candidate-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 12px;
        }

        .skill-pill {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }

        .ui-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: auto;
        }

        .candidate-footer-left {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .mbti-badge {
          display: inline-block;
          padding: 3px 8px;
          background: #f8f9fa;
          border: 1px solid #dee2e6;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
          color: #495057;
          letter-spacing: 0.5px;
        }

        .work-types {
          font-size: 12px;
          color: #6c757d;
        }

        .profile-age {
          font-size: 12px;
          color: #6c757d;
        }

        .profile-age--new {
          background: #d4edda;
          color: #155724;
          padding: 3px 8px;
          border-radius: 10px;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}

export default CandidateFeedCard;
