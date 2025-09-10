import axios from 'axios';
import { Video, VideoMetadata } from '../types/Video';
import { mockVideos, mockVideoMetadata } from '../data/mockVideos';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Check if we're in demo mode (no backend available)
const isDemoMode = !process.env.REACT_APP_API_URL || process.env.REACT_APP_API_URL.includes('localhost');

export const videoService = {
  async getVideos(): Promise<Video[]> {
    if (isDemoMode) {
      // Return mock data for demo
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockVideos), 500); // Simulate API delay
      });
    }
    
    try {
      const response = await api.get('/videos');
      return response.data;
    } catch (error) {
      console.warn('Backend not available, using mock data');
      return mockVideos;
    }
  },

  async getVideoMetadata(filename: string): Promise<VideoMetadata> {
    if (isDemoMode) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockVideoMetadata), 300);
      });
    }
    
    try {
      const response = await api.get(`/videos/${filename}/metadata`);
      return response.data;
    } catch (error) {
      console.warn('Backend not available, using mock metadata');
      return mockVideoMetadata;
    }
  },

  getVideoStreamUrl(filename: string): string {
    if (isDemoMode) {
      // Return a placeholder video URL for demo
      return 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
    }
    return `${API_BASE_URL}/videos/${filename}/stream`;
  },

  getVideoThumbnailUrl(filename: string): string {
    if (isDemoMode) {
      // Return placeholder thumbnails for demo
      const thumbnails = [
        'https://via.placeholder.com/320x240/1e293b/3b82f6?text=Nature+Doc',
        'https://via.placeholder.com/320x240/1e293b/3b82f6?text=Tech+Conference',
        'https://via.placeholder.com/320x240/1e293b/3b82f6?text=Cooking+Tutorial',
        'https://via.placeholder.com/320x240/1e293b/3b82f6?text=Music+Video',
        'https://via.placeholder.com/320x240/1e293b/3b82f6?text=Gaming+Highlights',
        'https://via.placeholder.com/320x240/1e293b/3b82f6?text=Travel+Vlog',
        'https://via.placeholder.com/320x240/1e293b/3b82f6?text=Math+Lesson',
        'https://via.placeholder.com/320x240/1e293b/3b82f6?text=Workout+Session'
      ];
      const index = mockVideos.findIndex(v => v.filename === filename);
      return thumbnails[index] || thumbnails[0];
    }
    return `${API_BASE_URL}/videos/${filename}/thumbnail`;
  },

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }
};
