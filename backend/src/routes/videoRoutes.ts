import express from 'express';
import { VideoController, uploadLimiter } from '../controllers/VideoController';
import { validateRequest } from '../middleware/validateRequest';
import { videoUploadSchema } from '../schemas/videoSchema';
import multer from 'multer';

const router = express.Router();
const videoController = new VideoController();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  '/upload',
  uploadLimiter,
  upload.single('video'),
  validateRequest(videoUploadSchema),
  videoController.uploadVideo.bind(videoController)
);

export default router;
