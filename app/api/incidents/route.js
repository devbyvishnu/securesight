import { NextResponse } from 'next/server';
import { PrismaClient } from '../../generated/prisma';

console.log('DATABASE_URL from API route:', process.env.DATABASE_URL);

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const resolvedParam = searchParams.get('resolved');

    const resolved = resolvedParam === 'true' ? true : false;

    const incidents = await prisma.incident.findMany({
      where: { resolved },
    });

    return NextResponse.json({ incidents }, { status: 200 });
  } catch (error) {
    console.error('API error (GET /api/incidents):', error);
    return NextResponse.json({ error: 'Failed to fetch incidents' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
