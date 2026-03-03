import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Check for session cookie (in production, validate JWT)
    // For now, return mock session check
    // In production, verify JWT and return user data
    
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
}
