import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/tasks - Get all tasks
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status') || 'all';
    const programType = searchParams.get('program_type');

    const where: any = {};
    if (status !== 'all') {
      where.status = status;
    }
    if (programType) {
      where.program_type = programType;
    }

    const tasks = await prisma.task.findMany({
      where,
      include: {
        user_program: {
          include: {
            user: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

// POST /api/admin/tasks - Create new task
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_program_id, user_id, user_name, user_email, program_type, title, message, due_date } = body;

    // Create task
    const task = await prisma.task.create({
      data: {
        user_program_id,
        user_id,
        user_name,
        user_email,
        program_type,
        title,
        message,
        due_date: due_date ? new Date(due_date) : null,
        status: 'pending',
      },
    });

    // Create notification
    await prisma.notification.create({
      data: {
        user_id,
        title: 'New Task Assigned',
        message: `You have been assigned a new task: ${title}`,
        type: 'task',
        link: '/dashboard/tasks',
      },
    });

    return NextResponse.json({ success: true, task });
  } catch (error) {
    console.error('Failed to create task:', error);
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}
