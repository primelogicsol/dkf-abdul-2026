import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Get session token from cookies
    const sessionToken = request.cookies.get('session_token')?.value;
    let userId = request.cookies.get('user_id')?.value;

    // If no cookies, check Authorization header (from localStorage)
    if (!userId) {
      const authHeader = request.headers.get('authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        userId = authHeader.replace('Bearer ', '');
      }
    }

    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Validate user exists and is active
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        full_name: true,
        avatar_url: true,
        is_active: true,
        approval_status: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!user) {
      // User doesn't exist - clear invalid session
      const response = NextResponse.json({ error: 'User not found' }, { status: 401 });
      response.cookies.delete('session_token');
      response.cookies.delete('user_id');
      return response;
    }

    if (!user.is_active) {
      // User is not active - clear session
      const response = NextResponse.json({ error: 'Account is not active' }, { status: 403 });
      response.cookies.delete('session_token');
      response.cookies.delete('user_id');
      return response;
    }

    if (user.approval_status === 'rejected') {
      // User was rejected - clear session
      const response = NextResponse.json({ error: 'Account was rejected' }, { status: 403 });
      response.cookies.delete('session_token');
      response.cookies.delete('user_id');
      return response;
    }

    // Return valid session
    return NextResponse.json(user);
  } catch (error) {
    console.error('[Session Check] Error:', error);
    return NextResponse.json({ error: 'Session validation failed' }, { status: 500 });
  }
}
