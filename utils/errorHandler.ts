// utils/errorHandler.ts
import { ZodError } from "zod";

export function formatError(error: any) {

  // log stack trace for debugging
  console.error(error.stack);

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    return {
      status: 400,
      errors: error.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      })),
    };
  }

  // Handle Mongoose duplicate key error
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    return {
      status: 400,
      errors: [{ path: field, message: `${field} already exists` }],
    };
  }

  // Fallback for other errors
  return {
    status: error.status || 500,
    errors: [{ message: error.message || "Internal server error" }],
  };
}