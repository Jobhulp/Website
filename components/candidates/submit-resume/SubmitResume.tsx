"use client";
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api, ApiError } from '@/lib/api-client';
import { useAuth } from '@/lib/auth-context';
import type { 
  SectorCategory, 
  Skill, 
  CandidateSkill,
  SectorCategoriesResponse,
  SkillsBySectorResponse,
  CandidateSkillsResponse
} from '@/types/api';

interface SelectedSkillData {
  useForMatching: boolean;
}

const SubmitResume = () => {
  const router = useRouter();
  const { user } = useAuth();
  
  // API data state
  const [categories, setCategories] = useState<SectorCategory[]>([]);
  const [skillsByCategory, setSkillsByCategory] = useState<Map<string, Skill[]>>(new Map());
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingSkills, setLoadingSkills] = useState<Set<string>>(new Set());
  
  // Selected skills state
  const [selectedSkills, setSelectedSkills] = useState<Map<string, SelectedSkillData>>(new Map());
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(null);
  
  // Saving state
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get<SectorCategoriesResponse>('/skills/categories');
        setCategories(response.categories);
      } catch (err) {
        console.error('[v0] Failed to fetch categories:', err);
        setError('Kon skill categorieën niet laden.');
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch existing candidate skills if logged in
  useEffect(() => {
    const fetchCandidateSkills = async () => {
      if (!user) return;
      
      try {
        const response = await api.get<CandidateSkillsResponse>('/candidate/skills');
        const newSelectedSkills = new Map<string, SelectedSkillData>();
        
        response.skills.forEach((skill) => {
          newSelectedSkills.set(skill.skillId, {
            useForMatching: skill.useForMatching ?? true,
          });
        });
        
        setSelectedSkills(newSelectedSkills);
      } catch (err) {
        // Silently fail - user might not have skills yet
        console.error('[v0] Failed to fetch candidate skills:', err);
      }
    };

    fetchCandidateSkills();
  }, [user]);

  // Lazy load skills when category is expanded
  const loadSkillsForCategory = useCallback(async (categoryId: string) => {
    if (skillsByCategory.has(categoryId) || loadingSkills.has(categoryId)) {
      return;
    }

    setLoadingSkills(prev => new Set(prev).add(categoryId));

    try {
      const response = await api.get<SkillsBySectorResponse>(`/skills?categoryId=${categoryId}`);
      setSkillsByCategory(prev => new Map(prev).set(categoryId, response.skills));
    } catch (err) {
      console.error(`[v0] Failed to fetch skills for category ${categoryId}:`, err);
    } finally {
      setLoadingSkills(prev => {
        const newSet = new Set(prev);
        newSet.delete(categoryId);
        return newSet;
      });
    }
  }, [skillsByCategory, loadingSkills]);

  // Toggle category expansion
  const toggleCategory = useCallback((categoryId: string) => {
    if (expandedCategoryId === categoryId) {
      setExpandedCategoryId(null);
    } else {
      setExpandedCategoryId(categoryId);
      loadSkillsForCategory(categoryId);
    }
  }, [expandedCategoryId, loadSkillsForCategory]);

  // Toggle skill selection
  const toggleSkill = useCallback((skillId: string) => {
    setSelectedSkills(prev => {
      const newMap = new Map(prev);
      if (newMap.has(skillId)) {
        newMap.delete(skillId);
      } else {
        newMap.set(skillId, { useForMatching: true });
      }
      return newMap;
    });
  }, []);

  // Toggle matching for a skill
  const toggleSkillMatching = useCallback((skillId: string) => {
    setSelectedSkills(prev => {
      const newMap = new Map(prev);
      const current = newMap.get(skillId);
      if (current) {
        newMap.set(skillId, { useForMatching: !current.useForMatching });
      }
      return newMap;
    });
  }, []);

  // Save skills to backend
  const handleSave = async () => {
    if (!user) {
      router.push('/login?redirect=/candidates/submit-resume');
      return;
    }

    setSaving(true);
    setError(null);
    setSaveSuccess(false);

    try {
      const payload = {
        skills: Array.from(selectedSkills.entries()).map(([skillId, opts]) => ({
          skillId,
          useForMatching: opts.useForMatching,
        })),
      };

      await api.put('/candidate/skills', payload);
      setSaveSuccess(true);
      
      // Navigate to next step after short delay
      setTimeout(() => {
        router.push('/dashboard/candidate');
      }, 1500);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Er ging iets mis bij het opslaan van je skills.');
      }
    } finally {
      setSaving(false);
    }
  };

  // Computed values
  const selectedSkillsCount = selectedSkills.size;
  const matchingSkillsCount = Array.from(selectedSkills.values()).filter(s => s.useForMatching).length;

  // Get selected count per category
  const getSelectedCountForCategory = (categoryId: string): number => {
    const skills = skillsByCategory.get(categoryId) || [];
    return skills.filter(s => selectedSkills.has(s.id)).length;
  };

  return (
    <div className="main-content-wrapper">
      <section className="stunning-header bg-dark-themes pt200 pb120">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <ul className="breadcrumbs">
                <li className="breadcrumbs-item">
                  <Link href="/">Home<i className="puzzle-icon fal fa-angle-double-right"></i></Link>
                </li>
                <li className="breadcrumbs-item">
                  <Link href="/candidates">Kandidaten<i className="puzzle-icon fal fa-angle-double-right"></i></Link>
                </li>
                <li className="breadcrumbs-item active">
                  <span>Skills Selecteren</span>
                </li>
              </ul>

              <h1 className="page-title text-white">Selecteer Je Skills</h1>
              <p className="text-white" style={{ opacity: 0.8 }}>
                Kies de vaardigheden die je hebt of wilt ontwikkelen. Je kunt daarna per skill een korte test doen om je niveau te bepalen.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="medium-padding120 bg-light-grey">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {/* Skills sectie */}
              <div className="bg-white p-4 mb-4" style={{ borderRadius: '10px' }}>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h4 className="mb-1">
                      <i className="far fa-lightbulb mr-2" style={{ color: '#f59e0b' }}></i>
                      Selecteer Je Skills & Interesses
                    </h4>
                    <p className="c-grey mb-0" style={{ fontSize: '14px' }}>
                      Kies de vaardigheden die je hebt of wilt ontwikkelen.
                    </p>
                  </div>
                  {selectedSkillsCount > 0 && (
                    <div className="text-right">
                      <span 
                        className="badge" 
                        style={{ 
                          background: '#059669', 
                          color: '#fff', 
                          padding: '6px 12px', 
                          borderRadius: '12px',
                          fontSize: '14px'
                        }}
                      >
                        {selectedSkillsCount} geselecteerd
                      </span>
                      <div className="c-grey mt-1" style={{ fontSize: '12px' }}>
                        {matchingSkillsCount} voor matching
                      </div>
                    </div>
                  )}
                </div>

                {/* Info banner - Kennis boven diploma */}
                <div className="alert mb-3" style={{ background: '#fef3c7', border: 'none', borderRadius: '8px', padding: '16px' }}>
                  <div className="d-flex align-items-start">
                    <i className="far fa-info-circle mr-3" style={{ color: '#f59e0b', fontSize: '18px', marginTop: '2px' }}></i>
                    <div>
                      <strong style={{ color: '#92400e' }}>Kennis boven diploma</strong>
                      <p className="mb-0" style={{ color: '#92400e', fontSize: '14px' }}>
                        Werkgevers matchen op basis van je geteste skill-niveaus, niet alleen je diploma. 
                        Toon wat je nu kunt, ongeacht hoe je het hebt geleerd.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Info banner - Interesse markeren */}
                <div className="alert mb-4" style={{ background: '#fef3c7', border: 'none', borderRadius: '8px', padding: '16px' }}>
                  <div className="d-flex align-items-start">
                    <i className="far fa-lightbulb mr-3" style={{ color: '#f59e0b', fontSize: '18px', marginTop: '2px' }}></i>
                    <div>
                      <strong style={{ color: '#92400e' }}>Interesse markeren</strong>
                      <p className="mb-0" style={{ color: '#92400e', fontSize: '14px' }}>
                        Skills die je wil ontwikkelen kun je als &apos;interesse&apos; markeren — zo kom je
                        in beeld voor jobs in nieuwe vakgebieden, ook als je er nog geen ervaring
                        in hebt.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Error message */}
                {error && (
                  <div className="alert mb-4" style={{ background: '#fee2e2', border: 'none', borderRadius: '8px', padding: '16px' }}>
                    <div className="d-flex align-items-start">
                      <i className="far fa-exclamation-circle mr-3" style={{ color: '#dc2626', fontSize: '18px', marginTop: '2px' }}></i>
                      <div>
                        <strong style={{ color: '#991b1b' }}>Fout</strong>
                        <p className="mb-0" style={{ color: '#991b1b', fontSize: '14px' }}>{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Success message */}
                {saveSuccess && (
                  <div className="alert mb-4" style={{ background: '#d1fae5', border: 'none', borderRadius: '8px', padding: '16px' }}>
                    <div className="d-flex align-items-start">
                      <i className="far fa-check-circle mr-3" style={{ color: '#059669', fontSize: '18px', marginTop: '2px' }}></i>
                      <div>
                        <strong style={{ color: '#065f46' }}>Opgeslagen!</strong>
                        <p className="mb-0" style={{ color: '#065f46', fontSize: '14px' }}>
                          Je skills zijn opgeslagen. Je wordt doorgestuurd naar je dashboard...
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Loading state */}
                {loadingCategories ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Laden...</span>
                    </div>
                    <p className="c-grey mt-3">Categorieën laden...</p>
                  </div>
                ) : (
                  /* Skill categories */
                  <div className="skill-categories">
                    {categories.map((category) => {
                      const categorySkills = skillsByCategory.get(category.id) || [];
                      const selectedInCategory = getSelectedCountForCategory(category.id);
                      const isExpanded = expandedCategoryId === category.id;
                      const isLoadingSkills = loadingSkills.has(category.id);

                      return (
                        <div 
                          key={category.id} 
                          className="mb-3"
                          style={{ 
                            border: selectedInCategory > 0 ? `2px solid ${category.color}` : '1px solid #e9ecef',
                            borderRadius: '10px',
                            overflow: 'hidden'
                          }}
                        >
                          <button
                            onClick={() => toggleCategory(category.id)}
                            className="w-100 d-flex align-items-center justify-content-between p-3"
                            style={{ 
                              background: selectedInCategory > 0 ? `${category.color}10` : '#f8f9fa',
                              border: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            <div className="d-flex align-items-center">
                              <div 
                                style={{ 
                                  width: '40px', 
                                  height: '40px', 
                                  borderRadius: '8px', 
                                  background: category.color,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  marginRight: '12px'
                                }}
                              >
                                <i className={`fas ${category.icon} text-white`}></i>
                              </div>
                              <div className="text-left">
                                <strong>{category.name}</strong>
                                <div className="c-grey" style={{ fontSize: '13px' }}>
                                  {category.skillCount} skills
                                  {selectedInCategory > 0 && (
                                    <span style={{ color: category.color, marginLeft: '8px' }}>
                                      ({selectedInCategory} geselecteerd)
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <i className={`far fa-chevron-${isExpanded ? 'up' : 'down'} c-grey`}></i>
                          </button>

                          {isExpanded && (
                            <div className="p-3" style={{ borderTop: '1px solid #e9ecef' }}>
                              {isLoadingSkills ? (
                                <div className="text-center py-4">
                                  <div className="spinner-border spinner-border-sm text-primary" role="status">
                                    <span className="sr-only">Laden...</span>
                                  </div>
                                  <p className="c-grey mt-2 mb-0" style={{ fontSize: '13px' }}>Skills laden...</p>
                                </div>
                              ) : categorySkills.length === 0 ? (
                                <p className="c-grey text-center py-3 mb-0">Geen skills beschikbaar in deze categorie.</p>
                              ) : (
                                <div className="row">
                                  {categorySkills.map((skill) => {
                                    const isSelected = selectedSkills.has(skill.id);
                                    const skillData = selectedSkills.get(skill.id);
                                    const useForMatching = skillData?.useForMatching ?? true;

                                    return (
                                      <div key={skill.id} className="col-md-6 mb-2">
                                        <div
                                          style={{
                                            border: isSelected ? `2px solid ${category.color}` : '1px solid #e9ecef',
                                            borderRadius: '8px',
                                            background: isSelected ? `${category.color}10` : '#fff',
                                            overflow: 'hidden'
                                          }}
                                        >
                                          <button
                                            onClick={() => toggleSkill(skill.id)}
                                            className="w-100 d-flex align-items-center p-3"
                                            style={{
                                              border: 'none',
                                              background: 'transparent',
                                              cursor: 'pointer',
                                              textAlign: 'left'
                                            }}
                                          >
                                            <div 
                                              style={{ 
                                                width: '24px', 
                                                height: '24px', 
                                                borderRadius: '6px', 
                                                border: isSelected ? 'none' : '2px solid #dee2e6',
                                                background: isSelected ? category.color : 'transparent',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginRight: '12px',
                                                flexShrink: 0
                                              }}
                                            >
                                              {isSelected && <i className="fas fa-check text-white" style={{ fontSize: '12px' }}></i>}
                                            </div>
                                            <div>
                                              <strong style={{ fontSize: '14px' }}>{skill.name}</strong>
                                              {skill.description && (
                                                <div className="c-grey" style={{ fontSize: '12px' }}>{skill.description}</div>
                                              )}
                                            </div>
                                          </button>
                                          
                                          {/* Matching toggle - only visible when skill is selected */}
                                          {isSelected && (
                                            <div 
                                              className="d-flex align-items-center justify-content-between px-3 py-2"
                                              style={{ 
                                                borderTop: `1px solid ${category.color}30`,
                                                background: useForMatching ? '#f0fdf4' : '#fffbeb'
                                              }}
                                            >
                                              <span style={{ fontSize: '12px', color: useForMatching ? '#059669' : '#d97706' }}>
                                                <i className={`far fa-${useForMatching ? 'search' : 'star'} mr-1`}></i>
                                                {useForMatching ? 'Wordt gebruikt voor matching' : 'Interesse (niet voor matching)'}
                                              </span>
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  toggleSkillMatching(skill.id);
                                                }}
                                                className="d-flex align-items-center"
                                                style={{
                                                  width: '40px',
                                                  height: '22px',
                                                  borderRadius: '11px',
                                                  border: 'none',
                                                  background: useForMatching ? '#059669' : '#d97706',
                                                  cursor: 'pointer',
                                                  padding: '2px',
                                                  transition: 'background 0.2s'
                                                }}
                                              >
                                                <div
                                                  style={{
                                                    width: '18px',
                                                    height: '18px',
                                                    borderRadius: '50%',
                                                    background: '#fff',
                                                    transform: useForMatching ? 'translateX(18px)' : 'translateX(0)',
                                                    transition: 'transform 0.2s',
                                                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                                                  }}
                                                />
                                              </button>
                                            </div>
                                          )}
                                        </div>
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

                {/* Save button */}
                {selectedSkillsCount > 0 && (
                  <div className="mt-4 pt-4" style={{ borderTop: '1px solid #e9ecef' }}>
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="crumina-button button--xl w-100"
                      style={{ 
                        background: saving ? '#9ca3af' : '#059669', 
                        color: '#fff',
                        cursor: saving ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {saving ? (
                        <>
                          <span className="spinner-border spinner-border-sm mr-2" role="status"></span>
                          Opslaan...
                        </>
                      ) : (
                        <>
                          <i className="far fa-save mr-2"></i>
                          Skills Opslaan ({selectedSkillsCount} geselecteerd, {matchingSkillsCount} voor matching)
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <div className="bg-white p-4 mb-4" style={{ borderRadius: '10px', position: 'sticky', top: '100px' }}>
                <h5 className="mb-3">Hoe werkt het?</h5>
                
                <div className="d-flex align-items-start mb-3">
                  <div 
                    style={{ 
                      width: '28px', 
                      height: '28px', 
                      borderRadius: '50%', 
                      background: '#6366f1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '12px',
                      flexShrink: 0,
                      color: '#fff',
                      fontSize: '13px',
                      fontWeight: '600'
                    }}
                  >
                    1
                  </div>
                  <div>
                    <strong style={{ fontSize: '14px' }}>Selecteer skills</strong>
                    <p className="c-grey mb-0" style={{ fontSize: '13px' }}>
                      Kies uit 13 categorieën de skills die je hebt of wilt leren
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-start mb-3">
                  <div 
                    style={{ 
                      width: '28px', 
                      height: '28px', 
                      borderRadius: '50%', 
                      background: '#6366f1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '12px',
                      flexShrink: 0,
                      color: '#fff',
                      fontSize: '13px',
                      fontWeight: '600'
                    }}
                  >
                    2
                  </div>
                  <div>
                    <strong style={{ fontSize: '14px' }}>Kies matching type</strong>
                    <p className="c-grey mb-0" style={{ fontSize: '13px' }}>
                      Bepaal of een skill voor matching of als interesse wordt gebruikt
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-start">
                  <div 
                    style={{ 
                      width: '28px', 
                      height: '28px', 
                      borderRadius: '50%', 
                      background: '#6366f1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '12px',
                      flexShrink: 0,
                      color: '#fff',
                      fontSize: '13px',
                      fontWeight: '600'
                    }}
                  >
                    3
                  </div>
                  <div>
                    <strong style={{ fontSize: '14px' }}>Test je niveau</strong>
                    <p className="c-grey mb-0" style={{ fontSize: '13px' }}>
                      Na opslaan kun je per skill een korte test doen
                    </p>
                  </div>
                </div>
              </div>

              {/* Counter summary */}
              <div className="bg-white p-4" style={{ borderRadius: '10px' }}>
                <h6 className="mb-3">Samenvatting</h6>
                
                <div className="d-flex justify-content-between mb-2">
                  <span className="c-grey">Geselecteerd:</span>
                  <strong>{selectedSkillsCount} skills</strong>
                </div>
                
                <div className="d-flex justify-content-between mb-2">
                  <span className="c-grey">Voor matching:</span>
                  <strong style={{ color: '#059669' }}>{matchingSkillsCount} skills</strong>
                </div>
                
                <div className="d-flex justify-content-between">
                  <span className="c-grey">Als interesse:</span>
                  <strong style={{ color: '#d97706' }}>{selectedSkillsCount - matchingSkillsCount} skills</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubmitResume;
