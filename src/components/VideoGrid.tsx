import React from 'react';
import { PlayIcon, ServerIcon } from '@heroicons/react/24/outline';
import { Video } from '../types/Video';
import { formatFileSize } from '../data/mockVideos';
import VideoCard from './VideoCard';
import './VideoGrid.css';

interface VideoGridProps {
  videos: Video[];
  loading: boolean;
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos, loading }) => {
  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  const totalSize = videos.reduce((total, video) => total + video.size, 0);

  return (
    <div className="video-grid-container">
      <div className="video-stats">
        <div className="stat">
          <PlayIcon className="stat-icon" />
          <span>{videos.length} videos</span>
        </div>
        <div className="stat">
          <ServerIcon className="stat-icon" />
          <span>{formatFileSize(totalSize)}</span>
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
