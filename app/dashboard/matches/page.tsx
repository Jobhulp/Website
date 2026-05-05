'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api, ApiError } from '@/lib/api-client';
import type { CandidateMatch, Sector, WorkType, InterestState } from '@/types/api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select-shadcn';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { MatchDisplay } from '@/components/match-display';

const workTypeLabels: Record<WorkType, string> = {
  full_time: 'Voltijds',
  part_time: 'Deeltijds',
  freelance: 'Freelance',
  temporary: 'Tijdelijk',
};

function formatSalary(min: number | null, max: number | null): string | null {
  if (!min && !max) return null;
  if (min && max) return `${min.toLocaleString('nl-BE')} - ${max.toLocaleString('nl-BE')} per jaar`;
  if (min) return `Vanaf ${min.toLocaleString('nl-BE')} per jaar`;
  return `Tot ${max!.toLocaleString('nl-BE')} per jaar`;
}

function getScoreColor(score: number): string {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-blue-600';
  if (score >= 40) return 'text-amber-600';
  return 'text-red-600';
}

function getScoreBgColor(score: number): string {
  if (score >= 80) return 'bg-green-100 text-green-800';
  if (score >= 60) return 'bg-blue-100 text-blue-800';
  if (score >= 40) return 'bg-amber-100 text-amber-800';
  return 'bg-red-100 text-red-800';
}

