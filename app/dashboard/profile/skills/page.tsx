'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { api, ApiError } from '@/lib/api-client';
import { useAuth } from '@/lib/auth-context';
import { PROFICIENCY_LABELS } from '@/lib/proficiency';
import type { CandidateSkill, Sector, Skill, ProficiencyLevel } from '@/types/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Info, Check, AlertTriangle, ChevronDown, ChevronRight, Trash2 } from 'lucide-react';

// Proficiency level colors
const proficiencyColors: Record<ProficiencyLevel, string> = {
  informed: 'bg-gray-100 text-gray-700',
  beginner: 'bg-blue-100 text-blue-700',
  advanced: 'bg-green-100 text-green-700',
  expert: 'bg-purple-100 text-purple-700',
  master: 'bg-amber-100 text-amber-700',
};

interface SelectedSkillData {
  useForMatching: boolean;
  proficiencyLevel: ProficiencyLevel | null;
  candidateSkillId: string | null; // ID from candidate_skills table for deletion
  hasAvailableTest: boolean;
}

export default function SkillsPage() {
  const { user } = useAuth();
  
  // My skills state
  const [mySkills, setMySkills] = useState<Map<string, SelectedSkillData>>(new Map());
  const [originalSkills, setOriginalSkills] = useState<CandidateSkill[]>([]);
  const [skillsLoading, setSkillsLoading] = useState(true);
  const [skillsError, setSkillsError] = useState<string | null>(null);

  // Sectors and available skills state
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [sectorsLoading, setSectorsLoading] = useState(true);
  const [expandedSectorId, setExpandedSectorId] = useState<string | null>(null);
  const [sectorSkillsMap, setSectorSkillsMap] = useState<Map<string, Skill[]>>(new Map());
  const [loadingSectorId, setLoadingSectorId] = useState<string | null>(null);

  // Save state
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Delete confirmation state
  const [deleteSkillId, setDeleteSkillId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Fetch my skills
  useEffect(() => {
    async function fetchMySkills() {
      try {
        const res = await api.get<{ skills: CandidateSkill[] }>('/candidate/skills');
        const skills = res.skills || [];
        setOriginalSkills(skills);
        
        const newMap = new Map<string, SelectedSkillData>();
        skills.forEach((skill) => {
          newMap.set(skill.skillId, {
            useForMatching: skill.useForMatching ?? true,
            proficiencyLevel: skill.proficiencyLevel ?? null,
            candidateSkillId: skill.id,
            hasAvailableTest: skill.hasAvailableTest ?? false,
          });
        });
        setMySkills(newMap);
      } catch (err) {
        if (err instanceof ApiError) {
          setSkillsError(err.message);
        } else {
          setSkillsError('Er ging iets mis bij het laden van je skills.');
        }
      } finally {
        setSkillsLoading(false);
      }
    }
    fetchMySkills();
  }, []);

  // Fetch sectors
  useEffect(() => {
    async function fetchSectors() {
      try {
        const res = await api.get<Sector[]>('/skills/sectors');
        setSectors(res);
      } catch (err) {
        console.error('Failed to load sectors:', err);
      } finally {
        setSectorsLoading(false);
      }
    }
    fetchSectors();
  }, []);

  // Load skills for a sector (lazy)
  const loadSectorSkills = useCallback(async (sectorId: string) => {
    if (sectorSkillsMap.has(sectorId)) return;
    
    setLoadingSectorId(sectorId);
    try {
      const res = await api.get<Skill[]>(`/skills?sectorId=${sectorId}`);
      setSectorSkillsMap(prev => new Map(prev).set(sectorId, res));
    } catch (err) {
      console.error('Failed to load skills:', err);
    } finally {
      setLoadingSectorId(null);
    }
  }, [sectorSkillsMap]);

  // Toggle sector expansion
  const toggleSector = useCallback((sectorId: string) => {
    if (expandedSectorId === sectorId) {
      setExpandedSectorId(null);
    } else {
      setExpandedSectorId(sectorId);
      loadSectorSkills(sectorId);
    }
  }, [expandedSectorId, loadSectorSkills]);

  // Toggle skill selection
  const toggleSkill = useCallback((skillId: string, hasAvailableTest: boolean = false) => {
    setMySkills(prev => {
      const newMap = new Map(prev);
      if (newMap.has(skillId)) {
        newMap.delete(skillId);
      } else {
        newMap.set(skillId, { 
          useForMatching: true, 
          proficiencyLevel: null,
          candidateSkillId: null,
          hasAvailableTest
        });
      }
      return newMap;
    });
    setSaveSuccess(false);
  }, []);

  // Toggle matching for a skill (only if not tested)
  const toggleSkillMatching = useCallback((skillId: string) => {
    setMySkills(prev => {
      const newMap = new Map(prev);
      const current = newMap.get(skillId);
      if (current && !current.proficiencyLevel) {
        newMap.set(skillId, { 
          ...current,
          useForMatching: !current.useForMatching 
        });
      }
      return newMap;
    });
    setSaveSuccess(false);
  }, []);

  // Save skills
  const handleSave = useCallback(async () => {
    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      const payload = {
        skills: [...mySkills.entries()].map(([skillId, data]) => ({
          skillId,
          useForMatching: data.useForMatching,
        })),
      };

      await api.put('/candidate/skills', payload);
      setSaveSuccess(true);
      
      // Refresh skills to get updated candidateSkillIds
      const res = await api.get<{ skills: CandidateSkill[] }>('/candidate/skills');
      const skills = res.skills || [];
      setOriginalSkills(skills);
      
      const newMap = new Map<string, SelectedSkillData>();
      skills.forEach((skill) => {
        newMap.set(skill.skillId, {
          useForMatching: skill.useForMatching ?? true,
          proficiencyLevel: skill.proficiencyLevel ?? null,
          candidateSkillId: skill.id,
          hasAvailableTest: skill.hasAvailableTest ?? false,
        });
      });
      setMySkills(newMap);
    } catch (err) {
      if (err instanceof ApiError) {
        setSaveError(err.message);
      } else {
        setSaveError('Er ging iets mis bij het opslaan.');
      }
    } finally {
      setSaving(false);
    }
  }, [mySkills]);

  // Delete a skill
  const handleDeleteSkill = useCallback(async () => {
    if (!deleteSkillId) return;
    
    const skillData = mySkills.get(deleteSkillId);
    if (!skillData?.candidateSkillId) {
      // Not saved yet, just remove from local state
      setMySkills(prev => {
        const newMap = new Map(prev);
        newMap.delete(deleteSkillId);
        return newMap;
      });
      setDeleteSkillId(null);
      return;
    }

    setDeleting(true);
    try {
      await api.delete(`/candidate/skills/${skillData.candidateSkillId}`);
      setMySkills(prev => {
        const newMap = new Map(prev);
        newMap.delete(deleteSkillId);
        return newMap;
      });
      setOriginalSkills(prev => prev.filter(s => s.skillId !== deleteSkillId));
      setDeleteSkillId(null);
    } catch (err) {
      if (err instanceof ApiError) {
        alert(err.message);
      }
    } finally {
      setDeleting(false);
    }
  }, [deleteSkillId, mySkills]);

  // Computed values
  const selectedSkillsCount = mySkills.size;
  const matchingSkillsCount = useMemo(() => {
    let count = 0;
    mySkills.forEach(data => {
      if (data.useForMatching) count++;
    });
    return count;
  }, [mySkills]);

  // Group skills by sector for display
  const skillsBySector = useMemo(() => {
    const grouped = new Map<string, { sectorName: string; skills: Array<{ skillId: string; data: SelectedSkillData; skillName: string }> }>();
    
    originalSkills.forEach(skill => {
      const data = mySkills.get(skill.skillId);
      if (data) {
        const existing = grouped.get(skill.sectorId) || { 
          sectorName: skill.sectorName, 
          skills: [] 
        };
        existing.skills.push({ 
          skillId: skill.skillId, 
          data, 
          skillName: skill.skillName 
        });
        grouped.set(skill.sectorId, existing);
      }
    });
    
    return grouped;
  }, [mySkills, originalSkills]);

  // Get skill name from original skills
  const getSkillName = useCallback((skillId: string) => {
    return originalSkills.find(s => s.skillId === skillId)?.skillName || '';
  }, [originalSkills]);

  return (
    <TooltipProvider>
      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/dashboard/profile"
            className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-block"
          >
            &larr; Terug naar profiel
          </Link>
          <h1 className="text-2xl font-bold">Mijn skills</h1>
          <p className="text-gray-600 text-sm">
            Beheer je vaardigheden en laat werkgevers zien wat je kunt.
          </p>
        </div>

        {/* Counter + info */}
        {selectedSkillsCount > 0 && (
          <div className="mb-6 p-4 bg-white border rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge className="bg-green-600 text-white px-3 py-1">
                {selectedSkillsCount} geselecteerd
              </Badge>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <span>{matchingSkillsCount} voor matching</span>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="font-medium mb-1">Geselecteerd vs Matching</p>
                    <p className="text-sm">
                      Geselecteerd: aantal skills + interesses op je profiel.
                      Voor matching: skills die meetellen voor jobsuggesties.
                    </p>
                    <p className="text-sm mt-1">
                      Skills op &apos;interesse&apos; tellen niet voor matching, maar helpen je om jobs
                      in nieuwe vakgebieden aangeboden te krijgen.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Opslaan...' : 'Wijzigingen opslaan'}
            </Button>
          </div>
        )}

        {/* Save feedback */}
        {saveError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span className="text-sm text-red-600">{saveError}</span>
          </div>
        )}
        {saveSuccess && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-center gap-2">
            <Check className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-600">Je skills zijn opgeslagen!</span>
          </div>
        )}

        {/* Section 1: My Skills grouped by sector */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Mijn vaardigheden</CardTitle>
            <CardDescription>
              Je hebt {selectedSkillsCount} skill{selectedSkillsCount !== 1 ? 's' : ''} toegevoegd.
              {selectedSkillsCount < 3 && ' Voeg er minstens 3 toe voor betere matches.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {skillsLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-16" />
                <Skeleton className="h-16" />
                <Skeleton className="h-16" />
              </div>
            ) : skillsError ? (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{skillsError}</p>
              </div>
            ) : selectedSkillsCount === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-2">Nog geen skills toegevoegd.</p>
                <p className="text-sm text-gray-400">
                  Selecteer skills uit de sectoren hieronder.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {[...skillsBySector.entries()].map(([sectorId, { sectorName, skills }]) => (
                  <div key={sectorId}>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                      {sectorName}
                    </h4>
                    <div className="space-y-2">
                      {skills.map(({ skillId, data, skillName }) => (
                        <SkillRow
                          key={skillId}
                          skillId={skillId}
                          skillName={skillName}
                          data={data}
                          onToggleMatching={() => toggleSkillMatching(skillId)}
                          onDelete={() => setDeleteSkillId(skillId)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Section 2: Add Skills by Sector */}
        <Card>
          <CardHeader>
            <CardTitle>Skill toevoegen</CardTitle>
            <CardDescription>
              Selecteer een sector om relevante skills toe te voegen.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Info banner */}
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
              <p className="text-sm text-amber-800">
                <strong>Tip:</strong> Skills die je wil ontwikkelen kun je als &apos;interesse&apos; markeren — 
                zo kom je in beeld voor jobs in nieuwe vakgebieden, ook als je er nog geen ervaring in hebt.
              </p>
            </div>

            {sectorsLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
              </div>
            ) : (
              <div className="space-y-2">
                {sectors.map((sector) => {
                  const isExpanded = expandedSectorId === sector.id;
                  const isLoading = loadingSectorId === sector.id;
                  const skills = sectorSkillsMap.get(sector.id) || [];
                  const selectedInSector = skills.filter(s => mySkills.has(s.id)).length;

                  return (
                    <div key={sector.id} className="border rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleSector(sector.id)}
                        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-gray-500" />
                          )}
                          <span className="font-medium">{sector.name}</span>
                        </div>
                        {selectedInSector > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            {selectedInSector} geselecteerd
                          </Badge>
                        )}
                      </button>

                      {isExpanded && (
                        <div className="p-4 bg-white border-t">
                          {isLoading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {Array.from({ length: 4 }).map((_, i) => (
                                <Skeleton key={i} className="h-12" />
                              ))}
                            </div>
                          ) : skills.length === 0 ? (
                            <p className="text-sm text-gray-500 text-center py-4">
                              Geen skills gevonden voor deze sector.
                            </p>
                          ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {skills.map((skill) => {
                                const isSelected = mySkills.has(skill.id);
                                const skillData = mySkills.get(skill.id);

                                return (
                                  <div
                                    key={skill.id}
                                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                                      isSelected
                                        ? 'border-indigo-300 bg-indigo-50'
                                        : 'hover:border-gray-300'
                                    }`}
                                    onClick={() => toggleSkill(skill.id, skill.hasAvailableTest ?? false)}
                                  >
                                    <div className="flex items-center justify-between">
                                      <span className={isSelected ? 'text-indigo-700 font-medium' : ''}>
                                        {skill.name}
                                      </span>
                                      {isSelected && (
                                        <Check className="w-4 h-4 text-indigo-600" />
                                      )}
                                    </div>
                                    {skill.description && (
                                      <p className="text-xs text-gray-500 mt-1">{skill.description}</p>
                                    )}
                                    {isSelected && skillData && (
                                      <div className="mt-2 pt-2 border-t border-indigo-200">
                                        <MatchingToggleInline
                                          useForMatching={skillData.useForMatching}
                                          proficiencyLevel={skillData.proficiencyLevel}
                                          hasAvailableTest={skillData.hasAvailableTest || skill.hasAvailableTest || false}
                                          skillId={skill.id}
                                          onToggle={(e) => {
                                            e.stopPropagation();
                                            toggleSkillMatching(skill.id);
                                          }}
                                        />
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Save button at bottom */}
        {selectedSkillsCount > 0 && (
          <div className="mt-6 flex justify-end">
            <Button onClick={handleSave} disabled={saving} size="lg">
              {saving ? 'Opslaan...' : 'Wijzigingen opslaan'}
            </Button>
          </div>
        )}

        {/* Delete confirmation dialog */}
        <Dialog open={!!deleteSkillId} onOpenChange={() => setDeleteSkillId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Skill verwijderen</DialogTitle>
              <DialogDescription>
                Weet je zeker dat je &quot;{getSkillName(deleteSkillId || '')}&quot; wilt verwijderen?
                {mySkills.get(deleteSkillId || '')?.proficiencyLevel && (
                  <span className="block mt-2 text-amber-600">
                    Let op: Je testresultaten voor deze skill gaan verloren.
                  </span>
                )}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteSkillId(null)}
                disabled={deleting}
              >
                Annuleren
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteSkill}
                disabled={deleting}
              >
                {deleting ? 'Verwijderen...' : 'Verwijderen'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}

// Skill row component for "My Skills" section
function SkillRow({
  skillId,
  skillName,
  data,
  onToggleMatching,
  onDelete,
}: {
  skillId: string;
  skillName: string;
  data: SelectedSkillData;
  onToggleMatching: () => void;
  onDelete: () => void;
}) {
  const isTested = !!data.proficiencyLevel;
  const isDisabled = isTested;
  const hasTest = data.hasAvailableTest;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border rounded-lg bg-white">
      <div className="flex-1 min-w-0">
        <span className="font-medium">{skillName}</span>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        {/* Test status badge */}
        {isTested ? (
          <Badge className={`${proficiencyColors[data.proficiencyLevel!]} border-0`}>
            {PROFICIENCY_LABELS[data.proficiencyLevel!]} getest
          </Badge>
        ) : data.useForMatching ? (
          <Badge variant="outline" className="text-gray-500">
            Niet getest
          </Badge>
        ) : (
          <Badge className="bg-amber-100 text-amber-700 border-0">
            Interesse
          </Badge>
        )}

        {/* Matching toggle */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">
                  {data.useForMatching ? 'Matching' : 'Interesse'}
                </span>
                <button
                  onClick={onToggleMatching}
                  disabled={isDisabled}
                  className={`relative w-10 h-5 rounded-full transition-colors ${
                    isDisabled
                      ? 'bg-gray-200 cursor-not-allowed'
                      : data.useForMatching
                      ? 'bg-green-500'
                      : 'bg-amber-500'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                      data.useForMatching ? 'left-5' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>
            </TooltipTrigger>
            {isDisabled && (
              <TooltipContent className="max-w-xs">
                <p>
                  Deze skill is getest op {PROFICIENCY_LABELS[data.proficiencyLevel!]}. 
                  Om hem als interesse te markeren, moet je hem eerst verwijderen en opnieuw toevoegen.
                </p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>

        {/* Test affordance - based on state */}
        {!data.useForMatching ? (
          // Interest skill - show hint
          <span className="text-xs text-gray-400 italic">
            Zet op matching om te testen
          </span>
        ) : isTested && hasTest ? (
          // Tested with higher test available
          <Button variant="outline" size="sm" asChild>
            <Link href={`/dashboard/profile/test/${skillId}`}>
              Hoger niveau testen &rarr;
            </Link>
          </Button>
        ) : isTested && !hasTest ? (
          // Tested, no higher test
          null
        ) : hasTest ? (
          // Not tested, test available
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700" asChild>
            <Link href={`/dashboard/profile/test/${skillId}`}>
              Test afleggen &rarr;
            </Link>
          </Button>
        ) : (
          // Not tested, no test available
          <span className="text-xs text-gray-400">
            Geen test beschikbaar
          </span>
        )}

        {/* Delete button */}
        <Button
          variant="ghost"
          size="sm"
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
          onClick={onDelete}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

// Inline matching toggle for skill selection with test affordance
function MatchingToggleInline({
  useForMatching,
  proficiencyLevel,
  hasAvailableTest,
  skillId,
  onToggle,
}: {
  useForMatching: boolean;
  proficiencyLevel: ProficiencyLevel | null;
  hasAvailableTest: boolean;
  skillId: string;
  onToggle: (e: React.MouseEvent) => void;
}) {
  const isTested = !!proficiencyLevel;

  return (
    <div className="space-y-2">
      {/* Matching toggle row */}
      <div className="flex items-center justify-between text-xs">
        <span className={useForMatching ? 'text-green-600' : 'text-amber-600'}>
          {useForMatching ? 'Voor matching' : 'Interesse'}
        </span>
        {isTested ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="relative w-8 h-4 rounded-full bg-gray-300 cursor-not-allowed opacity-60"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute top-0.5 left-4 w-3 h-3 rounded-full bg-white shadow" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs text-xs">
              Deze skill is getest op {PROFICIENCY_LABELS[proficiencyLevel]}. Om hem als interesse te markeren, moet je hem eerst verwijderen en opnieuw toevoegen.
            </TooltipContent>
          </Tooltip>
        ) : (
          <button
            onClick={onToggle}
            className={`relative w-8 h-4 rounded-full transition-colors ${
              useForMatching ? 'bg-green-500' : 'bg-amber-500'
            }`}
          >
            <div
              className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform ${
                useForMatching ? 'left-4' : 'left-0.5'
              }`}
            />
          </button>
        )}
      </div>

      {/* Test affordance row */}
      <div className="text-xs">
        {!useForMatching ? (
          // Case: interesse (not for matching)
          <p className="text-gray-400 italic mb-0">
            Schakel &apos;Voor matching&apos; aan om deze skill te kunnen testen.
          </p>
        ) : proficiencyLevel ? (
          // Case: tested
          <div className="flex items-center justify-between">
            <Badge className={proficiencyColors[proficiencyLevel]}>
              {PROFICIENCY_LABELS[proficiencyLevel]} getest
            </Badge>
            {hasAvailableTest && (
              <Link
                href={`/dashboard/profile/test/${skillId}`}
                onClick={(e) => e.stopPropagation()}
                className="text-indigo-600 hover:underline"
              >
                Hoger niveau testen &rarr;
              </Link>
            )}
          </div>
        ) : hasAvailableTest ? (
          // Case: not tested, test available
          <div>
            <Link
              href={`/dashboard/profile/test/${skillId}`}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Test afleggen &rarr;
            </Link>
            <p className="text-gray-500 mt-1 mb-0">
              Test je niveau om beter te matchen met werkgevers.
            </p>
          </div>
        ) : (
          // Case: not tested, no test available
          <p className="text-gray-400 mb-0">
            Geen test beschikbaar. Je profiel toont &apos;beheerst maar niet getest&apos; bij werkgevers.
          </p>
        )}
      </div>
    </div>
  );
}
