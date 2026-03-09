import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/quotes/[id] - Get a single quote by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const quote = await prisma.quote.findUnique({
      where: { id },
    });

    if (!quote) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }

    return NextResponse.json(quote);
  } catch (error) {
    console.error('Failed to fetch quote:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quote', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/quotes/[id] - Update a quote
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { text, category, is_featured, display_order, is_active } = body;

    // Check if quote exists
    const existingQuote = await prisma.quote.findUnique({
      where: { id },
    });

    if (!existingQuote) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }

    const quote = await prisma.quote.update({
      where: { id },
      data: {
        text: text ?? existingQuote.text,
        category: category ?? existingQuote.category,
        is_featured: is_featured !== undefined ? is_featured : existingQuote.is_featured,
        display_order: display_order !== undefined ? display_order : existingQuote.display_order,
        is_active: is_active !== undefined ? is_active : existingQuote.is_active,
      },
    });

    return NextResponse.json(quote);
  } catch (error) {
    console.error('Failed to update quote:', error);
    return NextResponse.json(
      { error: 'Failed to update quote', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/quotes/[id] - Delete a quote
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if quote exists
    const existingQuote = await prisma.quote.findUnique({
      where: { id },
    });

    if (!existingQuote) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }

    await prisma.quote.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Quote deleted successfully' });
  } catch (error) {
    console.error('Failed to delete quote:', error);
    return NextResponse.json(
      { error: 'Failed to delete quote', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
