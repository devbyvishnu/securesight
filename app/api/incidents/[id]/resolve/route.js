import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PATCH(req, { params }) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid incident ID' }, { status: 400 });
    }

    const updated = await prisma.incident.update({
      where: { id },
      data: { resolved: true },
    });

    return NextResponse.json({ incident: updated }, { status: 200 });

  } catch (error) {
    console.error('Error resolving incident:', error);
    return NextResponse.json({ error: 'Failed to resolve incident' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

