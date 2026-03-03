import { NextResponse } from 'next/server';
import { gatheringService } from '@/lib/services';

// GET /api/admin/gatherings - Get all gatherings
export async function GET() {
  try {
    const gatherings = await gatheringService.findAll();
    return NextResponse.json(gatherings);
  } catch (error) {
    console.error('Failed to fetch gatherings:', error);
    return NextResponse.json({ error: 'Failed to fetch gatherings' }, { status: 500 });
  }
}

// POST /api/admin/gatherings - Create gathering
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const gathering = await gatheringService.create(body);
    return NextResponse.json(gathering);
  } catch (error) {
    console.error('Failed to create gathering:', error);
    return NextResponse.json({ error: 'Failed to create gathering' }, { status: 500 });
  }
}
