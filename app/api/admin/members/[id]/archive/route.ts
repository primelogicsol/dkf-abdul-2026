import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST /api/admin/members/[id]/archive - Archive member
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const member = await prisma.member.update({
      where: { id },
      data: {
        visibility_status: 'archived',
      },
    });

    return NextResponse.json(member);
  } catch (error) {
    console.error('Failed to archive member:', error);
    return NextResponse.json(
      { error: 'Failed to archive member' },
      { status: 500 }
    );
  }
}
