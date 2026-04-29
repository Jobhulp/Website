"use client";
import React from 'react';

interface MatchScoreProps {
  score: number;
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
}

const MatchScore: React.FC<MatchScoreProps> = ({ score, size = 'medium', showLabel = true }) => {
  const getScoreColor = (score: number) => {
    if (score >= 85) return '#28a745';
    if (score >= 70) return '#ffc107';
    return '#dc3545';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 85) return 'Uitstekende match';
    if (score >= 70) return 'Goede match';
    return 'Matige match';
  };

  const sizeClasses = {
    small: { wrapper: 'match-score--small', fontSize: '14px', size: 40 },
    medium: { wrapper: 'match-score--medium', fontSize: '18px', size: 60 },
    large: { wrapper: 'match-score--large', fontSize: '24px', size: 80 },
  };

  const config = sizeClasses[size];
  const circumference = 2 * Math.PI * (config.size / 2 - 4);
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={`match-score ${config.wrapper}`}>
      <div className="match-score__circle" style={{ width: config.size, height: config.size }}>
        <svg width={config.size} height={config.size}>
          <circle
            className="match-score__bg"
            cx={config.size / 2}
            cy={config.size / 2}
            r={config.size / 2 - 4}
            fill="none"
            stroke="#e9ecef"
            strokeWidth="4"
          />
          <circle
            className="match-score__progress"
            cx={config.size / 2}
            cy={config.size / 2}
            r={config.size / 2 - 4}
            fill="none"
            stroke={getScoreColor(score)}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
          />
        </svg>
        <span 
          className="match-score__value" 
          style={{ 
            fontSize: config.fontSize, 
            color: getScoreColor(score),
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontWeight: 700,
          }}
        >
          {score}%
        </span>
      </div>
      {showLabel && (
        <span className="match-score__label" style={{ color: getScoreColor(score), fontSize: '12px', marginTop: '4px' }}>
          {getScoreLabel(score)}
        </span>
      )}
    </div>
  );
};

export default MatchScore;
