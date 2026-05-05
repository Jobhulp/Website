'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api-client';
import type { AdminUserListItem, PaginatedResult, UserType } from '@/types/api';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select-shadcn';
import { ChevronLeft } from 'lucide-react';

const PAGE_SIZE = 50;

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function AdminUsersPage() {
  // Filters
  const [search, setSearch] = useState('');
  const [userTypeFilter, setUserTypeFilter] = useState<'all' | UserType>('all');
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const [offset, setOffset] = useState(0);

  // Data
  const [data, setData] = useState<PaginatedResult<AdminUserListItem> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebounce(search, 300);

  // Reset offset when filters change
  useEffect(() => {
    setOffset(0);
  }, [debouncedSearch, userTypeFilter, includeDeleted]);

  // Fetch users
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.set('limit', PAGE_SIZE.toString());
      params.set('offset', offset.toString());
      if (debouncedSearch) params.set('search', debouncedSearch);
      if (userTypeFilter !== 'all') params.set('userType', userTypeFilter);
      if (includeDeleted) params.set('includeDeleted', 'true');

      const res = await api.get<PaginatedResult<AdminUserListItem>>(
        `/admin/users?${params.toString()}`
      );
      setData(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Er ging iets mis');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, userTypeFilter, includeDeleted, offset]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const startIndex = offset + 1;
  const endIndex = Math.min(offset + PAGE_SIZE, data?.total ?? 0);
  const hasMore = data ? offset + PAGE_SIZE < data.total : false;
  const hasPrev = offset > 0;

  function getStatusBadge(u: AdminUserListItem) {
    if (u.deletedAt) {
      return <Badge variant="destructive">Verwijderd</Badge>;
    }
    if (!u.isActive) {
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Gedeactiveerd</Badge>;
    }
    if (!u.isVerified) {
      return <Badge variant="secondary">Onbevestigd</Badge>;
    }
    return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Actief</Badge>;
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      {/* Back link */}
      <Link
        href="/dashboard/admin"
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Beheer
      </Link>

      <h1 className="text-2xl font-bold mb-6">Gebruikers</h1>

      {/* Filter bar */}
      <Card className="mb-6">
        <CardContent className="py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="search"
                placeholder="Zoeken op e-mail, naam of bedrijf..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-48">
              <Select
                value={userTypeFilter}
                onValueChange={(val) => setUserTypeFilter(val as 'all' | UserType)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Alle types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle types</SelectItem>
                  <SelectItem value="candidate">Kandidaat</SelectItem>
                  <SelectItem value="employer">Werkgever</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="includeDeleted"
                checked={includeDeleted}
                onCheckedChange={(checked) => setIncludeDeleted(checked === true)}
              />
              <Label htmlFor="includeDeleted" className="text-sm cursor-pointer">
                Toon verwijderde
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Naam</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">E-mail</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Aangemaakt</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  // Loading skeletons
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-b">
                      <td className="py-3 px-4"><Skeleton className="h-5 w-32" /></td>
                      <td className="py-3 px-4"><Skeleton className="h-5 w-48" /></td>
                      <td className="py-3 px-4"><Skeleton className="h-5 w-20" /></td>
                      <td className="py-3 px-4"><Skeleton className="h-5 w-24" /></td>
                      <td className="py-3 px-4"><Skeleton className="h-5 w-24" /></td>
                    </tr>
                  ))
                ) : data?.items.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-gray-500">
                      Geen gebruikers gevonden.
                    </td>
                  </tr>
                ) : (
                  data?.items.map((u) => (
                    <tr key={u.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <Link
                          href={`/dashboard/admin/users/${u.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          {u.displayName || <em className="text-gray-400">geen naam</em>}
                        </Link>
                        {u.isAdmin && (
                          <Badge className="ml-2 bg-purple-100 text-purple-800 hover:bg-purple-100 text-xs">
                            ADMIN
                          </Badge>
                        )}
                      </td>
                      <td className="py-3 px-4 text-gray-700">{u.email}</td>
                      <td className="py-3 px-4">
                        {u.userType === 'candidate' ? 'Kandidaat' : 'Werkgever'}
                      </td>
                      <td className="py-3 px-4">{getStatusBadge(u)}</td>
                      <td className="py-3 px-4 text-gray-600 text-sm">
                        {new Date(u.createdAt).toLocaleDateString('nl-BE')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      {data && data.total > 0 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-600">
            {startIndex}-{endIndex} van {data.total}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={!hasPrev}
              onClick={() => setOffset((prev) => Math.max(0, prev - PAGE_SIZE))}
            >
              Vorige
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={!hasMore}
              onClick={() => setOffset((prev) => prev + PAGE_SIZE)}
            >
              Volgende
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
