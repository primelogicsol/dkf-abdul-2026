import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/engagement/check-by-email - Check if email already submitted a form (cross-browser detection)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const programType = searchParams.get('program_type');
    const formType = searchParams.get('form_type');
    const email = searchParams.get('email');

    console.log('[Engagement Check by Email] Params:', { programType, formType, email });

    if (!programType || !formType || !email) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
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

    console.log('[Engagement Check by Email] Found submissions:', userSubmissions.length);

    // Check if this email already submitted (by email in payload)
    let alreadySubmitted = false;
    let submission = null;

    for (const sub of userSubmissions) {
      try {
        const payload = JSON.parse(sub.payload);
        console.log('[Engagement Check by Email] Checking payload email:', payload.email, 'vs search email:', email);
        if (payload.email && payload.email.toLowerCase() === email.toLowerCase()) {
          alreadySubmitted = true;
          submission = sub;
          console.log('[Engagement Check by Email] MATCH FOUND - Email already submitted!');
          break;
        }
      } catch (parseError) {
        console.log('[Engagement Check by Email] Failed to parse payload:', parseError);
        continue;
      }
    }

    console.log('[Engagement Check by Email] Result:', { alreadySubmitted, hasSubmission: !!submission });

    return NextResponse.json({
      alreadySubmitted,
      submission,
    });
  } catch (error) {
    console.error('[Engagement Check by Email] Error:', error);
    return NextResponse.json(
      { error: 'Failed to check submission status', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
