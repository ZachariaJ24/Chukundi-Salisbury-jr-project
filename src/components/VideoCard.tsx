import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlayIcon, ServerIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { Video } from '../types/Video';
import { videoService } from '../services/videoService';
import './VideoCard.css';

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const [imageError, setImageError] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const thumbnailUrl = videoService.getVideoThumbnailUrl(video.filename);
  const fallbackUrl = `data:image/svg+xml,${encodeURIComponent(`
    <svg width="320" height="240" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#333"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#888" font-family="Arial, sans-serif" font-size="14">
        ${video.name}
      </text>
    </svg>
  `)}`;

  return (
    <Link to={`/video/${encodeURIComponent(video.filename)}`} className="video-card">
      <div className="video-thumbnail">
        <img
          src={imageError ? fallbackUrl : thumbnailUrl}
          alt={video.name}
          onError={() => setImageError(true)}
          loading="lazy"
        />
        <div className="play-overlay">
          <PlayIcon className="play-icon" />
        </div>
      </div>
      
      <div className="video-info">
        <h3 className="video-title" title={video.name}>
          {video.name}
        </h3>
        
        <div className="video-details">
          <div className="detail">
            <ServerIcon className="detail-icon" />
            <span>{videoService.formatFileSize(video.size)}</span>
          </div>
          
          <div className="detail">
            <CalendarIcon className="detail-icon" />
            <span>{formatDate(video.lastModified)}</span>
          </div>
        </div>
        
        <div className="video-extension">
          {video.extension.toUpperCase()}
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
