/**
 * Custom error handler class
 * Extends the built-in Error class with status code support
 */
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    // Create a stack trace for debugging
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler; 