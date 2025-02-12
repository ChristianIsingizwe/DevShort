// src/repositories/VideoRepository.ts
import { db } from "../config/database";
import { videos } from "../models/videoModel";
import { eq } from "drizzle-orm";

export class VideoRepository {
  async createVideo(data: {
    userId: number;
    title: string;
    description?: string;
    cloudinaryUrl: string;
    thumbnailUrl?: string;
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
      thumbnailUrl?: string;
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
    return result;
  }
}
