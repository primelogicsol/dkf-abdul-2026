import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/contributions/top - Get top contributions by program
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const programType = searchParams.get('program_type');
    const limit = parseInt(searchParams.get('limit') || '3');

    if (!programType) {
      return NextResponse.json(
        { error: 'program_type is required' },
        { status: 400 }
      );
    }

    // Fetch approved contributions for this program
    const contributions = await prisma.contribution.findMany({
      where: {
        program_type: programType,
        status: 'approved',
      },
      orderBy: {
        submitted_at: 'desc',
      },
      take: limit,
    });

    return NextResponse.json(contributions);
  } catch (error) {
    console.error('Failed to fetch top contributions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contributions' },
      { status: 500 }
    );
  }
}
