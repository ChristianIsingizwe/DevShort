import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import logger from "../utils/logger";
import createHttpError from 'http-errors';
import { ERROR_MESSAGES } from '../constants/errorMessages';

export const validateRequest = (schema: Schema) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedBody = await schema.validateAsync(req.body, {
        abortEarly: false,
        stripUnknown: true
      });

      req.body = validatedBody;
      return next();
    } catch (error: any) {
      logger.error('Validation error:', error);
      
      if (error.isJoi) {
        throw createHttpError(400, ERROR_MESSAGES.VALIDATION.INVALID_REQUEST, {
          details: error.details.map((detail: any) => ({
            field: detail.path.join('.'),
            message: detail.message
          }))
        });
      }

      next(error);
    }
  }; 