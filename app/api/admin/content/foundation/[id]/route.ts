import { NextRequest, NextResponse } from 'next/server';
import { foundationSectionService } from '@/lib/services';

// PATCH /api/admin/content/foundation/[id] - Update foundation section
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const section = await foundationSectionService.update(id, body);
    return NextResponse.json(section);
  } catch (error) {
    console.error('Failed to update foundation section:', error);
    return NextResponse.json({ error: 'Failed to update foundation section' }, { status: 500 });
  }
}
