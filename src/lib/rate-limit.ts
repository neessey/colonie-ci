// lib/rate-limit.ts
import { NextResponse } from "next/server";

const rateLimit = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT = 10; // Nombre max de requêtes
const WINDOW = 60 * 1000; // 1 minute

export function rateLimitMiddleware(ip: string) {
  const now = Date.now();
  const record = rateLimit.get(ip);
  
  if (!record) {
    rateLimit.set(ip, { count: 1, timestamp: now });
    return true;
  }
  
  if (now - record.timestamp > WINDOW) {
    rateLimit.set(ip, { count: 1, timestamp: now });
    return true;
  }
  
  if (record.count >= RATE_LIMIT) {
    return false;
  }
  
  record.count++;
  rateLimit.set(ip, record);
  return true;
}