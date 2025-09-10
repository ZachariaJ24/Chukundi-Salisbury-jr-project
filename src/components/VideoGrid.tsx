import React from 'react';
import { PlayIcon, ServerIcon } from '@heroicons/react/24/outline';
import { Video } from '../types/Video';
import { videoService } from '../services/videoService';
import VideoCard from './VideoCard';
import './VideoGrid.css';

interface VideoGridProps {
  videos: Video[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos, loading, error, onRefresh }) => {
  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          {error}
        </div>
        <button className="retry-btn" onClick={onRefresh}>
          Try Again
        </button>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="empty-state">
        <PlayIcon className="empty-icon" />
        <h2>No videos found</h2>
        <p>Add some video files to your server directory to get started.</p>
        <button className="retry-btn" onClick={onRefresh}>
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="video-grid-container">
      <div className="video-stats">
        <div className="stat">
          <PlayIcon className="stat-icon" />
          <span>{videos.length} videos</span>
        </div>
        <div className="stat">
          <ServerIcon className="stat-icon" />
          <span>{videoService.formatFileSize(videos.reduce((total, video) => total + video.size, 0))}</span>
        </div>
      </div>
      
      <div className="video-grid">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default VideoGrid;
