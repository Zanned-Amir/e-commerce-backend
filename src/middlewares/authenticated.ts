import { Request, Response, NextFunction } from 'express';
import { JWTUtils, AppError } from '../utils/index';

class Authenticated {
  async protect(req: Request, res: Response, next: NextFunction) {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }

    try {
      const decoded = await JWTUtils.verify(token);
     
      (req as Request & { user?: { id: string } }).user = { id: decoded.id };
      next();
    } catch (err) {
      return next(new AppError('Invalid token or token expired', 401));
    }
  }
}

export default Authenticated;
