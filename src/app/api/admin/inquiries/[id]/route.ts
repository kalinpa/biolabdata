import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    
    const inquiry = await prisma.inquiry.update({
      where: { id: params.id },
      data: { status: body.status },
    });

    return NextResponse.json(inquiry);
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
