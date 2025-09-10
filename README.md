# Video Streaming App

A modern, responsive video streaming application built with React and TypeScript. This app provides a clean interface to access and stream video files from your server, serving as an alternative to premium Plex subscriptions.

## Features

- 🎬 **Modern Video Player**: Custom-built video player with full controls
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- 🔍 **Search & Filter**: Find videos quickly with search and genre filtering
- 📊 **Video Metadata**: Display duration, file size, quality, and more
- 🎨 **Beautiful UI**: Dark theme with smooth animations and transitions
- ⚡ **Fast Loading**: Optimized for performance and quick access

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd video-streaming-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

This builds the app for production to the `build` folder.

## Deployment on Vercel

This app is configured for easy deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

The app includes:
- `vercel.json` configuration
- API routes for video streaming
- Optimized build settings

## Configuration

### Video Server Setup

To connect to your actual video server, you'll need to:

1. **Update the API endpoint** in `src/components/VideoGrid.tsx`:
```typescript
// Change this line:
videoUrl={`/api/videos/${selectedVideo.id}/stream`}

// To your server endpoint:
videoUrl={`https://your-server.com/api/videos/${selectedVideo.id}/stream`}
```

2. **Replace mock data** in `src/data/mockVideos.ts` with actual API calls to your server

3. **Configure CORS** on your video server to allow requests from your domain

### Server Requirements

Your video server should support:
- **Range requests** for video seeking
- **CORS headers** for cross-origin requests
- **Video streaming** with proper MIME types
- **Authentication** (if needed)

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # App header with logo and controls
│   ├── VideoCard.tsx   # Individual video card component
│   ├── VideoGrid.tsx   # Grid layout for videos
│   └── VideoPlayer.tsx # Custom video player
├── data/
│   └── mockVideos.ts   # Sample video data
├── types/
│   └── Video.ts        # TypeScript interfaces
├── App.tsx             # Main app component
└── index.tsx           # App entry point
```

## Customization

### Adding New Features

- **User Authentication**: Add login/logout functionality
- **Playlists**: Create and manage video playlists
- **Favorites**: Mark videos as favorites
- **Comments**: Add commenting system
- **Ratings**: Rate and review videos

### Styling

The app uses CSS modules for styling. Main color scheme:
- Primary: `#ff6b6b` (Red)
- Secondary: `#4ecdc4` (Teal)
- Background: `#0a0a0a` (Dark)
- Cards: `#1a1a1a` (Dark Gray)

## Security Considerations

- Implement proper authentication and authorization
- Validate all user inputs
- Use HTTPS for video streaming
- Implement rate limiting
- Sanitize file paths to prevent directory traversal

## Performance Optimization

- Enable video compression
- Implement lazy loading for video thumbnails
- Use CDN for video delivery
- Optimize video formats (WebM, MP4)
- Implement caching strategies

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or support, please open an issue on GitHub.
