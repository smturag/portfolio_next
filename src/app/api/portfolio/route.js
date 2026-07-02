import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const dataFilePath = path.join(process.cwd(), 'data', 'portfolio.json');

async function getPortfolioData() {
  try {
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error reading portfolio.json:", error);
    return null;
  }
}

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
    await fs.writeFile(dataFilePath, JSON.stringify(updatedData, null, 2), 'utf8');
    return NextResponse.json({ success: true, data: updatedData });
  } catch (error) {
    console.error("Error writing portfolio.json:", error);
    return NextResponse.json({ error: 'Failed to save portfolio data' }, { status: 500 });
  }
}

export async function PUT(request) {
  return POST(request);
}
