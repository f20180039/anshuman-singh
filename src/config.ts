/**
 * Application Configuration
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const APP_CONFIG = {
  apiTimeout: 30000, // 30 seconds
  maxMessageLength: 500,
  maxConversationHistory: 6, // Keep last 3 pairs
} as const;
