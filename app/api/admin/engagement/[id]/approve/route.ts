import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST /api/admin/engagement/[id]/approve - Approve engagement request
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const engagement = await prisma.engagementRequest.update({
      where: { id },
      data: {
        status: 'approved',
        reviewed_at: new Date(),
      },
    });

    return NextResponse.json(engagement);
  } catch (error) {
    console.error('Failed to approve engagement request:', error);
    return NextResponse.json(
      { error: 'Failed to approve engagement request' },
      { status: 500 }
    );
  }
}
