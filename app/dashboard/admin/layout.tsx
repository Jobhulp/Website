'use client';

export const dynamic = 'force-dynamic';

import { type ReactNode } from 'react';
import { AdminGuard } from '@/components/admin-guard';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return <AdminGuard>{children}</AdminGuard>;
}
