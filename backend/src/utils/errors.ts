import createHttpError from 'http-errors';

export class AppError extends createHttpError.HttpError {
  constructor(statusCode: number, message: string, details?: any) {
    super(statusCode, message);
    this.name = this.constructor.name;
    this.details = details;
  }
}

export const throwError = (statusCode: number, message: string, details?: any) => {
  throw new AppError(statusCode, message, details);
}; 