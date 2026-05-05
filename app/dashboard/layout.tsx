'use client';

export const dynamic = 'force-dynamic';

import { ReactNode } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { NotificationBell } from '@/components/notification-bell';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user } = useAuth();

  // Safeguard: middleware should have redirected, but just in case
  if (!user) {
    return null;
  }

  return (
    <>
      {/* Dashboard notification bar - sits above existing layout content */}
      <div className="sticky top-0 z-50 h-12 bg-white border-b border-gray-200">
        <div className="h-full max-w-7xl mx-auto px-4 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
          >
            Dashboard
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 hidden sm:inline">
              {user.email}
            </span>
            <NotificationBell />
          </div>
        </div>
      </div>

      {/* Page content */}
      {children}
    </>
  );
}
