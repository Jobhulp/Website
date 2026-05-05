'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { api, ApiError } from '@/lib/api-client';
import type {
  PersonalityStatus,
  PersonalityQuestion,
  PersonalitySubmitResponse,
  MbtiType,
  PersonalityResultBreakdown,
} from '@/types/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';

// MBTI type descriptions in Dutch
const mbtiDescriptions: Record<MbtiType, { title: string; description: string }> = {
  INTJ: { title: 'De Architect', description: 'Strategisch, onafhankelijk, gedreven door ideeen.' },
  INTP: { title: 'De Denker', description: 'Analytisch, objectief, gereserveerd, flexibel.' },
  ENTJ: { title: 'De Commandant', description: 'Besluitvaardig, ambitieus, strategisch, zelfverzekerd.' },
  ENTP: { title: 'De Debater', description: 'Slim, nieuwsgierig, intellectueel uitdagend.' },
  INFJ: { title: 'De Pleitbezorger', description: 'Zachtaardig, principieel, intuitief en creatief.' },
  INFP: { title: 'De Bemiddelaar', description: 'Idealistisch, empathisch, creatief en loyaal.' },
  ENFJ: { title: 'De Protagonist', description: 'Charismatisch, inspirerend, natuurlijke leider.' },
  ENFP: { title: 'De Campaigner', description: 'Enthousiast, creatief, sociaal en optimistisch.' },
  ISTJ: { title: 'De Inspecteur', description: 'Verantwoordelijk, betrouwbaar, georganiseerd.' },
  ISFJ: { title: 'De Beschermer', description: 'Ondersteunend, betrouwbaar, geduldig en observant.' },
  ESTJ: { title: 'De Bestuurder', description: 'Georganiseerd, logisch, assertief en praktisch.' },
  ESFJ: { title: 'De Consul', description: 'Zorgzaam, sociaal, traditioneel en loyaal.' },
  ISTP: { title: 'De Virtuoos', description: 'Praktisch, observant, analytisch en terughoudend.' },
  ISFP: { title: 'De Avonturier', description: 'Flexibel, charmant, gevoelig voor schoonheid.' },
  ESTP: { title: 'De Ondernemer', description: 'Energiek, pragmatisch, observant en direct.' },
  ESFP: { title: 'De Entertainer', description: 'Spontaan, energiek, vriendelijk en speels.' },
};

// Dimension labels
const dimensionLabels = {
  EI: { left: 'Introvert (I)', right: 'Extravert (E)' },
  SN: { left: 'Intuïtief (N)', right: 'Observant (S)' },
  TF: { left: 'Voelend (F)', right: 'Denkend (T)' },
  JP: { left: 'Zoekend (P)', right: 'Beoordelend (J)' },
};

type PageMode = 'loading' | 'status' | 'test' | 'submitting' | 'result';

