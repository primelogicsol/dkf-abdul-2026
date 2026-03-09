import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/user-programs - Get user programs
// Query params: ?user_id=xxx (optional, filters by specific user)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('user_id');

    // Build where clause
    const whereClause: any = {
      is_active: true,
    };

    // Filter by user_id if provided
    if (userId) {
      whereClause.user_id = userId;
    }

    const userPrograms = await prisma.userProgram.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            full_name: true,
            role: true,
          },
        },
      },
      orderBy: {
        joined_at: 'desc',
      },
    });

    // Transform data to include user info directly
    const transformedPrograms = userPrograms.map(program => ({
      id: program.id,
      user_id: program.user.id,
      user_name: program.user.full_name,
      user_email: program.user.email,
      user_role: program.user.role,
      program_type: program.program_type,
      joined_at: program.joined_at,
    }));

    return NextResponse.json(transformedPrograms);
  } catch (error) {
    console.error('Failed to fetch user programs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user programs', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
