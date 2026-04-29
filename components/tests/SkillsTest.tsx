"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  skillCategories, 
  calculateOverallResult,
  levelLabels,
  OverallSkillResult
} from '../../data/skills-test-data';

const SkillsTest: React.FC = () => {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<OverallSkillResult | null>(null);
  const [showIntro, setShowIntro] = useState(true);

  const totalQuestions = skillCategories.reduce((sum, cat) => sum + cat.questions.length, 0);
  const answeredQuestions = Object.keys(answers).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  const currentCategory = skillCategories[currentCategoryIndex];
  const currentQuestion = currentCategory?.questions[currentQuestionIndex];

  const handleAnswer = (points: number) => {
    if (!currentQuestion) return;
    
    const newAnswers = { ...answers, [currentQuestion.id]: points };
    setAnswers(newAnswers);

    // Move to next question
    setTimeout(() => {
      if (currentQuestionIndex < currentCategory.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else if (currentCategoryIndex < skillCategories.length - 1) {
        setCurrentCategoryIndex(currentCategoryIndex + 1);
        setCurrentQuestionIndex(0);
      } else {
        // Test complete
        const skillResult = calculateOverallResult(newAnswers);
        setResult(skillResult);
      }
    }, 300);
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);
      const prevCategory = skillCategories[currentCategoryIndex - 1];
      setCurrentQuestionIndex(prevCategory.questions.length - 1);
    }
  };

  const handleRestart = () => {
    setCurrentCategoryIndex(0);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResult(null);
    setShowIntro(true);
  };

  const getGlobalQuestionNumber = () => {
    let count = 0;
    for (let i = 0; i < currentCategoryIndex; i++) {
      count += skillCategories[i].questions.length;
    }
    return count + currentQuestionIndex + 1;
  };

  if (showIntro) {
    return (
      <div className="main-content-wrapper">
        <div className="header--spacer" style={{ height: '142px', backgroundColor: '#121214' }}></div>
        
        <section className="bg-dark-themes py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 text-center">
                <h1 className="text-white mb-3">Vaardighedentest</h1>
                <p className="text-white" style={{ opacity: 0.8 }}>
                  Ontdek je sterke punten en groeimogelijkheden
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="medium-padding120 bg-light-grey">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <div className="bg-white p-5" style={{ borderRadius: '10px' }}>
                  <h2 className="mb-4">Test je vaardigheden</h2>
                  
                  <p className="mb-4" style={{ fontSize: '16px', lineHeight: '1.7' }}>
                    Deze test meet je vaardigheidsniveau in verschillende gebieden die belangrijk zijn 
                    voor de moderne werkplek. Op basis van je resultaten kunnen werkgevers beter inschatten 
                    of je past bij hun vacatures.
                  </p>

                  <h5 className="mb-3">We testen je op:</h5>
                  <div className="row mb-4">
                    {skillCategories.map((category) => (
                      <div key={category.id} className="col-md-6 mb-3">
                        <div className="d-flex align-items-center p-3" style={{ background: '#f8f9fa', borderRadius: '8px' }}>
                          <div className="mr-3" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#007bff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <i className={`fas ${category.icon} text-white`}></i>
                          </div>
                          <div>
                            <h6 className="mb-0">{category.name}</h6>
                            <small className="c-grey">{category.questions.length} vragen</small>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 mb-4" style={{ background: '#f8f9fa', borderRadius: '8px' }}>
                    <div className="d-flex align-items-center">
                      <i className="far fa-clock mr-3 c-blue" style={{ fontSize: '24px' }}></i>
                      <div>
                        <strong>Duurt ongeveer 10 minuten</strong>
                        <p className="mb-0 c-grey" style={{ fontSize: '14px' }}>{totalQuestions} vragen verdeeld over {skillCategories.length} categorieen</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 mb-4" style={{ background: '#fff3cd', borderRadius: '8px' }}>
                    <div className="d-flex align-items-start">
                      <i className="far fa-lightbulb mr-3 c-yellow" style={{ fontSize: '24px' }}></i>
                      <div>
                        <strong>Tip:</strong>
                        <p className="mb-0" style={{ fontSize: '14px' }}>
                          Er zijn geen foute antwoorden. Kies het antwoord dat het beste bij jou past. 
                          Wees eerlijk - dit helpt ons je beter te matchen met passende jobs.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setShowIntro(false)}
                    className="crumina-button button--yellow button--xl"
                  >
                    Start de test
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (result) {
    const levelInfo = levelLabels[result.overallLevel];

    return (
      <div className="main-content-wrapper">
        <div className="header--spacer" style={{ height: '142px', backgroundColor: '#121214' }}></div>
        
        <section className="bg-dark-themes py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 text-center">
                <h1 className="text-white mb-3">Je Resultaten</h1>
                <p className="text-white" style={{ opacity: 0.8 }}>
                  Bekijk je vaardigheidsniveaus per categorie
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="medium-padding120 bg-light-grey">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                {/* Overall Score */}
                <div className="bg-white p-5 mb-4" style={{ borderRadius: '10px' }}>
                  <div className="text-center mb-4">
                    <div 
                      className="mx-auto mb-3" 
                      style={{ 
                        width: '120px', 
                        height: '120px', 
                        borderRadius: '50%', 
                        background: `conic-gradient(${levelInfo.color} ${result.overallPercentage}%, #e9ecef ${result.overallPercentage}%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative'
                      }}
                    >
                      <div 
                        style={{ 
                          width: '100px', 
                          height: '100px', 
                          borderRadius: '50%', 
                          background: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column'
                        }}
                      >
                        <span style={{ fontSize: '28px', fontWeight: '700', color: levelInfo.color }}>
                          {result.overallPercentage}%
                        </span>
                      </div>
                    </div>
                    <h2 className="mb-2">Algemeen niveau</h2>
                    <span 
                      className="badge" 
                      style={{ 
                        background: levelInfo.color, 
                        color: '#fff', 
                        padding: '8px 20px', 
                        borderRadius: '20px',
                        fontSize: '14px'
                      }}
                    >
                      {levelInfo.label}
                    </span>
                  </div>

                  {/* Category Results */}
                  <h4 className="mb-4">Resultaten per categorie</h4>
                  {result.results.map((categoryResult) => {
                    const category = skillCategories.find(c => c.id === categoryResult.categoryId);
                    const catLevelInfo = levelLabels[categoryResult.level];
                    
                    return (
                      <div key={categoryResult.categoryId} className="mb-4 p-3" style={{ background: '#f8f9fa', borderRadius: '8px' }}>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <div className="d-flex align-items-center">
                            <div className="mr-3" style={{ width: '36px', height: '36px', borderRadius: '50%', background: catLevelInfo.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <i className={`fas ${category?.icon} text-white`} style={{ fontSize: '14px' }}></i>
                            </div>
                            <div>
                              <h6 className="mb-0">{category?.name}</h6>
                              <small className="c-grey">{catLevelInfo.label}</small>
                            </div>
                          </div>
                          <span style={{ fontWeight: '700', color: catLevelInfo.color, fontSize: '18px' }}>
                            {categoryResult.percentage}%
                          </span>
                        </div>
                        <div style={{ background: '#e9ecef', borderRadius: '10px', height: '10px', overflow: 'hidden' }}>
                          <div 
                            style={{ 
                              width: `${categoryResult.percentage}%`, 
                              height: '100%', 
                              background: catLevelInfo.color,
                              borderRadius: '10px',
                              transition: 'width 0.5s ease'
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Strengths & Improvements */}
                <div className="row mb-4">
                  <div className="col-md-6 mb-4 mb-md-0">
                    <div className="bg-white p-4 h-100" style={{ borderRadius: '10px' }}>
                      <h5 className="c-green mb-3">
                        <i className="far fa-star mr-2"></i>Jouw sterktes
                      </h5>
                      <ul className="list-unstyled mb-0">
                        {result.strengths.map((strength, idx) => (
                          <li key={idx} className="mb-2 d-flex align-items-center">
                            <i className="far fa-check-circle c-green mr-2"></i>
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="bg-white p-4 h-100" style={{ borderRadius: '10px' }}>
                      <h5 className="c-yellow mb-3">
                        <i className="far fa-lightbulb mr-2"></i>Groeimogelijkheden
                      </h5>
                      <ul className="list-unstyled mb-0">
                        {result.improvements.map((improvement, idx) => (
                          <li key={idx} className="mb-2 d-flex align-items-center">
                            <i className="far fa-arrow-up c-yellow mr-2"></i>
                            {improvement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* What this means */}
                <div className="bg-white p-4 mb-4" style={{ borderRadius: '10px' }}>
                  <h5 className="mb-3"><i className="far fa-info-circle c-blue mr-2"></i>Wat betekent dit?</h5>
                  <p className="mb-0" style={{ fontSize: '15px', lineHeight: '1.7' }}>
                    Je vaardigheidsprofiel wordt gebruikt om je te matchen met jobs die passen bij je niveau. 
                    Werkgevers zien deze scores en kunnen zo beter inschatten of je aansluit bij hun verwachtingen. 
                    Dit voorkomt teleurstellingen en zorgt voor betere matches.
                  </p>
                </div>

                {/* Actions */}
                <div className="d-flex flex-wrap gap-3">
                  <Link href="/dashboard/candidate" className="crumina-button button--yellow button--xl">
                    Naar dashboard
                  </Link>
                  <Link href="/tests/personality" className="crumina-button button--dark button--xl">
                    Persoonlijkheidstest
                  </Link>
                  <button onClick={handleRestart} className="crumina-button button--dark button--bordered button--xl">
                    Test opnieuw doen
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  const selectedAnswer = answers[currentQuestion.id];
  const globalQuestionNumber = getGlobalQuestionNumber();

  return (
    <div className="main-content-wrapper">
      <div className="header--spacer" style={{ height: '142px', backgroundColor: '#121214' }}></div>
      
      <section className="bg-dark-themes py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              {/* Category indicator */}
              <div className="d-flex align-items-center mb-3">
                <div className="mr-3" style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#f9d423', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className={`fas ${currentCategory.icon} text-dark`} style={{ fontSize: '14px' }}></i>
                </div>
                <div>
                  <h6 className="text-white mb-0">{currentCategory.name}</h6>
                  <small className="text-white" style={{ opacity: 0.7 }}>Vraag {currentQuestionIndex + 1} van {currentCategory.questions.length}</small>
                </div>
              </div>
              
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-white">Totaal: vraag {globalQuestionNumber} van {totalQuestions}</span>
                <span className="text-white">{Math.round(progress)}% voltooid</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '10px', height: '8px', overflow: 'hidden' }}>
                <div 
                  style={{ 
                    width: `${progress}%`, 
                    height: '100%', 
                    background: '#f9d423',
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
                <div className="d-flex align-items-center mb-3">
                  <span 
                    className="badge mr-2" 
                    style={{ 
                      background: currentQuestion.difficulty === 'beginner' ? '#28a745' : currentQuestion.difficulty === 'intermediate' ? '#ffc107' : '#dc3545',
                      color: currentQuestion.difficulty === 'intermediate' ? '#000' : '#fff',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      textTransform: 'uppercase'
                    }}
                  >
                    {currentQuestion.difficulty === 'beginner' ? 'Basis' : currentQuestion.difficulty === 'intermediate' ? 'Gevorderd' : 'Expert'}
                  </span>
                  <span 
                    className="badge" 
                    style={{ 
                      background: '#e9ecef',
                      color: '#6c757d',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '11px'
                    }}
                  >
                    {currentQuestion.type === 'scenario' ? 'Scenario' : currentQuestion.type === 'self_assessment' ? 'Zelfbeoordeling' : 'Kennisvraag'}
                  </span>
                </div>

                <h3 className="mb-4">{currentQuestion.question}</h3>

                <div className="mb-4">
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option.points)}
                      className={`w-100 text-left p-4 mb-3`}
                      style={{ 
                        border: selectedAnswer === option.points ? '2px solid #f9d423' : '1px solid #e9ecef',
                        borderRadius: '10px',
                        background: selectedAnswer === option.points ? '#fffdf0' : '#fff',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div className="d-flex align-items-center">
                        <div 
                          className="mr-3" 
                          style={{ 
                            width: '24px', 
                            height: '24px', 
                            borderRadius: '50%', 
                            border: selectedAnswer === option.points ? '2px solid #f9d423' : '2px solid #e9ecef',
                            background: selectedAnswer === option.points ? '#f9d423' : '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          {selectedAnswer === option.points && (
                            <i className="fas fa-check text-dark" style={{ fontSize: '12px' }}></i>
                          )}
                        </div>
                        <span style={{ fontSize: '15px' }}>{option.text}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="d-flex justify-content-between">
                  <button 
                    onClick={handleBack}
                    disabled={globalQuestionNumber === 1}
                    className="crumina-button button--dark button--bordered button--m"
                    style={{ opacity: globalQuestionNumber === 1 ? 0.5 : 1 }}
                  >
                    <i className="far fa-arrow-left mr-2"></i> Vorige
                  </button>
                  <span className="c-grey align-self-center">
                    Klik op een antwoord om verder te gaan
                  </span>
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
