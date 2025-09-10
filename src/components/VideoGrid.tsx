import React, { useState } from 'react';
import { Video } from '../types/Video';
import VideoCard from './VideoCard';
import VideoPlayer from './VideoPlayer';
import './VideoGrid.css';

interface VideoGridProps {
  videos: Video[];
  loading?: boolean;
  error?: string;
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos, loading, error }) => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'title' | 'year' | 'duration' | 'uploadDate'>('title');
  const [filterGenre, setFilterGenre] = useState<string>('all');

  const genres = Array.from(new Set(videos.map(v => v.genre).filter(Boolean)));

  const filteredAndSortedVideos = videos
    .filter(video => {
      const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           video.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = filterGenre === 'all' || video.genre === filterGenre;
      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'year':
          return (b.year || 0) - (a.year || 0);
        case 'duration':
          return (b.duration || 0) - (a.duration || 0);
        case 'uploadDate':
          return new Date(b.uploadDate || '').getTime() - new Date(a.uploadDate || '').getTime();
        default:
          return 0;
      }
    });

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
  };

  const handleClosePlayer = () => {
    setSelectedVideo(null);
  };

  if (loading) {
    return (
      <div className="video-grid-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading videos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="video-grid-container">
        <div className="error-container">
          <h3>Error loading videos</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="video-grid-container">
      <div className="video-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search videos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-controls">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="filter-select"
          >
            <option value="title">Sort by Title</option>
            <option value="year">Sort by Year</option>
            <option value="duration">Sort by Duration</option>
            <option value="uploadDate">Sort by Upload Date</option>
          </select>
          
          <select
            value={filterGenre}
            onChange={(e) => setFilterGenre(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Genres</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="video-stats">
        <p>Showing {filteredAndSortedVideos.length} of {videos.length} videos</p>
      </div>

      {filteredAndSortedVideos.length === 0 ? (
        <div className="no-videos">
          <h3>No videos found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="video-grid">
          {filteredAndSortedVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onClick={handleVideoClick}
            />
          ))}
        </div>
      )}

      {selectedVideo && (
        <VideoPlayer
          videoUrl={`/api/videos/${selectedVideo.id}/stream`}
          title={selectedVideo.title}
          onClose={handleClosePlayer}
        />
      )}
    </div>
  );
};

export default VideoGrid;
