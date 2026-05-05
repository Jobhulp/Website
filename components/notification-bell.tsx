'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
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

// Format relative time in Dutch
function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Zojuist';
  if (diffMins < 60) return `${diffMins} min geleden`;
  if (diffHours < 24) return `${diffHours} uur geleden`;
  if (diffDays < 7) return `${diffDays} dag${diffDays > 1 ? 'en' : ''} geleden`;
  return date.toLocaleDateString('nl-BE');
}

export function NotificationBell() {
  const router = useRouter();
  const [unread, setUnread] = useState(0);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch unread count
  const fetchUnreadCount = useCallback(async () => {
    try {
      const res = await api.get<{ count: number }>('/notifications/unread-count');
      setUnread(res.count);
    } catch {
      // Silent fail
    }
  }, []);

  // Fetch notifications list
  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get<{ notifications: Notification[] }>('/notifications?limit=20');
      setItems(res.notifications);
    } catch {
      // Silent fail
    } finally {
      setLoading(false);
    }
  }, []);

  // Poll unread count every 30 seconds
  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, [fetchUnreadCount]);

  // Fetch notifications when dropdown opens
  useEffect(() => {
    if (open) {
      fetchNotifications();
    }
  }, [open, fetchNotifications]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;

    const handleMouseDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener('mousedown', handleMouseDown);
    return () => window.removeEventListener('mousedown', handleMouseDown);
  }, [open]);

  // Handle notification click
  const handleNotificationClick = async (notification: Notification) => {
    // Optimistic update if unread
    if (!notification.readAt) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === notification.id ? { ...item, readAt: new Date().toISOString() } : item
        )
      );
      setUnread((prev) => Math.max(0, prev - 1));

      // Mark as read on server (silent)
      api.patch(`/notifications/${notification.id}/read`).catch(() => {});
    }

    // Close dropdown
    setOpen(false);

    // Navigate
    const path = extractLinkPath(notification.linkUrl);
    if (path) {
      router.push(path);
    }
  };

  // Mark all as read
  const handleMarkAllRead = async () => {
    // Optimistic update
    setItems((prev) =>
      prev.map((item) => ({ ...item, readAt: item.readAt || new Date().toISOString() }))
    );
    setUnread(0);

    // Server call (silent)
    api.patch('/notifications/read-all').catch(() => {});
  };

  const hasUnreadItems = items.some((item) => !item.readAt);

  return (
    <div ref={containerRef} className="relative">
      {/* Bell button */}
      <Button
        variant="ghost"
        size="sm"
        className="relative h-8 w-8 p-0"
        aria-label="Notificaties"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Bell className="h-[18px] w-[18px]" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-medium text-white">
            {unread > 99 ? '99+' : unread}
          </span>
        )}
      </Button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-lg border bg-white shadow-lg sm:w-96">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h3 className="font-semibold">Meldingen</h3>
            {hasUnreadItems && (
              <button
                onClick={handleMarkAllRead}
                className="text-sm text-blue-600 hover:underline"
              >
                Alles markeren als gelezen
              </button>
            )}
          </div>

          {/* Body */}
          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <div className="py-8 text-center text-sm text-gray-500">Laden...</div>
            ) : items.length === 0 ? (
              <div className="py-8 text-center text-sm text-gray-500">Nog geen meldingen.</div>
            ) : (
              <ul>
                {items.map((notification) => {
                  const Icon = typeIcons[notification.type] || Bell;
                  const isUnread = !notification.readAt;

                  return (
                    <li key={notification.id}>
                      <button
                        onClick={() => handleNotificationClick(notification)}
                        className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50 ${
                          isUnread ? 'bg-blue-50' : ''
                        }`}
                      >
                        {/* Icon */}
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100">
                          <Icon className="h-4 w-4 text-gray-600" />
                        </div>

                        {/* Content */}
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                          {notification.body && (
                            <p className="mt-0.5 line-clamp-2 text-xs text-gray-500">
                              {notification.body}
                            </p>
                          )}
                          <p className="mt-1 text-xs text-gray-400">
                            {formatRelativeTime(notification.createdAt)}
                          </p>
                        </div>

                        {/* Unread indicator */}
                        {isUnread && (
                          <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Footer */}
          <div className="border-t px-4 py-3">
            <Link
              href="/dashboard/notifications"
              className="block text-center text-sm text-blue-600 hover:underline"
              onClick={() => setOpen(false)}
            >
              Alle meldingen bekijken
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
