class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      Error.captureStackTrace(this, this.constructor); // Capture stack trace for debugging
    }
  }
  
export default AppError  