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
          
                    const adress_ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
                    const device_info = req.headers['user-agent'];
                    const data = {...req.body, adress_ip, device_info};

                    const result = await this.authService.register(data);
                    res.status(201).json({
                              status: 'success',
                              token: result.token,
                              refreshToken: result.refreshToken,
                              data: {
                                        user: result.user,
                                        
                              }
                   
                     });
          });

          login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

                    const adress_ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
                    const device_info = req.headers['user-agent'];
                    const data = {...req.body, adress_ip, device_info};
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

          refreshToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

                    const adress_ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
                    const device_info = req.headers['user-agent'];
                    const data = {...req.body, adress_ip, device_info};
                    const result = await this.authService.refreshToken(data);
          
                    res.status(200).json({
                              status: 'success',
                              token: result?.token,
                              refreshToken: result?.refreshToken,
                   
          });
          });

          logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

                    

                    
                   
                    await this.authService.logout(req);
                    res.status(204).json({
                              status: 'success',
                              data: null
                   
          });
          });

          logoutAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

                    await this.authService.logoutAllDevices(req);
                    res.status(204).json({
                              status: 'success',
                              data: null
                   
          });
          });




     

}

export default AuthController;
