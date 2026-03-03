import { NextRequest, NextResponse } from 'next/server';
import { registrationService } from '@/lib/services';

// GET /api/admin/registrations - Get all registrations
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status') || 'all';

    console.log('[Admin Registrations] Fetching with status:', status);

    const filters: any = {};
    if (status !== 'all') {
      filters.review_status = status;
    }

    const result = await registrationService.findAll(filters);
    console.log('[Admin Registrations] Found:', result.data.length, 'registrations');
    return NextResponse.json(result.data);
  } catch (error) {
    console.error('Failed to fetch registrations:', error);
    return NextResponse.json({ error: 'Failed to fetch registrations' }, { status: 500 });
  }
}
