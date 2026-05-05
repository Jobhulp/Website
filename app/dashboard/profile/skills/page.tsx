'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { api, ApiError } from '@/lib/api-client';
import type { CandidateSkill, Sector, Skill, ProficiencyLevel } from '@/types/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// Proficiency level config
const proficiencyConfig: Record<ProficiencyLevel, { label: string; color: string }> = {
  informed: { label: 'Op de hoogte', color: 'bg-gray-100 text-gray-700' },
  beginner: { label: 'Beginner', color: 'bg-blue-100 text-blue-700' },
  advanced: { label: 'Gevorderd', color: 'bg-green-100 text-green-700' },
  expert: { label: 'Expert', color: 'bg-purple-100 text-purple-700' },
  master: { label: 'Meester', color: 'bg-amber-100 text-amber-700' },
};

const proficiencyLevels: ProficiencyLevel[] = ['informed', 'beginner', 'advanced', 'expert', 'master'];

export default function SkillsPage() {
  // My skills state
  const [mySkills, setMySkills] = useState<CandidateSkill[]>([]);
  const [skillsLoading, setSkillsLoading] = useState(true);
  const [skillsError, setSkillsError] = useState<string | null>(null);

  // Sectors and available skills state
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [sectorsLoading, setSectorsLoading] = useState(true);
  const [activeSectorId, setActiveSectorId] = useState<string | null>(null);
  const [sectorSkills, setSectorSkills] = useState<Skill[]>([]);
  const [sectorSkillsLoading, setSectorSkillsLoading] = useState(false);

  // Adding skill state
  const [addingSkillId, setAddingSkillId] = useState<string | null>(null);

  // Delete confirmation state
  const [deleteSkill, setDeleteSkill] = useState<CandidateSkill | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Updating level state
  const [updatingLevelId, setUpdatingLevelId] = useState<string | null>(null);

  // Fetch my skills
  useEffect(() => {
    async function fetchMySkills() {
      try {
        const res = await api.get<CandidateSkill[]>('/candidate/skills');
        setMySkills(res);
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
        if (res.length > 0) {
          setActiveSectorId(res[0].id);
        }
      } catch (err) {
        console.error('Failed to load sectors:', err);
      } finally {
        setSectorsLoading(false);
      }
    }
    fetchSectors();
  }, []);

  // Fetch skills for active sector
  useEffect(() => {
    if (!activeSectorId) return;

    async function fetchSectorSkills() {
      setSectorSkillsLoading(true);
      try {
        const res = await api.get<Skill[]>(`/skills?sectorId=${activeSectorId}`);
        setSectorSkills(res);
      } catch (err) {
        console.error('Failed to load skills:', err);
        setSectorSkills([]);
      } finally {
        setSectorSkillsLoading(false);
      }
    }
    fetchSectorSkills();
  }, [activeSectorId]);

  // Add skill handler
  async function handleAddSkill(skill: Skill) {
    setAddingSkillId(skill.id);
    try {
      const res = await api.post<CandidateSkill>('/candidate/skills', {
        skillId: skill.id,
      });
      setMySkills((prev) => [...prev, res]);
    } catch (err) {
      if (err instanceof ApiError) {
        alert(err.message);
      }
    } finally {
      setAddingSkillId(null);
    }
  }

  // Delete skill handler
  async function handleDeleteSkill() {
    if (!deleteSkill) return;
    setDeleting(true);
    try {
      await api.delete(`/candidate/skills/${deleteSkill.id}`);
      setMySkills((prev) => prev.filter((s) => s.id !== deleteSkill.id));
      setDeleteSkill(null);
    } catch (err) {
      if (err instanceof ApiError) {
        alert(err.message);
      }
    } finally {
      setDeleting(false);
    }
  }

  // Update proficiency level handler
  async function handleUpdateLevel(skill: CandidateSkill, newLevel: ProficiencyLevel) {
    setUpdatingLevelId(skill.id);
    try {
      await api.patch(`/candidate/skills/${skill.id}`, {
        proficiencyLevel: newLevel,
      });
      setMySkills((prev) =>
        prev.map((s) =>
          s.id === skill.id ? { ...s, proficiencyLevel: newLevel } : s
        )
      );
    } catch (err) {
      if (err instanceof ApiError) {
        alert(err.message);
      }
    } finally {
      setUpdatingLevelId(null);
    }
  }

  // Check if skill is already added
  const isSkillAdded = (skillId: string) => mySkills.some((s) => s.skillId === skillId);

  return (
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

      {/* Section 1: My Skills */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Mijn vaardigheden</CardTitle>
          <CardDescription>
            Je hebt {mySkills.length} skill{mySkills.length !== 1 ? 's' : ''} toegevoegd.
            {mySkills.length < 3 && ' Voeg er minstens 3 toe voor betere matches.'}
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
          ) : mySkills.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-2">Nog geen skills toegevoegd.</p>
              <p className="text-sm text-gray-400">
                Voeg er minstens 3 toe voor goede matches.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {mySkills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border rounded-lg"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium">{skill.skillName}</span>
                      <Badge variant="secondary" className="text-xs">
                        {skill.sectorName}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                      {skill.yearsExperience && (
                        <span>{skill.yearsExperience} jaar ervaring</span>
                      )}
                      {skill.testedAt && skill.lastTestScore !== null && (
                        <span>
                          Getest op{' '}
                          {new Date(skill.testedAt).toLocaleDateString('nl-BE', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                          , score {skill.lastTestScore}%
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Level dropdown */}
                    <Select
                      value={skill.proficiencyLevel}
                      onValueChange={(value) =>
                        handleUpdateLevel(skill, value as ProficiencyLevel)
                      }
                      disabled={updatingLevelId === skill.id}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue>
                          <Badge
                            className={`${proficiencyConfig[skill.proficiencyLevel].color} border-0`}
                          >
                            {proficiencyConfig[skill.proficiencyLevel].label}
                          </Badge>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {proficiencyLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            <Badge
                              className={`${proficiencyConfig[level].color} border-0`}
                            >
                              {proficiencyConfig[level].label}
                            </Badge>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Test button */}
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/profile/test/${skill.skillId}`}>
                        Test afleggen
                      </Link>
                    </Button>

                    {/* Delete button */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => setDeleteSkill(skill)}
                    >
                      Verwijderen
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Section 2: Add Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Skill toevoegen</CardTitle>
          <CardDescription>
            Selecteer een sector en voeg relevante skills toe aan je profiel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sectorsLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-10" />
              <Skeleton className="h-32" />
            </div>
          ) : (
            <>
              {/* Sector tabs */}
              <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b">
                {sectors.map((sector) => (
                  <button
                    key={sector.id}
                    onClick={() => setActiveSectorId(sector.id)}
                    className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                      activeSectorId === sector.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {sector.name}
                  </button>
                ))}
              </div>

              {/* Skills list */}
              {sectorSkillsLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-12" />
                  ))}
                </div>
              ) : sectorSkills.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Geen skills gevonden voor deze sector.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {sectorSkills.map((skill) => {
                    const alreadyAdded = isSkillAdded(skill.id);
                    const isAdding = addingSkillId === skill.id;

                    return (
                      <div
                        key={skill.id}
                        className={`flex items-center justify-between p-3 border rounded-lg ${
                          alreadyAdded ? 'bg-gray-50 opacity-60' : ''
                        }`}
                      >
                        <span className={alreadyAdded ? 'text-gray-500' : ''}>
                          {skill.name}
                        </span>
                        <Button
                          size="sm"
                          variant={alreadyAdded ? 'ghost' : 'default'}
                          disabled={alreadyAdded || isAdding}
                          onClick={() => handleAddSkill(skill)}
                        >
                          {alreadyAdded ? (
                            'Toegevoegd'
                          ) : isAdding ? (
                            'Toevoegen...'
                          ) : (
                            '+ Toevoegen'
                          )}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Delete confirmation dialog */}
      <Dialog open={!!deleteSkill} onOpenChange={() => setDeleteSkill(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Skill verwijderen</DialogTitle>
            <DialogDescription>
              Weet je zeker dat je &quot;{deleteSkill?.skillName}&quot; wilt verwijderen?
              Je testresultaten voor deze skill gaan verloren.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteSkill(null)}
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
  );
}
