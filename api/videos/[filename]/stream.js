const fs = require('fs-extra');
const path = require('path');
const mime = require('mime-types');

const VIDEO_DIR = process.env.VIDEO_DIR || '/tmp/videos';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { filename } = req.query;
  const filePath = path.join(VIDEO_DIR, filename);

  try {
    if (!await fs.pathExists(filePath)) {
      return res.status(404).json({ error: 'Video not found' });
    }

    const stat = await fs.stat(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      // Partial content request (for seeking)
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = (end - start) + 1;
      
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': mime.lookup(filename) || 'video/mp4',
      };
      
      res.writeHead(206, head);
      
      // For Vercel, we need to stream the file differently
      const stream = fs.createReadStream(filePath, { start, end });
      stream.pipe(res);
    } else {
      // Full file request
      const head = {
        'Content-Length': fileSize,
        'Content-Type': mime.lookup(filename) || 'video/mp4',
      };
      res.writeHead(200, head);
      fs.createReadStream(filePath).pipe(res);
    }
  } catch (error) {
    console.error('Error streaming video:', error);
    res.status(500).json({ error: 'Failed to stream video' });
  }
}
