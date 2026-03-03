import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// POST /api/admin/auth/setup - Create initial super admin (development only)
export async function POST() {
  try {
    // Check if any users exist
    const existingUsers = await prisma.user.count();
    
    if (existingUsers > 0) {
      return NextResponse.json(
        { error: 'Users already exist. Use admin interface to create new users.' },
        { status: 400 }
      );
    }

    // Create default super admin
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    const user = await prisma.user.create({
      data: {
        email: 'admin@drkumarfoundation.org',
        password_hash: hashedPassword,
        full_name: 'System Administrator',
        role: 'super_admin',
        is_active: true,
      },
    });

    return NextResponse.json({
      message: 'Super admin created successfully',
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
      },
      note: 'Default password: admin123 (change immediately)',
    });
  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json({ error: 'Setup failed' }, { status: 500 });
  }
}
