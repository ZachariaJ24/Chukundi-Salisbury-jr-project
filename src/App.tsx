import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import VideoGrid from './components/VideoGrid';
import { Video } from './types/Video';
import { fetchVideos } from './data/mockVideos';
import './App.css';

function App() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadVideos = async () => {
    try {
      setLoading(true);
      setError(null);
      const videoData = await fetchVideos();
      setVideos(videoData);
    } catch (err) {
      setError('Failed to load videos. Please try again.');
      console.error('Error loading videos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  return (
    <div className="App">
      <Header onRefresh={loadVideos} />
      <main className="main-content">
        <VideoGrid 
          videos={videos} 
          loading={loading} 
          error={error || undefined} 
        />
      </main>
    </div>
  );
}

export default App;
