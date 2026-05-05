'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { api, ApiError } from '@/lib/api-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { MatchDisplay } from '@/components/match-display';
import type { Job, JobMatch, MbtiType } from '@/types/api';

// MBTI badge colors
const mbtiColors: Record<string, string> = {
  INTJ: 'bg-purple-100 text-purple-700',
  INTP: 'bg-purple-100 text-purple-700',
  ENTJ: 'bg-purple-100 text-purple-700',
  ENTP: 'bg-purple-100 text-purple-700',
  INFJ: 'bg-green-100 text-green-700',
  INFP: 'bg-green-100 text-green-700',
  ENFJ: 'bg-green-100 text-green-700',
  ENFP: 'bg-green-100 text-green-700',
  ISTJ: 'bg-blue-100 text-blue-700',
  ISFJ: 'bg-blue-100 text-blue-700',
  ESTJ: 'bg-blue-100 text-blue-700',
  ESFJ: 'bg-blue-100 text-blue-700',
  ISTP: 'bg-amber-100 text-amber-700',
  ISFP: 'bg-amber-100 text-amber-700',
  ESTP: 'bg-amber-100 text-amber-700',
  ESFP: 'bg-amber-100 text-amber-700',
};

export default function JobMatchesPage() {
  const params = useParams();
  const jobId = params.id as string;

  // Data state
  const [job, setJob] = useState<Job | null>(null);
  const [matches, setMatches] = useState<JobMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter state
  const [minScore, setMinScore] = useState(50);
  const [onlyMutual, setOnlyMutual] = useState(false);
  const [hideRejected, setHideRejected] = useState(true);

  // UI state
  const [expandedMatchId, setExpandedMatchId] = useState<string | null>(null);
  const [expandedBioId, setExpandedBioId] = useState<string | null>(null);

  // Interest dialog state
  const [interestDialog, setInterestDialog] = useState<{
    open: boolean;
    candidateProfileId: string;
    loading: boolean;
  }>({ open: false, candidateProfileId: '', loading: false });
  const [introMessage, setIntroMessage] = useState('');
  const [interestSuccess, setInterestSuccess] = useState<string | null>(null);

  // Mutual match modal
  const [mutualMatchModal, setMutualMatchModal] = useState<{
    open: boolean;
    chatRoomId: string | null;
  }>({ open: false, chatRoomId: null });

  // Fetch job and matches
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [jobRes, matchesRes] = await Promise.all([
        api.get<{ job: Job }>(`/employer/jobs/${jobId}`),
        api.get<{ matches: JobMatch[] }>(`/employer/jobs/${jobId}/matches?limit=50`),
      ]);
      setJob(jobRes.job);
      setMatches(matchesRes.matches);
      setError(null);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Er ging iets mis bij het ophalen van de gegevens.');
      }
    } finally {
      setLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filter matches
  const filteredMatches = matches.filter((match) => {
    if (match.matchScore.overall < minScore) return false;
    if (onlyMutual) {
      const isMutual =
        match.interestState.candidate === 'interested' &&
        match.interestState.employer === 'interested';
      if (!isMutual) return false;
    }
    if (hideRejected) {
      if (match.interestState.employer === 'not_interested') return false;
    }
    return true;
  });

  // Handle show interest
  const handleShowInterest = async () => {
    if (!interestDialog.candidateProfileId) return;

    setInterestDialog((prev) => ({ ...prev, loading: true }));

    try {
      const res = await api.post<{ match: JobMatch; isMutual: boolean; chatRoomId?: string }>(
        '/matches/employer-interest',
        {
          candidateProfileId: interestDialog.candidateProfileId,
          jobId,
          initialMessage: introMessage || undefined,
        }
      );

      // Update local state
      setMatches((prev) =>
        prev.map((m) =>
          m.candidateProfileId === interestDialog.candidateProfileId
            ? { ...m, interestState: { ...m.interestState, employer: 'interested' }, chatRoomId: res.chatRoomId || m.chatRoomId }
            : m
        )
      );

      setInterestDialog({ open: false, candidateProfileId: '', loading: false });
      setIntroMessage('');
      setInterestSuccess(interestDialog.candidateProfileId);
      setTimeout(() => setInterestSuccess(null), 3000);

      // Check for mutual match
      if (res.isMutual && res.chatRoomId) {
        setMutualMatchModal({ open: true, chatRoomId: res.chatRoomId });
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      }
      setInterestDialog((prev) => ({ ...prev, loading: false }));
    }
  };

  // Handle not interested
  const handleNotInterested = async (candidateProfileId: string) => {
    try {
      await api.post('/matches/employer-not-interested', { candidateProfileId, jobId });
      setMatches((prev) =>
        prev.map((m) =>
          m.candidateProfileId === candidateProfileId
            ? { ...m, interestState: { ...m.interestState, employer: 'not_interested' } }
            : m
        )
      );
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      }
    }
  };

  // Get status badge
  const getStatusBadge = (match: JobMatch) => {
    const { candidate, employer } = match.interestState;

    if (candidate === 'interested' && employer === 'interested') {
      return (
        <Badge className="bg-green-100 text-green-700 border-green-200">
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Wederzijdse interesse
        </Badge>
      );
    }

    if (employer === 'interested' && candidate !== 'interested') {
      return (
        <Badge variant="outline" className="text-amber-600 border-amber-300">
          Wachtend op kandidaat
        </Badge>
      );
    }

    if (candidate === 'interested' && employer !== 'interested') {
      return (
        <Badge variant="outline" className="text-blue-600 border-blue-300">
          Kandidaat geïnteresseerd
        </Badge>
      );
    }

    return null;
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-32 mb-8" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-40" />
          ))}
        </div>
      </div>
    );
  }

  if (error && !job) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="py-6">
            <p className="text-red-600">{error}</p>
            <Button asChild className="mt-4" variant="outline">
              <Link href="/dashboard/employer/jobs">Terug naar vacatures</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <Link
          href={`/dashboard/employer/jobs/${jobId}`}
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Vacature
        </Link>
        <h1 className="text-2xl font-bold">Matches voor: {job?.title}</h1>
        <p className="text-sm text-gray-600">
          {filteredMatches.length} kandidaten gevonden
        </p>
      </div>

      {/* Error banner */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="py-4">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Min score slider */}
            <div className="flex-1">
              <Label className="text-sm font-medium mb-2 block">
                Minimale match-score: {minScore}%
              </Label>
              <Slider
                value={[minScore]}
                onValueChange={([value]) => setMinScore(value)}
                min={0}
                max={100}
                step={5}
                className="w-full"
              />
            </div>

            {/* Toggles */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch
                  id="only-mutual"
                  checked={onlyMutual}
                  onCheckedChange={setOnlyMutual}
                />
                <Label htmlFor="only-mutual" className="text-sm">
                  Alleen wederzijds
                </Label>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="hide-rejected"
                  checked={hideRejected}
                  onCheckedChange={setHideRejected}
                />
                <Label htmlFor="hide-rejected" className="text-sm">
                  Verberg afgewezen
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Matches list */}
      {filteredMatches.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nog geen matches voor deze vacature
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Het algoritme matcht continu met nieuwe kandidaten. Kom later terug of pas de filters aan.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredMatches.map((match) => {
            const isExpanded = expandedMatchId === match.candidateProfileId;
            const isBioExpanded = expandedBioId === match.candidateProfileId;
            const isMutual =
              match.interestState.candidate === 'interested' &&
              match.interestState.employer === 'interested';
            const showSuccessBadge = interestSuccess === match.candidateProfileId;

            return (
              <Card key={match.candidateProfileId} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Avatar and basic info */}
                    <div className="flex gap-4 flex-1">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        {match.publicProfile.avatarUrl ? (
                          <img
                            src={match.publicProfile.avatarUrl}
                            alt="Avatar"
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="font-semibold">
                            {match.publicProfile.firstName || 'Anonieme kandidaat'}
                          </h3>
                          {match.publicProfile.mbtiType && (
                            <Badge className={mbtiColors[match.publicProfile.mbtiType] || 'bg-gray-100'}>
                              {match.publicProfile.mbtiType}
                            </Badge>
                          )}
                          {getStatusBadge(match)}
                          {showSuccessBadge && (
                            <Badge className="bg-green-100 text-green-700">
                              Interesse verzonden
                            </Badge>
                          )}
                        </div>

                        {match.publicProfile.city && (
                          <p className="text-sm text-gray-500 mb-2">
                            <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {match.publicProfile.city}
                          </p>
                        )}

                        {match.publicProfile.bio && (
                          <p className="text-sm text-gray-600">
                            {isBioExpanded || match.publicProfile.bio.length <= 150
                              ? match.publicProfile.bio
                              : `${match.publicProfile.bio.slice(0, 150)}...`}
                            {match.publicProfile.bio.length > 150 && (
                              <button
                                onClick={() =>
                                  setExpandedBioId(isBioExpanded ? null : match.candidateProfileId)
                                }
                                className="text-primary ml-1 hover:underline"
                              >
                                {isBioExpanded ? 'minder' : 'lees meer'}
                              </button>
                            )}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Match score compact */}
                    <div className="md:w-48 flex-shrink-0">
                      <MatchDisplay matchScore={match.matchScore} compact />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setExpandedMatchId(isExpanded ? null : match.candidateProfileId)
                      }
                    >
                      {isExpanded ? 'Verberg details' : 'Bekijk match'}
                    </Button>

                    {match.interestState.employer !== 'interested' && (
                      <Button
                        size="sm"
                        onClick={() =>
                          setInterestDialog({
                            open: true,
                            candidateProfileId: match.candidateProfileId,
                            loading: false,
                          })
                        }
                      >
                        Toon interesse
                      </Button>
                    )}

                    {match.interestState.employer === 'pending' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500"
                        onClick={() => handleNotInterested(match.candidateProfileId)}
                      >
                        Niet geïnteresseerd
                      </Button>
                    )}

                    {isMutual && match.chatRoomId && (
                      <Button asChild size="sm" variant="outline" className="text-green-600 border-green-300">
                        <Link href={`/dashboard/chat/${match.chatRoomId}`}>
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          Open chat
                        </Link>
                      </Button>
                    )}
                  </div>

                  {/* Expanded match details */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t">
                      <MatchDisplay matchScore={match.matchScore} />
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Interest Dialog */}
      <Dialog
        open={interestDialog.open}
        onOpenChange={(open) => {
          if (!open) {
            setInterestDialog({ open: false, candidateProfileId: '', loading: false });
            setIntroMessage('');
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Interesse tonen</DialogTitle>
            <DialogDescription>
              Stuur een optioneel introductiebericht naar deze kandidaat.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Label htmlFor="intro-message" className="text-sm font-medium mb-2 block">
              Introductiebericht (optioneel)
            </Label>
            <Textarea
              id="intro-message"
              value={introMessage}
              onChange={(e) => setIntroMessage(e.target.value.slice(0, 500))}
              placeholder="Schrijf een persoonlijk bericht..."
              rows={4}
            />
            <p className="text-xs text-gray-500 mt-1 text-right">
              {introMessage.length}/500
            </p>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setInterestDialog({ open: false, candidateProfileId: '', loading: false });
                setIntroMessage('');
              }}
              disabled={interestDialog.loading}
            >
              Annuleren
            </Button>
            <Button onClick={handleShowInterest} disabled={interestDialog.loading}>
              {interestDialog.loading ? 'Verzenden...' : 'Verzenden'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Mutual Match Modal */}
      <Dialog open={mutualMatchModal.open} onOpenChange={(open) => setMutualMatchModal({ open, chatRoomId: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              <span className="text-green-600">Wederzijdse interesse!</span>
            </DialogTitle>
            <DialogDescription className="text-center">
              Jullie zijn allebei geïnteresseerd. Je kunt nu chatten met deze kandidaat.
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-center py-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setMutualMatchModal({ open: false, chatRoomId: null })}
              className="w-full sm:w-auto"
            >
              Sluiten
            </Button>
            {mutualMatchModal.chatRoomId && (
              <Button asChild className="w-full sm:w-auto">
                <Link href={`/dashboard/chat/${mutualMatchModal.chatRoomId}`}>
                  Chat openen
                </Link>
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
