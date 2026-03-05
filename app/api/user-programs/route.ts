import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/user-programs - Get all user programs (for admin)
export async function GET(request: NextRequest) {
  try {
    // Get all active user programs
    const userPrograms = await prisma.userProgram.findMany({
      where: {
        is_active: true,
      },
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
