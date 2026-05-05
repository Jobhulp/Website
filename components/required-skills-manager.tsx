'use client';

import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api-client';
import type { Skill, Sector, ProficiencyLevel } from '@/types/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select-shadcn';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// Required skill with level and weight
export interface RequiredSkill {
  skillId: string;
  requiredLevel: ProficiencyLevel;
  weight: number;
}

interface RequiredSkillsManagerProps {
  value: RequiredSkill[];
  onChange: (newValue: RequiredSkill[]) => void;
  disabled?: boolean;
}

// Dutch labels for proficiency levels
const PROFICIENCY_LABELS: Record<ProficiencyLevel, string> = {
  informed: 'Op de hoogte',
  beginner: 'Beginner',
  advanced: 'Gevorderd',
  expert: 'Expert',
  master: 'Master',
};

const PROFICIENCY_OPTIONS: ProficiencyLevel[] = [
  'informed',
  'beginner',
  'advanced',
  'expert',
  'master',
];

export function RequiredSkillsManager({
  value,
  onChange,
  disabled = false,
}: RequiredSkillsManagerProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Skill[]>([]);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [activeSectorId, setActiveSectorId] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [skillsCache, setSkillsCache] = useState<Record<string, Skill>>({});

  // Fetch sectors on mount
  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const res = await api.get<Sector[]>('/skills/sectors');
        setSectors(res);
      } catch {
        // Silently fail - sectors are optional filter
      }
    };
    fetchSectors();
  }, []);

  // Search skills with debounce
  const searchSkills = useCallback(async (query: string, sectorId?: string | null) => {
    setIsSearching(true);
    try {
      let url = '/skills';
      const params = new URLSearchParams();
      if (query) params.append('search', query);
      if (sectorId) params.append('sectorId', sectorId);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await api.get<Skill[]>(url);
      setSearchResults(res);
      
      // Cache skills for display
      const newCache = { ...skillsCache };
      res.forEach((skill) => {
        newCache[skill.id] = skill;
      });
      setSkillsCache(newCache);
    } catch {
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, [skillsCache]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isDialogOpen) {
        searchSkills(searchQuery, activeSectorId);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, activeSectorId, isDialogOpen, searchSkills]);

  // Add a skill
  const handleAddSkill = (skill: Skill) => {
    // Check if already added
    if (value.some((s) => s.skillId === skill.id)) {
      return;
    }

    const newSkill: RequiredSkill = {
      skillId: skill.id,
      requiredLevel: 'beginner',
      weight: 3,
    };

    // Cache the skill for display
    setSkillsCache((prev) => ({ ...prev, [skill.id]: skill }));
    
    onChange([...value, newSkill]);
    setIsDialogOpen(false);
    setSearchQuery('');
  };

  // Remove a skill
  const handleRemoveSkill = (skillId: string) => {
    onChange(value.filter((s) => s.skillId !== skillId));
  };

  // Update skill level
  const handleLevelChange = (skillId: string, level: ProficiencyLevel) => {
    onChange(
      value.map((s) =>
        s.skillId === skillId ? { ...s, requiredLevel: level } : s
      )
    );
  };

  // Update skill weight
  const handleWeightChange = (skillId: string, weight: number) => {
    const clampedWeight = Math.max(1, Math.min(5, weight));
    onChange(
      value.map((s) =>
        s.skillId === skillId ? { ...s, weight: clampedWeight } : s
      )
    );
  };

  // Get skill info from cache
  const getSkillInfo = (skillId: string): { name: string; sectorName: string } | null => {
    return skillsCache[skillId] || null;
  };

  // Fetch missing skills from value
  useEffect(() => {
    const missingSkillIds = value
      .filter((s) => !skillsCache[s.skillId])
      .map((s) => s.skillId);

    if (missingSkillIds.length > 0) {
      // Fetch skills individually (could be optimized with bulk endpoint)
      missingSkillIds.forEach(async (id) => {
        try {
          const skill = await api.get<Skill>(`/skills/${id}`);
          setSkillsCache((prev) => ({ ...prev, [id]: skill }));
        } catch {
          // Skill not found - will show ID instead
        }
      });
    }
  }, [value, skillsCache]);

  return (
    <TooltipProvider>
      <div className="space-y-4">
        {/* Selected skills list */}
        {value.length > 0 ? (
          <div className="space-y-3">
            {value.map((requiredSkill) => {
              const skillInfo = getSkillInfo(requiredSkill.skillId);
              return (
                <Card key={requiredSkill.skillId}>
                  <CardContent className="py-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      {/* Skill name and sector */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium truncate">
                            {skillInfo?.name || requiredSkill.skillId}
                          </span>
                          {skillInfo?.sectorName && (
                            <Badge variant="secondary" className="text-xs">
                              {skillInfo.sectorName}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Level select */}
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 whitespace-nowrap">
                          Niveau:
                        </span>
                        <Select
                          value={requiredSkill.requiredLevel}
                          onValueChange={(val) =>
                            handleLevelChange(
                              requiredSkill.skillId,
                              val as ProficiencyLevel
                            )
                          }
                          disabled={disabled}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {PROFICIENCY_OPTIONS.map((level) => (
                              <SelectItem key={level} value={level}>
                                {PROFICIENCY_LABELS[level]}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Weight input */}
                      <div className="flex items-center gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="text-sm text-gray-500 whitespace-nowrap cursor-help">
                              Gewicht:
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Hoe belangrijk is deze skill?</p>
                            <p className="text-xs text-gray-400">
                              1 = nice-to-have, 5 = must-have
                            </p>
                          </TooltipContent>
                        </Tooltip>
                        <Input
                          type="number"
                          min={1}
                          max={5}
                          value={requiredSkill.weight}
                          onChange={(e) =>
                            handleWeightChange(
                              requiredSkill.skillId,
                              parseInt(e.target.value) || 3
                            )
                          }
                          className="w-16 text-center"
                          disabled={disabled}
                        />
                      </div>

                      {/* Remove button */}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveSkill(requiredSkill.skillId)}
                        disabled={disabled}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 6 6 18" />
                          <path d="m6 6 12 12" />
                        </svg>
                        <span className="sr-only">Verwijderen</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="py-8 text-center text-gray-500">
              <p>Nog geen skills toegevoegd.</p>
              <p className="text-sm mt-1">
                Voeg skills toe om aan te geven welke vaardigheden nodig zijn voor deze functie.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Add skill button with dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button type="button" variant="outline" disabled={disabled}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              Skill toevoegen
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Skill toevoegen</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {/* Search input */}
              <Input
                placeholder="Zoek op skill naam..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />

              {/* Sector filter tabs */}
              {sectors.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant={activeSectorId === null ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveSectorId(null)}
                  >
                    Alle
                  </Button>
                  {sectors.map((sector) => (
                    <Button
                      key={sector.id}
                      type="button"
                      variant={activeSectorId === sector.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActiveSectorId(sector.id)}
                    >
                      {sector.name}
                    </Button>
                  ))}
                </div>
              )}

              {/* Search results */}
              <div className="max-h-[300px] overflow-y-auto space-y-1">
                {isSearching ? (
                  <div className="py-8 text-center text-gray-500">
                    Zoeken...
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="py-8 text-center text-gray-500">
                    {searchQuery || activeSectorId
                      ? 'Geen skills gevonden.'
                      : 'Begin met typen om skills te zoeken.'}
                  </div>
                ) : (
                  searchResults.map((skill) => {
                    const isAlreadyAdded = value.some(
                      (s) => s.skillId === skill.id
                    );
                    return (
                      <button
                        key={skill.id}
                        type="button"
                        onClick={() => !isAlreadyAdded && handleAddSkill(skill)}
                        disabled={isAlreadyAdded}
                        className={`w-full flex items-center justify-between p-3 rounded-md text-left transition-colors ${
                          isAlreadyAdded
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{skill.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {skill.sectorName}
                          </Badge>
                        </div>
                        {isAlreadyAdded && (
                          <span className="text-xs text-gray-400">
                            Toegevoegd
                          </span>
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
