"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  personalityQuestions, 
  personalityTypes, 
  calculatePersonalityResult,
  dimensionLabels,
  PersonalityResult 
} from '../../data/personality-test-data';

const PersonalityTest: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B'>>({});
  const [result, setResult] = useState<PersonalityResult | null>(null);
  const [showIntro, setShowIntro] = useState(true);

  const progress = (Object.keys(answers).length / personalityQuestions.length) * 100;

  const handleAnswer = (choice: 'A' | 'B') => {
    const newAnswers = { ...answers, [personalityQuestions[currentQuestion].id]: choice };
    setAnswers(newAnswers);

    if (currentQuestion < personalityQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
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
                  Ontdek je MBTI persoonlijkheidstype
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
                    Deze test is gebaseerd op het Myers-Briggs Type Indicator (MBTI) model. 
                    Je krijgt een van de 16 persoonlijkheidstypes toegewezen, zoals ENTJ, INFP, of ISTP. 
                    Dit helpt Jobhulp om je te matchen met bedrijven waar jouw persoonlijkheid het beste past.
                  </p>

                  <h5 className="mb-3">De 4 dimensies:</h5>
                  <div className="row mb-4">
                    <div className="col-md-6 mb-3">
                      <div className="p-3" style={{ background: '#f8f9fa', borderRadius: '8px' }}>
                        <div className="d-flex justify-content-between mb-2">
                          <span style={{ color: '#dc2626', fontWeight: '600' }}>E - Extravert</span>
                          <span style={{ color: '#6366f1', fontWeight: '600' }}>I - Introvert</span>
                        </div>
                        <small className="c-grey">Waar haal je energie vandaan?</small>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="p-3" style={{ background: '#f8f9fa', borderRadius: '8px' }}>
                        <div className="d-flex justify-content-between mb-2">
                          <span style={{ color: '#059669', fontWeight: '600' }}>S - Observant</span>
                          <span style={{ color: '#f59e0b', fontWeight: '600' }}>N - Intuitief</span>
                        </div>
                        <small className="c-grey">Hoe verwerk je informatie?</small>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="p-3" style={{ background: '#f8f9fa', borderRadius: '8px' }}>
                        <div className="d-flex justify-content-between mb-2">
                          <span style={{ color: '#0891b2', fontWeight: '600' }}>T - Denkend</span>
                          <span style={{ color: '#ec4899', fontWeight: '600' }}>F - Voelend</span>
                        </div>
                        <small className="c-grey">Hoe neem je beslissingen?</small>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="p-3" style={{ background: '#f8f9fa', borderRadius: '8px' }}>
                        <div className="d-flex justify-content-between mb-2">
                          <span style={{ color: '#7c3aed', fontWeight: '600' }}>J - Beoordelend</span>
                          <span style={{ color: '#f97316', fontWeight: '600' }}>P - Waarnemend</span>
                        </div>
                        <small className="c-grey">Hoe organiseer je je leven?</small>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 mb-4" style={{ background: '#f8f9fa', borderRadius: '8px' }}>
                    <div className="d-flex align-items-center">
                      <i className="far fa-clock mr-3 c-blue" style={{ fontSize: '24px' }}></i>
                      <div>
                        <strong>Duurt ongeveer 8-10 minuten</strong>
                        <p className="mb-0 c-grey" style={{ fontSize: '14px' }}>20 vragen over je voorkeuren en werkstijl</p>
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
    const typeInfo = personalityTypes[result.type];
    const dimensions = [
      { key: 'EI', left: 'E', right: 'I', leftLabel: 'Extravert', rightLabel: 'Introvert', value: result.percentages.EI, leftColor: '#dc2626', rightColor: '#6366f1' },
      { key: 'SN', left: 'S', right: 'N', leftLabel: 'Observant', rightLabel: 'Intuitief', value: result.percentages.SN, leftColor: '#059669', rightColor: '#f59e0b' },
      { key: 'TF', left: 'T', right: 'F', leftLabel: 'Denkend', rightLabel: 'Voelend', value: result.percentages.TF, leftColor: '#0891b2', rightColor: '#ec4899' },
      { key: 'JP', left: 'J', right: 'P', leftLabel: 'Beoordelend', rightLabel: 'Waarnemend', value: result.percentages.JP, leftColor: '#7c3aed', rightColor: '#f97316' },
    ];

    return (
      <div className="main-content-wrapper">
        <div className="header--spacer" style={{ height: '142px', backgroundColor: '#121214' }}></div>
        
        <section style={{ background: typeInfo.color, padding: '40px 0' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 text-center">
                <h1 className="text-white mb-2" style={{ fontSize: '64px', fontWeight: '800', letterSpacing: '8px' }}>
                  {result.type}
                </h1>
                <h2 className="text-white mb-2">{typeInfo.name}</h2>
                <p className="text-white" style={{ opacity: 0.9 }}>{typeInfo.nickname}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="medium-padding120 bg-light-grey">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                {/* Description */}
                <div className="bg-white p-5 mb-4" style={{ borderRadius: '10px' }}>
                  <p style={{ fontSize: '18px', lineHeight: '1.8' }}>
                    {typeInfo.description}
                  </p>
                </div>

                {/* Dimension Bars */}
                <div className="bg-white p-5 mb-4" style={{ borderRadius: '10px' }}>
                  <h4 className="mb-4">Jouw MBTI Profiel</h4>
                  {dimensions.map((dim) => {
                    const isLeft = dim.value >= 50;
                    const percentage = isLeft ? dim.value : 100 - dim.value;
                    return (
                      <div key={dim.key} className="mb-4">
                        <div className="d-flex justify-content-between mb-2">
                          <span style={{ color: dim.leftColor, fontWeight: isLeft ? '700' : '400' }}>
                            {dim.left} - {dim.leftLabel} {isLeft && `(${percentage}%)`}
                          </span>
                          <span style={{ color: dim.rightColor, fontWeight: !isLeft ? '700' : '400' }}>
                            {!isLeft && `(${percentage}%)`} {dim.rightLabel} - {dim.right}
                          </span>
                        </div>
                        <div style={{ background: '#e9ecef', borderRadius: '10px', height: '12px', overflow: 'hidden', position: 'relative' }}>
                          <div 
                            style={{ 
                              position: 'absolute',
                              left: 0,
                              width: `${dim.value}%`, 
                              height: '100%', 
                              background: dim.leftColor,
                              borderRadius: '10px 0 0 10px',
                            }}
                          ></div>
                          <div 
                            style={{ 
                              position: 'absolute',
                              right: 0,
                              width: `${100 - dim.value}%`, 
                              height: '100%', 
                              background: dim.rightColor,
                              borderRadius: '0 10px 10px 0',
                            }}
                          ></div>
                          <div 
                            style={{
                              position: 'absolute',
                              left: '50%',
                              top: 0,
                              width: '2px',
                              height: '100%',
                              background: '#fff',
                              transform: 'translateX(-50%)'
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Strengths & Weaknesses */}
                <div className="row mb-4">
                  <div className="col-md-6 mb-4 mb-md-0">
                    <div className="bg-white p-4 h-100" style={{ borderRadius: '10px' }}>
                      <h5 className="mb-3" style={{ color: '#059669' }}>
                        <i className="far fa-check-circle mr-2"></i>Sterktes
                      </h5>
                      <ul className="list-unstyled mb-0">
                        {typeInfo.strengths.map((strength, idx) => (
                          <li key={idx} className="mb-2 d-flex align-items-start">
                            <i className="far fa-check mr-2 mt-1" style={{ color: '#059669' }}></i>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="bg-white p-4 h-100" style={{ borderRadius: '10px' }}>
                      <h5 className="mb-3" style={{ color: '#f59e0b' }}>
                        <i className="far fa-lightbulb mr-2"></i>Aandachtspunten
                      </h5>
                      <ul className="list-unstyled mb-0">
                        {typeInfo.weaknesses.map((weakness, idx) => (
                          <li key={idx} className="mb-2 d-flex align-items-start">
                            <i className="far fa-circle mr-2 mt-1" style={{ color: '#f59e0b' }}></i>
                            <span>{weakness}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Work Style & Environment */}
                <div className="bg-white p-5 mb-4" style={{ borderRadius: '10px' }}>
                  <div className="mb-4">
                    <h5 className="mb-3"><i className="far fa-briefcase mr-2" style={{ color: typeInfo.color }}></i>Werkstijl</h5>
                    <p className="mb-0">{typeInfo.workStyle}</p>
                  </div>
                  <div className="mb-4">
                    <h5 className="mb-3"><i className="far fa-building mr-2" style={{ color: typeInfo.color }}></i>Ideale werkomgeving</h5>
                    <p className="mb-0">{typeInfo.idealEnvironment}</p>
                  </div>
                  <div>
                    <h5 className="mb-3"><i className="far fa-star mr-2" style={{ color: typeInfo.color }}></i>Passende carrières</h5>
                    <div className="d-flex flex-wrap gap-2">
                      {typeInfo.careers.map((career, idx) => (
                        <span 
                          key={idx}
                          style={{
                            background: `${typeInfo.color}15`,
                            color: typeInfo.color,
                            padding: '6px 14px',
                            borderRadius: '20px',
                            fontSize: '14px',
                            fontWeight: '500'
                          }}
                        >
                          {career}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Famous People */}
                <div className="bg-white p-4 mb-4" style={{ borderRadius: '10px' }}>
                  <h5 className="mb-3"><i className="far fa-users mr-2" style={{ color: typeInfo.color }}></i>Bekende {result.type}&apos;s</h5>
                  <p className="mb-0 c-grey">{typeInfo.famousPeople.join(', ')}</p>
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
                <div className="mb-3">
                  <span 
                    className="badge" 
                    style={{ 
                      background: '#f0f0f0', 
                      color: '#666', 
                      padding: '4px 12px', 
                      borderRadius: '12px',
                      fontSize: '12px'
                    }}
                  >
                    {dimensionLabels[question.dimension].left} vs {dimensionLabels[question.dimension].right}
                  </span>
                </div>
                <h3 className="mb-4">{question.question}</h3>

                <div className="mb-4">
                  <button
                    onClick={() => handleAnswer('A')}
                    className="w-100 text-left p-4 mb-3"
                    style={{ 
                      border: selectedAnswer === 'A' ? '2px solid #f9d423' : '1px solid #e9ecef',
                      borderRadius: '10px',
                      background: selectedAnswer === 'A' ? '#fffdf0' : '#fff',
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
                          border: selectedAnswer === 'A' ? '2px solid #f9d423' : '2px solid #e9ecef',
                          background: selectedAnswer === 'A' ? '#f9d423' : '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        {selectedAnswer === 'A' && (
                          <i className="fas fa-check text-dark" style={{ fontSize: '12px' }}></i>
                        )}
                      </div>
                      <span style={{ fontSize: '15px' }}>{question.optionA.text}</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleAnswer('B')}
                    className="w-100 text-left p-4"
                    style={{ 
                      border: selectedAnswer === 'B' ? '2px solid #f9d423' : '1px solid #e9ecef',
                      borderRadius: '10px',
                      background: selectedAnswer === 'B' ? '#fffdf0' : '#fff',
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
                          border: selectedAnswer === 'B' ? '2px solid #f9d423' : '2px solid #e9ecef',
                          background: selectedAnswer === 'B' ? '#f9d423' : '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        {selectedAnswer === 'B' && (
                          <i className="fas fa-check text-dark" style={{ fontSize: '12px' }}></i>
                        )}
                      </div>
                      <span style={{ fontSize: '15px' }}>{question.optionB.text}</span>
                    </div>
                  </button>
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
                  <span className="c-grey align-self-center" style={{ fontSize: '14px' }}>
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
