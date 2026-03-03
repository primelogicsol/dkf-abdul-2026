import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/engagement/[id] - Get single engagement request
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const engagement = await prisma.engagementRequest.findUnique({
      where: { id },
    });

    if (!engagement) {
      return NextResponse.json(
        { error: 'Engagement request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(engagement);
  } catch (error) {
    console.error('Failed to fetch engagement request:', error);
    return NextResponse.json(
      { error: 'Failed to fetch engagement request' },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/engagement/[id] - Update engagement request
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const engagement = await prisma.engagementRequest.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(engagement);
  } catch (error) {
    console.error('Failed to update engagement request:', error);
    return NextResponse.json(
      { error: 'Failed to update engagement request' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/engagement/[id] - Delete engagement request
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.engagementRequest.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete engagement request:', error);
    return NextResponse.json(
      { error: 'Failed to delete engagement request' },
      { status: 500 }
    );
  }
}
