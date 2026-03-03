import { NextRequest, NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'fallback-secret-key';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.is_active) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Verify password (in production, use bcrypt.compare)
    // For demo, we'll accept plain text comparison
    const isValid = password === user.password_hash || await compare(password, user.password_hash);

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
