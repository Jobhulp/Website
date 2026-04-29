"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  skillCategories, 
  getAllSkills, 
  calculateSkillResult,
  skillLevelLabels,
  Skill,
  SkillTestResult
} from '../../data/candidate-skills-data';

// Simulatie: in productie komt dit uit de database
const getSelectedSkillsFromProfile = (): string[] => {
  // Demo: return enkele skills alsof kandidaat deze geselecteerd heeft
  return ['javascript', 'react', 'seo', 'b2b_sales', 'project_management'];
};

const SkillsTest: React.FC = () => {
  const [selectedSkills] = useState<string[]>(getSelectedSkillsFromProfile());
  const [currentSkillIndex, setCurrentSkillIndex] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [completedSkills, setCompletedSkills] = useState<SkillTestResult[]>([]);
  const [showOverview, setShowOverview] = useState(true);
  
  const allSkills = getAllSkills();
  
  // Get skill objects for selected skill IDs
  const skillsToTest = selectedSkills.map(id => allSkills.find(s => s.id === id)).filter(Boolean) as (Skill & { categoryId: string; categoryName: string; categoryColor: string })[];
  
  const currentSkill = currentSkillIndex !== null ? skillsToTest[currentSkillIndex] : null;
  const currentQuestion = currentSkill?.questions[currentQuestionIndex];
  
  const handleStartSkill = (skillIndex: number) => {
    setCurrentSkillIndex(skillIndex);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowOverview(false);
  };

  const handleAnswer = (points: number) => {
    if (!currentQuestion || !currentSkill) return;
    
    const newAnswers = { ...answers, [currentQuestion.id]: points };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestionIndex < currentSkill.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Skill test completed
        const result = calculateSkillResult(currentSkill, newAnswers);
        result.categoryId = currentSkill.categoryId;
        
        setCompletedSkills(prev => {
          const existing = prev.findIndex(r => r.skillId === currentSkill.id);
          if (existing >= 0) {
            const updated = [...prev];
            updated[existing] = result;
            return updated;
          }
          return [...prev, result];
        });
        
        setCurrentSkillIndex(null);
        setShowOverview(true);
      }
    }, 300);
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleQuit = () => {
    setCurrentSkillIndex(null);
    setShowOverview(true);
    setAnswers({});
    setCurrentQuestionIndex(0);
  };

  const getSkillResult = (skillId: string) => {
    return completedSkills.find(r => r.skillId === skillId);
  };

  const progress = currentSkill ? ((currentQuestionIndex + 1) / currentSkill.questions.length) * 100 : 0;

  // Overview Screen
  if (showOverview) {
    const testedCount = completedSkills.length;
    const totalCount = skillsToTest.length;

    return (
      <div className="main-content-wrapper">
        <div className="header--spacer" style={{ height: '142px', backgroundColor: '#121214' }}></div>
        
        <section className="bg-dark-themes py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 text-center">
                <h1 className="text-white mb-3">Test Je Skills</h1>
                <p className="text-white" style={{ opacity: 0.8 }}>
                  Test je niveau per geselecteerde skill. Werkgevers kunnen zo matchen op je echte vaardigheden.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="medium-padding120 bg-light-grey">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                {/* Progress overview */}
                <div className="bg-white p-4 mb-4" style={{ borderRadius: '10px' }}>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="mb-0">Jouw Skills</h4>
                    <span className="c-grey">{testedCount} van {totalCount} getest</span>
                  </div>
                  
                  <div style={{ background: '#e9ecef', borderRadius: '10px', height: '8px', overflow: 'hidden', marginBottom: '16px' }}>
                    <div 
                      style={{ 
                        width: `${totalCount > 0 ? (testedCount / totalCount) * 100 : 0}%`, 
                        height: '100%', 
                        background: '#059669',
                        borderRadius: '10px',
                        transition: 'width 0.3s ease'
                      }}
                    ></div>
                  </div>

                  {skillsToTest.length === 0 ? (
                    <div className="text-center py-5">
                      <i className="far fa-exclamation-circle mb-3" style={{ fontSize: '48px', color: '#6c757d' }}></i>
                      <h5>Geen skills geselecteerd</h5>
                      <p className="c-grey">Ga naar je profiel om skills te selecteren die je wilt testen.</p>
                      <Link href="/candidates/submit-resume" className="crumina-button button--yellow button--m">
                        Naar profiel
                      </Link>
                    </div>
                  ) : (
                    <div className="skill-list">
                      {skillsToTest.map((skill, index) => {
                        const result = getSkillResult(skill.id);
                        const levelInfo = result ? skillLevelLabels[result.level] : null;

                        return (
                          <div 
                            key={skill.id} 
                            className="d-flex align-items-center justify-content-between p-3 mb-2"
                            style={{ 
                              background: result ? '#f0fdf4' : '#f8f9fa', 
                              borderRadius: '10px',
                              border: result ? '1px solid #bbf7d0' : '1px solid #e9ecef'
                            }}
                          >
                            <div className="d-flex align-items-center">
                              <div 
                                style={{ 
                                  width: '44px', 
                                  height: '44px', 
                                  borderRadius: '10px', 
                                  background: skill.categoryColor,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  marginRight: '14px'
                                }}
                              >
                                {result ? (
                                  <i className="fas fa-check text-white"></i>
                                ) : (
                                  <span className="text-white" style={{ fontSize: '14px', fontWeight: '700' }}>
                                    {skill.questions.length}
                                  </span>
                                )}
                              </div>
                              <div>
                                <strong>{skill.name}</strong>
                                <div className="c-grey" style={{ fontSize: '13px' }}>
                                  {skill.categoryName} • {skill.questions.length} vragen
                                </div>
                              </div>
                            </div>

                            <div className="d-flex align-items-center" style={{ gap: '12px' }}>
                              {result ? (
                                <>
                                  <div className="text-right mr-2">
                                    <div style={{ fontWeight: '700', color: levelInfo?.color, fontSize: '18px' }}>
                                      {result.percentage}%
                                    </div>
                                    <span 
                                      className="badge"
                                      style={{ 
                                        background: levelInfo?.color, 
                                        color: '#fff',
                                        padding: '2px 8px',
                                        borderRadius: '8px',
                                        fontSize: '11px'
                                      }}
                                    >
                                      {levelInfo?.label}
                                    </span>
                                  </div>
                                  <button
                                    onClick={() => handleStartSkill(index)}
                                    className="crumina-button button--dark button--bordered button--s"
                                  >
                                    Opnieuw
                                  </button>
                                </>
                              ) : (
                                <button
                                  onClick={() => handleStartSkill(index)}
                                  className="crumina-button button--s"
                                  style={{ background: skill.categoryColor, color: '#fff' }}
                                >
                                  Start test
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Completed skills summary */}
                {completedSkills.length > 0 && (
                  <div className="bg-white p-4 mb-4" style={{ borderRadius: '10px' }}>
                    <h5 className="mb-3">Je geteste skills</h5>
                    <p className="c-grey mb-4" style={{ fontSize: '14px' }}>
                      Deze resultaten zijn zichtbaar voor werkgevers en worden gebruikt voor matching.
                    </p>

                    <div className="row">
                      {completedSkills.map(result => {
                        const skill = allSkills.find(s => s.id === result.skillId);
                        const levelInfo = skillLevelLabels[result.level];
                        
                        return (
                          <div key={result.skillId} className="col-md-6 mb-3">
                            <div className="p-3" style={{ background: '#f8f9fa', borderRadius: '10px' }}>
                              <div className="d-flex align-items-center justify-content-between mb-2">
                                <strong style={{ fontSize: '14px' }}>{result.skillName}</strong>
                                <span 
                                  className="badge"
                                  style={{ 
                                    background: levelInfo.color, 
                                    color: '#fff',
                                    padding: '4px 10px',
                                    borderRadius: '10px',
                                    fontSize: '12px'
                                  }}
                                >
                                  {levelInfo.label}
                                </span>
                              </div>
                              <div style={{ background: '#e9ecef', borderRadius: '8px', height: '8px', overflow: 'hidden' }}>
                                <div 
                                  style={{ 
                                    width: `${result.percentage}%`, 
                                    height: '100%', 
                                    background: levelInfo.color,
                                    borderRadius: '8px'
                                  }}
                                ></div>
                              </div>
                              <div className="text-right mt-1">
                                <small className="c-grey">{result.percentage}%</small>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="col-lg-4">
                <div className="bg-white p-4 mb-4" style={{ borderRadius: '10px' }}>
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
                      <strong style={{ fontSize: '14px' }}>Selecteer een skill</strong>
                      <p className="c-grey mb-0" style={{ fontSize: '13px' }}>
                        Kies welke skill je wilt testen
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
                      <strong style={{ fontSize: '14px' }}>Beantwoord vragen</strong>
                      <p className="c-grey mb-0" style={{ fontSize: '13px' }}>
                        Elke skill heeft 3-4 vragen op verschillende niveaus
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
                      <strong style={{ fontSize: '14px' }}>Ontvang je niveau</strong>
                      <p className="c-grey mb-0" style={{ fontSize: '13px' }}>
                        Junior, Medior of Senior - werkgevers matchen hierop
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4" style={{ borderRadius: '10px' }}>
                  <h6 className="mb-3">Niveaus uitleg</h6>
                  
                  {Object.entries(skillLevelLabels).map(([key, info]) => (
                    <div key={key} className="d-flex align-items-center mb-2">
                      <span 
                        className="badge mr-2"
                        style={{ 
                          background: info.color, 
                          color: '#fff',
                          padding: '4px 10px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          minWidth: '60px',
                          textAlign: 'center'
                        }}
                      >
                        {info.label}
                      </span>
                      <small className="c-grey">{info.description}</small>
                    </div>
                  ))}
                </div>

                {completedSkills.length > 0 && (
                  <div className="mt-4">
                    <Link 
                      href="/dashboard/candidate" 
                      className="crumina-button button--xl w-100 text-center"
                      style={{ background: '#059669', color: '#fff' }}
                    >
                      <i className="far fa-check mr-2"></i>
                      Naar dashboard
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Question Screen
  if (!currentSkill || !currentQuestion) return null;

  const selectedAnswer = answers[currentQuestion.id];
  const difficultyColors = {
    junior: { bg: '#f3f4f6', text: '#6b7280' },
    medior: { bg: '#fef3c7', text: '#92400e' },
    senior: { bg: '#fee2e2', text: '#991b1b' }
  };

  return (
    <div className="main-content-wrapper">
      <div className="header--spacer" style={{ height: '142px', backgroundColor: '#121214' }}></div>
      
      <section className="py-4" style={{ background: currentSkill.categoryColor }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              {/* Skill & question indicator */}
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center">
                  <div 
                    style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '8px', 
                      background: 'rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '12px'
                    }}
                  >
                    <span className="text-white" style={{ fontWeight: '700' }}>
                      {currentQuestionIndex + 1}
                    </span>
                  </div>
                  <div>
                    <h5 className="text-white mb-0">{currentSkill.name}</h5>
                    <small className="text-white" style={{ opacity: 0.8 }}>
                      Vraag {currentQuestionIndex + 1} van {currentSkill.questions.length}
                    </small>
                  </div>
                </div>
                <button 
                  onClick={handleQuit}
                  className="text-white"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', opacity: 0.8 }}
                >
                  <i className="far fa-times mr-1"></i> Stoppen
                </button>
              </div>
              
              {/* Progress bar */}
              <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '10px', height: '6px', overflow: 'hidden' }}>
                <div 
                  style={{ 
                    width: `${progress}%`, 
                    height: '100%', 
                    background: '#fff',
                    borderRadius: '10px',
                    transition: 'width 0.3s ease'
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="medium-padding120 bg-light-grey">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="bg-white p-5" style={{ borderRadius: '10px' }}>
                {/* Difficulty badge */}
                <div className="mb-3">
                  <span 
                    className="badge"
                    style={{ 
                      background: difficultyColors[currentQuestion.difficulty].bg,
                      color: difficultyColors[currentQuestion.difficulty].text,
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      textTransform: 'capitalize'
                    }}
                  >
                    {currentQuestion.difficulty} niveau
                  </span>
                </div>

                {/* Question */}
                <h3 className="mb-4" style={{ lineHeight: 1.4 }}>
                  {currentQuestion.question}
                </h3>

                {/* Options */}
                <div className="options-list">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedAnswer === option.points;
                    const letters = ['A', 'B', 'C', 'D'];
                    
                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswer(option.points)}
                        disabled={selectedAnswer !== undefined}
                        className="w-100 text-left p-4 mb-3 d-flex align-items-start"
                        style={{
                          border: isSelected ? `2px solid ${currentSkill.categoryColor}` : '2px solid #e9ecef',
                          borderRadius: '10px',
                          background: isSelected ? `${currentSkill.categoryColor}10` : '#fff',
                          cursor: selectedAnswer !== undefined ? 'default' : 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div 
                          style={{ 
                            width: '32px', 
                            height: '32px', 
                            borderRadius: '8px', 
                            background: isSelected ? currentSkill.categoryColor : '#f3f4f6',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '14px',
                            flexShrink: 0
                          }}
                        >
                          <span style={{ 
                            fontWeight: '600', 
                            color: isSelected ? '#fff' : '#6b7280',
                            fontSize: '14px'
                          }}>
                            {letters[index]}
                          </span>
                        </div>
                        <span style={{ paddingTop: '4px' }}>{option.text}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Navigation */}
                <div className="d-flex justify-content-between align-items-center mt-4 pt-4" style={{ borderTop: '1px solid #e9ecef' }}>
                  <button
                    onClick={handleBack}
                    disabled={currentQuestionIndex === 0}
                    className="crumina-button button--dark button--bordered button--m"
                    style={{ opacity: currentQuestionIndex === 0 ? 0.5 : 1 }}
                  >
                    <i className="far fa-arrow-left mr-2"></i> Vorige
                  </button>
                  
                  <div className="d-flex align-items-center">
                    {currentSkill.questions.map((_, qIndex) => (
                      <div 
                        key={qIndex}
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          background: qIndex < currentQuestionIndex 
                            ? currentSkill.categoryColor 
                            : qIndex === currentQuestionIndex 
                              ? currentSkill.categoryColor 
                              : '#e9ecef',
                          margin: '0 4px',
                          opacity: qIndex === currentQuestionIndex ? 1 : 0.5
                        }}
                      ></div>
                    ))}
                  </div>
                  
                  <div style={{ width: '120px' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SkillsTest;
