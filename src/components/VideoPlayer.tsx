import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeftIcon, 
  PlayIcon, 
  PauseIcon, 
  SpeakerWaveIcon, 
  SpeakerXMarkIcon, 
  ArrowsPointingOutIcon, 
  ArrowPathIcon 
} from '@heroicons/react/24/outline';
import { Video } from '../types/Video';
import { videoService } from '../services/videoService';
import './VideoPlayer.css';

interface VideoPlayerProps {
  videos: Video[];
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videos }) => {
  const { filename } = useParams<{ filename: string }>();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [video, setVideo] = useState<Video | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (filename) {
      const decodedFilename = decodeURIComponent(filename);
      const foundVideo = videos.find(v => v.filename === decodedFilename);
      if (foundVideo) {
        setVideo(foundVideo);
      } else {
        setError('Video not found');
      }
    }
  }, [filename, videos]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleLoadedMetadata = () => {
      setDuration(videoElement.duration);
      setLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(videoElement.currentTime);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    videoElement.addEventListener('timeupdate', handleTimeUpdate);
    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePause);

    return () => {
      videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePause);
    };
  }, [video]);

  const togglePlay = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (isPlaying) {
      videoElement.pause();
    } else {
      videoElement.play();
    }
  };

  const toggleMute = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    videoElement.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    const videoElement = videoRef.current;
    if (!videoElement) return;

    videoElement.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    const videoElement = videoRef.current;
    if (!videoElement) return;

    videoElement.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleFullscreen = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (!isFullscreen) {
      if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const restart = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    videoElement.currentTime = 0;
    setCurrentTime(0);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (error) {
    return (
      <div className="video-player-error">
        <h2>Demo Mode</h2>
        <p>This is a demo version. In production, this would stream your actual video files.</p>
        <p>Selected video: {video?.name || 'Unknown'}</p>
        <button onClick={() => navigate('/')} className="back-btn">
          <ArrowLeftIcon className="back-icon" />
          Back to Library
        </button>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="video-player-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  const videoUrl = videoService.getVideoStreamUrl(video.filename);

  return (
    <div className="video-player-container">
      <div className="video-player-header">
        <button onClick={() => navigate('/')} className="back-btn">
          <ArrowLeftIcon className="back-icon" />
          Back to Library
        </button>
        <h1 className="video-title">{video.name}</h1>
      </div>

      <div 
        className="video-wrapper"
        onMouseMove={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <video
          ref={videoRef}
          src={videoUrl}
          className="video-element"
          onClick={togglePlay}
        />

        {loading && (
          <div className="video-loading">
            <div className="spinner"></div>
          </div>
        )}

        <div className={`video-controls ${showControls ? 'show' : ''}`}>
          <div className="progress-container">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="progress-bar"
            />
          </div>

          <div className="controls-row">
            <div className="left-controls">
              <button onClick={togglePlay} className="control-btn">
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>

              <button onClick={restart} className="control-btn">
                <ArrowPathIcon />
              </button>

              <div className="volume-control">
                <button onClick={toggleMute} className="control-btn">
                  {isMuted ? <SpeakerXMarkIcon /> : <SpeakerWaveIcon />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="volume-slider"
                />
              </div>

              <div className="time-display">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <div className="right-controls">
              <button onClick={toggleFullscreen} className="control-btn">
                <ArrowsPointingOutIcon />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="video-info-panel">
        <div className="video-details">
          <div className="detail-item">
            <strong>File Size:</strong> {videoService.formatFileSize(video.size)}
          </div>
          <div className="detail-item">
            <strong>Format:</strong> {video.extension.toUpperCase()}
          </div>
          <div className="detail-item">
            <strong>Last Modified:</strong> {new Date(video.lastModified).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
