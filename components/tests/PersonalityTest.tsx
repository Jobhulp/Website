"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  personalityQuestions, 
  personalityTypes, 
  calculatePersonalityResult,
  PersonalityResult 
} from '../../data/personality-test-data';

const PersonalityTest: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'D' | 'I' | 'S' | 'C'>>({});
  const [result, setResult] = useState<PersonalityResult | null>(null);
  const [showIntro, setShowIntro] = useState(true);

  const progress = (Object.keys(answers).length / personalityQuestions.length) * 100;

  const handleAnswer = (type: 'D' | 'I' | 'S' | 'C') => {
    const newAnswers = { ...answers, [personalityQuestions[currentQuestion].id]: type };
    setAnswers(newAnswers);

    if (currentQuestion < personalityQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      // Calculate result
      const personalityResult = calculatePersonalityResult(newAnswers);
      setResult(personalityResult);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
    setShowIntro(true);
  };

  if (showIntro) {
    return (
      <div className="main-content-wrapper">
        <div className="header--spacer" style={{ height: '142px', backgroundColor: '#121214' }}></div>
        
        <section className="bg-dark-themes py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 text-center">
                <h1 className="text-white mb-3">Persoonlijkheidstest</h1>
                <p className="text-white" style={{ opacity: 0.8 }}>
                  Ontdek je werkstijl en persoonlijkheidstype
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
                  <h2 className="mb-4">Ontdek je persoonlijkheidstype</h2>
                  
                  <p className="mb-4" style={{ fontSize: '16px', lineHeight: '1.7' }}>
                    Deze test helpt Jobhulp om je beter te leren kennen. Op basis van je antwoorden 
                    bepalen we je werkstijl en persoonlijkheidstype. Dit gebruiken we om je te matchen 
                    met bedrijven waar je persoonlijkheid het beste past.
                  </p>

                  <div className="row mb-4">
                    <div className="col-md-6 mb-3">
                      <div className="d-flex align-items-center">
                        <div className="mr-3" style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#dc3545', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <i className="fas fa-bolt text-white"></i>
                        </div>
                        <div>
                          <h6 className="mb-0">Dominant (D)</h6>
                          <small className="c-grey">De Doener</small>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="d-flex align-items-center">
                        <div className="mr-3" style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#ffc107', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <i className="fas fa-sun text-dark"></i>
                        </div>
                        <div>
                          <h6 className="mb-0">Invloedrijk (I)</h6>
                          <small className="c-grey">De Inspirator</small>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="d-flex align-items-center">
                        <div className="mr-3" style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#28a745', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <i className="fas fa-heart text-white"></i>
                        </div>
                        <div>
                          <h6 className="mb-0">Stabiel (S)</h6>
                          <small className="c-grey">De Supporter</small>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="d-flex align-items-center">
                        <div className="mr-3" style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#007bff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <i className="fas fa-chart-bar text-white"></i>
                        </div>
                        <div>
                          <h6 className="mb-0">Conscientieus (C)</h6>
                          <small className="c-grey">De Analist</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 mb-4" style={{ background: '#f8f9fa', borderRadius: '8px' }}>
                    <div className="d-flex align-items-center">
                      <i className="far fa-clock mr-3 c-blue" style={{ fontSize: '24px' }}></i>
                      <div>
                        <strong>Duurt ongeveer 5 minuten</strong>
                        <p className="mb-0 c-grey" style={{ fontSize: '14px' }}>12 vragen over je werkstijl en voorkeuren</p>
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
    const primaryType = personalityTypes[result.primaryType];
    const secondaryType = personalityTypes[result.secondaryType];

    return (
      <div className="main-content-wrapper">
        <div className="header--spacer" style={{ height: '142px', backgroundColor: '#121214' }}></div>
        
        <section className="bg-dark-themes py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 text-center">
                <h1 className="text-white mb-3">Je Resultaat</h1>
                <p className="text-white" style={{ opacity: 0.8 }}>
                  Jouw persoonlijkheidstype is bepaald
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="medium-padding120 bg-light-grey">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                {/* Primary Type Card */}
                <div className="bg-white p-5 mb-4" style={{ borderRadius: '10px' }}>
                  <div className="text-center mb-4">
                    <div 
                      className="mx-auto mb-3" 
                      style={{ 
                        width: '100px', 
                        height: '100px', 
                        borderRadius: '50%', 
                        background: primaryType.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <span className="text-white" style={{ fontSize: '36px', fontWeight: '700' }}>
                        {result.primaryType}
                      </span>
                    </div>
                    <h2 className="mb-2">Je bent {primaryType.title}</h2>
                    <span 
                      className="badge" 
                      style={{ 
                        background: primaryType.color, 
                        color: '#fff', 
                        padding: '8px 16px', 
                        borderRadius: '20px',
                        fontSize: '14px'
                      }}
                    >
                      {primaryType.name} Type
                    </span>
                  </div>

                  <p className="text-center mb-4" style={{ fontSize: '16px', lineHeight: '1.7' }}>
                    {primaryType.description}
                  </p>

                  {/* Score Bars */}
                  <div className="mb-4">
                    <h5 className="mb-3">Jouw DISC Profiel</h5>
                    {(['D', 'I', 'S', 'C'] as const).map((type) => (
                      <div key={type} className="mb-3">
                        <div className="d-flex justify-content-between mb-1">
                          <span><strong>{type}</strong> - {personalityTypes[type].name}</span>
                          <span>{result.scores[type]}%</span>
                        </div>
                        <div style={{ background: '#e9ecef', borderRadius: '10px', height: '12px', overflow: 'hidden' }}>
                          <div 
                            style={{ 
                              width: `${result.scores[type]}%`, 
                              height: '100%', 
                              background: personalityTypes[type].color,
                              borderRadius: '10px',
                              transition: 'width 0.5s ease'
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <h5 className="c-green mb-3"><i className="far fa-check-circle mr-2"></i>Jouw sterktes</h5>
                      <ul className="list-unstyled">
                        {primaryType.strengths.map((strength, idx) => (
                          <li key={idx} className="mb-2">
                            <i className="far fa-check mr-2 c-green"></i>{strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-md-6 mb-4">
                      <h5 className="c-yellow mb-3"><i className="far fa-lightbulb mr-2"></i>Aandachtspunten</h5>
                      <ul className="list-unstyled">
                        {primaryType.challenges.map((challenge, idx) => (
                          <li key={idx} className="mb-2">
                            <i className="far fa-circle mr-2 c-yellow"></i>{challenge}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 mb-4" style={{ background: '#f8f9fa', borderRadius: '8px' }}>
                    <h5 className="mb-3"><i className="far fa-building mr-2"></i>Ideale werkomgeving</h5>
                    <div className="d-flex flex-wrap gap-2">
                      {primaryType.idealWorkEnvironment.map((env, idx) => (
                        <span 
                          key={idx} 
                          className="badge" 
                          style={{ 
                            background: '#fff', 
                            border: `1px solid ${primaryType.color}`,
                            color: primaryType.color,
                            padding: '8px 16px', 
                            borderRadius: '20px',
                            fontSize: '13px'
                          }}
                        >
                          {env}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4" style={{ background: '#f8f9fa', borderRadius: '8px' }}>
                    <h5 className="mb-2"><i className="far fa-comments mr-2"></i>Communicatiestijl</h5>
                    <p className="mb-0">{primaryType.communicationStyle}</p>
                  </div>
                </div>

                {/* Secondary Type */}
                <div className="bg-white p-4 mb-4" style={{ borderRadius: '10px' }}>
                  <div className="d-flex align-items-center">
                    <div 
                      className="mr-3" 
                      style={{ 
                        width: '50px', 
                        height: '50px', 
                        borderRadius: '50%', 
                        background: secondaryType.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <span className="text-white" style={{ fontSize: '18px', fontWeight: '700' }}>
                        {result.secondaryType}
                      </span>
                    </div>
                    <div>
                      <h5 className="mb-1">Secundair type: {secondaryType.title}</h5>
                      <p className="mb-0 c-grey" style={{ fontSize: '14px' }}>
                        {result.scores[result.secondaryType]}% - {secondaryType.name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="d-flex flex-wrap gap-3">
                  <Link href="/tests/skills" className="crumina-button button--yellow button--xl">
                    Naar vaardighedentest
                  </Link>
                  <Link href="/dashboard/candidate" className="crumina-button button--dark button--xl">
                    Naar dashboard
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

  const question = personalityQuestions[currentQuestion];
  const selectedAnswer = answers[question.id];

  return (
    <div className="main-content-wrapper">
      <div className="header--spacer" style={{ height: '142px', backgroundColor: '#121214' }}></div>
      
      <section className="bg-dark-themes py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-white">Vraag {currentQuestion + 1} van {personalityQuestions.length}</span>
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
                <h3 className="mb-4">{question.question}</h3>

                <div className="mb-4">
                  {question.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option.type)}
                      className={`w-100 text-left p-4 mb-3 ${selectedAnswer === option.type ? 'border-yellow' : ''}`}
                      style={{ 
                        border: selectedAnswer === option.type ? '2px solid #f9d423' : '1px solid #e9ecef',
                        borderRadius: '10px',
                        background: selectedAnswer === option.type ? '#fffdf0' : '#fff',
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
                            border: selectedAnswer === option.type ? '2px solid #f9d423' : '2px solid #e9ecef',
                            background: selectedAnswer === option.type ? '#f9d423' : '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {selectedAnswer === option.type && (
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
                    disabled={currentQuestion === 0}
                    className="crumina-button button--dark button--bordered button--m"
                    style={{ opacity: currentQuestion === 0 ? 0.5 : 1 }}
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

export default PersonalityTest;
