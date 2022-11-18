// eslint-disable-next-line @typescript-eslint/quotes, @typescript-eslint/no-unused-vars, no-unused-vars
import express from 'express';

declare global {
  namespace Express {
    interface Request {
      userId?: Record<string>
    }
  }
}
