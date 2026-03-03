import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// PATCH /api/admin/gatherings/[id] - Update gathering
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const gathering = await prisma.gathering.update({
      where: { id },
      data: body,
      include: { region: true },
    });
    
    return NextResponse.json(gathering);
  } catch (error) {
    console.error('Failed to update gathering:', error);
    return NextResponse.json({ error: 'Failed to update gathering' }, { status: 500 });
  }
}
