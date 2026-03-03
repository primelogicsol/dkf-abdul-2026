import { NextResponse } from 'next/server';
import { governanceService } from '@/lib/services';

// GET /api/governance - Get active governance members for public display
export async function GET() {
  try {
    const governance = await governanceService.findActive();
    return NextResponse.json(governance);
  } catch (error) {
    console.error('Failed to fetch governance:', error);
    return NextResponse.json({ error: 'Failed to fetch governance' }, { status: 500 });
  }
}
