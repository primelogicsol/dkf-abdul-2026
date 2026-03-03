import { NextResponse } from 'next/server';
import { memberService } from '@/lib/services';

// GET /api/members - Get published members for public directory
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const country = searchParams.get('country') || undefined;
    const profession = searchParams.get('profession') || undefined;

    console.log('[Members API] Fetching published members with params:', { page, limit, country, profession });

    const result = await memberService.findPublished({
      page,
      limit,
      country,
      profession,
    });

    console.log('[Members API] Found members:', result.data.length, 'Pagination:', result.pagination);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to fetch members:', error);
    return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 });
  }
}