export default function CandidateMatchesPage() {
  const router = useRouter();
  
  // Data state
  const [matches, setMatches] = useState<CandidateMatch[]>([]);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter state
  const [sectorId, setSectorId] = useState<string>('all');
  const [selectedWorkTypes, setSelectedWorkTypes] = useState<WorkType[]>([]);
  const [cityFilter, setCityFilter] = useState('');
  const [minScore, setMinScore] = useState(50);
  const [mutualOnly, setMutualOnly] = useState(false);
  
  // Interest dialog state
  const [interestDialog, setInterestDialog] = useState<{ match: CandidateMatch } | null>(null);
  const [interestMessage, setInterestMessage] = useState('');
  const [submittingInterest, setSubmittingInterest] = useState(false);
  
  // Expanded match state
  const [expandedMatchId, setExpandedMatchId] = useState<string | null>(null);

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [matchesRes, sectorsRes] = await Promise.all([
          api.get<CandidateMatch[]>(`/matches?limit=50&minScore=${minScore}`),
          api.get<Sector[]>('/skills/sectors'),
        ]);
        setMatches(matchesRes);
        setSectors(sectorsRes);
      } catch (err) {
        setError(err instanceof ApiError ? err.message : 'Er ging iets mis bij het laden.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [minScore]);

  // Filter matches
  const filteredMatches = useMemo(() => {
    return matches.filter((match) => {
      // Sector filter
      if (sectorId !== 'all' && match.job.sectorId !== sectorId) return false;
      
      // Work type filter
      if (selectedWorkTypes.length > 0 && !selectedWorkTypes.includes(match.job.workType)) return false;
      
      // City filter
      if (cityFilter.trim()) {
        const cityLower = cityFilter.toLowerCase();
        if (!match.job.city?.toLowerCase().includes(cityLower)) return false;
      }
      
      // Mutual interest filter
      if (mutualOnly) {
        const isMutual = 
          match.interestState.candidate === 'interested' && 
          match.interestState.employer === 'interested';
        if (!isMutual) return false;
      }
      
      return true;
    });
  }, [matches, sectorId, selectedWorkTypes, cityFilter, mutualOnly]);

  // Toggle work type filter
  const toggleWorkType = (wt: WorkType) => {
    setSelectedWorkTypes((prev) =>
      prev.includes(wt) ? prev.filter((t) => t !== wt) : [...prev, wt]
    );
  };

  // Show interest
  const handleShowInterest = async () => {
    if (!interestDialog) return;
    
    try {
      setSubmittingInterest(true);
      await api.post(`/matches/${interestDialog.match.job.id}/interest`, {
        message: interestMessage || undefined,
      });
      
      // Update local state
      setMatches((prev) =>
        prev.map((m) =>
          m.job.id === interestDialog.match.job.id
            ? {
                ...m,
                interestState: { ...m.interestState, candidate: 'interested' as InterestState },
              }
            : m
        )
      );
      
      setInterestDialog(null);
      setInterestMessage('');
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Kon interesse niet registreren.');
    } finally {
      setSubmittingInterest(false);
    }
  };

  // Get status badge
  const getStatusBadge = (match: CandidateMatch) => {
    const { candidate, employer } = match.interestState;
    
    if (candidate === 'interested' && employer === 'interested') {
      return <Badge className="bg-green-100 text-green-800">Wederzijdse interesse</Badge>;
    }
    if (candidate === 'interested' && employer === 'pending') {
      return <Badge className="bg-blue-100 text-blue-800">Wacht op werkgever</Badge>;
    }
    if (candidate === 'pending' && employer === 'interested') {
      return <Badge className="bg-amber-100 text-amber-800">Werkgever geinteresseerd</Badge>;
    }
    if (candidate === 'not_interested') {
      return <Badge variant="secondary">Niet geinteresseerd</Badge>;
    }
    return null;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Skeleton className="h-10 w-48 mb-2" />
        <Skeleton className="h-5 w-96 mb-8" />
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Mijn matches</h1>
        <p className="text-gray-600 text-sm">
          Vacatures gerangschikt op match-score met jouw profiel.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Sector filter */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Sector</Label>
              <Select value={sectorId} onValueChange={setSectorId}>
                <SelectTrigger>
                  <SelectValue placeholder="Alle sectoren" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle sectoren</SelectItem>
                  {sectors.map((sector) => (
                    <SelectItem key={sector.id} value={sector.id}>
                      {sector.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* City filter */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Stad/regio</Label>
              <Input
                placeholder="Bijv. Antwerpen"
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
              />
            </div>

            {/* Min score slider */}
            <div>
              <Label className="text-sm font-medium mb-2 block">
                Minimale score: {minScore}%
              </Label>
              <Slider
                value={[minScore]}
                onValueChange={([val]) => setMinScore(val)}
                min={0}
                max={100}
                step={5}
                className="mt-3"
              />
            </div>

            {/* Mutual only toggle */}
            <div className="flex items-center justify-between pt-6">
              <Label className="text-sm font-medium">Alleen wederzijds</Label>
              <Switch checked={mutualOnly} onCheckedChange={setMutualOnly} />
            </div>
          </div>

          {/* Work type checkboxes */}
          <div className="mt-4 pt-4 border-t">
            <Label className="text-sm font-medium mb-3 block">Werktype</Label>
            <div className="flex flex-wrap gap-4">
              {(Object.keys(workTypeLabels) as WorkType[]).map((wt) => (
                <div key={wt} className="flex items-center space-x-2">
                  <Checkbox
                    id={`wt-${wt}`}
                    checked={selectedWorkTypes.includes(wt)}
                    onCheckedChange={() => toggleWorkType(wt)}
                  />
                  <Label htmlFor={`wt-${wt}`} className="text-sm cursor-pointer">
                    {workTypeLabels[wt]}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results count */}
      <p className="text-sm text-gray-600 mb-4">
        {filteredMatches.length} {filteredMatches.length === 1 ? 'match' : 'matches'} gevonden
      </p>

      {/* Matches list */}
      {filteredMatches.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Geen matches gevonden</h3>
            <p className="text-gray-600 text-sm mb-6 max-w-md mx-auto">
              Voeg meer skills toe of doe de persoonlijkheidstest voor betere matches.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link href="/dashboard/profile/skills">Skills toevoegen</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/dashboard/profile/personality-test">Persoonlijkheidstest</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredMatches.map((match) => {
            const isMutual =
              match.interestState.candidate === 'interested' &&
              match.interestState.employer === 'interested';
            const hasShownInterest = match.interestState.candidate === 'interested';
            const isExpanded = expandedMatchId === match.job.id;

            return (
              <Card
                key={match.job.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => router.push(`/dashboard/matches/${match.job.id}`)}
              >
                <CardContent className="py-4">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    {/* Left: Employer logo + info */}
                    <div className="flex items-start gap-4 flex-1">
                      {/* Logo */}
                      <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {match.job.employerLogoUrl ? (
                          <img
                            src={match.job.employerLogoUrl}
                            alt={match.job.employerName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-xl font-bold text-gray-400">
                            {match.job.employerName.charAt(0)}
                          </span>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="text-lg font-semibold truncate">{match.job.title}</h3>
                          {getStatusBadge(match)}
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">{match.job.employerName}</p>
                        
                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-3">
                          <Badge variant="outline">{match.job.sectorName}</Badge>
                          {match.job.city && (
                            <span className="flex items-center gap-1">
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {match.job.city}
                            </span>
                          )}
                          <span>{workTypeLabels[match.job.workType]}</span>
                          {formatSalary(match.job.salaryMin, match.job.salaryMax) && (
                            <span>{formatSalary(match.job.salaryMin, match.job.salaryMax)}</span>
                          )}
                        </div>

                        <p className="text-sm text-gray-600 line-clamp-2">
                          {match.job.description.slice(0, 200)}
                          {match.job.description.length > 200 && '...'}
                        </p>
                      </div>
                    </div>

                    {/* Right: Match score + actions */}
                    <div className="flex flex-col items-end gap-3 lg:min-w-[180px]">
                      {/* Compact match score */}
                      <div
                        className={`text-center px-4 py-2 rounded-lg ${getScoreBgColor(match.matchScore.overall)}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedMatchId(isExpanded ? null : match.job.id);
                        }}
                      >
                        <div className="text-2xl font-bold">{match.matchScore.overall}%</div>
                        <div className="text-xs">match</div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                        {isMutual && match.chatRoomId ? (
                          <Button size="sm" asChild>
                            <Link href={`/dashboard/chat/${match.chatRoomId}`}>
                              Open chat
                            </Link>
                          </Button>
                        ) : !hasShownInterest ? (
                          <Button
                            size="sm"
                            onClick={() => setInterestDialog({ match })}
                          >
                            Toon interesse
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" disabled>
                            Interesse getoond
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded match details */}
                  {isExpanded && (
                    <div
                      className="mt-4 pt-4 border-t"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MatchDisplay matchScore={match.matchScore} compact={false} />
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Interest Dialog */}
      <Dialog open={!!interestDialog} onOpenChange={() => setInterestDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Interesse tonen</DialogTitle>
          </DialogHeader>
          
          {interestDialog && (
            <div className="py-4">
              <p className="text-sm text-gray-600 mb-4">
                Je toont interesse in <strong>{interestDialog.match.job.title}</strong> bij{' '}
                <strong>{interestDialog.match.job.employerName}</strong>.
              </p>
              
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Bericht (optioneel)
                </Label>
                <Textarea
                  placeholder="Vertel kort waarom je geinteresseerd bent..."
                  value={interestMessage}
                  onChange={(e) => setInterestMessage(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setInterestDialog(null)}>
              Annuleren
            </Button>
            <Button onClick={handleShowInterest} disabled={submittingInterest}>
              {submittingInterest ? 'Verzenden...' : 'Verstuur interesse'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
