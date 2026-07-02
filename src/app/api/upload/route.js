import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { getPortfolioData, savePortfolioData } from '../../../lib/portfolioStore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { error: 'Storage is not configured. Set BLOB_READ_WRITE_TOKEN in your Vercel project.' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file');
    const uploadType = formData.get('type') || '';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const timestamp = Date.now();
    const blobPath = `uploads/${timestamp}_${cleanFileName}`;

    // Upload to Vercel Blob (persistent, works on serverless)
    const blob = await put(blobPath, file, {
      access: 'public',
      addRandomSuffix: false,
    });

    const publicUrl = blob.url;

    const isResume = uploadType === 'resume' || /\.(pdf|doc|docx)$/i.test(file.name);
    const isAvatar = uploadType === 'avatar';

    // Persist the URL into portfolio data so the live site picks it up
    try {
      const portfolioData = await getPortfolioData();
      if (portfolioData && portfolioData.personal) {
        if (isResume) {
          portfolioData.personal.resumeUrl = publicUrl;
        } else if (isAvatar) {
          portfolioData.personal.avatar = publicUrl;
        }
        await savePortfolioData(portfolioData);
      }
    } catch (err) {
      console.error('Error auto-updating portfolio data on upload:', err);
    }

    return NextResponse.json({ success: true, url: publicUrl, originalName: file.name });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }
}
