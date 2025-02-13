import createHttpError from "http-errors";

export class AppError extends createHttpError.HttpError {
  status: number;
  details?: any;

  constructor(statusCode: number, message: string, details?: any) {
    super(message);
    this.status = statusCode;
    this.name = this.constructor.name;
    this.details = details;
  }
}

export const throwError = (
  statusCode: number,
  message: string,
  details?: any
) => {
  throw new AppError(statusCode, message, details);
};
