import { NextResponse } from 'next/server';
import { principlePageService } from '@/lib/services';

// GET /api/principles - Get all principle pages for public display
export async function GET() {
  try {
    const principles = await principlePageService.findAll();
    return NextResponse.json(principles);
  } catch (error) {
    console.error('Failed to fetch principles:', error);
    return NextResponse.json({ error: 'Failed to fetch principles' }, { status: 500 });
  }
}
