import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// PATCH /api/user/submissions/engagement/[id] - Update user's engagement submission
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { userId } = body;

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

    // Get the engagement request
    const engagement = await prisma.engagementRequest.findUnique({
      where: { id },
    });

    if (!engagement) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    // Verify this submission belongs to this user
    try {
      const payload = JSON.parse(engagement.payload);
      if (payload.email !== user.email) {
        return NextResponse.json(
          { error: 'Unauthorized to edit this submission' },
          { status: 403 }
        );
      }

      // Update the payload (preserve email and fullName from user account)
      const updatedPayload = {
        ...body.data,
        email: user.email, // Always use account email
        fullName: user.full_name, // Always use account name
      };

      const updated = await prisma.engagementRequest.update({
        where: { id },
        data: {
          payload: JSON.stringify(updatedPayload),
          status: 'pending', // Reset to pending on edit
        },
      });

      return NextResponse.json(updated);
    } catch {
      return NextResponse.json(
        { error: 'Invalid submission data' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Failed to update engagement:', error);
    return NextResponse.json(
      { error: 'Failed to update submission' },
      { status: 500 }
    );
  }
}
