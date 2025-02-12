export interface IVideo {
  id: number;
  userId: number;
  title: string;
  description?: string;
  cloudinaryUrl: string;
  cloudinaryUrl480p: string;
  cloudinaryUrl720p: string;
  cloudinaryUrl1080p: string;
  thumbnailUrl?: string;
  duration?: number;
  createdAt: Date;
  updatedAt: Date;
}