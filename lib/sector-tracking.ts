import { api } from '@/lib/api-client';

const STORAGE_KEY = 'jobhulp:recent-sectors';
const MAX_TRACKED = 5;

export interface TrackedSector {
  sectorId: string;
  clickedAt: number; // epoch ms
}

/**
 * Records a sector click. For logged-in users it also notifies the server.
 * - localStorage is updated unconditionally (so feed-personalisation works
 *   even before auth-context loads)
 * - server call is fire-and-forget; never blocks the user's navigation
 */
export async function trackSectorClick(
  sectorId: string,
  isLoggedIn: boolean
): Promise<void> {
  // Update local storage first (synchronous, never fails)
  try {
    const existing = readTrackedSectors();
    // Remove any prior entry for this sector — we want the freshest
    const filtered = existing.filter((s) => s.sectorId !== sectorId);
    const updated = [{ sectorId, clickedAt: Date.now() }, ...filtered].slice(
      0,
      MAX_TRACKED
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // localStorage can be disabled (Safari private mode, browser settings)
    // — we silently degrade. Personalisation just won't work.
  }

  // Fire-and-forget server call for logged-in users
  if (isLoggedIn) {
    void api.post('/homepage/sector-click', { sectorId }).catch(() => {
      // Silent — tracking is non-critical
    });
  }
}

/**
 * Returns the recent sector IDs as a CSV string suitable for the feed query.
 * Drops entries older than 90 days. Empty string if none.
 */
export function getRecentSectorsParam(): string {
  const items = readTrackedSectors();
  const cutoff = Date.now() - 90 * 24 * 60 * 60 * 1000;
  return items
    .filter((s) => s.clickedAt >= cutoff)
    .map((s) => s.sectorId)
    .join(',');
}

function readTrackedSectors(): TrackedSector[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (x): x is TrackedSector =>
        typeof x === 'object' &&
        x !== null &&
        typeof x.sectorId === 'string' &&
        typeof x.clickedAt === 'number'
    );
  } catch {
    return [];
  }
}

/**
 * Stable-random seed for anonymous users — generated once per browser session,
 * persisted in sessionStorage so refreshes don't reshuffle the feed but a new
 * tab/window does. Used as the `seed` query param on /homepage/feed.
 */
const SEED_KEY = 'jobhulp:feed-seed';
export function getFeedSeed(): string {
  if (typeof window === 'undefined') return '';
  try {
    let seed = sessionStorage.getItem(SEED_KEY);
    if (!seed) {
      seed = crypto.randomUUID();
      sessionStorage.setItem(SEED_KEY, seed);
    }
    return seed;
  } catch {
    // Fallback — no caching, true random each render
    return '';
  }
}
