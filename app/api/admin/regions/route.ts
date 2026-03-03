import { NextResponse } from 'next/server';
import { regionService } from '@/lib/services';

// GET /api/admin/regions - Get all regions
export async function GET() {
  try {
    const regions = await regionService.findAll();
    return NextResponse.json(regions);
  } catch (error) {
    console.error('Failed to fetch regions:', error);
    return NextResponse.json({ error: 'Failed to fetch regions' }, { status: 500 });
  }
}

// POST /api/admin/regions - Create region
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const region = await regionService.create(body);
    return NextResponse.json(region);
  } catch (error) {
    console.error('Failed to create region:', error);
    return NextResponse.json({ error: 'Failed to create region' }, { status: 500 });
  }
}
