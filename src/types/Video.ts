export interface Video {
  id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  duration?: number;
  fileSize?: number;
  uploadDate?: string;
  genre?: string;
  year?: number;
  quality?: string;
}

export interface VideoListResponse {
  videos: Video[];
  total: number;
  page: number;
  pageSize: number;
}
