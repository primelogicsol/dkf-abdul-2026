import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/contributions/top-contributors - Get top contributors by approved count with their engagement info
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

    // Get approved contributions grouped by user
    const contributions = await prisma.contribution.findMany({
      where: {
        program_type: programType,
        status: 'approved',
      },
      include: {
        user_program: {
          include: {
            user: true,
          },
        },
      },
    });

    // Group by user and count contributions
    const userMap = new Map();
    
    contributions.forEach((contrib) => {
      const userId = contrib.user_id;
      
      if (!userMap.has(userId)) {
        userMap.set(userId, {
          user: contrib.user_program.user,
          contributions: [],
          count: 0,
        });
      }
      
      const userData = userMap.get(userId);
      userData.count += 1;
      userData.contributions.push(contrib);
    });

    // Convert to array and sort by contribution count
    const topContributors = Array.from(userMap.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);

    // For each top contributor, fetch their engagement (collaboration form) data
    const result = await Promise.all(
      topContributors.map(async (item) => {
        // Find their collaboration engagement for this program
        const engagement = await prisma.engagementRequest.findFirst({
          where: {
            program_type: programType,
            form_type: 'collaboration',
          },
          orderBy: { created_at: 'desc' },
        });

        // Parse the engagement payload to get collaboration info
        let collaborationInfo = null;
        if (engagement) {
          try {
            collaborationInfo = JSON.parse(engagement.payload);
          } catch {
            collaborationInfo = null;
          }
        }

        return {
          user: item.user,
          contribution_count: item.count,
          latest_contribution: item.contributions[0],
          collaboration_info: collaborationInfo,
        };
      })
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to fetch top contributors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contributors' },
      { status: 500 }
    );
  }
}
