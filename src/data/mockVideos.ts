import { Video } from '../types/Video';

export const mockVideos: Video[] = [
  {
    id: 'sample-1',
    name: 'Amazing Nature Documentary',
    filename: 'nature-doc.mp4',
    size: 157286400, // 150MB
    mimeType: 'video/mp4',
    extension: '.mp4',
    lastModified: new Date('2024-01-15').toISOString(),
    duration: 3600, // 1 hour
    thumbnail: 'https://via.placeholder.com/320x240/1e293b/3b82f6?text=Nature+Doc'
  },
  {
    id: 'sample-2',
    name: 'Tech Conference 2024',
    filename: 'tech-conference.mkv',
    size: 524288000, // 500MB
    mimeType: 'video/x-matroska',
    extension: '.mkv',
    lastModified: new Date('2024-01-20').toISOString(),
    duration: 7200, // 2 hours
    thumbnail: 'https://via.placeholder.com/320x240/1e293b/3b82f6?text=Tech+Conference'
  },
  {
    id: 'sample-3',
    name: 'Cooking Tutorial - Pasta',
    filename: 'cooking-pasta.avi',
    size: 89128960, // 85MB
    mimeType: 'video/x-msvideo',
    extension: '.avi',
    lastModified: new Date('2024-01-25').toISOString(),
    duration: 1800, // 30 minutes
    thumbnail: 'https://via.placeholder.com/320x240/1e293b/3b82f6?text=Cooking+Tutorial'
  },
  {
    id: 'sample-4',
    name: 'Music Video - Summer Vibes',
    filename: 'summer-vibes.mov',
    size: 73400320, // 70MB
    mimeType: 'video/quicktime',
    extension: '.mov',
    lastModified: new Date('2024-01-30').toISOString(),
    duration: 240, // 4 minutes
    thumbnail: 'https://via.placeholder.com/320x240/1e293b/3b82f6?text=Music+Video'
  },
  {
    id: 'sample-5',
    name: 'Gaming Highlights',
    filename: 'gaming-highlights.webm',
    size: 209715200, // 200MB
    mimeType: 'video/webm',
    extension: '.webm',
    lastModified: new Date('2024-02-01').toISOString(),
    duration: 900, // 15 minutes
    thumbnail: 'https://via.placeholder.com/320x240/1e293b/3b82f6?text=Gaming+Highlights'
  },
  {
    id: 'sample-6',
    name: 'Travel Vlog - Japan',
    filename: 'japan-travel.mp4',
    size: 314572800, // 300MB
    mimeType: 'video/mp4',
    extension: '.mp4',
    lastModified: new Date('2024-02-05').toISOString(),
    duration: 2700, // 45 minutes
    thumbnail: 'https://via.placeholder.com/320x240/1e293b/3b82f6?text=Travel+Vlog'
  },
  {
    id: 'sample-7',
    name: 'Educational Series - Math',
    filename: 'math-lesson.m4v',
    size: 125829120, // 120MB
    mimeType: 'video/x-m4v',
    extension: '.m4v',
    lastModified: new Date('2024-02-10').toISOString(),
    duration: 1800, // 30 minutes
    thumbnail: 'https://via.placeholder.com/320x240/1e293b/3b82f6?text=Math+Lesson'
  },
  {
    id: 'sample-8',
    name: 'Fitness Workout',
    filename: 'workout-session.flv',
    size: 104857600, // 100MB
    mimeType: 'video/x-flv',
    extension: '.flv',
    lastModified: new Date('2024-02-15').toISOString(),
    duration: 1200, // 20 minutes
    thumbnail: 'https://via.placeholder.com/320x240/1e293b/3b82f6?text=Workout+Session'
  }
];

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};
