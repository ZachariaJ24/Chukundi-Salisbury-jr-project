const fs = require('fs-extra');
const path = require('path');
const mime = require('mime-types');

// This would need to be configured with your actual video storage
// For Vercel, you'd typically use a cloud storage service like AWS S3, Cloudinary, etc.
const VIDEO_DIR = process.env.VIDEO_DIR || '/tmp/videos';

const VIDEO_EXTENSIONS = ['.mp4', '.mkv', '.avi', '.mov', '.wmv', '.flv', '.webm', '.m4v'];

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

  try {
    // Ensure video directory exists
    await fs.ensureDir(VIDEO_DIR);
    
    const files = await fs.readdir(VIDEO_DIR);
    const videoFiles = [];

    for (const file of files) {
      const filePath = path.join(VIDEO_DIR, file);
      const stat = await fs.stat(filePath);
      
      if (stat.isFile()) {
        const ext = path.extname(file).toLowerCase();
        if (VIDEO_EXTENSIONS.includes(ext)) {
          const mimeType = mime.lookup(file) || 'video/mp4';
          
          videoFiles.push({
            id: file,
            name: path.basename(file, ext),
            filename: file,
            size: stat.size,
            mimeType,
            extension: ext,
            lastModified: stat.mtime,
            path: filePath
          });
        }
      }
    }

    // Sort by name
    videoFiles.sort((a, b) => a.name.localeCompare(b.name));

    res.status(200).json(videoFiles);
  } catch (error) {
    console.error('Error reading video directory:', error);
    res.status(500).json({ error: 'Failed to read video directory' });
  }
}
