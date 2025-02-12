import { db } from "../config/database";
import { comments } from "../models/commentModel";
import { eq } from "drizzle-orm";

export class CommentRepository {
  async createComment(data: {
    videoId: number;
    userId: number;
    content: string;
  }) {
    const result = await db.insert(comments).values(data).returning();
    return result;
  }

  async getCommentsByVideoId(videoId: number) {
    const result = await db
      .select()
      .from(comments)
      .where(eq(comments.videoId, videoId));
    return result;
  }

  async deleteComment(id: number) {
    const result = await db
      .delete(comments)
      .where(eq(comments.id, id))
      .returning();
    return result;
  }
}
