import { Request, Response, NextFunction } from "express";
import { VideoService } from "../services/VideoService";
import { videoUploadSchema } from "../schemas/videoSchema";
import logger from "../utils/logger";
import rateLimit from "express-rate-limit";

export const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  message: "Too many uploads from this IP, please try again after 15 minutes"
});

export class VideoController {
  private videoService: VideoService;

  constructor() {
    this.videoService = new VideoService();
  }

  async uploadVideo(req: Request, res: Response, next: NextFunction) {
    try {
      const fileBuffer = req.file?.buffer;
      if (!fileBuffer) {
        return res.status(400).json({ 
          status: 'error',
          message: "Video file is required." 
        });
      }

      const validatedData = await videoUploadSchema.parseAsync(req.body);

      logger.info(`Starting video upload for user ${validatedData.userId}`);

      const createdVideo = await this.videoService.processVideoUpload({
        ...validatedData,
        fileBuffer,
      });

      logger.info(`Successfully uploaded video ${createdVideo.id}`);

      res.status(201).json({
        status: 'success',
        data: { video: createdVideo }
      });
    } catch (error) {
      logger.error('Error in upload video controller:', error);
      
      if (error instanceof Error) {
        return res.status(400).json({
          status: 'error',
          message: error.message
        });
      }
      
      next(error);
    }
  }
}
