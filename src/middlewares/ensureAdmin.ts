import { NextFunction, Request, Response } from 'express';
import { AppError } from '../shared/errors/AppError';

export function ensureAdmin(request: Request, response: Response, next: NextFunction) {
    const { admin } = request.body;

    if (admin) {
        return next();
    }
    const err = new AppError('Unauthorized', 401);

    return response.status(err.statusCode).json({
        status: 'error',
        error: err.message,
    });
}
