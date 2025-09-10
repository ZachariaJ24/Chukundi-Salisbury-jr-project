import React from 'react';
import { Video } from '../types/Video';
import './VideoCard.css';

interface VideoCardProps {
  video: Video;
  onClick: (video: Video) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown size';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return 'Unknown duration';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="video-card" onClick={() => onClick(video)}>
      <div className="video-thumbnail">
        {video.thumbnail ? (
          <img src={video.thumbnail} alt={video.title} />
        ) : (
          <div className="placeholder-thumbnail">
            <span>🎬</span>
          </div>
        )}
        <div className="play-overlay">
          <div className="play-button">▶️</div>
        </div>
        {video.duration && (
          <div className="duration-badge">
            {formatDuration(video.duration)}
          </div>
        )}
      </div>
      
      <div className="video-info">
        <h3 className="video-title">{video.title}</h3>
        {video.description && (
          <p className="video-description">{video.description}</p>
        )}
        
        <div className="video-meta">
          {video.year && (
            <span className="meta-item">📅 {video.year}</span>
          )}
          {video.genre && (
            <span className="meta-item">🎭 {video.genre}</span>
          )}
          {video.quality && (
            <span className="meta-item">📺 {video.quality}</span>
          )}
          {video.fileSize && (
            <span className="meta-item">💾 {formatFileSize(video.fileSize)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
