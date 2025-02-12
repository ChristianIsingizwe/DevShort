// src/models/video.model.ts
import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";

export const videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  cloudinaryUrl: text("cloudinary_url").notNull(),
  cloudinaryUrl480p: text("cloudinary_url_480p").notNull(),
  cloudinaryUrl720p: text("cloudinary_url_720p").notNull(),
  cloudinaryUrl1080p: text("cloudinary_url_1080p").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
