const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs-extra');
const mime = require('mime-types');
const ffmpeg = require('fluent-ffmpeg');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Configuration - Update this path to your video files directory
const VIDEO_DIR = process.env.VIDEO_DIR || path.join(__dirname, 'videos');

// Ensure video directory exists
fs.ensureDirSync(VIDEO_DIR);

// Supported video formats
const VIDEO_EXTENSIONS = ['.mp4', '.mkv', '.avi', '.mov', '.wmv', '.flv', '.webm', '.m4v'];

// Get video files from directory
app.get('/api/videos', async (req, res) => {
  try {
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

    res.json(videoFiles);
  } catch (error) {
    console.error('Error reading video directory:', error);
    res.status(500).json({ error: 'Failed to read video directory' });
  }
});

// Get video metadata
app.get('/api/videos/:filename/metadata', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(VIDEO_DIR, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Video not found' });
  }

  ffmpeg.ffprobe(filePath, (err, metadata) => {
    if (err) {
      console.error('Error getting video metadata:', err);
      return res.status(500).json({ error: 'Failed to get video metadata' });
    }

    const videoStream = metadata.streams.find(stream => stream.codec_type === 'video');
    const audioStream = metadata.streams.find(stream => stream.codec_type === 'audio');

    res.json({
      duration: metadata.format.duration,
      size: metadata.format.size,
      bitrate: metadata.format.bit_rate,
      video: videoStream ? {
        codec: videoStream.codec_name,
        width: videoStream.width,
        height: videoStream.height,
        fps: eval(videoStream.r_frame_rate)
      } : null,
      audio: audioStream ? {
        codec: audioStream.codec_name,
        channels: audioStream.channels,
        sampleRate: audioStream.sample_rate
      } : null
    });
  });
});

// Stream video file
app.get('/api/videos/:filename/stream', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(VIDEO_DIR, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Video not found' });
  }

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    // Partial content request (for seeking)
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(filePath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': mime.lookup(filename) || 'video/mp4',
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    // Full file request
    const head = {
      'Content-Length': fileSize,
      'Content-Type': mime.lookup(filename) || 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
});

// Get video thumbnail
app.get('/api/videos/:filename/thumbnail', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(VIDEO_DIR, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Video not found' });
  }

  const thumbnailPath = path.join(__dirname, 'thumbnails', `${filename}.jpg`);
  
  // Check if thumbnail already exists
  if (fs.existsSync(thumbnailPath)) {
    return res.sendFile(thumbnailPath);
  }

  // Generate thumbnail
  ffmpeg(filePath)
    .screenshots({
      timestamps: ['10%'],
      filename: `${filename}.jpg`,
      folder: path.join(__dirname, 'thumbnails'),
      size: '320x240'
    })
    .on('end', () => {
      res.sendFile(thumbnailPath);
    })
    .on('error', (err) => {
      console.error('Error generating thumbnail:', err);
      res.status(500).json({ error: 'Failed to generate thumbnail' });
    });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Video streaming server running on port ${PORT}`);
  console.log(`Video directory: ${VIDEO_DIR}`);
  console.log(`API endpoints:`);
  console.log(`  GET /api/videos - List all videos`);
  console.log(`  GET /api/videos/:filename/stream - Stream video`);
  console.log(`  GET /api/videos/:filename/metadata - Get video metadata`);
  console.log(`  GET /api/videos/:filename/thumbnail - Get video thumbnail`);
});

module.exports = app;
