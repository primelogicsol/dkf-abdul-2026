import { NextResponse } from 'next/server';
import { governanceService } from '@/lib/services';

// GET /api/admin/governance - Get all governance members
export async function GET() {
  try {
    const governance = await governanceService.findAll();
    return NextResponse.json(governance);
  } catch (error) {
    console.error('Failed to fetch governance:', error);
    return NextResponse.json({ error: 'Failed to fetch governance' }, { status: 500 });
  }
}

// POST /api/admin/governance - Create governance entry
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const governance = await governanceService.create(body);
    return NextResponse.json(governance);
  } catch (error) {
    console.error('Failed to create governance:', error);
    return NextResponse.json({ error: 'Failed to create governance' }, { status: 500 });
  }
}
