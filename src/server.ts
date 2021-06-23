import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import './database';
import { router } from './routes';
import { AppError } from './shared/errors/AppError';

const app = express();

app.use(express.json());

app.use(router);

app.use((err: AppError, request: Request, response: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      error: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(3000, () => {
  console.log('Server is running');
});
