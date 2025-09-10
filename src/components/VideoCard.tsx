import React from 'react';
import { Link } from 'react-router-dom';
import { PlayIcon, ServerIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { Video } from '../types/Video';
import { formatFileSize, formatDuration } from '../data/mockVideos';
import './VideoCard.css';

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Link to={`/video/${video.id}`} className="video-card">
      <div className="video-thumbnail">
        <img
          src={video.thumbnail || `https://via.placeholder.com/320x240/1e293b/3b82f6?text=${encodeURIComponent(video.name)}`}
          alt={video.name}
          loading="lazy"
        />
        <div className="play-overlay">
          <PlayIcon className="play-icon" />
        </div>
        {video.duration && (
          <div className="duration-badge">
            {formatDuration(video.duration)}
          </div>
        )}
      </div>
      
      <div className="video-info">
        <h3 className="video-title" title={video.name}>
          {video.name}
        </h3>
        
        <div className="video-details">
          <div className="detail">
            <ServerIcon className="detail-icon" />
            <span>{formatFileSize(video.size)}</span>
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
