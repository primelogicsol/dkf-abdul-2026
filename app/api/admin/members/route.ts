import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/members - Get all members
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status') || 'all';
    const search = searchParams.get('search');

    const where: any = {};

    if (status !== 'all') {
      where.visibility_status = status;
    }

    if (search) {
      where.OR = [
        { full_name: { contains: search, mode: 'insensitive' } },
        { country: { contains: search, mode: 'insensitive' } },
        { profession: { contains: search, mode: 'insensitive' } },
      ];
    }

    const members = await prisma.member.findMany({
      where,
      include: { country_ref: true },
      orderBy: { created_at: 'desc' },
    });

    return NextResponse.json(members);
  } catch (error) {
    console.error('Failed to fetch members:', error);
    return NextResponse.json(
      { error: 'Failed to fetch members' },
      { status: 500 }
    );
  }
}

// POST /api/admin/members - Create new member
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const member = await prisma.member.create({
      data: {
        full_name: body.full_name,
        country: body.country,
        city: body.city,
        profession: body.profession,
        year_connected: body.year_connected,
        first_encounter: body.first_encounter,
        resonated_quality: body.resonated_quality,
        life_changes: body.life_changes,
        continuing_engagement: body.continuing_engagement,
        photo_url: body.photo_url,
        media_url: body.media_url,
        approved: body.approved ?? false,
        visibility_status: body.visibility_status ?? 'draft',
      },
      include: { country_ref: true },
    });
    
    return NextResponse.json(member);
  } catch (error) {
    console.error('Failed to create member:', error);
    return NextResponse.json({ error: 'Failed to create member' }, { status: 500 });
  }
}
