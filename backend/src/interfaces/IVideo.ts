export interface IVideo {
  id: number;
  userId: number;
  title: string;
  description?: string;
  cloudinaryUrl: string;
  thumbnailUrl?: string;
  duration?: number;
  createdAt: Date;
  updatedAt: Date;
}
