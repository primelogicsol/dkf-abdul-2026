import { NextRequest, NextResponse } from 'next/server';
import { governanceService } from '@/lib/services';

// PATCH /api/admin/governance/[id] - Update governance entry
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const governance = await governanceService.update(id, body);
    return NextResponse.json(governance);
  } catch (error) {
    console.error('Failed to update governance:', error);
    return NextResponse.json({ error: 'Failed to update governance' }, { status: 500 });
  }
}

// DELETE /api/admin/governance/[id] - Delete governance entry
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await governanceService.delete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete governance:', error);
    return NextResponse.json({ error: 'Failed to delete governance' }, { status: 500 });
  }
}
