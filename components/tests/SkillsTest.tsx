"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  jobDirections,
  JobDirection,
  calculateDirectionResult,
  levelLabels,
  DirectionResult
} from '../../data/skills-test-data';

const SkillsTest: React.FC = () => {
  const [selectedDirection, setSelectedDirection] = useState<JobDirection | null>(null);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<DirectionResult | null>(null);
  const [showIntro, setShowIntro] = useState(true);

  const totalQuestions = selectedDirection 
    ? selectedDirection.categories.reduce((sum, cat) => sum + cat.questions.length, 0)
    : 0;
  const answeredQuestions = Object.keys(answers).length;
  const progress = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;

  const currentCategory = selectedDirection?.categories[currentCategoryIndex];
  const currentQuestion = currentCategory?.questions[currentQuestionIndex];

  const handleSelectDirection = (direction: JobDirection) => {
    setSelectedDirection(direction);
    setShowIntro(false);
  };

  const handleAnswer = (points: number) => {
    if (!currentQuestion || !selectedDirection) return;
    
    const newAnswers = { ...answers, [currentQuestion.id]: points };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestionIndex < currentCategory!.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else if (currentCategoryIndex < selectedDirection.categories.length - 1) {
        setCurrentCategoryIndex(currentCategoryIndex + 1);
        setCurrentQuestionIndex(0);
      } else {
        const directionResult = calculateDirectionResult(selectedDirection, newAnswers);
        setResult(directionResult);
      }
    }, 300);
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);
      const prevCategory = selectedDirection!.categories[currentCategoryIndex - 1];
      setCurrentQuestionIndex(prevCategory.questions.length - 1);
    }
  };

  const handleRestart = () => {
    setSelectedDirection(null);
    setCurrentCategoryIndex(0);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResult(null);
    setShowIntro(true);
  };

  const handleChangeDirection = () => {
    setCurrentCategoryIndex(0);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResult(null);
    setShowIntro(true);
    setSelectedDirection(null);
  };

  const getGlobalQuestionNumber = () => {
    if (!selectedDirection) return 0;
    let count = 0;
    for (let i = 0; i < currentCategoryIndex; i++) {
      count += selectedDirection.categories[i].questions.length;
    }
    return count + currentQuestionIndex + 1;
  };

  // Direction Selection Screen
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
                  Kies je gewenste jobrichting en test je niveau
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="medium-padding120 bg-light-grey">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 offset-lg-1">
                <div className="bg-white p-5 mb-4" style={{ borderRadius: '10px' }}>
                  <h2 className="mb-3">Welke richting zoek je?</h2>
                  <p className="c-grey mb-4">
                    Selecteer de jobrichting waarin je aan de slag wilt. Je krijgt dan specifieke vragen 
                    om je niveau te testen. Werkgevers kunnen zo beter matchen met jouw vaardigheden.
                  </p>

                  <div className="row">
                    {jobDirections.map((direction) => (
                      <div key={direction.id} className="col-md-6 col-lg-4 mb-4">
                        <button
                          onClick={() => handleSelectDirection(direction)}
                          className="w-100 text-left p-4 h-100"
                          style={{ 
                            border: '2px solid #e9ecef',
                            borderRadius: '10px',
                            background: '#fff',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: '160px'
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.borderColor = direction.color;
                            e.currentTarget.style.transform = 'translateY(-2px)';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.borderColor = '#e9ecef';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}
                        >
                          <div 
                            className="mb-3" 
                            style={{ 
                              width: '50px', 
                              height: '50px', 
                              borderRadius: '10px', 
                              background: direction.color,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <i className={`fas ${direction.icon} text-white`} style={{ fontSize: '20px' }}></i>
                          </div>
                          <h5 className="mb-2">{direction.name}</h5>
                          <p className="c-grey mb-0" style={{ fontSize: '13px' }}>
                            {direction.description}
                          </p>
                          <div className="mt-auto pt-3">
                            <small className="c-grey">
                              {direction.categories.reduce((sum, cat) => sum + cat.questions.length, 0)} vragen
                            </small>
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-4" style={{ borderRadius: '10px' }}>
                  <div className="d-flex align-items-start">
                    <i className="far fa-info-circle mr-3 c-blue" style={{ fontSize: '24px', marginTop: '3px' }}></i>
                    <div>
                      <strong>Hoe werkt het?</strong>
                      <p className="mb-0 c-grey" style={{ fontSize: '14px' }}>
                        Na het kiezen van je richting krijg je vakspecifieke vragen op junior, medior en senior niveau. 
                        Je score wordt gebruikt om te matchen met werkgevers die zoeken naar jouw niveau in die richting. 
                        Je kunt later ook andere richtingen testen.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Results Screen
  if (result) {
    const levelInfo = levelLabels[result.overallLevel];

    return (
      <div className="main-content-wrapper">
        <div className="header--spacer" style={{ height: '142px', backgroundColor: '#121214' }}></div>
        
        <section className="py-5" style={{ background: selectedDirection?.color || '#121214' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 text-center">
                <div className="d-flex align-items-center justify-content-center mb-3">
                  <div 
                    className="mr-3" 
                    style={{ 
                      width: '50px', 
                      height: '50px', 
                      borderRadius: '10px', 
                      background: 'rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <i className={`fas ${selectedDirection?.icon} text-white`} style={{ fontSize: '20px' }}></i>
                  </div>
                  <div className="text-left">
                    <h6 className="text-white mb-0" style={{ opacity: 0.8 }}>Resultaten voor</h6>
                    <h3 className="text-white mb-0">{result.directionName}</h3>
                  </div>
                </div>
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
                        width: '140px', 
                        height: '140px', 
                        borderRadius: '50%', 
                        background: `conic-gradient(${levelInfo.color} ${result.overallPercentage}%, #e9ecef ${result.overallPercentage}%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <div 
                        style={{ 
                          width: '115px', 
                          height: '115px', 
                          borderRadius: '50%', 
                          background: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column'
                        }}
                      >
                        <span style={{ fontSize: '32px', fontWeight: '700', color: levelInfo.color }}>
                          {result.overallPercentage}%
                        </span>
                      </div>
                    </div>
                    <h2 className="mb-2">Jouw niveau</h2>
                    <span 
                      className="badge" 
                      style={{ 
                        background: levelInfo.color, 
                        color: '#fff', 
                        padding: '10px 24px', 
                        borderRadius: '20px',
                        fontSize: '16px',
                        fontWeight: '600'
                      }}
                    >
                      {levelInfo.label}
                    </span>
                    <p className="c-grey mt-2 mb-0">{levelInfo.description}</p>
                  </div>

                  {/* Category Results */}
                  <h4 className="mb-4">Score per onderdeel</h4>
                  {result.results.map((categoryResult) => {
                    const catLevelInfo = levelLabels[categoryResult.level];
                    
                    return (
                      <div key={categoryResult.categoryId} className="mb-4 p-4" style={{ background: '#f8f9fa', borderRadius: '10px' }}>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <div>
                            <h6 className="mb-1">{categoryResult.categoryName}</h6>
                            <span 
                              className="badge" 
                              style={{ 
                                background: catLevelInfo.color, 
                                color: '#fff', 
                                padding: '3px 10px',
                                borderRadius: '10px',
                                fontSize: '11px'
                              }}
                            >
                              {catLevelInfo.label}
                            </span>
                          </div>
                          <span style={{ fontWeight: '700', color: catLevelInfo.color, fontSize: '24px' }}>
                            {categoryResult.percentage}%
                          </span>
                        </div>
                        <div style={{ background: '#e9ecef', borderRadius: '10px', height: '12px', overflow: 'hidden' }}>
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

                {/* What employers see */}
                <div className="bg-white p-4 mb-4" style={{ borderRadius: '10px' }}>
                  <h5 className="mb-3">
                    <i className="far fa-building mr-2" style={{ color: selectedDirection?.color }}></i>
                    Wat werkgevers zien
                  </h5>
                  <p className="mb-3" style={{ fontSize: '15px' }}>
                    Werkgevers die zoeken naar <strong>{result.directionName}</strong> profielen zien jouw niveau 
                    en kunnen zo inschatten of je past bij hun vacature-eisen.
                  </p>
                  <div className="p-3" style={{ background: '#f8f9fa', borderRadius: '8px' }}>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <div 
                          style={{ 
                            width: '40px', 
                            height: '40px', 
                            borderRadius: '8px', 
                            background: selectedDirection?.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '12px'
                          }}
                        >
                          <i className={`fas ${selectedDirection?.icon} text-white`} style={{ fontSize: '16px' }}></i>
                        </div>
                        <div>
                          <strong>{result.directionName}</strong>
                          <div className="c-grey" style={{ fontSize: '13px' }}>Getest op {new Date().toLocaleDateString('nl-BE')}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span 
                          className="badge" 
                          style={{ 
                            background: levelInfo.color, 
                            color: '#fff', 
                            padding: '6px 14px',
                            borderRadius: '12px',
                            fontSize: '13px'
                          }}
                        >
                          {levelInfo.label} - {result.overallPercentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="d-flex flex-wrap" style={{ gap: '12px' }}>
                  <Link href="/dashboard/candidate" className="crumina-button button--yellow button--xl">
                    Naar dashboard
                  </Link>
                  <button onClick={handleChangeDirection} className="crumina-button button--dark button--xl">
                    Andere richting testen
                  </button>
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

  if (!currentQuestion || !selectedDirection) {
    return null;
  }

  const selectedAnswer = answers[currentQuestion.id];
  const globalQuestionNumber = getGlobalQuestionNumber();

  // Question Screen
  return (
    <div className="main-content-wrapper">
      <div className="header--spacer" style={{ height: '142px', backgroundColor: '#121214' }}></div>
      
      <section className="py-5" style={{ background: selectedDirection.color }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              {/* Direction & Category indicator */}
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center">
                  <div 
                    className="mr-3" 
                    style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '8px', 
                      background: 'rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <i className={`fas ${selectedDirection.icon} text-white`} style={{ fontSize: '16px' }}></i>
                  </div>
                  <div>
                    <h6 className="text-white mb-0">{currentCategory?.name}</h6>
                    <small className="text-white" style={{ opacity: 0.7 }}>
                      {selectedDirection.name}
                    </small>
                  </div>
                </div>
                <button 
                  onClick={handleChangeDirection}
                  className="text-white"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', opacity: 0.8 }}
                >
                  <i className="far fa-exchange-alt mr-1"></i> Andere richting
                </button>
              </div>
              
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-white">Vraag {globalQuestionNumber} van {totalQuestions}</span>
                <span className="text-white">{Math.round(progress)}% voltooid</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '10px', height: '8px', overflow: 'hidden' }}>
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
                <div className="d-flex align-items-center mb-3" style={{ gap: '8px' }}>
                  <span 
                    className="badge" 
                    style={{ 
                      background: currentQuestion.difficulty === 'junior' ? '#6c757d' : currentQuestion.difficulty === 'medior' ? '#f59e0b' : '#059669',
                      color: '#fff',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      fontWeight: '600'
                    }}
                  >
                    {currentQuestion.difficulty}
                  </span>
                  <span 
                    className="badge" 
                    style={{ 
                      background: '#e9ecef',
                      color: '#6c757d',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '11px'
                    }}
                  >
                    {currentQuestion.type === 'scenario' ? 'Scenario' : currentQuestion.type === 'self_assessment' ? 'Zelfbeoordeling' : 'Kennisvraag'}
                  </span>
                </div>

                <h3 className="mb-4" style={{ lineHeight: '1.4' }}>{currentQuestion.question}</h3>

                <div className="mb-4">
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option.points)}
                      className="w-100 text-left p-4 mb-3"
                      style={{ 
                        border: selectedAnswer === option.points ? `2px solid ${selectedDirection.color}` : '1px solid #e9ecef',
                        borderRadius: '10px',
                        background: selectedAnswer === option.points ? `${selectedDirection.color}10` : '#fff',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div className="d-flex align-items-center">
                        <div 
                          className="mr-3" 
                          style={{ 
                            width: '28px', 
                            height: '28px', 
                            borderRadius: '50%', 
                            border: selectedAnswer === option.points ? `2px solid ${selectedDirection.color}` : '2px solid #e9ecef',
                            background: selectedAnswer === option.points ? selectedDirection.color : '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          {selectedAnswer === option.points && (
                            <i className="fas fa-check text-white" style={{ fontSize: '12px' }}></i>
                          )}
                        </div>
                        <span style={{ fontSize: '15px' }}>{option.text}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {(currentCategoryIndex > 0 || currentQuestionIndex > 0) && (
                  <button 
                    onClick={handleBack}
                    className="crumina-button button--dark button--bordered"
                  >
                    <i className="far fa-arrow-left mr-2"></i>Vorige vraag
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SkillsTest;
