'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { api, ApiError } from '@/lib/api-client';
import type {
  SkillTestAttemptResponse,
  SkillTestQuestion,
  SkillTestAttemptFull,
  SkillTestSubmitFullResponse,
  SkillTestPerQuestion,
  SkillTestOutcome,
  ProficiencyLevel,
} from '@/types/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

const levelLabels: Record<ProficiencyLevel, string> = {
  informed: 'Geïnformeerd',
  beginner: 'Beginner',
  advanced: 'Gevorderd',
  expert: 'Expert',
  master: 'Meester',
};

const outcomeConfig: Record<SkillTestOutcome, { color: string; bgColor: string; label: string }> = {
  failed: { color: 'text-red-700', bgColor: 'bg-red-50 border-red-200', label: 'Niet geslaagd' },
  passed_lower: { color: 'text-amber-700', bgColor: 'bg-amber-50 border-amber-200', label: 'Geslaagd op lager niveau' },
  passed_attempted: { color: 'text-green-700', bgColor: 'bg-green-50 border-green-200', label: 'Geslaagd!' },
  passed_higher: { color: 'text-purple-700', bgColor: 'bg-purple-50 border-purple-200', label: 'Uitstekend!' },
};

export default function TestAttemptPage() {
  const params = useParams();
  const router = useRouter();
  const attemptId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState<SkillTestAttemptFull | null>(null);
  const [questions, setQuestions] = useState<SkillTestQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  // Result state
  const [result, setResult] = useState<{
    scorePercent: number;
    outcome: SkillTestOutcome;
    attemptedLevel: ProficiencyLevel;
    achievedLevel: ProficiencyLevel | null;
    perQuestion: SkillTestPerQuestion[];
  } | null>(null);

  // Fetch attempt data
  useEffect(() => {
    const fetchAttempt = async () => {
      try {
        const res = await api.get<SkillTestAttemptResponse>(`/tests/attempts/${attemptId}`);
        setAttempt(res.attempt);
        setQuestions(res.questions);

        // If already submitted, we need to fetch results separately or they come with the attempt
        if (res.attempt.status === 'submitted' && res.attempt.outcome) {
          // Fetch full results
          const resultRes = await api.get<SkillTestSubmitFullResponse>(`/tests/attempts/${attemptId}/result`);
          setResult({
            scorePercent: resultRes.scorePercent,
            outcome: resultRes.outcome,
            attemptedLevel: resultRes.attemptedLevel,
            achievedLevel: res.attempt.achievedLevel,
            perQuestion: resultRes.perQuestion,
          });
        }
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError('Er ging iets mis bij het laden van de test.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAttempt();
  }, [attemptId]);

  // Timer countdown
  useEffect(() => {
    if (!attempt || attempt.status !== 'in_progress') return;

    const deadline = new Date(attempt.deadlineAt).getTime();

    const updateTimer = () => {
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((deadline - now) / 1000));
      setTimeLeft(remaining);

      if (remaining === 0) {
        handleSubmit();
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [attempt]);

  const handleSubmit = useCallback(async () => {
    if (submitting) return;
    setSubmitting(true);

    try {
      const res = await api.post<SkillTestSubmitFullResponse>(`/tests/attempts/${attemptId}/submit`, {
        answers,
      });

      setAttempt((prev) => prev ? { ...prev, status: 'submitted' } : null);
      setResult({
        scorePercent: res.scorePercent,
        outcome: res.outcome,
        attemptedLevel: res.attemptedLevel,
        achievedLevel: res.attempt.achievedLevel,
        perQuestion: res.perQuestion,
      });
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Er ging iets mis bij het verzenden.');
      }
    } finally {
      setSubmitting(false);
    }
  }, [attemptId, answers, submitting]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const selectAnswer = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const goToQuestion = (index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentIndex(index);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4">
        <Skeleton className="h-8 w-64 mb-4" />
        <Skeleton className="h-4 w-full mb-8" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  // Error state
  if (error && !attempt) {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="py-8 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button asChild variant="outline">
              <Link href="/dashboard/profile/skills">Terug naar skills</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!attempt) return null;

  // Modus C: Abandoned/Expired
  if (attempt.status === 'abandoned' || attempt.status === 'expired') {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4">
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="py-8 text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-amber-800 mb-2">Test verlopen</h2>
            <p className="text-amber-700 mb-6">
              Deze test is verlopen. Je kunt een nieuwe poging starten.
            </p>
            <Button asChild>
              <Link href={`/dashboard/profile/test/${attempt.skillId}`}>Nieuwe test starten</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Modus B: Submitted (Result)
  if (attempt.status === 'submitted' && result) {
    const config = outcomeConfig[result.outcome];
    const passed = result.outcome !== 'failed';

    return (
      <div className="max-w-3xl mx-auto py-8 px-4">
        <div className="mb-6">
          <Link href="/dashboard/profile/skills" className="text-sm text-gray-500 hover:text-gray-700">
            &larr; Terug naar skills
          </Link>
        </div>

        {/* Result card */}
        <Card className={`mb-6 ${config.bgColor}`}>
          <CardContent className="py-8 text-center">
            <div className={`text-6xl font-bold ${config.color} mb-2`}>
              {result.scorePercent}%
            </div>
            <div className={`text-xl font-semibold ${config.color} mb-2`}>
              {config.label}
            </div>
            <p className="text-gray-600">
              {result.outcome === 'failed' && (
                <>Je hebt het {levelLabels[result.attemptedLevel]} niveau niet behaald.</>
              )}
              {result.outcome === 'passed_lower' && result.achievedLevel && (
                <>Je behaalde het {levelLabels[result.achievedLevel]} niveau (een niveau lager dan geprobeerd).</>
              )}
              {result.outcome === 'passed_attempted' && (
                <>Je hebt het {levelLabels[result.attemptedLevel]} niveau behaald!</>
              )}
              {result.outcome === 'passed_higher' && result.achievedLevel && (
                <>Je behaalde het {levelLabels[result.achievedLevel]} niveau - een niveau hoger dan geprobeerd!</>
              )}
            </p>
            <div className="mt-4">
              <Badge variant="secondary">{attempt.skillName}</Badge>
              <Badge variant="outline" className="ml-2">{attempt.sectorName}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Per question breakdown */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Vraag voor vraag</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {result.perQuestion.map((q, index) => (
                <div
                  key={q.questionId}
                  className={`p-4 rounded-lg border ${q.isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${q.isCorrect ? 'bg-green-500' : 'bg-red-500'} text-white text-sm`}>
                      {q.isCorrect ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 mb-2">
                        {index + 1}. {q.questionText}
                      </p>
                      {q.selectedOptionText ? (
                        <p className={`text-sm ${q.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                          Jouw antwoord: {q.selectedOptionText}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-500">Niet beantwoord</p>
                      )}
                      {!q.isCorrect && (
                        <p className="text-sm text-green-700 mt-1">
                          Correct: {q.correctOptionText}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="outline">
            <Link href="/dashboard/profile/skills">Naar mijn skills</Link>
          </Button>
          {passed && (
            <Button asChild>
              <Link href="/dashboard/matches">Naar matches</Link>
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Modus A: In Progress
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const allAnswered = answeredCount === totalQuestions;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {/* Header with timer and progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <Badge variant="secondary">{attempt.skillName}</Badge>
            <Badge variant="outline" className="ml-2">{levelLabels[attempt.attemptedLevel]}</Badge>
          </div>
          {timeLeft !== null && (
            <div className={`font-mono text-lg font-semibold ${timeLeft < 60 ? 'text-red-600' : timeLeft < 180 ? 'text-amber-600' : 'text-gray-700'}`}>
              {formatTime(timeLeft)}
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Progress value={((currentIndex + 1) / totalQuestions) * 100} className="flex-1" />
          <span className="text-sm text-gray-500 whitespace-nowrap">
            Vraag {currentIndex + 1} van {totalQuestions}
          </span>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Question card */}
      <Card className="mb-6">
        <CardContent className="py-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            {currentQuestion.text}
          </h2>
          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = answers[currentQuestion.id] === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => selectAnswer(currentQuestion.id, option.id)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                    isSelected
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-primary' : 'border-gray-300'
                    }`}>
                      {isSelected && (
                        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                      )}
                    </div>
                    <span className="text-gray-900">{option.text}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => goToQuestion(currentIndex - 1)}
          disabled={currentIndex === 0}
        >
          &larr; Vorige
        </Button>

        <div className="flex gap-1">
          {questions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToQuestion(idx)}
              className={`w-3 h-3 rounded-full transition-colors ${
                idx === currentIndex
                  ? 'bg-primary'
                  : answers[questions[idx].id]
                  ? 'bg-green-500'
                  : 'bg-gray-300'
              }`}
              title={`Vraag ${idx + 1}`}
            />
          ))}
        </div>

        {isLastQuestion ? (
          <Button
            onClick={handleSubmit}
            disabled={submitting || !allAnswered}
          >
            {submitting ? 'Verzenden...' : 'Verzenden'}
          </Button>
        ) : (
          <Button
            onClick={() => goToQuestion(currentIndex + 1)}
          >
            Volgende &rarr;
          </Button>
        )}
      </div>

      {/* Unanswered warning */}
      {isLastQuestion && !allAnswered && (
        <p className="text-center text-sm text-amber-600 mt-4">
          Je hebt nog {totalQuestions - answeredCount} {totalQuestions - answeredCount === 1 ? 'vraag' : 'vragen'} niet beantwoord.
        </p>
      )}
    </div>
  );
}
