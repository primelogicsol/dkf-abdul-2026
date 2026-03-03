import { NextResponse } from 'next/server';
import { principlePageService, foundationSectionService } from '@/lib/services';

// GET /api/admin/content/principles - Get all principle pages
export async function GET() {
  try {
    const principles = await principlePageService.findAll();
    return NextResponse.json(principles);
  } catch (error) {
    console.error('Failed to fetch principles:', error);
    return NextResponse.json({ error: 'Failed to fetch principles' }, { status: 500 });
  }
}
