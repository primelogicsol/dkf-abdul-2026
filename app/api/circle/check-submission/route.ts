import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/circle/check-submission - Check if user already submitted Circle registration
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('user_id');

    console.log('[Circle Check] Params:', { userId });

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing user_id parameter' },
        { status: 400 }
      );
    }

    // Get user email
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, id: true, full_name: true },
    });

    console.log('[Circle Check] User:', user);

    if (!user) {
      console.error('[Circle Check] User not found');
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if this SPECIFIC user has submitted by matching full_name
    // Get all registrations and check if any match this user's name
    const allRegistrations = await prisma.registration.findMany({
      select: { full_name: true },
    });

    // Check if any registration matches this user's full name (case-insensitive)
    const hasRegistration = allRegistrations.some((reg: { full_name: string }) => 
      reg.full_name.toLowerCase().trim() === user.full_name.toLowerCase().trim()
    );

    console.log('[Circle Check] Registrations check:', { 
      userName: user.full_name, 
      hasRegistration,
      totalRegistrations: allRegistrations.length 
    });

    // Check members table
    const allMembers = await prisma.member.findMany({
      select: { full_name: true },
    });

    const hasMember = allMembers.some(member => 
      member.full_name.toLowerCase().trim() === user.full_name.toLowerCase().trim()
    );

    console.log('[Circle Check] Result:', { hasMember, hasRegistration });

    return NextResponse.json({
      hasMember,
      hasRegistration,
    });
  } catch (error) {
    console.error('[Circle Check] Error:', error);
    return NextResponse.json(
      { error: 'Failed to check submission status' },
      { status: 500 }
    );
  }
}
