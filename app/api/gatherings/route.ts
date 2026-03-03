import { NextResponse } from 'next/server';
import { gatheringService } from '@/lib/services';

// GET /api/gatherings - Get all gatherings for public display
export async function GET() {
  try {
    const gatherings = await gatheringService.findAll();
    return NextResponse.json(gatherings);
  } catch (error) {
    console.error('Failed to fetch gatherings:', error);
    return NextResponse.json({ error: 'Failed to fetch gatherings' }, { status: 500 });
  }
}
