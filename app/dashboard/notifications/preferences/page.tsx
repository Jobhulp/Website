'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { api, ApiError } from '@/lib/api-client';
import type { NotificationPreferences } from '@/types/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';

// Keys that are boolean preferences (not metadata fields)
type BooleanPreferenceKey = 
  | 'employerInterest'
  | 'candidateInterest'
  | 'mutualInterest'
  | 'chatMessages'
  | 'testResults'
  | 'jobLifecycle'
  | 'profileReminders';

interface PreferenceConfig {
  key: BooleanPreferenceKey;
  title: string;
  description: string;
}

const preferenceConfigs: PreferenceConfig[] = [
  {
    key: 'employerInterest',
    title: 'Werkgever toonde interesse',
    description: 'Een werkgever heeft interesse getoond in jouw profiel.',
  },
  {
    key: 'candidateInterest',
    title: 'Kandidaat toonde interesse',
    description: 'Een kandidaat heeft interesse getoond in een van je vacatures.',
  },
  {
    key: 'mutualInterest',
    title: 'Wederzijdse interesse en chat-status',
    description: 'Beide partijen toonden interesse, of de chat is geopend doordat alle toetsen geslaagd zijn.',
  },
  {
    key: 'chatMessages',
    title: 'Eerste chat-bericht',
    description: 'Wanneer iemand je voor het eerst aanspreekt in een chat.',
  },
  {
    key: 'testResults',
    title: 'Testresultaten',
    description: 'Resultaten van werkgevertoetsen en je eigen persoonlijkheidstest.',
  },
  {
    key: 'jobLifecycle',
    title: 'Vacature-lifecycle',
    description: 'Vacatures die binnenkort sluiten of automatisch gesloten zijn.',
  },
  {
    key: 'profileReminders',
    title: 'Profiel-reminders',
    description: 'Suggesties om je profiel verder aan te vullen.',
  },
];

export default function NotificationPreferencesPage() {
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  useEffect(() => {
    loadPreferences();
  }, []);

  async function loadPreferences() {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get<{ preferences: NotificationPreferences }>('/notifications/preferences');
      setPreferences(res.preferences);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Er ging iets mis bij het laden van je voorkeuren.');
      }
    } finally {
      setLoading(false);
    }
  }

  async function updatePreference<K extends keyof NotificationPreferences>(
    key: K,
    value: NotificationPreferences[K]
  ) {
    if (!preferences) return;

    // Optimistic update
    const previousPreferences = { ...preferences };
    setPreferences({ ...preferences, [key]: value });
    setSaveStatus('saving');

    try {
      const res = await api.patch<{ preferences: NotificationPreferences }>(
        '/notifications/preferences',
        { [key]: value }
      );
      setPreferences(res.preferences);
      setSaveStatus('saved');
      
      // Reset status after 2 seconds
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (err) {
      // Rollback on error
      setPreferences(previousPreferences);
      setSaveStatus('error');
      
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Er ging iets mis bij het opslaan.');
      }
      
      // Reset error status after 3 seconds
      setTimeout(() => {
        setSaveStatus('idle');
        setError(null);
      }, 3000);
    }
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
        <Skeleton className="h-32" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <Link 
          href="/dashboard/notifications" 
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-4"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Meldingen
        </Link>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Voorkeuren voor meldingen</h1>
            <p className="text-gray-600 text-sm mt-1">
              Bepaal welke meldingen je wil ontvangen. Uitgeschakelde types verschijnen niet in je notificatie-feed en triggeren ook geen e-mail.
            </p>
          </div>
          
          {saveStatus === 'saved' && (
            <span className="text-sm text-green-600 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Opgeslagen
            </span>
          )}
          
          {saveStatus === 'saving' && (
            <span className="text-sm text-gray-500">Opslaan...</span>
          )}
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {preferences && (
        <>
          {/* Email master switch */}
          <Card>
            <CardContent className="py-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <Label htmlFor="email-enabled" className="text-base font-medium">
                    E-mailmeldingen
                  </Label>
                  <p className="text-sm text-gray-500">
                    Hoofdschakelaar voor alle e-mailmeldingen. Wanneer uit, krijg je alleen in-app meldingen — kritieke beveiligingsmails (zoals wachtwoord-reset) blijven werken.
                  </p>
                </div>
                <Switch
                  id="email-enabled"
                  checked={preferences.emailEnabled}
                  onCheckedChange={(checked) => updatePreference('emailEnabled', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Per-type toggles */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Meldingstypes</CardTitle>
              <CardDescription>
                Schakel specifieke meldingstypes in of uit.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {preferenceConfigs.map((config) => (
                  <div 
                    key={config.key} 
                    className="flex items-start justify-between gap-4 px-6 py-4"
                  >
                    <div className="space-y-0.5">
                      <Label 
                        htmlFor={config.key} 
                        className="text-sm font-medium cursor-pointer"
                      >
                        {config.title}
                      </Label>
                      <p className="text-xs text-gray-500">
                        {config.description}
                      </p>
                    </div>
                    <Switch
                      id={config.key}
                      checked={preferences[config.key] as boolean}
                      onCheckedChange={(checked) => updatePreference(config.key, checked)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Footer text */}
          <p className="text-xs text-gray-500 text-center px-4">
            Niet alle types triggeren standaard een e-mail. Alleen kritieke events (wederzijdse interesse, eerste chat-bericht, toetsuitslag, automatisch gesloten vacature) krijgen een e-mail. Overige meldingen verschijnen enkel in-app.
          </p>
        </>
      )}
    </div>
  );
}
