import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import logger from "../utils/logger";

export const validateRequest = (schema: Schema) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedBody = await schema.validateAsync(req.body, {
        abortEarly: false,
        stripUnknown: true
      });
      
      // Replace request body with validated data
      req.body = validatedBody;
      return next();
    } catch (error: any) {
      logger.error('Validation error:', error);
      
      // Format Joi validation errors
      if (error.isJoi) {
        return res.status(400).json({
          status: 'error',
          message: 'Validation error',
          errors: error.details.map((detail: any) => ({
            field: detail.path.join('.'),
            message: detail.message
          }))
        });
      }

      return res.status(400).json({
        status: 'error',
        message: error.message
      });
    }
  }; 