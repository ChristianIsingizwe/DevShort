import { db } from "../config/database";
import { comments } from "../models/commentModel";
import { likes } from "../models/likeModel";
import { videos } from "../models/videoModel";
import { eq } from "drizzle-orm";

export class VideoRepository {
  async createVideo(data: {
    userId: number;
    title: string;
    description?: string;
    cloudinaryUrl: string;
    cloudinaryUrl480p: string;
    cloudinaryUrl720p: string;
    cloudinaryUrl1080p: string;
    duration?: number;
  }) {
    const result = await db.insert(videos).values(data).returning();
    return result;
  }

  async getVideoById(id: number) {
    const result = await db.select().from(videos).where(eq(videos.id, id));
    return result[0];
  }

  async updateVideo(
    id: number,
    data: Partial<{
      title: string;
      description?: string;
      cloudinaryUrl?: string;
      cloudinaryUrl480p?: string;
      cloudinaryUrl720p?: string;
      cloudinaryUrl1080p?: string;
      duration?: number;
    }>
  ) {
    const result = await db
      .update(videos)
      .set(data)
      .where(eq(videos.id, id))
      .returning();
    return result[0];
  }

  async deleteVideo(id: number) {
    const result = await db.delete(videos).where(eq(videos.id, id)).returning();
    if (result){
      await db.delete(likes).where(eq(likes.videoId, id));
      await db.delete(comments).where(eq(comments.videoId, id));
      }
    return result;
  }

  async getVideos() {
    const result = await db.select().from(videos);
    return result;
  }
}
