import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST /api/admin/engagement/[id]/reject - Reject engagement request
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const engagement = await prisma.engagementRequest.update({
      where: { id },
      data: {
        status: 'rejected',
        reviewed_at: new Date(),
      },
    });

    return NextResponse.json(engagement);
  } catch (error) {
    console.error('Failed to reject engagement request:', error);
    return NextResponse.json(
      { error: 'Failed to reject engagement request' },
      { status: 500 }
    );
  }
}
