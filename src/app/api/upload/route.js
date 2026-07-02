import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import fs from 'fs/promises';
import path from 'path';
import { getPortfolioData, savePortfolioData } from '../../../lib/portfolioStore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const uploadType = formData.get('type') || '';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const timestamp = Date.now();
    const filename = `${timestamp}_${cleanFileName}`;

    let publicUrl;

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      // Production (Vercel): store in Vercel Blob
      const blob = await put(`uploads/${filename}`, file, {
        access: 'public',
        addRandomSuffix: false,
      });
      publicUrl = blob.url;
    } else {
      // Local development: store on disk under public/uploads
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      await fs.mkdir(uploadsDir, { recursive: true });
      await fs.writeFile(path.join(uploadsDir, filename), buffer);
      publicUrl = `/uploads/${filename}`;
    }

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
