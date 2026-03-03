import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// PATCH /api/admin/registrations/[id] - Update registration
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const registration = await prisma.registration.update({
      where: { id },
      data: body,
    });
    
    return NextResponse.json(registration);
  } catch (error) {
    console.error('Failed to update registration:', error);
    return NextResponse.json({ error: 'Failed to update registration' }, { status: 500 });
  }
}
