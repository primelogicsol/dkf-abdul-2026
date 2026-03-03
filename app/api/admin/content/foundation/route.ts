import { NextResponse } from 'next/server';
import { foundationSectionService } from '@/lib/services';

// GET /api/admin/content/foundation - Get all foundation sections
export async function GET() {
  try {
    const sections = await foundationSectionService.findAll();
    return NextResponse.json(sections);
  } catch (error) {
    console.error('Failed to fetch foundation sections:', error);
    return NextResponse.json({ error: 'Failed to fetch foundation sections' }, { status: 500 });
  }
}
