'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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

export function MatchDisplay({ matchScore, compact = false }: MatchDisplayProps) {
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
        {/* Score breakdown */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Score breakdown</h4>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Skills match</span>
              <span className="font-medium">{matchScore.skillsScore}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all ${getProgressColor(matchScore.skillsScore)}`}
                style={{ width: `${matchScore.skillsScore}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Persoonlijkheid match</span>
              <span className="font-medium">{matchScore.personalityScore}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all ${getProgressColor(matchScore.personalityScore)}`}
                style={{ width: `${matchScore.personalityScore}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Voorkeuren match</span>
              <span className="font-medium">{matchScore.preferencesScore}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all ${getProgressColor(matchScore.preferencesScore)}`}
                style={{ width: `${matchScore.preferencesScore}%` }}
              />
            </div>
          </div>
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
