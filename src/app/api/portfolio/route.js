import { NextResponse } from 'next/server';
import { getPortfolioData, savePortfolioData } from '../../../lib/portfolioStore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const data = await getPortfolioData();
  if (!data) {
    return NextResponse.json({ error: 'Failed to load portfolio data' }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(request) {
  try {
    const updatedData = await request.json();
    await savePortfolioData(updatedData);
    return NextResponse.json({ success: true, data: updatedData });
  } catch (error) {
    console.error('Error saving portfolio data:', error);
    return NextResponse.json({ error: 'Failed to save portfolio data' }, { status: 500 });
  }
}

export async function PUT(request) {
  return POST(request);
}
