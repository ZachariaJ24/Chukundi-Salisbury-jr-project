export interface Video {
  id: string;
  name: string;
  filename: string;
  size: number;
  mimeType: string;
  extension: string;
  lastModified: string;
  duration?: number;
  thumbnail?: string;
}

export interface VideoMetadata {
  duration: number;
  size: number;
  bitrate: number;
  video: {
    codec: string;
    width: number;
    height: number;
    fps: number;
  } | null;
  audio: {
    codec: string;
    channels: number;
    sampleRate: number;
  } | null;
}
