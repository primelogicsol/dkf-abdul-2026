import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user in database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check if user is approved
    if (user.approval_status !== 'approved') {
      return NextResponse.json(
        { error: 'Your account is pending admin approval. Please wait for approval before logging in.' },
        { status: 403 }
      );
    }

    if (!user.is_active) {
      return NextResponse.json(
        { error: 'Your account has been deactivated. Please contact an administrator.' },
        { status: 403 }
      );
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Log the login action
    await prisma.auditLog.create({
      data: {
        action: 'LOGIN',
        entity_type: 'User',
        entity_id: user.id,
        user_id: user.id,
        user_email: user.email,
        user_role: user.role,
        ip_address: '127.0.0.1',
      },
    });

    // Return user data (in production, set httpOnly cookie)
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    );
  }
}
