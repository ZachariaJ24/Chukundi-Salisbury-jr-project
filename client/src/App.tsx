import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import VideoGrid from './components/VideoGrid';
import VideoPlayer from './components/VideoPlayer';
import { Video } from './types/Video';
import { videoService } from './services/videoService';
import './App.css';

function App() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      setLoading(true);
      const videoList = await videoService.getVideos();
      setVideos(videoList);
      setError(null);
    } catch (err) {
      setError('Failed to load videos. Please check if the server is running.');
      console.error('Error loading videos:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
      <div className="App">
        <Header onRefresh={loadVideos} />
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                <VideoGrid 
                  videos={videos} 
                  loading={loading} 
                  error={error}
                  onRefresh={loadVideos}
                />
              } 
            />
            <Route 
              path="/video/:filename" 
              element={<VideoPlayer videos={videos} />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
