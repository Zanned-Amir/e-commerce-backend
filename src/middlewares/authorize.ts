import { AppError } from '../utils/index';
import { User } from '../models/index';
import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/index';

const authorize = (...roles: string[]) => {
  return catchAsync(async (req: Request & { user?: { id: string } }, res: Response, next: NextFunction) => {
    const id = req.user?.id;
    console.log(id);
    if (!id) {
      throw new AppError('You are not logged in! Please log in to get access.', 401);
    }
    const user = await User.findById(id);
    if (!user) {
      throw new AppError('The user belonging to this token does no longer exist.', 401);
    }
    if (!roles.includes(user.role)) {
      throw new AppError('You do not have permission to perform this action', 403);
    }

    next();
  });
};

export default authorize;