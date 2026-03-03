import { NextResponse } from 'next/server';
import { registrationService } from '@/lib/services';

// POST /api/admin/registrations/[id]/reject - Reject registration
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // In production, get user from session
    const reviewedBy = 'admin-user-id';
    
    await registrationService.reject(id, reviewedBy);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to reject registration:', error);
    return NextResponse.json({ error: 'Failed to reject registration' }, { status: 500 });
  }
}
