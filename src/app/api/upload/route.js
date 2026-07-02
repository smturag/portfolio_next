import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const uploadType = formData.get('type') || '';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const timestamp = Date.now();
    const filename = `${timestamp}_${cleanFileName}`;

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    const filePath = path.join(uploadsDir, filename);
    await fs.writeFile(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;

    // If it's a resume document or specified as type 'resume', also update default resume file & portfolio.json
    const isResume = uploadType === 'resume' || /\.(pdf|doc|docx)$/i.test(file.name);
    const isAvatar = uploadType === 'avatar';

    if (isResume) {
      try {
        const imageDir = path.join(process.cwd(), 'public', 'Image');
        await fs.mkdir(imageDir, { recursive: true });
        const defaultResumePath = path.join(imageDir, 'Resume_SMTurag.pdf');
        await fs.writeFile(defaultResumePath, buffer);
      } catch (err) {
        console.error('Failed to update default Resume_SMTurag.pdf:', err);
      }
    }

    // Automatically sync with data/portfolio.json if applicable
    try {
      const dataFilePath = path.join(process.cwd(), 'data', 'portfolio.json');
      const fileContents = await fs.readFile(dataFilePath, 'utf8');
      const portfolioData = JSON.parse(fileContents);
      if (portfolioData && portfolioData.personal) {
        if (isResume) {
          portfolioData.personal.resumeUrl = publicUrl;
        } else if (isAvatar) {
          portfolioData.personal.avatar = publicUrl;
        }
        await fs.writeFile(dataFilePath, JSON.stringify(portfolioData, null, 2), 'utf8');
      }
    } catch (err) {
      console.error('Error auto-updating portfolio.json on upload:', err);
    }

    return NextResponse.json({ success: true, url: publicUrl, originalName: file.name });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }
}

