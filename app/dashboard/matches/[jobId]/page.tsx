'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { api, ApiError } from '@/lib/api-client';
import type { MatchDetail, ProficiencyLevel, EmployerSkillTestWithStatus } from '@/types/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MatchDisplay } from '@/components/match-display';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const levelLabels: Record<ProficiencyLevel, string> = {
  informed: 'Op de hoogte',
  beginner: 'Beginner',
  advanced: 'Gevorderd',
  expert: 'Expert',
  master: 'Meester',
};

const levelColors: Record<ProficiencyLevel, string> = {
  informed: 'bg-slate-100 text-slate-700',
  beginner: 'bg-blue-100 text-blue-700',
  advanced: 'bg-green-100 text-green-700',
  expert: 'bg-purple-100 text-purple-700',
  master: 'bg-amber-100 text-amber-700',
};

const workTypeLabels: Record<string, string> = {
  fulltime: 'Voltijds',
  parttime: 'Deeltijds',
  freelance: 'Freelance',
  internship: 'Stage',
  temporary: 'Tijdelijk',
};

export default function MatchDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.jobId as string;

  const [match, setMatch] = useState<MatchDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [interestDialogOpen, setInterestDialogOpen] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchMatch();
  }, [jobId]);

  async function fetchMatch() {
    try {
      setLoading(true);
      const res = await api.get<MatchDetail>(`/matches/${jobId}`);
      setMatch(res);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Kon match niet laden');
    } finally {
      setLoading(false);
    }
  }

  async function handleShowInterest() {
    if (!match) return;
    try {
      setSubmitting(true);
      await api.post('/matches/candidate-interest', {
        jobId,
        initialMessage: initialMessage.trim() || undefined,
      });
      setInterestDialogOpen(false);
      setInitialMessage('');
      fetchMatch();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Kon interesse niet tonen');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleNotInterested() {
    if (!match) return;
    try {
      setSubmitting(true);
      await api.post('/matches/candidate-not-interested', { jobId });
      router.push('/dashboard/matches');
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Kon actie niet uitvoeren');
      setSubmitting(false);
    }
  }

  async function handleWithdrawInterest() {
    if (!match) return;
    try {
      setSubmitting(true);
      await api.post('/matches/candidate-withdraw-interest', { jobId });
      fetchMatch();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Kon interesse niet intrekken');
    } finally {
      setSubmitting(false);
    }
  }

  function formatSalary(min: number | null, max: number | null): string {
    if (!min && !max) return '';
    if (min && max) return `${min.toLocaleString('nl-BE')} - ${max.toLocaleString('nl-BE')} EUR`;
    if (min) return `Vanaf ${min.toLocaleString('nl-BE')} EUR`;
    return `Tot ${max!.toLocaleString('nl-BE')} EUR`;
  }

  function getTestStatusBadge(test: EmployerSkillTestWithStatus) {
    switch (test.candidateStatus) {
      case 'passed':
        return <Badge className="bg-green-100 text-green-700">Geslaagd</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-700">Niet geslaagd</Badge>;
      default:
        return <Badge variant="secondary">Niet gestart</Badge>;
    }
  }

  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <Skeleton className="h-8 w-32 mb-6" />
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-8" />
        <Skeleton className="h-64 mb-6" />
        <Skeleton className="h-48" />
      </div>
    );
  }

  if (error || !match) {
    return (
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <Link href="/dashboard/matches" className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block">
          &larr; Matches
        </Link>
        <Card className="border-red-200 bg-red-50">
          <CardContent className="py-6">
            <p className="text-red-600">{error || 'Match niet gevonden'}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { job, matchScore, interestState, chatRoomId, employerSkillTests, candidateInterestedAt } = match;
  const isMutualMatch = interestState.candidate === 'interested' && interestState.employer === 'interested';

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      {/* Back link */}
      <Link href="/dashboard/matches" className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block">
        &larr; Matches
      </Link>

      {/* Error banner */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Career switcher banner */}
      {matchScore.isCareerSwitcher && (
        <div className="mb-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-indigo-900">
                Career switcher — je zoekt richting dit vakgebied
              </h3>
              <p className="text-sm text-indigo-700 mt-1">
                Je match-score is gebaseerd op motivatie, persoonlijkheid en voorkeuren in plaats van alleen ervaring. 
                Dit helpt werkgevers je potentieel te zien, ook als je skills nog in ontwikkeling zijn.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start gap-4 mb-4">
          {job.employerLogoUrl ? (
            <img
              src={job.employerLogoUrl}
              alt={job.employerName}
              className="w-16 h-16 rounded-lg object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-xl font-bold">
                {job.employerName.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-1">{job.title}</h1>
            <p className="text-gray-700 font-medium">{job.employerName}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-sm text-gray-600">
          <Badge variant="outline">{job.sectorName}</Badge>
          {job.city && <span>{job.city}{job.employerCity && job.city !== job.employerCity ? ` (${job.employerCity})` : ''}</span>}
          <span>{workTypeLabels[job.workType] || job.workType}</span>
          {(job.salaryMin || job.salaryMax) && (
            <span>{formatSalary(job.salaryMin, job.salaryMax)}</span>
          )}
        </div>
      </div>

      {/* Match score */}
      <div className="mb-8">
        <MatchDisplay matchScore={matchScore} />
      </div>

      {/* Interest actions */}
      <Card className="mb-8">
        <CardContent className="py-6">
          {interestState.candidate === null || interestState.candidate === 'pending' ? (
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={() => setInterestDialogOpen(true)} disabled={submitting}>
                Ik heb interesse
              </Button>
              <Button variant="outline" onClick={handleNotInterested} disabled={submitting}>
                Niet voor mij
              </Button>
            </div>
          ) : interestState.candidate === 'interested' ? (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-green-700">
                  Je toonde interesse{candidateInterestedAt && ` op ${new Date(candidateInterestedAt).toLocaleDateString('nl-BE')}`}
                </span>
              </div>

              {isMutualMatch && chatRoomId ? (
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild>
                    <Link href={`/dashboard/chat/${chatRoomId}`}>
                      Open chat met {job.employerName} &rarr;
                    </Link>
                  </Button>
                </div>
              ) : interestState.employer === 'interested' ? (
                <Badge className="bg-green-100 text-green-700">Wederzijdse interesse</Badge>
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Wacht op reactie van {job.employerName}</p>
                  <Button variant="ghost" size="sm" onClick={handleWithdrawInterest} disabled={submitting}>
                    Interesse intrekken
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-600">Je hebt aangegeven niet geinteresseerd te zijn in deze vacature.</p>
          )}
        </CardContent>
      </Card>

      {/* Employer skill tests */}
      {employerSkillTests && employerSkillTests.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Toetsen voor deze vacature</CardTitle>
            <CardDescription>
              Deze werkgever vraagt dat je de onderstaande toetsen haalt voordat jullie kunnen chatten.
              Je kan ze nu al starten of pas na wederzijdse interesse.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {employerSkillTests.map((test) => (
                <div
                  key={test.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{test.title}</p>
                    <p className="text-sm text-gray-600">
                      {test.skillName} &middot; Slaagdrempel: {test.passThreshold}%
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {getTestStatusBadge(test)}
                    {test.candidateStatus !== 'passed' && (
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/dashboard/profile/test/employer/${test.id}`}>
                          {test.candidateStatus === 'failed' ? 'Opnieuw proberen' : 'Start toets'}
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Job description */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Functieomschrijving</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap text-gray-700">{job.description}</p>
        </CardContent>
      </Card>

      {/* Required skills */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Vereiste vaardigheden</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {job.skills.map((skill) => {
              const candidateDetail = matchScore.skillDetails.find((d) => d.skillId === skill.skillId);
              const hasSkill = candidateDetail && candidateDetail.candidateLevel !== null;
              const isLowerLevel = hasSkill && candidateDetail.score < 100;

              return (
                <div
                  key={skill.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{skill.skillName}</span>
                    <Badge className={levelColors[skill.requiredLevel]}>
                      {levelLabels[skill.requiredLevel]}
                    </Badge>
                    {skill.weight >= 4 && (
                      <span className="text-xs text-gray-500">Belangrijk: {skill.weight}/5</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {hasSkill ? (
                      isLowerLevel ? (
                        <span className="flex items-center gap-1 text-amber-600 text-sm">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          {candidateDetail.candidateLevel && levelLabels[candidateDetail.candidateLevel]}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-green-600 text-sm">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {candidateDetail.candidateLevel && levelLabels[candidateDetail.candidateLevel]}
                          {candidateDetail.isTested && (
                            <Badge variant="outline" className="text-xs ml-1">Getest</Badge>
                          )}
                        </span>
                      )
                    ) : (
                      <span className="flex items-center gap-1 text-red-600 text-sm">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Niet in profiel
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Interest dialog */}
      <Dialog open={interestDialogOpen} onOpenChange={setInterestDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Interesse tonen</DialogTitle>
            <DialogDescription>
              Wil je een kort bericht meesturen naar {job.employerName}? Dit is optioneel.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="initialMessage">Bericht (optioneel)</Label>
            <Textarea
              id="initialMessage"
              value={initialMessage}
              onChange={(e) => setInitialMessage(e.target.value)}
              placeholder="Vertel kort waarom je geinteresseerd bent..."
              rows={4}
              maxLength={500}
              className="mt-2"
            />
            <p className="text-xs text-gray-500 mt-1">{initialMessage.length}/500 tekens</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInterestDialogOpen(false)} disabled={submitting}>
              Annuleren
            </Button>
            <Button onClick={handleShowInterest} disabled={submitting}>
              {submitting ? 'Versturen...' : 'Toon interesse'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
