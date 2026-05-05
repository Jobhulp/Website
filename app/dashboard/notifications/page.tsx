'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api-client';
import type { Notification, NotificationType } from '@/types/api';
import {
  Bell,
  Eye,
  HeartHandshake,
  MessageSquare,
  Unlock,
  BadgeCheck,
  BadgeX,
  Brain,
  Clock,
  Archive,
  FileText,
  Mail,
  Settings,
} from 'lucide-react';

// Map notification types to icons
const typeIcons: Record<NotificationType, React.ElementType> = {
  employer_showed_interest: Eye,
  candidate_showed_interest: Eye,
  mutual_interest: HeartHandshake,
  chat_first_message_received: MessageSquare,
  chat_unlocked: Unlock,
  employer_test_passed: BadgeCheck,
  employer_test_failed: BadgeX,
  personality_test_completed: Brain,
  job_closing_soon: Clock,
  job_auto_closed: Archive,
  profile_incomplete_reminder: FileText,
};

// Extract path from full URL for next/link
function extractLinkPath(linkUrl: string | null): string | null {
  if (!linkUrl) return null;
  try {
    const u = new URL(linkUrl);
    return u.pathname + u.search;
  } catch {
    return linkUrl.startsWith('/') ? linkUrl : null;
  }
}

// Format full date time in Dutch
function formatFullDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('nl-BE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

type FilterTab = 'all' | 'unread';

export default function NotificationsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<FilterTab>('all');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [markingAllRead, setMarkingAllRead] = useState(false);

  // Fetch notifications
  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const query = filter === 'unread' ? '?onlyUnread=true&limit=100' : '?limit=100';
      const res = await api.get<{ notifications: Notification[] }>(`/notifications${query}`);
      setNotifications(res.notifications);
    } catch {
      // Silent fail
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Handle notification click
  const handleNotificationClick = async (notification: Notification) => {
    // Optimistic update if unread
    if (!notification.readAt) {
      setNotifications((prev) =>
        prev.map((item) =>
          item.id === notification.id ? { ...item, readAt: new Date().toISOString() } : item
        )
      );

      // Mark as read on server (silent)
      api.patch(`/notifications/${notification.id}/read`).catch(() => {});
    }

    // Navigate
    const path = extractLinkPath(notification.linkUrl);
    if (path) {
      router.push(path);
    }
  };

  // Mark all as read
  const handleMarkAllRead = async () => {
    setMarkingAllRead(true);
    try {
      await api.patch<{ markedCount: number }>('/notifications/read-all');
      // Update local state
      setNotifications((prev) =>
        prev.map((item) => ({ ...item, readAt: item.readAt || new Date().toISOString() }))
      );
    } catch {
      // Silent fail
    } finally {
      setMarkingAllRead(false);
    }
  };

  const hasUnread = notifications.some((n) => !n.readAt);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Meldingen</h1>
            <p className="text-sm text-gray-600">
              Activiteit van werkgevers, kandidaten en het systeem.
            </p>
          </div>

          <Link href="/dashboard/notifications/preferences">
            <Button variant="outline" size="sm" className="gap-2">
              <Settings className="h-4 w-4" />
              Voorkeuren
            </Button>
          </Link>
        </div>

        {/* Filters and actions */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex rounded-lg border bg-gray-50 p-1">
            <button
              onClick={() => setFilter('all')}
              className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Alle
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                filter === 'unread'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Ongelezen
            </button>
          </div>

          {/* Mark all read */}
          {hasUnread && filter === 'all' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllRead}
              disabled={markingAllRead}
            >
              {markingAllRead ? 'Bezig...' : 'Alles gelezen markeren'}
            </Button>
          )}
        </div>
      </div>

      {/* Notifications list */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Card key={i}>
              <CardContent className="flex items-start gap-4 p-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Bell className="mb-4 h-12 w-12 text-gray-300" />
            <p className="text-gray-500">
              {filter === 'unread' ? 'Geen ongelezen meldingen.' : 'Nog geen meldingen.'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => {
            const Icon = typeIcons[notification.type] || Bell;
            const isUnread = !notification.readAt;

            return (
              <Card
                key={notification.id}
                className={`cursor-pointer transition-colors hover:bg-gray-50 ${
                  isUnread ? 'border-blue-200 bg-blue-50/50' : ''
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <CardContent className="flex items-start gap-4 p-4">
                  {/* Icon */}
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                      isUnread ? 'bg-blue-100' : 'bg-gray-100'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isUnread ? 'text-blue-600' : 'text-gray-600'}`} />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm ${isUnread ? 'font-semibold' : 'font-medium'}`}>
                        {notification.title}
                      </p>
                      {isUnread && (
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                      )}
                    </div>

                    {notification.body && (
                      <p className="mt-1 text-sm text-gray-600">{notification.body}</p>
                    )}

                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400">
                      <span>{formatFullDateTime(notification.createdAt)}</span>

                      {notification.emailSentAt && (
                        <span className="flex items-center gap-1 text-gray-500">
                          <Mail className="h-3 w-3" />
                          Ook per e-mail verzonden
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
