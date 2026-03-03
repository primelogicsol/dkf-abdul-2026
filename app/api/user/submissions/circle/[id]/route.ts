import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// PATCH /api/user/submissions/circle/[id] - Update user's Circle registration
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { userId, data } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      );
    }

    // Get user to verify
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, full_name: true }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get the registration
    const registration = await prisma.registration.findUnique({
      where: { id },
    });

    if (!registration) {
      return NextResponse.json(
        { error: 'Registration not found' },
        { status: 404 }
      );
    }

    // Verify this registration belongs to this user (by name match)
    if (registration.full_name.toLowerCase() !== user.full_name.toLowerCase()) {
      return NextResponse.json(
        { error: 'Unauthorized to edit this registration' },
        { status: 403 }
      );
    }

    // Update the registration
    const updated = await prisma.registration.update({
      where: { id },
      data: {
        ...data,
        review_status: 'pending', // Reset to pending on edit
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Failed to update registration:', error);
    return NextResponse.json(
      { error: 'Failed to update registration' },
      { status: 500 }
    );
  }
}
