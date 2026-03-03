import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'fallback-secret-key';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      email: string;
      role: string;
    };

    return NextResponse.json({
      authenticated: true,
      user: {
        id: decoded.userId,
        email: decoded.email,
        role: decoded.role,
      },
    });
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
