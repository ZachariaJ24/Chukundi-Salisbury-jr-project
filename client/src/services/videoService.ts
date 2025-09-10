import axios from 'axios';
import { Video, VideoMetadata } from '../types/Video';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const videoService = {
  async getVideos(): Promise<Video[]> {
    const response = await api.get('/videos');
    return response.data;
  },

  async getVideoMetadata(filename: string): Promise<VideoMetadata> {
    const response = await api.get(`/videos/${filename}/metadata`);
    return response.data;
  },

  getVideoStreamUrl(filename: string): string {
    return `${API_BASE_URL}/videos/${filename}/stream`;
  },

  getVideoThumbnailUrl(filename: string): string {
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
