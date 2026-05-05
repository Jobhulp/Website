'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api, ApiError } from '@/lib/api-client';
import type { SkillTestStatus, ProficiencyLevel } from '@/types/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Label } from '@/components/ui/label';

const LEVEL_LABELS: Record<ProficiencyLevel, string> = {
  informed: 'Geïnformeerd',
  beginner: 'Beginner',
  advanced: 'Gevorderd',
  expert: 'Expert',
  master: 'Meester',
};

const LEVEL_ORDER: ProficiencyLevel[] = ['informed', 'beginner', 'advanced', 'expert', 'master'];

interface PageProps {
  params: Promise<{ skillId: string }>;
}

export default function SkillTestConfigPage({ params }: PageProps) {
  const router = useRouter();
  const [skillId, setSkillId] = useState<string | null>(null);
  const [status, setStatus] = useState<SkillTestStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<ProficiencyLevel | null>(null);
  const [starting, setStarting] = useState(false);

  // Resolve params
  useEffect(() => {
    params.then((p) => setSkillId(p.skillId));
  }, [params]);

  // Fetch test status
  useEffect(() => {
    if (!skillId) return;

    const fetchStatus = async () => {
      try {
        setLoading(true);
        const res = await api.get<SkillTestStatus>(`/candidate/skills/${skillId}/test-status`);
        setStatus(res);

        // Select highest available level by default
        const highestAvailable = [...LEVEL_ORDER].reverse().find((level) => res.canTake[level]);
        if (highestAvailable) {
          setSelectedLevel(highestAvailable);
        }
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError('Er ging iets mis bij het laden van de test status.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [skillId]);

  const handleStartTest = async () => {
    if (!skillId || !selectedLevel) return;

    try {
      setStarting(true);
      setError(null);
      const res = await api.post<{ attempt: { id: string } }>('/tests/start', {
        skillId,
        attemptedLevel: selectedLevel,
      });
      router.push(`/dashboard/profile/test/attempt/${res.attempt.id}`);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Er ging iets mis bij het starten van de test.');
      }
      setStarting(false);
    }
  };

  const formatCooldownDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleDateString('nl-BE', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getLevelStatus = (level: ProficiencyLevel): { disabled: boolean; reason: string | null } => {
    if (!status) return { disabled: true, reason: null };

    const canTake = status.canTake[level];
    const cooldown = status.cooldowns[level];
    const levelIndex = LEVEL_ORDER.indexOf(level);
    const currentIndex = LEVEL_ORDER.indexOf(status.currentLevel);

    if (levelIndex < currentIndex) {
      return { disabled: true, reason: 'Reeds gehaald' };
    }

    if (cooldown) {
      return { disabled: true, reason: `Je kan opnieuw vanaf ${formatCooldownDate(cooldown)}` };
    }

    if (!canTake) {
      return { disabled: true, reason: 'Niet beschikbaar' };
    }

    return { disabled: false, reason: null };
  };

  if (loading) {
    return (
      <div className="container max-w-2xl mx-auto py-8 px-4">
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-48 mb-8" />
        <Skeleton className="h-48 mb-6" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (error && !status) {
    return (
      <div className="container max-w-2xl mx-auto py-8 px-4">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="py-6">
            <p className="text-red-600 mb-4">{error}</p>
            <Button variant="outline" asChild>
              <Link href="/dashboard/profile/skills">Terug naar skills</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!status) return null;

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-bold">Test: {status.skillName}</h1>
          <Badge variant="secondary">{status.sectorName}</Badge>
        </div>
        <p className="text-gray-600 text-sm">
          Je huidig niveau: <span className="font-medium">{LEVEL_LABELS[status.currentLevel]}</span>
        </p>
      </div>

      {/* Error banner */}
      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Explanation card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Over deze test</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Door deze test te halen, bewijs je dat je dit niveau beheerst. De test bestaat uit
            meerkeuze-vragen. Je hebt 30 minuten per attempt.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Pogingen deze maand: {status.attemptsThisMonth}
          </p>
        </CardContent>
      </Card>

      {/* Level selection */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Kies een niveau</CardTitle>
          <CardDescription>
            Selecteer het niveau waarop je getest wilt worden
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {LEVEL_ORDER.map((level) => {
              const { disabled, reason } = getLevelStatus(level);
              const isSelected = selectedLevel === level;
              const levelIndex = LEVEL_ORDER.indexOf(level);
              const currentIndex = LEVEL_ORDER.indexOf(status.currentLevel);
              const isPassed = levelIndex < currentIndex;

              return (
                <div key={level}>
                  <label
                    className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                      disabled
                        ? 'bg-gray-50 cursor-not-allowed opacity-60'
                        : isSelected
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="level"
                        value={level}
                        checked={isSelected}
                        disabled={disabled}
                        onChange={() => setSelectedLevel(level)}
                        className="w-4 h-4 text-primary"
                      />
                      <div>
                        <span className="font-medium">{LEVEL_LABELS[level]}</span>
                        {isPassed && (
                          <Badge variant="outline" className="ml-2 text-green-600 border-green-300">
                            Gehaald
                          </Badge>
                        )}
                      </div>
                    </div>
                    {reason && (
                      <span className="text-sm text-gray-500">{reason}</span>
                    )}
                  </label>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Tier-shift explanation */}
      <Card className="mb-6 bg-blue-50 border-blue-200">
        <CardContent className="py-4">
          <p className="text-sm text-blue-800 font-medium mb-2">Hoe werkt de score?</p>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>Score &lt; 50%: niet geslaagd</li>
            <li>Score 50-69%: een tier lager geslaagd dan geprobeerd</li>
            <li>Score 70-84%: geslaagd op het geprobeerde niveau</li>
            <li>Score 85%+: een tier hoger geslaagd dan geprobeerd</li>
          </ul>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={handleStartTest}
          disabled={!selectedLevel || starting}
          className="flex-1"
        >
          {starting ? 'Test wordt gestart...' : 'Start test'}
        </Button>
        <Button variant="outline" asChild>
          <Link href="/dashboard/profile/skills">Annuleren</Link>
        </Button>
      </div>
    </div>
  );
}
