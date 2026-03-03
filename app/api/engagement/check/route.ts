import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/engagement/check - Check if user already submitted a form
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const programType = searchParams.get('program_type');
    const formType = searchParams.get('form_type');
    const userId = searchParams.get('user_id');
    const userEmail = searchParams.get('user_email');

    console.log('[Engagement Check] Params:', { programType, formType, userId, userEmail });

    if (!programType || !formType || !userId) {
      console.error('[Engagement Check] Missing params:', { programType, formType, userId });
      return NextResponse.json(
        { error: 'Missing required parameters', received: { programType, formType, userId } },
        { status: 400 }
      );
    }

    // Get user email first
    console.log('[Engagement Check] Looking up user with ID:', userId);
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, id: true },
    });

    console.log('[Engagement Check] User found:', user);

    if (!user) {
      console.error('[Engagement Check] User not found in database with ID:', userId);
      // Try to find user by querying all users (debug)
      const allUsers = await prisma.user.findMany({
        select: { id: true, email: true },
        take: 5
      });
      console.log('[Engagement Check] First 5 users in DB:', allUsers);
      
      return NextResponse.json(
        { error: 'User not found', receivedId: userId, availableUsers: allUsers.map(u => u.id) },
        { status: 404 }
      );
    }

    // Check all submissions for this program and form type
    const userSubmissions = await prisma.engagementRequest.findMany({
      where: {
        program_type: programType,
        form_type: formType,
      },
      orderBy: { created_at: 'desc' },
    });

    console.log('[Engagement Check] Found submissions:', userSubmissions.length);

    // Check if user already submitted (by email in payload)
    // Also check against userEmail parameter for cross-browser detection
    let alreadySubmitted = false;
    let submission = null;
    const targetEmail = userEmail?.toLowerCase() || user.email.toLowerCase();

    for (const sub of userSubmissions) {
      try {
        const payload = JSON.parse(sub.payload);
        const payloadEmail = payload.email?.toLowerCase();
        console.log('[Engagement Check] Checking payload email:', payloadEmail, 'vs target email:', targetEmail);
        if (payloadEmail === targetEmail) {
          alreadySubmitted = true;
          submission = sub;
          console.log('[Engagement Check] MATCH FOUND - Already submitted!');
          break;
        }
      } catch (parseError) {
        console.log('[Engagement Check] Failed to parse payload:', parseError);
        continue;
      }
    }

    console.log('[Engagement Check] Result:', { alreadySubmitted, hasSubmission: !!submission });

    return NextResponse.json({
      alreadySubmitted,
      submission,
    });
  } catch (error) {
    console.error('[Engagement Check] Error:', error);
    return NextResponse.json(
      { error: 'Failed to check submission status', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
