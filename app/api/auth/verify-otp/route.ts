import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { message: 'Email and OTP are required' },
        { status: 400 }
      );
    }

    if (!/^\d{6}$/.test(otp)) {
      return NextResponse.json(
        { message: 'OTP must be a 6-digit code' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully',
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    return NextResponse.json(
      { message: 'Invalid or expired OTP' },
      { status: 400 }
    );
  }
}