export default function PersonalityTestPage() {
  const [mode, setMode] = useState<PageMode>('loading');
  const [error, setError] = useState<string | null>(null);
  
  // Status mode state
  const [status, setStatus] = useState<PersonalityStatus | null>(null);
  
  // Test mode state
  const [questions, setQuestions] = useState<PersonalityQuestion[]>([]);
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, 1 | 2 | 3 | 4 | 5>>({});
  
  // Result mode state
  const [result, setResult] = useState<PersonalitySubmitResponse | null>(null);

  // Fetch status on mount
  useEffect(() => {
    fetchStatus();
  }, []);

  async function fetchStatus() {
    setError(null);
    setMode('loading');
    try {
      const data = await api.get<PersonalityStatus>('/personality/status');
      setStatus(data);
      setMode('status');
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Er ging iets mis bij het ophalen van de status.');
      }
      setMode('status');
    }
  }

  async function startTest() {
    setError(null);
    setMode('loading');
    try {
      const data = await api.post<{ questions: PersonalityQuestion[]; attemptId: string }>('/personality/start', {});
      setQuestions(data.questions);
      setAttemptId(data.attemptId);
      setCurrentIndex(0);
      setAnswers({});
      setMode('test');
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Er ging iets mis bij het starten van de test.');
      }
      setMode('status');
    }
  }

  async function submitTest() {
    if (!attemptId) return;
    setError(null);
    setMode('submitting');
    try {
      const data = await api.post<PersonalitySubmitResponse>('/personality/submit', {
        attemptId,
        answers,
      });
      setResult(data);
      setMode('result');
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Er ging iets mis bij het verzenden van de test.');
      }
      setMode('test');
    }
  }

  function handleAnswer(value: 1 | 2 | 3 | 4 | 5) {
    const question = questions[currentIndex];
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
    
    // Auto-advance to next question or stay on last
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }

  function goToPrevious() {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('nl-BE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  // Loading state
  if (mode === 'loading') {
    return (
      <div className="max-w-2xl mx-auto">
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-96 mb-8" />
        <Card>
          <CardContent className="py-8">
            <Skeleton className="h-6 w-full mb-4" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      </div>
    );
  }

  // Status mode
  if (mode === 'status') {
    return (
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Persoonlijkheidstest</h1>
        <p className="text-gray-600 text-sm mb-8">
          Ontdek je MBTI-persoonlijkheidstype en vind werkomgevingen die bij je passen.
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <Card>
          <CardContent className="py-8">
            {/* Cannot take test - cooldown active */}
            {status && !status.canTake && status.cooldownUntil && status.lastResult && (
              <div className="text-center">
                <div className="mb-6">
                  <div className="text-6xl font-bold text-primary mb-2">
                    {status.lastResult.mbtiType}
                  </div>
                  <div className="text-lg text-gray-600">
                    {mbtiDescriptions[status.lastResult.mbtiType].title}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {mbtiDescriptions[status.lastResult.mbtiType].description}
                  </div>
                </div>
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800">
                    Je hebt de test gedaan op {formatDate(status.lastResult.completedAt)}.
                    Je kunt de test opnieuw doen vanaf {formatDate(status.cooldownUntil)}.
                  </p>
                </div>
              </div>
            )}

            {/* Can take test - has previous result */}
            {status && status.canTake && status.lastResult && (
              <div className="text-center">
                <div className="mb-6">
                  <div className="text-5xl font-bold text-primary mb-2">
                    {status.lastResult.mbtiType}
                  </div>
                  <div className="text-lg text-gray-600">
                    {mbtiDescriptions[status.lastResult.mbtiType].title}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {mbtiDescriptions[status.lastResult.mbtiType].description}
                  </div>
                  <div className="text-xs text-gray-400 mt-2">
                    Voltooid op {formatDate(status.lastResult.completedAt)}
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  Je kunt de test opnieuw doen als je denkt dat je resultaat veranderd is.
                </p>
                <Button onClick={startTest} size="lg">
                  Test opnieuw doen
                </Button>
              </div>
            )}

            {/* Can take test - no previous result */}
            {status && status.canTake && !status.lastResult && (
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold mb-4">Doe de persoonlijkheidstest</h2>
                <div className="text-gray-600 mb-6 max-w-md mx-auto">
                  <p className="mb-4">
                    60 vragen, ongeveer 10 minuten. Je antwoordt op een schaal van 1 (zeer oneens) 
                    tot 5 (zeer eens). Er zijn geen &apos;foute&apos; antwoorden.
                  </p>
                  <p>
                    Je resultaat helpt om je te matchen met werkomgevingen waar je je goed voelt.
                  </p>
                </div>
                <Button onClick={startTest} size="lg">
                  Start test
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link href="/dashboard/profile" className="text-sm text-gray-500 hover:text-gray-700">
            Terug naar profiel
          </Link>
        </div>
      </div>
    );
  }

  // Test mode
  if (mode === 'test' || mode === 'submitting') {
    const currentQuestion = questions[currentIndex];
    const progress = ((currentIndex + 1) / questions.length) * 100;
    const isLastQuestion = currentIndex === questions.length - 1;
    const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;
    const allAnswered = questions.every((q) => answers[q.id] !== undefined);

    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              Vraag {currentIndex + 1} van {questions.length}
            </span>
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <Card>
          <CardContent className="py-8">
            {currentQuestion && (
              <>
                <p className="text-xl text-center mb-8 min-h-[4rem]">
                  {currentQuestion.text}
                </p>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center mb-8">
                  {([1, 2, 3, 4, 5] as const).map((value) => {
                    const labels = ['Zeer oneens', 'Oneens', 'Neutraal', 'Eens', 'Zeer eens'];
                    const isSelected = currentAnswer === value;
                    return (
                      <button
                        key={value}
                        onClick={() => handleAnswer(value)}
                        disabled={mode === 'submitting'}
                        className={`
                          flex-1 py-3 px-4 rounded-lg border-2 transition-all text-sm font-medium
                          ${isSelected
                            ? 'border-primary bg-primary text-white'
                            : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                          }
                          disabled:opacity-50 disabled:cursor-not-allowed
                        `}
                      >
                        <span className="block text-lg mb-1">{value}</span>
                        <span className="block text-xs opacity-80">{labels[value - 1]}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={goToPrevious}
                    disabled={currentIndex === 0 || mode === 'submitting'}
                  >
                    Vorige
                  </Button>

                  {isLastQuestion ? (
                    <Button
                      onClick={submitTest}
                      disabled={!allAnswered || mode === 'submitting'}
                    >
                      {mode === 'submitting' ? 'Verzenden...' : 'Verzenden'}
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => setCurrentIndex((prev) => prev + 1)}
                      disabled={!currentAnswer}
                    >
                      Volgende
                    </Button>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400">
            {Object.keys(answers).length} van {questions.length} vragen beantwoord
          </p>
        </div>
      </div>
    );
  }

  // Result mode
  if (mode === 'result' && result) {
    const typeInfo = mbtiDescriptions[result.mbtiType];

    return (
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Je resultaat</h1>
        <p className="text-gray-600 text-sm mb-8">
          Hier is je persoonlijkheidstype op basis van de test.
        </p>

        <Card className="mb-6">
          <CardContent className="py-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <div className="text-6xl font-bold text-primary mb-2">
              {result.mbtiType}
            </div>
            <div className="text-xl text-gray-700 mb-1">{typeInfo.title}</div>
            <p className="text-gray-600 max-w-md mx-auto">{typeInfo.description}</p>
          </CardContent>
        </Card>

        {/* Breakdown */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Je score per dimensie</CardTitle>
            <CardDescription>
              Hoe je scoort op de vier persoonlijkheidsdimensies
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {(Object.entries(result.breakdown) as [keyof PersonalityResultBreakdown, number][]).map(
              ([dimension, value]) => {
                const labels = dimensionLabels[dimension];
                return (
                  <div key={dimension}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className={value < 50 ? 'font-medium' : 'text-gray-500'}>
                        {labels.left}
                      </span>
                      <span className={value >= 50 ? 'font-medium' : 'text-gray-500'}>
                        {labels.right}
                      </span>
                    </div>
                    <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-primary transition-all"
                        style={{ width: `${value}%` }}
                      />
                      <div className="absolute top-0 left-1/2 w-px h-full bg-gray-300" />
                    </div>
                    <div className="text-center text-xs text-gray-500 mt-1">
                      {value}%
                    </div>
                  </div>
                );
              }
            )}
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild className="flex-1">
            <Link href="/dashboard/matches">
              Bekijk je matches
            </Link>
          </Button>
          <Button variant="outline" asChild className="flex-1">
            <Link href="/dashboard/profile">
              Terug naar profiel
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
