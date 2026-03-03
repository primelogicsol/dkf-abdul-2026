import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// GET /api/admin/settings/users - Get all admin users
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        full_name: true,
        role: true,
        is_active: true,
      },
      orderBy: { created_at: 'desc' },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// POST /api/admin/settings/users - Create new admin user
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, full_name, role } = body;

    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        password_hash: hashedPassword,
        full_name,
        role: role || 'moderator',
        is_active: true,
      },
      select: {
        id: true,
        email: true,
        full_name: true,
        role: true,
        is_active: true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('Failed to create user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
