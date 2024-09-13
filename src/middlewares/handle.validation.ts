import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import AppError from '../utils/app.error';

const handleValidation = (req: Request, res: Response, next: NextFunction) => {
  console.log('validation');
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new AppError(errors.array()[0].msg, 400);
    return next(error);
  }

  next();
};

export default handleValidation;
