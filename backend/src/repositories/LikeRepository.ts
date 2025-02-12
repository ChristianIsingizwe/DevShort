import { db } from "../config/database";
import { likes } from "../models/likeModel";
import { eq, and } from "drizzle-orm";

export class LikeRepository {
  async addLike(data: { videoId: number; userId: number }) {
    const result = await db.insert(likes).values(data).returning();
    return result;
  }

  async getLikesByVideoId(videoId: number) {
    const result = await db
      .select()
      .from(likes)
      .where(eq(likes.videoId, videoId));
    return result;
  }

  async removeLike(videoId: number, userId: number) {
    const result = await db
      .delete(likes)
      .where(and(eq(likes.videoId, videoId), eq(likes.userId, userId)))
      .returning();
    return result;
  }
}
