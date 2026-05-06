'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Info } from 'lucide-react';
import type { MatchScore, ProficiencyLevel } from '@/types/api';

interface MatchDisplayProps {
  matchScore: MatchScore;
  compact?: boolean;
}

const levelLabels: Record<ProficiencyLevel, string> = {
  informed: 'Geïnformeerd',
  beginner: 'Beginner',
  advanced: 'Gevorderd',
  expert: 'Expert',
  master: 'Meester',
};

const levelColors: Record<ProficiencyLevel, string> = {
  informed: 'bg-gray-100 text-gray-700',
  beginner: 'bg-blue-100 text-blue-700',
  advanced: 'bg-green-100 text-green-700',
  expert: 'bg-purple-100 text-purple-700',
  master: 'bg-amber-100 text-amber-700',
};

function getScoreColor(score: number): string {
  if (score >= 85) return 'text-green-600';
  if (score >= 70) return 'text-amber-600';
  if (score >= 50) return 'text-orange-600';
  return 'text-red-600';
}

function getProgressColor(score: number): string {
  if (score >= 85) return 'bg-green-500';
  if (score >= 70) return 'bg-amber-500';
  if (score >= 50) return 'bg-orange-500';
  return 'bg-red-500';
}

// Progress bar component with optional tooltip
function ScoreProgressBar({ 
  label, 
  score, 
  weight,
  showWeight,
  tooltip
}: { 
  label: string; 
  score: number; 
  weight?: string;
  showWeight?: boolean;
  tooltip?: string;
}) {
  return (
    <div className="space-y-2 group relative">
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-1">
          {label}
          {showWeight && weight && (
            <span className="text-gray-400 text-xs">({weight})</span>
          )}
          {tooltip && (
            <span className="relative">
              <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
              <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 max-w-xs">
                {tooltip}
              </span>
            </span>
          )}
        </span>
        <span className="font-medium">{score}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all ${getProgressColor(score)}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

export function MatchDisplay({ matchScore, compact = false }: MatchDisplayProps) {
  const isCareerSwitcher = matchScore.isCareerSwitcher;
  
  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <div className="text-center">
          <div className={`text-2xl font-bold ${getScoreColor(matchScore.overall)}`}>
            {matchScore.overall}%
          </div>
          <div className="text-xs text-gray-500">Match</div>
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <span className="w-16 text-gray-500">Skills</span>
            <Progress value={matchScore.skillsScore} className="flex-1 h-1.5" />
            <span className="w-8 text-right">{matchScore.skillsScore}%</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="w-16 text-gray-500">Persoon</span>
            <Progress value={matchScore.personalityScore} className="flex-1 h-1.5" />
            <span className="w-8 text-right">{matchScore.personalityScore}%</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="w-16 text-gray-500">Voorkeur</span>
            <Progress value={matchScore.preferencesScore} className="flex-1 h-1.5" />
            <span className="w-8 text-right">{matchScore.preferencesScore}%</span>
          </div>
          {isCareerSwitcher && matchScore.willingnessScore !== null && (
            <div className="flex items-center gap-2 text-xs">
              <span className="w-16 text-gray-500">Motivatie</span>
              <Progress value={matchScore.willingnessScore} className="flex-1 h-1.5" />
              <span className="w-8 text-right">{matchScore.willingnessScore}%</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span>Match analyse</span>
          <span className={`text-3xl font-bold ${getScoreColor(matchScore.overall)}`}>
            {matchScore.overall}%
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Career Switcher Banner */}
        {isCareerSwitcher && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
              <Info className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <p className="font-medium text-indigo-900">
                Career switcher — kandidaat zoekt richting deze functie
              </p>
              <p className="text-sm text-indigo-700 mt-0.5">
                Beoordeling op motivatie + persoonlijkheid + voorkeuren i.p.v. ervaring
              </p>
            </div>
          </div>
        )}

        {/* Score breakdown */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Score breakdown</h4>
          
          <ScoreProgressBar
            label="Skills match"
            score={matchScore.skillsScore}
            weight={isCareerSwitcher ? "30% gewicht" : "50% gewicht"}
            showWeight={isCareerSwitcher}
          />

          <ScoreProgressBar
            label="Persoonlijkheid match"
            score={matchScore.personalityScore}
            weight={isCareerSwitcher ? "30% gewicht" : "25% gewicht"}
            showWeight={isCareerSwitcher}
          />

          <ScoreProgressBar
            label="Voorkeuren match"
            score={matchScore.preferencesScore}
            weight={isCareerSwitcher ? "30% gewicht" : "25% gewicht"}
            showWeight={isCareerSwitcher}
          />

          {/* Motivation score - only for career switchers */}
          {isCareerSwitcher && matchScore.willingnessScore !== null && (
            <ScoreProgressBar
              label="Motivatie"
              score={matchScore.willingnessScore}
              weight="10% gewicht"
              showWeight={true}
              tooltip="Persoonlijkheidstest gedaan, bio ingevuld, skills toegevoegd in interesse-sectoren — alle gemeten signalen van inzet."
            />
          )}
        </div>

        {/* Skill details */}
        {matchScore.skillDetails.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700">Skills detail</h4>
            <div className="space-y-2">
              {matchScore.skillDetails.map((skill) => (
                <div 
                  key={skill.skillId}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{skill.skillName}</span>
                    {skill.isTested && (
                      <Badge variant="outline" className="text-xs">
                        Getest
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-gray-500">
                      Vereist: <span className="font-medium">{levelLabels[skill.requiredLevel]}</span>
                    </div>
                    {skill.candidateLevel ? (
                      <Badge className={levelColors[skill.candidateLevel]}>
                        {levelLabels[skill.candidateLevel]}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-gray-400">
                        Niet opgegeven
                      </Badge>
                    )}
                    <span className={`text-sm font-medium ${getScoreColor(skill.score)}`}>
                      {skill.score}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
