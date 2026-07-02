import { put, list } from '@vercel/blob';
import fs from 'fs/promises';
import path from 'path';

// Blob key where the live, editable portfolio data is stored.
const BLOB_KEY = 'data/portfolio.json';

// Bundled fallback shipped with the repo (used on first run / local dev).
const localFilePath = path.join(process.cwd(), 'data', 'portfolio.json');

async function readBundled() {
  try {
    const contents = await fs.readFile(localFilePath, 'utf8');
    return JSON.parse(contents);
  } catch (err) {
    console.error('Error reading bundled portfolio.json:', err);
    return null;
  }
}

export async function getPortfolioData() {
  // If Blob isn't configured (e.g. local dev), use the bundled file.
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return readBundled();
  }

  try {
    const { blobs } = await list({ prefix: BLOB_KEY });
    const match = blobs.find((b) => b.pathname === BLOB_KEY);
    if (match) {
      const res = await fetch(match.url, { cache: 'no-store' });
      if (res.ok) {
        return await res.json();
      }
    }
  } catch (err) {
    console.error('Error reading portfolio data from Blob:', err);
  }

  // No Blob copy yet — fall back to the bundled data.
  return readBundled();
}

export async function savePortfolioData(data) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    // Local dev: write back to the bundled file.
    await fs.writeFile(localFilePath, JSON.stringify(data, null, 2), 'utf8');
    return data;
  }

  await put(BLOB_KEY, JSON.stringify(data, null, 2), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  });
  return data;
}
