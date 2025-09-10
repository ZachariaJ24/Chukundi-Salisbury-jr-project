import { Video } from '../types/Video';

// Mock video data - replace with actual API calls to your server
export const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Sample Movie 1',
    description: 'A great sample movie for testing the video streaming app.',
    thumbnail: 'https://via.placeholder.com/300x200/ff6b6b/ffffff?text=Movie+1',
    duration: 7200, // 2 hours in seconds
    fileSize: 1500000000, // 1.5GB
    uploadDate: '2024-01-15',
    genre: 'Action',
    year: 2024,
    quality: '1080p'
  },
  {
    id: '2',
    title: 'Sample Movie 2',
    description: 'Another excellent movie with amazing visuals and story.',
    thumbnail: 'https://via.placeholder.com/300x200/4ecdc4/ffffff?text=Movie+2',
    duration: 5400, // 1.5 hours
    fileSize: 1200000000, // 1.2GB
    uploadDate: '2024-01-10',
    genre: 'Drama',
    year: 2023,
    quality: '4K'
  },
  {
    id: '3',
    title: 'Sample Documentary',
    description: 'An informative documentary about technology and innovation.',
    thumbnail: 'https://via.placeholder.com/300x200/45b7d1/ffffff?text=Documentary',
    duration: 3600, // 1 hour
    fileSize: 800000000, // 800MB
    uploadDate: '2024-01-05',
    genre: 'Documentary',
    year: 2024,
    quality: '720p'
  },
  {
    id: '4',
    title: 'Sample Comedy Show',
    description: 'A hilarious comedy show that will make you laugh out loud.',
    thumbnail: 'https://via.placeholder.com/300x200/f9ca24/ffffff?text=Comedy',
    duration: 1800, // 30 minutes
    fileSize: 400000000, // 400MB
    uploadDate: '2024-01-01',
    genre: 'Comedy',
    year: 2023,
    quality: '1080p'
  },
  {
    id: '5',
    title: 'Sample Sci-Fi Adventure',
    description: 'An epic science fiction adventure set in the distant future.',
    thumbnail: 'https://via.placeholder.com/300x200/6c5ce7/ffffff?text=Sci-Fi',
    duration: 9000, // 2.5 hours
    fileSize: 2000000000, // 2GB
    uploadDate: '2023-12-28',
    genre: 'Sci-Fi',
    year: 2023,
    quality: '4K'
  },
  {
    id: '6',
    title: 'Sample Horror Film',
    description: 'A spine-chilling horror movie that will keep you on the edge of your seat.',
    thumbnail: 'https://via.placeholder.com/300x200/2d3436/ffffff?text=Horror',
    duration: 6300, // 1.75 hours
    fileSize: 1100000000, // 1.1GB
    uploadDate: '2023-12-20',
    genre: 'Horror',
    year: 2023,
    quality: '1080p'
  }
];

// Function to simulate API call delay
export const fetchVideos = async (): Promise<Video[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockVideos);
    }, 1000); // Simulate 1 second delay
  });
};
