import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import VideoGrid from './components/VideoGrid';
import VideoPlayer from './components/VideoPlayer';
import { Video } from './types/Video';
import { mockVideos } from './data/mockVideos';
import './App.css';

function App() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading videos
    const loadVideos = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setVideos(mockVideos);
      setLoading(false);
    };

    loadVideos();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setVideos([...mockVideos]);
      setLoading(false);
    }, 500);
  };

  return (
    <Router>
      <div className="App">
        <Header onRefresh={handleRefresh} />
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                <VideoGrid 
                  videos={videos} 
                  loading={loading}
                />
              } 
            />
            <Route 
              path="/video/:id" 
              element={<VideoPlayer videos={videos} />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
