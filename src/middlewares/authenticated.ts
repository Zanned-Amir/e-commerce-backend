import { Request, Response, NextFunction } from 'express';
import { JWTUtils, AppError } from '../utils/index';
import {catchAsync} from '../utils/index';
import jwt from 'jsonwebtoken';
import { UserInvalidToken } from '../models/index';

class Authenticated {
   protect = catchAsync(async (req: Request, res: Response, next: NextFunction) =>{
    let token;
   
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
   

    if (!token) {
      return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }

    if (  await UserInvalidToken.findOne({ token })) {
      return next(new AppError('Invalid token. Please log in again.', 401));
    }

    try {
      const decoded = await JWTUtils.verify(token);
     
      (req as Request & { user?: { id: string } }).user = { id: decoded.id };
      (req as Request & { acessToken?: { value: string ,  exp: number } }).acessToken = { value: token, exp: decoded.exp };
    
      next();
    } catch (error) {
   
      if( error instanceof jwt.TokenExpiredError) {
        return next(new AppError('Your token has expired! Please log in again.', 401));
      }
      else if (error instanceof jwt.JsonWebTokenError) {
        return next(new AppError('Invalid token. Please log in again.', 401));
      }
      if(error instanceof AppError) {
        return next(error);
      }
      return next(new AppError('Something went wrong', 500));
    }  
  });


}

export default Authenticated;
