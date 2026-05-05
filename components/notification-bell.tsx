'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

// Placeholder component - will be implemented later with full functionality
export function NotificationBell() {
  const [hasUnread] = useState(true); // Will be dynamic later

  return (
    <Button
      variant="ghost"
      size="sm"
      className="relative h-8 w-8 p-0"
      aria-label="Notificaties"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </svg>
      {hasUnread && (
        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
      )}
    </Button>
  );
}
