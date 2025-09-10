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
    path: '/videos/nature-doc.mp4'
  },
  {
    id: 'sample-2',
    name: 'Tech Conference 2024',
    filename: 'tech-conference.mkv',
    size: 524288000, // 500MB
    mimeType: 'video/x-matroska',
    extension: '.mkv',
    lastModified: new Date('2024-01-20').toISOString(),
    path: '/videos/tech-conference.mkv'
  },
  {
    id: 'sample-3',
    name: 'Cooking Tutorial - Pasta',
    filename: 'cooking-pasta.avi',
    size: 89128960, // 85MB
    mimeType: 'video/x-msvideo',
    extension: '.avi',
    lastModified: new Date('2024-01-25').toISOString(),
    path: '/videos/cooking-pasta.avi'
  },
  {
    id: 'sample-4',
    name: 'Music Video - Summer Vibes',
    filename: 'summer-vibes.mov',
    size: 73400320, // 70MB
    mimeType: 'video/quicktime',
    extension: '.mov',
    lastModified: new Date('2024-01-30').toISOString(),
    path: '/videos/summer-vibes.mov'
  },
  {
    id: 'sample-5',
    name: 'Gaming Highlights',
    filename: 'gaming-highlights.webm',
    size: 209715200, // 200MB
    mimeType: 'video/webm',
    extension: '.webm',
    lastModified: new Date('2024-02-01').toISOString(),
    path: '/videos/gaming-highlights.webm'
  },
  {
    id: 'sample-6',
    name: 'Travel Vlog - Japan',
    filename: 'japan-travel.mp4',
    size: 314572800, // 300MB
    mimeType: 'video/mp4',
    extension: '.mp4',
    lastModified: new Date('2024-02-05').toISOString(),
    path: '/videos/japan-travel.mp4'
  },
  {
    id: 'sample-7',
    name: 'Educational Series - Math',
    filename: 'math-lesson.m4v',
    size: 125829120, // 120MB
    mimeType: 'video/x-m4v',
    extension: '.m4v',
    lastModified: new Date('2024-02-10').toISOString(),
    path: '/videos/math-lesson.m4v'
  },
  {
    id: 'sample-8',
    name: 'Fitness Workout',
    filename: 'workout-session.flv',
    size: 104857600, // 100MB
    mimeType: 'video/x-flv',
    extension: '.flv',
    lastModified: new Date('2024-02-15').toISOString(),
    path: '/videos/workout-session.flv'
  }
];

export const mockVideoMetadata = {
  duration: 3600, // 1 hour
  size: 157286400,
  bitrate: 2000000,
  video: {
    codec: 'h264',
    width: 1920,
    height: 1080,
    fps: 30
  },
  audio: {
    codec: 'aac',
    channels: 2,
    sampleRate: 44100
  }
};
