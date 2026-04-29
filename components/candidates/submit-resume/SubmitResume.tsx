"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { skillCategories, getAllSkills } from '../../../data/candidate-skills-data';

interface Education {
  id: number;
  schoolName: string;
  qualification: string;
  startEndDate: string;
}

interface Experience {
  id: number;
  company: string;
  title: string;
  startEndDate: string;
  description: string;
}

const SubmitResume = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [education, setEducation] = useState<Education[]>([{ id: 1, schoolName: '', qualification: '', startEndDate: '' }]);
  const [experience, setExperience] = useState<Experience[]>([]);
  
  const allSkills = getAllSkills();

  const toggleSkill = (skillId: string) => {
    setSelectedSkills(prev => 
      prev.includes(skillId) 
        ? prev.filter(id => id !== skillId)
        : [...prev, skillId]
    );
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const addEducation = () => {
    setEducation(prev => [...prev, { id: Date.now(), schoolName: '', qualification: '', startEndDate: '' }]);
  };

  const removeEducation = (id: number) => {
    setEducation(prev => prev.filter(e => e.id !== id));
  };

  const addExperience = () => {
    setExperience(prev => [...prev, { id: Date.now(), company: '', title: '', startEndDate: '', description: '' }]);
  };

  const removeExperience = (id: number) => {
    setExperience(prev => prev.filter(e => e.id !== id));
  };

  const getSkillsByCategory = (categoryId: string) => {
    return allSkills.filter(skill => skill.categoryId === categoryId);
  };

  const selectedSkillsCount = selectedSkills.length;

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
                  <span>Profiel Aanmaken</span>
                </li>
              </ul>

              <h1 className="page-title text-white">Maak Je Profiel</h1>
              <p className="text-white" style={{ opacity: 0.8 }}>
                Vul je gegevens in en selecteer je skills. Je kunt daarna je niveau per skill testen.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="medium-padding120 bg-light-grey">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {/* Basis gegevens */}
              <div className="bg-white p-4 mb-4" style={{ borderRadius: '10px' }}>
                <h4 className="mb-4">
                  <i className="far fa-user mr-2 c-primary"></i>
                  Persoonlijke Gegevens
                </h4>
                
                <form className="form--resume">
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="name">Volledige naam *</label>
                      <input id="name" name="name" placeholder="Jan Jansen" type="text" />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email">E-mailadres *</label>
                      <input id="email" name="email" placeholder="jan@voorbeeld.be" type="email" />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="phone">Telefoonnummer</label>
                      <input id="phone" name="phone" placeholder="+32 123 45 67 89" type="tel" />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="location">Woonplaats *</label>
                      <input id="location" name="location" placeholder="Antwerpen, België" type="text" />
                    </div>
                  </div>

                  <label htmlFor="title">Gewenste functietitel *</label>
                  <input id="title" name="title" placeholder='bv. "Frontend Developer" of "Marketing Manager"' type="text" />

                  <label htmlFor="bio">Over jezelf</label>
                  <textarea 
                    id="bio" 
                    name="bio" 
                    placeholder="Beschrijf kort wie je bent en wat je zoekt..."
                    rows={4}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e9ecef' }}
                  ></textarea>
                </form>
              </div>

              {/* Skills sectie - DE BELANGRIJKSTE */}
              <div className="bg-white p-4 mb-4" style={{ borderRadius: '10px' }}>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h4 className="mb-1">
                      <i className="far fa-lightbulb mr-2" style={{ color: '#f59e0b' }}></i>
                      Selecteer Je Skills & Interesses
                    </h4>
                    <p className="c-grey mb-0" style={{ fontSize: '14px' }}>
                      Kies de vaardigheden die je hebt of wilt ontwikkelen. Je kunt daarna per skill een korte test doen om je niveau te bepalen.
                    </p>
                  </div>
                  {selectedSkillsCount > 0 && (
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
                  )}
                </div>

                <div className="alert mb-4" style={{ background: '#fef3c7', border: 'none', borderRadius: '8px', padding: '16px' }}>
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

                {/* Skill categorieën */}
                <div className="skill-categories">
                  {skillCategories.map((category) => {
                    const categorySkills = getSkillsByCategory(category.id);
                    const selectedInCategory = categorySkills.filter(s => selectedSkills.includes(s.id)).length;
                    const isExpanded = expandedCategories.includes(category.id);

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
                                {categorySkills.length} skills
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
                            <div className="row">
                              {categorySkills.map((skill) => {
                                const isSelected = selectedSkills.includes(skill.id);
                                return (
                                  <div key={skill.id} className="col-md-6 mb-2">
                                    <button
                                      onClick={() => toggleSkill(skill.id)}
                                      className="w-100 d-flex align-items-center p-3"
                                      style={{
                                        border: isSelected ? `2px solid ${category.color}` : '1px solid #e9ecef',
                                        borderRadius: '8px',
                                        background: isSelected ? `${category.color}10` : '#fff',
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
                                        <div className="c-grey" style={{ fontSize: '12px' }}>{skill.description}</div>
                                      </div>
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Geselecteerde skills samenvatting */}
                {selectedSkills.length > 0 && (
                  <div className="mt-4 p-3" style={{ background: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                    <div className="d-flex align-items-center mb-2">
                      <i className="far fa-check-circle mr-2" style={{ color: '#059669' }}></i>
                      <strong style={{ color: '#059669' }}>{selectedSkills.length} skills geselecteerd</strong>
                    </div>
                    <div className="d-flex flex-wrap" style={{ gap: '8px' }}>
                      {selectedSkills.map(skillId => {
                        const skill = allSkills.find(s => s.id === skillId);
                        if (!skill) return null;
                        return (
                          <span 
                            key={skillId}
                            className="badge d-flex align-items-center"
                            style={{ 
                              background: skill.categoryColor, 
                              color: '#fff', 
                              padding: '6px 12px',
                              borderRadius: '16px',
                              fontSize: '13px'
                            }}
                          >
                            {skill.name}
                            <button
                              onClick={() => toggleSkill(skillId)}
                              style={{ 
                                background: 'none', 
                                border: 'none', 
                                color: '#fff', 
                                marginLeft: '6px',
                                cursor: 'pointer',
                                padding: 0
                              }}
                            >
                              <i className="far fa-times" style={{ fontSize: '11px' }}></i>
                            </button>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Werkervaring */}
              <div className="bg-white p-4 mb-4" style={{ borderRadius: '10px' }}>
                <h4 className="mb-3">
                  <i className="far fa-briefcase mr-2 c-primary"></i>
                  Werkervaring
                  <small className="c-grey ml-2" style={{ fontSize: '14px' }}>(optioneel)</small>
                </h4>

                {experience.length === 0 ? (
                  <p className="c-grey mb-3" style={{ fontSize: '14px' }}>
                    Voeg je relevante werkervaring toe. Dit is optioneel - je skills zijn belangrijker.
                  </p>
                ) : (
                  experience.map((exp, index) => (
                    <div key={exp.id} className="p-3 mb-3" style={{ background: '#f8f9fa', borderRadius: '8px' }}>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <strong>Ervaring {index + 1}</strong>
                        <button 
                          onClick={() => removeExperience(exp.id)}
                          className="c-red"
                          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                          <i className="far fa-trash-alt mr-1"></i> Verwijder
                        </button>
                      </div>
                      <form className="form--resume">
                        <div className="row">
                          <div className="col-md-6">
                            <label>Bedrijf</label>
                            <input type="text" placeholder="Bedrijfsnaam" />
                          </div>
                          <div className="col-md-6">
                            <label>Functie</label>
                            <input type="text" placeholder="Jouw functietitel" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <label>Periode</label>
                            <input type="text" placeholder="Jan 2020 - Heden" />
                          </div>
                        </div>
                        <label>Beschrijving</label>
                        <textarea 
                          placeholder="Beschrijf kort je taken en verantwoordelijkheden..."
                          rows={3}
                          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e9ecef' }}
                        ></textarea>
                      </form>
                    </div>
                  ))
                )}

                <button 
                  onClick={addExperience}
                  className="crumina-button button--dark button--s"
                >
                  <i className="far fa-plus mr-2"></i> Voeg ervaring toe
                </button>
              </div>

              {/* Opleiding */}
              <div className="bg-white p-4 mb-4" style={{ borderRadius: '10px' }}>
                <h4 className="mb-3">
                  <i className="far fa-graduation-cap mr-2 c-primary"></i>
                  Opleiding
                  <small className="c-grey ml-2" style={{ fontSize: '14px' }}>(optioneel)</small>
                </h4>

                <p className="c-grey mb-3" style={{ fontSize: '14px' }}>
                  Je diploma is minder belangrijk dan je huidige vaardigheden. Voeg je opleiding toe als je wilt.
                </p>

                {education.map((edu, index) => (
                  <div key={edu.id} className="p-3 mb-3" style={{ background: '#f8f9fa', borderRadius: '8px' }}>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <strong>Opleiding {index + 1}</strong>
                      {education.length > 1 && (
                        <button 
                          onClick={() => removeEducation(edu.id)}
                          className="c-red"
                          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                          <i className="far fa-trash-alt mr-1"></i> Verwijder
                        </button>
                      )}
                    </div>
                    <form className="form--resume">
                      <label>School / Instelling</label>
                      <input type="text" placeholder="Naam van de school of instelling" />
                      <div className="row">
                        <div className="col-md-6">
                          <label>Diploma / Certificaat</label>
                          <input type="text" placeholder="bv. Bachelor ICT" />
                        </div>
                        <div className="col-md-6">
                          <label>Periode</label>
                          <input type="text" placeholder="2015 - 2019" />
                        </div>
                      </div>
                    </form>
                  </div>
                ))}

                <button 
                  onClick={addEducation}
                  className="crumina-button button--dark button--s"
                >
                  <i className="far fa-plus mr-2"></i> Voeg opleiding toe
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <div className="bg-white p-4 mb-4" style={{ borderRadius: '10px', position: 'sticky', top: '100px' }}>
                <h5 className="mb-3">Profiel voortgang</h5>
                
                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-2" style={{ fontSize: '14px' }}>
                    <span>Basis gegevens</span>
                    <i className="far fa-check-circle c-green"></i>
                  </div>
                  <div className="d-flex justify-content-between mb-2" style={{ fontSize: '14px' }}>
                    <span>Skills geselecteerd</span>
                    {selectedSkills.length > 0 ? (
                      <span className="c-green"><i className="far fa-check-circle"></i> {selectedSkills.length}</span>
                    ) : (
                      <span className="c-grey"><i className="far fa-circle"></i></span>
                    )}
                  </div>
                  <div className="d-flex justify-content-between mb-2" style={{ fontSize: '14px' }}>
                    <span>Skills getest</span>
                    <span className="c-grey"><i className="far fa-circle"></i> 0/{selectedSkills.length}</span>
                  </div>
                </div>

                <div className="alert mb-4" style={{ background: '#eff6ff', border: 'none', borderRadius: '8px', padding: '12px' }}>
                  <div className="d-flex align-items-start">
                    <i className="far fa-lightbulb mr-2" style={{ color: '#3b82f6', marginTop: '2px' }}></i>
                    <small style={{ color: '#1e40af' }}>
                      Na het opslaan kun je per geselecteerde skill een test doen om je niveau te bepalen.
                    </small>
                  </div>
                </div>

                <Link 
                  href={selectedSkills.length > 0 ? "/tests/skills" : "#"}
                  className={`crumina-button button--xl w-100 text-center mb-3 ${selectedSkills.length === 0 ? 'button--dark button--bordered' : ''}`}
                  style={selectedSkills.length > 0 ? { background: '#059669', color: '#fff' } : { opacity: 0.5, pointerEvents: 'none' }}
                >
                  <i className="far fa-save mr-2"></i>
                  Opslaan & Test Skills
                </Link>

                <Link 
                  href="/candidates/resume-preview"
                  className="crumina-button button--dark button--bordered button--xl w-100 text-center"
                >
                  Preview profiel
                </Link>
              </div>

              {/* Waarom skills testen */}
              <div className="bg-white p-4" style={{ borderRadius: '10px' }}>
                <h6 className="mb-3">Waarom skills testen?</h6>
                
                <div className="d-flex align-items-start mb-3">
                  <div 
                    style={{ 
                      width: '32px', 
                      height: '32px', 
                      borderRadius: '50%', 
                      background: '#dcfce7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '12px',
                      flexShrink: 0
                    }}
                  >
                    <i className="fas fa-check" style={{ color: '#059669', fontSize: '12px' }}></i>
                  </div>
                  <div>
                    <strong style={{ fontSize: '14px' }}>Toon je echte niveau</strong>
                    <p className="c-grey mb-0" style={{ fontSize: '13px' }}>
                      Bewijs je vaardigheden met objectieve tests
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-start mb-3">
                  <div 
                    style={{ 
                      width: '32px', 
                      height: '32px', 
                      borderRadius: '50%', 
                      background: '#fef3c7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '12px',
                      flexShrink: 0
                    }}
                  >
                    <i className="fas fa-bullseye" style={{ color: '#f59e0b', fontSize: '12px' }}></i>
                  </div>
                  <div>
                    <strong style={{ fontSize: '14px' }}>Betere matches</strong>
                    <p className="c-grey mb-0" style={{ fontSize: '13px' }}>
                      Werkgevers vinden je op basis van vaardigheden, niet diploma
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-start">
                  <div 
                    style={{ 
                      width: '32px', 
                      height: '32px', 
                      borderRadius: '50%', 
                      background: '#eff6ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '12px',
                      flexShrink: 0
                    }}
                  >
                    <i className="fas fa-chart-line" style={{ color: '#3b82f6', fontSize: '12px' }}></i>
                  </div>
                  <div>
                    <strong style={{ fontSize: '14px' }}>Groei zichtbaar</strong>
                    <p className="c-grey mb-0" style={{ fontSize: '13px' }}>
                      Herhaal tests om je groei te tonen
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
};

export default SubmitResume;
