import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST /api/admin/members/[id]/publish - Publish member
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const member = await prisma.member.update({
      where: { id },
      data: {
        visibility_status: 'published',
        approved: true,
      },
    });

    return NextResponse.json(member);
  } catch (error) {
    console.error('Failed to publish member:', error);
    return NextResponse.json(
      { error: 'Failed to publish member' },
      { status: 500 }
    );
  }
}
