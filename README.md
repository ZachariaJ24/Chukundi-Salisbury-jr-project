# Video Streaming App

A self-hosted video streaming application that provides a Plex-like interface for accessing video files from your server. This is a cost-effective alternative to Plex Premium for multiple users.

## Features

- 🎬 **Video Streaming**: Stream videos directly from your server with support for seeking and partial content requests
- 🖼️ **Thumbnail Generation**: Automatic thumbnail generation for video previews
- 📱 **Responsive Design**: Modern, mobile-friendly interface
- 🎮 **Full Controls**: Play, pause, seek, volume control, and fullscreen support
- 📊 **Video Metadata**: Display file size, duration, format, and modification date
- 🔍 **Video Discovery**: Automatically scan and catalog video files from your server
- ⚡ **Fast Performance**: Optimized for streaming large video files

## Supported Video Formats

- MP4 (.mp4)
- MKV (.mkv)
- AVI (.avi)
- MOV (.mov)
- WMV (.wmv)
- FLV (.flv)
- WebM (.webm)
- M4V (.m4v)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- FFmpeg (for thumbnail generation and metadata extraction)

### Installing FFmpeg

**Windows:**
1. Download FFmpeg from https://ffmpeg.org/download.html
2. Extract and add to your PATH environment variable

**macOS:**
```bash
brew install ffmpeg
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install ffmpeg
```

## Installation

1. **Clone or download this repository**
   ```bash
   git clone <repository-url>
   cd video-streaming-app
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up your video directory**
   - Create a `videos` folder in the `server` directory
   - Add your video files to this folder
   - Or update the `VIDEO_DIR` environment variable in `server/index.js`

4. **Start the application**
   ```bash
   npm run dev
   ```

   This will start both the backend server (port 5000) and frontend (port 3000).

## Configuration

### Backend Configuration

You can configure the server by setting environment variables:

```bash
# Set custom video directory
VIDEO_DIR=/path/to/your/videos

# Set custom port
PORT=5000
```

### Frontend Configuration

The frontend automatically connects to the backend. If you need to change the API URL, create a `.env` file in the `client` directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Usage

1. **Add Videos**: Place your video files in the `server/videos` directory
2. **Access the App**: Open your browser and go to `http://localhost:3000`
3. **Browse Videos**: The app will automatically discover and display all supported video files
4. **Watch Videos**: Click on any video to start streaming

## API Endpoints

- `GET /api/videos` - List all videos
- `GET /api/videos/:filename/stream` - Stream video file
- `GET /api/videos/:filename/metadata` - Get video metadata
- `GET /api/videos/:filename/thumbnail` - Get video thumbnail
- `GET /api/health` - Health check

## Project Structure

```
video-streaming-app/
├── server/                 # Backend Node.js server
│   ├── index.js           # Main server file
│   ├── package.json       # Server dependencies
│   └── videos/            # Video files directory
├── client/                # Frontend React app
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API services
│   │   ├── types/         # TypeScript types
│   │   └── ...
│   └── package.json       # Client dependencies
└── package.json           # Root package.json
```

## Development

### Running in Development Mode

```bash
# Start both frontend and backend
npm run dev

# Start only backend
npm run server

# Start only frontend
npm run client
```

### Building for Production

```bash
# Build the frontend
npm run build

# The built files will be in client/build/
```

## Troubleshooting

### Common Issues

1. **Videos not showing up**
   - Check that video files are in the correct directory
   - Ensure video files have supported extensions
   - Check server logs for errors

2. **Thumbnails not generating**
   - Verify FFmpeg is installed and accessible
   - Check file permissions for the thumbnails directory

3. **Streaming issues**
   - Ensure your video files are not corrupted
   - Check network connectivity
   - Verify the server is running on the correct port

4. **CORS errors**
   - Make sure the frontend is connecting to the correct backend URL
   - Check that both servers are running

### Logs

Check the console output for detailed error messages. The server logs will show:
- Video discovery process
- Thumbnail generation status
- Streaming requests
- Error details

## Security Considerations

- This app is designed for local network use
- Consider adding authentication for production use
- Ensure proper file permissions on your video directory
- Use HTTPS in production environments

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review server logs
3. Create an issue with detailed information about your setup
