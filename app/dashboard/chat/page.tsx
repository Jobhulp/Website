'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api, ApiError } from '@/lib/api-client';
import type { ChatRoomView } from '@/types/api';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Lock, Archive, ChevronLeft, MessageSquare } from 'lucide-react';

function formatRelativeTime(dateString: string | null): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  
  if (diffSec < 60) return 'net';
  if (diffMin < 60) return `${diffMin}m`;
  if (diffHour < 24) return `${diffHour}u`;
  if (diffDay < 7) return `${diffDay}d`;
  
  return date.toLocaleDateString('nl-BE', { day: 'numeric', month: 'short' });
}

function getInitial(name: string): string {
  return name.charAt(0).toUpperCase();
}

export default function ChatRoomsPage() {
  const router = useRouter();
  const [rooms, setRooms] = useState<ChatRoomView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRooms = useCallback(async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      const res = await api.get<{ rooms: ChatRoomView[] }>('/chat/rooms');
      // Sort by lastMessageAt desc
      const sorted = [...res.rooms].sort((a, b) => {
        const aTime = a.room.lastMessageAt ? new Date(a.room.lastMessageAt).getTime() : 0;
        const bTime = b.room.lastMessageAt ? new Date(b.room.lastMessageAt).getTime() : 0;
        return bTime - aTime;
      });
      setRooms(sorted);
      setError(null);
    } catch (err) {
      if (!silent) {
        setError(err instanceof ApiError ? err.message : 'Kon berichten niet laden');
      }
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
    
    // Poll every 10 seconds
    const interval = setInterval(() => {
      fetchRooms(true);
    }, 10000);
    
    return () => clearInterval(interval);
  }, [fetchRooms]);

  const handleRoomClick = (roomId: string) => {
    router.push(`/dashboard/chat/${roomId}`);
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-96 mb-6" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Back link */}
      <Link 
        href="/dashboard" 
        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Dashboard
      </Link>

      {/* Header */}
      <h1 className="text-2xl font-bold mb-1">Berichten</h1>
      <p className="text-sm text-gray-600 mb-6">
        Conversaties die ontstonden uit wederzijdse interesse.
      </p>

      {/* Error */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Rooms list */}
      {rooms.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Nog geen chats</p>
            <p className="text-sm text-gray-500">
              Chats verschijnen hier zodra jij en de werkgever beide interesse hebben getoond.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {rooms.map((roomView) => {
            const { room, counterpart, job, myUnreadCount, gating } = roomView;
            const isLocked = room.status === 'locked';
            const isArchived = room.status === 'archived';
            
            return (
              <Card
                key={room.id}
                className={`cursor-pointer transition-colors hover:bg-gray-50 ${
                  isArchived ? 'opacity-60' : ''
                }`}
                onClick={() => handleRoomClick(room.id)}
              >
                <CardContent className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      {counterpart.avatarUrl ? (
                        <img
                          src={counterpart.avatarUrl}
                          alt={counterpart.displayName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-lg font-semibold text-gray-600">
                            {getInitial(counterpart.displayName)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 truncate">
                          {counterpart.displayName}
                        </span>
                        {isLocked && (
                          <Lock className="w-4 h-4 text-amber-500 flex-shrink-0" />
                        )}
                        {isArchived && (
                          <Badge variant="secondary" className="text-xs flex-shrink-0">
                            Gearchiveerd
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 truncate">
                        {job.title}
                      </p>
                      {room.lastMessagePreview && (
                        <p className="text-sm text-gray-600 truncate mt-0.5">
                          {room.lastMessagePreview}
                        </p>
                      )}
                    </div>

                    {/* Right side: time and unread */}
                    <div className="flex-shrink-0 flex flex-col items-end gap-1">
                      <span className="text-xs text-gray-400">
                        {formatRelativeTime(room.lastMessageAt)}
                      </span>
                      {myUnreadCount > 0 && (
                        <Badge className="bg-blue-500 hover:bg-blue-500 text-white text-xs min-w-[20px] flex items-center justify-center">
                          {myUnreadCount}
                        </Badge>
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
