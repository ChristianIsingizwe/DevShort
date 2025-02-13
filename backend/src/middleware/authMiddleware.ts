import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService';
import logger from '../utils/logger';
import createHttpError from 'http-errors';
import { ERROR_MESSAGES } from '../constants/errorMessages';

const authService = new AuthService();

export const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw createHttpError(401, ERROR_MESSAGES.AUTH.NO_TOKEN);
    }

    const token = authHeader.split(' ')[1];
    const user = await authService.validateToken(token);
    
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw createHttpError(401, ERROR_MESSAGES.AUTH.UNAUTHORIZED);
    }

    const userRole = (req.user as any).role;
    if (!roles.includes(userRole)) {
      throw createHttpError(403, ERROR_MESSAGES.AUTH.UNAUTHORIZED);
    }

    next();
  };
}; 