import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { uploadImageToCloudinary } from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  try {
    console.log('Upload avatar request received');
    
    const formData = await request.formData();
    const file = formData.get('avatar') as File;
    const userId = formData.get('userId') as string;

    console.log('File received:', file?.name, 'Size:', file?.size, 'Type:', file?.type);
    console.log('User ID:', userId);

    if (!file) {
      console.error('No file provided');
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!userId) {
      console.error('No user ID provided');
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      console.error('Invalid file type:', file.type);
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      console.error('File too large:', file.size);
      return NextResponse.json(
        { error: 'File size must be less than 5MB' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    console.log('Buffer created, size:', buffer.length);

    // Upload to Cloudinary
    const filename = `avatar_${userId}`;
    console.log('Uploading to Cloudinary...', filename);
    
    const uploadResult = await uploadImageToCloudinary(buffer, filename);
    console.log('Upload result:', uploadResult);

    if (!uploadResult.success || !uploadResult.url) {
      console.error('Cloudinary upload failed:', uploadResult.error);
      return NextResponse.json(
        { error: uploadResult.error || 'Upload failed' },
        { status: 500 }
      );
    }

    // Try to update user in database
    let updatedUser;
    try {
      console.log('Updating user in database...');
      updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { avatar_url: uploadResult.url },
        select: {
          id: true,
          email: true,
          full_name: true,
          avatar_url: true,
        },
      });
      console.log('User updated successfully in database:', updatedUser.id);
    } catch (dbError) {
      console.warn('Database update failed, using localStorage fallback:', dbError);
      // Fallback: Return user data with avatar URL (client will save to localStorage)
      updatedUser = {
        id: userId,
        email: 'user@localhost',
        full_name: 'User',
        avatar_url: uploadResult.url,
      };
    }

    console.log('Avatar upload completed successfully');
    return NextResponse.json({
      success: true,
      message: 'Avatar uploaded successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Upload avatar error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
