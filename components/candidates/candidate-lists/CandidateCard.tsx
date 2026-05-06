'use client';

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

interface CandidateCardProps {
  id: string;
  displayTitle: string;        // e.g. "Junior Frontend Developer"
  primarySectorName: string;   // e.g. "IT & Development"
  region?: string;             // e.g. "Antwerpen" (not full address)
  topSkills: string[];         // skill names only
  yearsExperience: number;
  workType?: string;
  isFeatured?: boolean;
  className?: string;
}

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

function getSectorInitial(sectorName: string): { initial: string; color: string } {
  const initial = sectorName?.charAt(0).toUpperCase() || '?';
  const color = sectorColors[sectorName] || '#6c757d';
  return { initial, color };
}

function formatExperience(years: number): string {
  if (years === 0) return 'Starter';
  if (years === 1) return '1 jaar';
  return `${years} jaar`;
}

export default function CandidateCard({
  id,
  displayTitle,
  primarySectorName,
  region,
  topSkills,
  yearsExperience,
  workType,
  isFeatured = false,
  className = '',
}: CandidateCardProps) {
  const { user } = useAuth();
  const router = useRouter();
  const { initial, color } = getSectorInitial(primarySectorName);

  const handleClick = () => {
    if (!user) {
      router.push(`/login?redirect=/candidates/${id}`);
    } else if (user.userType === 'employer') {
      router.push(`/candidates/${id}`);
    }
    // Candidates can't view other candidates
  };

  return (
    <div 
      className={`ui-card ${isFeatured ? 'featured-vacancies' : ''} ${className}`}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="ui-card-content">
        <div className="vacancies-title-location">
          <span className="vacancies-title h5">{displayTitle}</span>
          <div className="vacancies-location">
            {region ? `Regio ${region}` : primarySectorName}
          </div>
        </div>
        <div className="avatar-skills-wrap">
          {/* Anonymous avatar with sector initial */}
          <div 
            className="avatar avatar--80 d-flex align-items-center justify-content-center"
            style={{ 
              backgroundColor: color, 
              color: '#fff', 
              fontWeight: 700, 
              fontSize: '24px',
              borderRadius: '50%'
            }}
          >
            {initial}
          </div>
          {topSkills && topSkills.length > 0 && (
            <div className="skills">
              {topSkills.slice(0, 4).map((skill, index) => (
                <span 
                  key={index} 
                  className="crumina-button button--grey button--xs button--bordered"
                  style={{ cursor: 'default' }}
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="ui-card-footer">
        <span className="link--uppercase-wide fs-12">
          {formatExperience(yearsExperience)} ervaring
        </span>
        {workType && (
          <span className="link--bold fs-12">{workType}</span>
        )}
      </div>

      {/* Login prompt for anonymous users */}
      {!user && (
        <div 
          className="text-center py-2 px-3"
          style={{ 
            backgroundColor: '#f8f9fa', 
            borderTop: '1px solid #dee2e6',
            fontSize: '12px',
            color: '#6c757d'
          }}
        >
          <i className="far fa-lock mr-1"></i>
          Log in als werkgever om contact op te nemen
        </div>
      )}
    </div>
  );
}
