import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/stats - Get dashboard statistics
export async function GET() {
  try {
    const [
      totalMembers,
      pendingRegistrations,
      publishedMembers,
      totalGatherings,
      totalRegions,
      governanceMembers,
    ] = await Promise.all([
      prisma.member.count(),
      prisma.registration.count({ where: { review_status: 'pending' } }),
      prisma.member.count({ where: { visibility_status: 'published', approved: true } }),
      prisma.gathering.count(),
      prisma.region.count(),
      prisma.foundationGovernance.count({ where: { is_active: true } }),
    ]);

    return NextResponse.json({
      totalMembers,
      pendingRegistrations,
      publishedMembers,
      totalGatherings,
      totalRegions,
      governanceMembers,
    });
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
