import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Update user to approved
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        approval_status: 'approved',
        is_active: true,
      },
    });

    // Log the action
    await prisma.auditLog.create({
      data: {
        action: 'APPROVE',
        entity_type: 'User',
        entity_id: userId,
        user_id: userId,
        user_email: updatedUser.email,
        user_role: updatedUser.role,
        ip_address: '127.0.0.1',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'User approved successfully',
    });
  } catch (error) {
    console.error('Error approving user:', error);
    return NextResponse.json(
      { error: 'Failed to approve user' },
      { status: 500 }
    );
  }
}
