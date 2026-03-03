import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { full_name, email, password } = await request.json();

    if (!full_name || !email || !password) {
      return NextResponse.json(
        { message: 'Full name, email, and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email address' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user with PENDING status (requires admin approval)
    const user = await prisma.user.create({
      data: {
        full_name,
        email,
        password_hash: passwordHash,
        role: 'moderator',
        is_active: false,  // Inactive until approved
        approval_status: 'pending',  // Requires admin approval
        assigned_programs: [],
      },
    });

    // Log the registration
    await prisma.auditLog.create({
      data: {
        action: 'CREATE',
        entity_type: 'User',
        entity_id: user.id,
        user_id: user.id,
        user_email: user.email,
        user_role: user.role,
        ip_address: '127.0.0.1',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Registration successful. Your account is pending admin approval.',
      email,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}
