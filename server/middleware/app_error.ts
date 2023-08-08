export class AppError extends Error {
  statusCode: number;
  status: any;
  isOperational: boolean;
  constructor(message: string, statusCode: number) {
    super(message);
    // check status code
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    // capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}
