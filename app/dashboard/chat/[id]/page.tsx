'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { api, ApiError } from '@/lib/api-client';
import type { ChatRoomDetailView, ChatMessage, ChatPollResponse } from '@/types/api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function ChatDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const roomId = params.id as string;

  const [roomView, setRoomView] = useState<ChatRoomDetailView | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [messageBody, setMessageBody] = useState('');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const [archiving, setArchiving] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastMsgIsoRef = useRef<string | null>(null);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Determine if I am candidate or employer
  const mySide = roomView?.counterpart.side === 'candidate' ? 'employer' : 'candidate';

  // Fetch initial room data
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        const res = await api.get<ChatRoomDetailView>(`/chat/rooms/${roomId}`);
        setRoomView(res);
        setMessages(res.messages);
        if (res.messages.length > 0) {
          lastMsgIsoRef.current = res.messages[res.messages.length - 1].createdAt;
        }
        // Mark as read
        api.patch(`/chat/rooms/${roomId}/read`).catch(() => {});
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError('Er ging iets mis bij het laden van de chat.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  // Polling for new messages
  useEffect(() => {
    if (!roomView || roomView.room.status === 'archived') return;

    const poll = async () => {
      if (!lastMsgIsoRef.current) return;
      try {
        const res = await api.get<ChatPollResponse>(
          `/chat/rooms/${roomId}/poll?since=${encodeURIComponent(lastMsgIsoRef.current)}`
        );
        if (res.messages.length > 0) {
          setMessages((prev) => {
            const existingIds = new Set(prev.map((m) => m.id));
            const newMessages = res.messages.filter((m) => !existingIds.has(m.id));
            return [...prev, ...newMessages];
          });
          lastMsgIsoRef.current = res.messages[res.messages.length - 1].createdAt;
          // Mark as read
          api.patch(`/chat/rooms/${roomId}/read`).catch(() => {});
        }
        // Update room state (gating may have changed)
        setRoomView((prev) => (prev ? { ...prev, room: res.room } : prev));
      } catch {
        // Silent fail on poll
      }
    };

    pollIntervalRef.current = setInterval(poll, 5000);

    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, [roomId, roomView?.room.status]);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send message
  const handleSend = useCallback(async () => {
    if (!messageBody.trim() || sending || !roomView) return;
    if (roomView.room.status !== 'open') return;

    setSending(true);
    setSendError(null);

    try {
      const res = await api.post<{ message: ChatMessage }>(`/chat/rooms/${roomId}/messages`, {
        body: messageBody.trim(),
      });
      setMessages((prev) => [...prev, res.message]);
      lastMsgIsoRef.current = res.message.createdAt;
      setMessageBody('');
    } catch (err) {
      if (err instanceof ApiError) {
        setSendError(err.message);
      } else {
        setSendError('Bericht kon niet verzonden worden.');
      }
    } finally {
      setSending(false);
    }
  }, [messageBody, sending, roomId, roomView]);

  // Handle keyboard
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Archive chat
  const handleArchive = async () => {
    setArchiving(true);
    try {
      await api.delete(`/chat/rooms/${roomId}`);
      setRoomView((prev) =>
        prev ? { ...prev, room: { ...prev.room, status: 'archived' } } : prev
      );
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      }
    } finally {
      setArchiving(false);
    }
  };

  // Format time
  const formatTime = (iso: string) => {
    return new Date(iso).toLocaleTimeString('nl-BE', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Format date separator
  const formatDate = (iso: string) => {
    const date = new Date(iso);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Vandaag';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Gisteren';
    }
    return date.toLocaleDateString('nl-BE', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  // Check if message is read by counterpart
  const isReadByCounterpart = (msg: ChatMessage) => {
    if (mySide === 'candidate') {
      return !!msg.readByEmployerAt;
    }
    return !!msg.readByCandidateAt;
  };

  // Group messages by date
  const groupedMessages: { date: string; messages: ChatMessage[] }[] = [];
  let currentDate = '';
  messages.forEach((msg) => {
    const msgDate = new Date(msg.createdAt).toDateString();
    if (msgDate !== currentDate) {
      currentDate = msgDate;
      groupedMessages.push({ date: msg.createdAt, messages: [msg] });
    } else {
      groupedMessages[groupedMessages.length - 1].messages.push(msg);
    }
  });

  if (loading) {
    return (
      <div className="flex flex-col h-[calc(100vh-8rem)]">
        <div className="p-4 border-b">
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="p-4 border-b">
          <Skeleton className="h-10 w-48" />
        </div>
        <div className="flex-1 p-4">
          <Skeleton className="h-16 w-3/4 mb-4" />
          <Skeleton className="h-16 w-1/2 ml-auto mb-4" />
          <Skeleton className="h-16 w-2/3 mb-4" />
        </div>
      </div>
    );
  }

  if (error && !roomView) {
    return (
      <div className="p-6">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="py-6">
            <p className="text-red-600 mb-4">{error}</p>
            <Button variant="outline" asChild>
              <Link href="/dashboard/chat">Terug naar berichten</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!roomView) return null;

  const { room, counterpart, job, gating } = roomView;
  const isLocked = room.status === 'locked';
  const isArchived = room.status === 'archived';

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header bar */}
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <Link
          href="/dashboard/chat"
          className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Berichten
        </Link>

        {!isArchived && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" disabled={archiving}>
                Archiveer
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Chat archiveren?</AlertDialogTitle>
                <AlertDialogDescription>
                  Je kunt geen nieuwe berichten meer versturen na het archiveren. De chat blijft
                  zichtbaar in je berichtenlijst.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuleren</AlertDialogCancel>
                <AlertDialogAction onClick={handleArchive}>Archiveren</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      {/* Chat header */}
      <div className="flex items-center gap-3 p-4 border-b bg-gray-50">
        {counterpart.avatarUrl ? (
          <img
            src={counterpart.avatarUrl}
            alt={counterpart.displayName}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-medium">
            {counterpart.displayName.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <p className="font-medium">{counterpart.displayName}</p>
          <p className="text-sm text-gray-600">{job.title}</p>
        </div>
      </div>

      {/* Gating banner */}
      {isLocked && (
        <Card className="m-4 border-amber-200 bg-amber-50">
          <CardContent className="py-4">
            <p className="font-medium text-amber-800 mb-2">
              Chat is geblokkeerd door openstaande toetsen
            </p>
            {gating.pendingTests.length > 0 && (
              <div className="mb-2">
                <p className="text-sm text-amber-700 mb-1">Nog te maken toetsen:</p>
                <ul className="list-disc list-inside text-sm">
                  {gating.pendingTests.map((test) => (
                    <li key={test.employerSkillTestId}>
                      <Link
                        href={`/dashboard/profile/test/employer/${test.employerSkillTestId}`}
                        className="text-blue-600 hover:underline"
                      >
                        {test.title} ({test.skillName})
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {gating.failedTests.length > 0 && (
              <div>
                <p className="text-sm text-amber-700 mb-1">Niet geslaagde toetsen:</p>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {gating.failedTests.map((test) => (
                    <li key={test.employerSkillTestId}>
                      {test.title} ({test.skillName})
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-500 mt-1">
                  De werkgever kan beslissen of een tweede poging mogelijk is.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {groupedMessages.map((group, groupIndex) => (
          <div key={groupIndex}>
            {/* Date separator */}
            <div className="flex items-center justify-center my-4">
              <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {formatDate(group.date)}
              </span>
            </div>

            {/* Messages in group */}
            {group.messages.map((msg) => {
              const isOwn = msg.senderUserId === user?.id;
              const isSystem = msg.senderSide === 'system';

              if (isSystem) {
                return (
                  <div key={msg.id} className="flex justify-center my-3">
                    <p className="text-sm text-gray-500 italic">{msg.body}</p>
                  </div>
                );
              }

              return (
                <div
                  key={msg.id}
                  className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[75%] ${isOwn ? 'order-2' : ''}`}>
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        isOwn
                          ? 'bg-blue-600 text-white rounded-br-md'
                          : 'bg-white border border-gray-200 rounded-bl-md'
                      }`}
                    >
                      <p className="whitespace-pre-wrap break-words">{msg.body}</p>
                    </div>
                    <div
                      className={`flex items-center gap-1 mt-1 ${
                        isOwn ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <span className="text-xs text-gray-400">{formatTime(msg.createdAt)}</span>
                      {isOwn && (
                        <span className="text-xs text-gray-400">
                          {isReadByCounterpart(msg) ? (
                            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                            </svg>
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Nog geen berichten. Start het gesprek!</p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Composer */}
      <div className="border-t bg-white p-4">
        {isArchived ? (
          <Card className="bg-gray-50">
            <CardContent className="py-3 text-center">
              <p className="text-sm text-gray-600">Deze chat is gearchiveerd.</p>
            </CardContent>
          </Card>
        ) : isLocked ? (
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="py-3 text-center">
              <p className="text-sm text-amber-700">
                Berichten kunnen pas verzonden worden zodra alle toetsen geslaagd zijn.
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            {sendError && (
              <div className="mb-2 p-2 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{sendError}</p>
              </div>
            )}
            <div className="flex gap-2">
              <Textarea
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value.slice(0, 4000))}
                onKeyDown={handleKeyDown}
                placeholder="Typ een bericht..."
                className="flex-1 min-h-[44px] max-h-32 resize-none"
                rows={1}
              />
              <Button onClick={handleSend} disabled={!messageBody.trim() || sending}>
                {sending ? (
                  <svg
                    className="w-5 h-5 animate-spin"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                ) : (
                  'Verzenden'
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {messageBody.length}/4000 - Enter om te verzenden, Shift+Enter voor nieuwe regel
            </p>
          </>
        )}
      </div>
    </div>
  );
}
