import { Request, Response , NextFunction } from 'express';
import AppError from '../utils/app.error';
import catchAsync from '../utils/catch.async';
import {AuthService} from '../services/index';


class  AuthController {

          authService: AuthService;
          constructor() {
                    this.authService = new AuthService();
                    }

          register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
                    const data = req.body;
                    const result = await this.authService.register(data);
                    res.status(201).json({
                              status: 'success',
                              token: result.token,
                              refreshToken: result.refreshToken,
                              data: {
                                        user: result.user
                              }
                   
                     });
          });

          login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
                    const data = req.body;
                    const result = await this.authService.login(data);
                    res.status(200).json({
                              status: 'success',
                              token: result.token,
                              refreshToken: result.refreshToken,
                              data: {
                                        user: result.user
                              }
                   
          });
          });




     

}

export default AuthController;
