import { NextRequest, NextResponse } from 'next/server';
import { principlePageService } from '@/lib/services';

// PATCH /api/admin/content/principles/[id] - Update principle page
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const principle = await principlePageService.update(id, body);
    return NextResponse.json(principle);
  } catch (error) {
    console.error('Failed to update principle:', error);
    return NextResponse.json({ error: 'Failed to update principle' }, { status: 500 });
  }
}
