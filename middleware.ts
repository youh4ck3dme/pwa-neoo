import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple in-memory rate limiter for the demo/enterprise setup
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const LIMIT = 100; // requests
const WINDOW = 60 * 1000; // 1 minute

export function middleware(request: NextRequest) {
  const ip = (request as any).ip || request.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
  const now = Date.now();
  
  const record = rateLimitMap.get(ip) ?? { count: 0, lastReset: now };
  
  if (now - record.lastReset > WINDOW) {
    record.count = 0;
    record.lastReset = now;
  }
  
  record.count++;
  rateLimitMap.set(ip, record);
  
  if (record.count > LIMIT) {
    return new NextResponse('Too Many Requests - Enterprise Rate Limiting Active', {
      status: 429,
      headers: {
        'Retry-After': '60',
        'X-Enterprise-Security': 'Rate-Limit-Active'
      }
    });
  }
  
  const response = NextResponse.next();
  response.headers.set('X-Enterprise-Security', 'Hardened');
  return response;
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
}
