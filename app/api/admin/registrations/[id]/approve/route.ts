import { NextResponse } from 'next/server';
import { registrationService, memberService } from '@/lib/services';

// POST /api/admin/registrations/[id]/approve - Approve registration
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // In production, get user from session
    const reviewedBy = 'admin-user-id';
    
    const member = await registrationService.approve(id, reviewedBy);
    
    return NextResponse.json({ success: true, member });
  } catch (error) {
    console.error('Failed to approve registration:', error);
    return NextResponse.json({ error: 'Failed to approve registration' }, { status: 500 });
  }
}
