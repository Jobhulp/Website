'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ProfileCompletenessProps {
  completeness: number;
  compact?: boolean;
}

const suggestions = [
  'Voeg een profielfoto toe',
  'Vul je werkervaring in',
  'Doe de persoonlijkheidstest',
  'Voeg minstens 3 skills toe',
  'Vul je opleiding in',
  'Voeg een korte bio toe',
];

function getProgressColor(value: number): string {
  if (value >= 100) return 'bg-green-500';
  if (value >= 70) return 'bg-blue-500';
  if (value >= 30) return 'bg-amber-500';
  return 'bg-red-500';
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('h-4 w-4', className)}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function ProfileCompleteness({ completeness, compact = false }: ProfileCompletenessProps) {
  const isComplete = completeness >= 100;
  const progressColor = getProgressColor(completeness);

  if (compact) {
    return (
      <Card className={cn(isComplete && 'border-green-200 bg-green-50')}>
        <CardContent className="py-4">
          <div className="flex items-center justify-between mb-2">
            <span className={cn(
              'text-sm font-medium',
              isComplete ? 'text-green-700' : 'text-gray-700'
            )}>
              {isComplete ? (
                <span className="flex items-center gap-1.5">
                  <CheckIcon className="text-green-600" />
                  Je profiel is compleet
                </span>
              ) : (
                `Je profiel is ${completeness}% volledig`
              )}
            </span>
            <span className={cn(
              'text-sm font-semibold',
              isComplete ? 'text-green-600' : 'text-gray-900'
            )}>
              {completeness}%
            </span>
          </div>
          <Progress
            value={completeness}
            className="h-2"
            indicatorClassName={progressColor}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(isComplete && 'border-green-200 bg-green-50')}>
      <CardContent className="py-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className={cn(
            'text-lg font-semibold',
            isComplete ? 'text-green-700' : 'text-gray-900'
          )}>
            {isComplete ? (
              <span className="flex items-center gap-2">
                <CheckIcon className="h-5 w-5 text-green-600" />
                Je profiel is compleet
              </span>
            ) : (
              `Je profiel is ${completeness}% volledig`
            )}
          </h3>
          <span className={cn(
            'text-2xl font-bold',
            isComplete ? 'text-green-600' : 'text-gray-900'
          )}>
            {completeness}%
          </span>
        </div>

        <Progress
          value={completeness}
          className="h-3 mb-4"
          indicatorClassName={progressColor}
        />

        {!isComplete && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-3">
              Tips om je profiel te verbeteren:
            </p>
            <ul className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}

        {isComplete && (
          <p className="text-sm text-green-600 mt-2">
            Geweldig! Je profiel is volledig ingevuld. Werkgevers kunnen je nu vinden.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
