import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, fullName, currentPassword, newPassword, avatarUrl } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const updateData: any = {};

    // Update full name if provided
    if (fullName && fullName !== user.full_name) {
      updateData.full_name = fullName;
    }

    // Update avatar URL if provided
    if (avatarUrl !== undefined && avatarUrl !== user.avatar_url) {
      updateData.avatar_url = avatarUrl;
    }

    // Update password if new password is provided
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json(
          { error: 'Current password is required' },
          { status: 400 }
        );
      }

      // Verify current password
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password_hash);
      if (!isPasswordValid) {
        return NextResponse.json(
          { error: 'Current password is incorrect' },
          { status: 401 }
        );
      }

      // Hash new password
      const passwordHash = await bcrypt.hash(newPassword, 12);
      updateData.password_hash = passwordHash;
    }

    // Perform update if there are changes
    if (Object.keys(updateData).length > 0) {
      await prisma.user.update({
        where: { id: userId },
        data: updateData,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user.id,
        email: user.email,
        full_name: fullName || user.full_name,
        avatar_url: avatarUrl !== undefined ? avatarUrl : user.avatar_url,
      },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: 'An error occurred while updating profile' },
      { status: 500 }
    );
  }
}
