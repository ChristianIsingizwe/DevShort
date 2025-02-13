import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import { AppError } from '../utils/errors';
import logger from '../utils/logger';
import { ERROR_MESSAGES } from '../constants/errorMessages';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error('Error:', {
    message: error.message,
    stack: error.stack,
    path: req.path,
    method: req.method,
  });

  // Handle http-errors
  if (createHttpError.isHttpError(error)) {
    return res.status(error.status).json({
      status: 'error',
      message: error.message,
      code: error.status,
      ...(error instanceof AppError && error.details && { details: error.details }),
    });
  }

  // Handle validation errors (Joi)
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      status: 'error',
      message: ERROR_MESSAGES.VALIDATION.INVALID_REQUEST,
      code: 400,
      details: error.message,
    });
  }

  // Handle unknown errors
  return res.status(500).json({
    status: 'error',
    message: ERROR_MESSAGES.SERVER.INTERNAL_ERROR,
    code: 500,
  });
}; 