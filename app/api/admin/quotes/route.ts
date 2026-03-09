import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/quotes - Get all quotes with optional filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const isActive = searchParams.get('is_active');

    const whereClause: any = {};

    // Search filter
    if (search) {
      whereClause.OR = [
        { text: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Category filter
    if (category) {
      whereClause.category = category;
    }

    // Active status filter
    if (isActive !== null && isActive !== undefined) {
      whereClause.is_active = isActive === 'true';
    }

    const quotes = await prisma.quote.findMany({
      where: whereClause,
      orderBy: [
        { display_order: 'asc' },
        { created_at: 'desc' },
      ],
    });

    return NextResponse.json(quotes);
  } catch (error) {
    console.error('Failed to fetch quotes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quotes', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// POST /api/admin/quotes - Create a new quote
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, category, is_featured = false, display_order = 0, is_active = true } = body;

    if (!text || !category) {
      return NextResponse.json(
        { error: 'Text and category are required' },
        { status: 400 }
      );
    }

    const quote = await prisma.quote.create({
      data: {
        text,
        category,
        is_featured,
        display_order,
        is_active,
      },
    });

    return NextResponse.json(quote, { status: 201 });
  } catch (error) {
    console.error('Failed to create quote:', error);
    return NextResponse.json(
      { error: 'Failed to create quote', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
