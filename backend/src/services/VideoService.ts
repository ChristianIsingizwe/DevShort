// src/services/VideoService.ts
import { VideoRepository } from "../repositories/VideoRepository";
import cloudinary from "../config/cloudinary";
import { Readable } from "stream";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import logger from "../utils/logger";

ffmpeg.setFfmpegPath(ffmpegPath);

const UPLOAD_TIMEOUT = parseInt(process.env.UPLOAD_TIMEOUT || '300000', 10);
const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE || '100000000', 10); // 100MB default

export class VideoService {
  private videoRepository: VideoRepository;

  constructor() {
    this.videoRepository = new VideoRepository();
  }

  private validateFileBuffer(buffer: Buffer): void {
    if (!buffer || buffer.length === 0) {
      throw new Error("Invalid input buffer");
    }
    if (buffer.length > MAX_FILE_SIZE) {
      throw new Error(`File size exceeds maximum limit of ${MAX_FILE_SIZE / 1000000}MB`);
    }
  }

  private processVideoForResolution(
    inputBuffer: Buffer,
    resolution: number
  ): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = [];
      const timeout = setTimeout(() => {
        reject(new Error(`Video processing timeout at ${resolution}p`));
      }, UPLOAD_TIMEOUT);

      try {
        this.validateFileBuffer(inputBuffer);

        ffmpeg(Readable.from(inputBuffer))
          .videoFilters(`scale=-2:${resolution}`)
          .videoCodec("libx264")
          .outputOptions("-preset", "fast")
          .format("mp4")
          .on("error", (err) => {
            clearTimeout(timeout);
            logger.error(`Error processing video at ${resolution}p:`, err);
            reject(err);
          })
          .on("end", () => {
            clearTimeout(timeout);
            logger.info(`Successfully processed video at ${resolution}p`);
            resolve(Buffer.concat(chunks));
          })
          .on("progress", (progress) => {
            logger.debug(`Processing ${resolution}p: ${progress.percent}% done`);
          })
          .pipe()
          .on("data", (chunk: Buffer) => {
            chunks.push(chunk);
          });
      } catch (error) {
        clearTimeout(timeout);
        reject(error);
      }
    });
  }

  private async uploadToCloudinary(
    buffer: Buffer,
    options: { folder?: string; resource_type: string } = { resource_type: "video" }
  ): Promise<{ secure_url: string }> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        options,
        (error, result) => {
          if (error || !result) {
            logger.error('Cloudinary upload error:', error);
            return reject(error);
          }
          logger.info('Successfully uploaded to Cloudinary');
          resolve({ secure_url: result.secure_url });
        }
      );

      const readable = new Readable();
      readable.push(buffer);
      readable.push(null);
      readable.pipe(uploadStream);
    });
  }

  async processVideoUpload(params: {
    userId: number;
    title: string;
    description?: string;
    fileBuffer: Buffer;
    duration?: number;
  }) {
    logger.info(`Starting video upload process for user ${params.userId}`);
    
    try {
      this.validateFileBuffer(params.fileBuffer);

      const resolutions = [
        { height: 480, label: '480p' },
        { height: 720, label: '720p' },
        { height: 1080, label: '1080p' }
      ];

      const processedVideos = await Promise.all(
        resolutions.map(({ height }) => 
          this.processVideoForResolution(params.fileBuffer, height)
        )
      );

      const uploads = await Promise.all(
        processedVideos.map((video) => 
          this.uploadToCloudinary(video)
        )
      );

      const [upload480, upload720, upload1080] = uploads;

      const videoData = {
        userId: params.userId,
        title: params.title,
        description: params.description,
        cloudinaryUrl: upload1080.secure_url,
        cloudinaryUrl480p: upload480.secure_url,
        cloudinaryUrl720p: upload720.secure_url,
        cloudinaryUrl1080p: upload1080.secure_url,
        duration: params.duration,
      };

      const createdVideo = await this.videoRepository.createVideo(videoData);
      logger.info(`Successfully created video with ID ${createdVideo[0].id}`);
      
      return createdVideo[0];
    } catch (error) {
      logger.error('Error in video upload process:', error);
      throw error;
    }
  }
}
