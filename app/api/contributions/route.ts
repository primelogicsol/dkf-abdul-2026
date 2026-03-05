import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/contributions - Get user contributions
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('user_id');
    const programType = searchParams.get('program_type');

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const where: any = { user_id: userId };
    if (programType) {
      where.program_type = programType;
    }

    const contributions = await prisma.contribution.findMany({
      where,
      orderBy: { submitted_at: 'desc' },
    });

    return NextResponse.json(contributions);
  } catch (error) {
    console.error('Failed to fetch contributions:', error);
    return NextResponse.json({ error: 'Failed to fetch contributions' }, { status: 500 });
  }
}

// POST /api/contributions - Submit new contribution
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const contribution = await prisma.contribution.create({
      data: {
        user_program_id: body.user_program_id,
        user_id: body.user_id,
        user_name: body.user_name,
        user_email: body.user_email,
        program_type: body.program_type,
        title: body.title,
        activity_date: new Date(body.activity_date),
        venue_city: body.venue_city,
        venue_country: body.venue_country,
        participant_count: parseInt(body.participant_count),
        participant_phones: body.participant_phones,
        task_conducted: body.task_conducted,
        results: body.results,
        status: 'pending',
      },
    });

    return NextResponse.json({ success: true, contribution });
  } catch (error) {
    console.error('Failed to create contribution:', error);
    return NextResponse.json({ error: 'Failed to submit contribution' }, { status: 500 });
  }
}
