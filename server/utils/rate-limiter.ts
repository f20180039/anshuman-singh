/**
 * Rate Limiter Utility
 * Prevents abuse by limiting requests per IP and session
 */

interface RateLimitEntry {
  count: number;
  firstRequest: number;
  lastRequest: number;
}

// In-memory storage (resets on server restart)
const ipLimits = new Map<string, RateLimitEntry>();
const sessionLimits = new Map<string, RateLimitEntry>();

// Configuration
const IP_LIMIT = 5; // messages per hour per IP
const SESSION_LIMIT = 10; // messages total per session
const HOUR_MS = 60 * 60 * 1000;
const COOLDOWN_MS = 60 * 1000; // 1 minute between messages

/**
 * Check if IP is rate limited
 */
export function checkIPRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
  resetIn: number;
} {
  const now = Date.now();
  const entry = ipLimits.get(ip);

  // No entry yet - allow and create
  if (!entry) {
    ipLimits.set(ip, {
      count: 1,
      firstRequest: now,
      lastRequest: now,
    });
    return { allowed: true, remaining: IP_LIMIT - 1, resetIn: HOUR_MS };
  }

  // Check if hour has passed - reset
  if (now - entry.firstRequest >= HOUR_MS) {
    ipLimits.set(ip, {
      count: 1,
      firstRequest: now,
      lastRequest: now,
    });
    return { allowed: true, remaining: IP_LIMIT - 1, resetIn: HOUR_MS };
  }

  // Check cooldown (1 minute between messages)
  if (now - entry.lastRequest < COOLDOWN_MS) {
    const cooldownRemaining = Math.ceil((COOLDOWN_MS - (now - entry.lastRequest)) / 1000);
    return {
      allowed: false,
      remaining: 0,
      resetIn: cooldownRemaining,
    };
  }

  // Check if limit exceeded
  if (entry.count >= IP_LIMIT) {
    const resetIn = Math.ceil((HOUR_MS - (now - entry.firstRequest)) / 1000);
    return { allowed: false, remaining: 0, resetIn };
  }

  // Increment and allow
  entry.count++;
  entry.lastRequest = now;
  ipLimits.set(ip, entry);

  return {
    allowed: true,
    remaining: IP_LIMIT - entry.count,
    resetIn: Math.ceil((HOUR_MS - (now - entry.firstRequest)) / 1000),
  };
}

/**
 * Check if session is rate limited
 */
export function checkSessionRateLimit(sessionId: string): {
  allowed: boolean;
  remaining: number;
} {
  const entry = sessionLimits.get(sessionId);

  // No entry yet - allow and create
  if (!entry) {
    sessionLimits.set(sessionId, {
      count: 1,
      firstRequest: Date.now(),
      lastRequest: Date.now(),
    });
    return { allowed: true, remaining: SESSION_LIMIT - 1 };
  }

  // Check if limit exceeded
  if (entry.count >= SESSION_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  // Increment and allow
  entry.count++;
  entry.lastRequest = Date.now();
  sessionLimits.set(sessionId, entry);

  return { allowed: true, remaining: SESSION_LIMIT - entry.count };
}

/**
 * Clean up old entries (run periodically)
 */
export function cleanupOldEntries() {
  const now = Date.now();

  // Clean IP limits older than 1 hour
  for (const [ip, entry] of ipLimits.entries()) {
    if (now - entry.firstRequest >= HOUR_MS) {
      ipLimits.delete(ip);
    }
  }

  // Clean session limits older than 24 hours
  for (const [sessionId, entry] of sessionLimits.entries()) {
    if (now - entry.firstRequest >= 24 * HOUR_MS) {
      sessionLimits.delete(sessionId);
    }
  }
}

// Run cleanup every 10 minutes
setInterval(cleanupOldEntries, 10 * 60 * 1000);
