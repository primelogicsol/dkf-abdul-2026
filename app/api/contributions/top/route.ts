import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/contributions/top - Get top contributors by program
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const programType = searchParams.get('program_type');
    const limit = parseInt(searchParams.get('limit') || '3');

    // Get current month start and end
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const where: any = {
      status: 'approved',
      submitted_at: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    };

    if (programType) {
      where.program_type = programType;
    }

    const topContributors = await prisma.contribution.groupBy({
      by: ['user_id', 'user_name', 'user_email'],
      where,
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
      take: limit,
    });

    return NextResponse.json(topContributors);
  } catch (error) {
    console.error('Failed to fetch top contributors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch top contributors' },
      { status: 500 }
    );
  }
}
