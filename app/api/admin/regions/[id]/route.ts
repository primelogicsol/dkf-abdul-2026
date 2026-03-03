import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// PATCH /api/admin/regions/[country] - Update region
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // Find region by id first to get the country
    const region = await prisma.region.findUnique({ where: { id } });
    if (!region) {
      return NextResponse.json({ error: 'Region not found' }, { status: 404 });
    }
    
    // If country is being changed, we need to handle it carefully
    if (body.country && body.country !== region.country) {
      // Check if new country already exists
      const existing = await prisma.region.findUnique({ where: { country: body.country } });
      if (existing) {
        return NextResponse.json({ error: 'Country already exists' }, { status: 400 });
      }
    }
    
    const updatedRegion = await prisma.region.update({
      where: { country: region.country },
      data: body,
    });
    
    return NextResponse.json(updatedRegion);
  } catch (error) {
    console.error('Failed to update region:', error);
    return NextResponse.json({ error: 'Failed to update region' }, { status: 500 });
  }
}
