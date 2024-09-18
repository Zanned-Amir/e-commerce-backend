import { Request, Response , NextFunction } from 'express';
import AppError from '../utils/app.error';
import catchAsync from '../utils/catch.async';
import {AuthService, UserService} from '../services/index';
import { authenticator } from 'otplib';
import crypto from 'crypto';
import NodeCache from 'node-cache';
import dotenv from 'dotenv';
import { TokenHelper } from '../utils/index';
dotenv.config();


class  AuthController {

          authService: AuthService;
          userService: UserService;
          cache = new NodeCache();

          
          constructor() {
                    this.authService = new AuthService();
                    this.userService = new UserService();
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
                    const user = result.user;
                    if(user['2fa_enable']) {
                              const tempToken = crypto.randomUUID();
                              const ttl = process.env.CACHE_TEMPORARY_TOKEN_EXPIRATION || 300;

                              this.cache.set(process.env.CACHE_TEMPORARY_TOKEN_PREFIX+tempToken, user.id,ttl );

                              res.status(200).json({
                                        status: 'success',
                                        message: 'Please provide 2FA token',
                                        tempToken: tempToken,
                                        expiresIn: ttl
                              });
                      
                    } else  {

                    res.status(200).json({
                              status: 'success',
                              token: result.token,
                              refreshToken: result.refreshToken,
                              data: {
                                        user: {
                                                  id: user.id,
                                                  email: user.email,
                                                  first_name: user.first_name,
                                                  last_name: user.last_name,
                                                  role: user.role,
                                                  status: user.status,
                                        }
                              }
                   
                    });
                    }
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

          generate2fa = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
                    const id=  (req as any).user.id;
                    const{  qr_code}  =await this.authService.generate2fa(id);



                    res.setHeader('Content-Disposition', 'attachment; filename=qrcode.png');
                    res.status(200).type('image/png').send(qr_code);

          });

          //

          validate2fa = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

                    const {totp} = req.body;

                    if(!totp) {
                              return next(new AppError('Please provide a token', 400));
                    }

                   

                    const id = (req as any).user.id;

                    const user = await this.userService.getUserById(id);
                    if(!user) {
                              return next(new AppError('User not found', 404));
                    }
                    if(!user['2fa_enable']) {
                              return next(new AppError('2FA is not enabled', 400));
                    }

                    

                    const verified = authenticator.check(totp, user['2fa_secret']);

                    if(!verified) {
                              return next(new AppError('TOTP is not correct or has expired', 400));
                    }

                    
                    await this.userService.updateUser(id, { '2fa_enable': true });

                    res.status(200).json({
                              status: 'success',
                              message: '2FA validation successful'
                    });

          });
          get2fa = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

                    const { tempToken } = req.body;

                    if(!tempToken) {
                              return next(new AppError('Please provide a temporary token', 400));
                    }

                    const id = this.cache.get(process.env.CACHE_TEMPORARY_TOKEN_PREFIX+tempToken);

                    if(!id) {
                              return next(new AppError('Invalid temporary token', 400));
                    }

                    const user = await this.userService.getUserById(id.toString());
                    if(!user) {
                              return next(new AppError('User not found', 404));
                    }
                    const{  qr_code}  =await this.authService.generate2fa(id.toString());

                    res.setHeader('Content-Disposition', 'attachment; filename=qrcode.png');
                    res.status(200).type('image/png').send(qr_code);


                    

          });


          login2fa = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

                    const {tempToken, totp} = req.body;

                    if(!tempToken || !totp) {
                              return next(new AppError('Please fill in all fields', 400));
                    }

                    const id = this.cache.get(process.env.CACHE_TEMPORARY_TOKEN_PREFIX+tempToken);

                    
                    if(!id) {
                              return next(new AppError('Invalid temporary token', 400));
                    }

                    const user = await this.userService.getUserById(id.toString());
                    if(!user) {
                              return next(new AppError('User not found', 404));
                    }

                    const secret = user['2fa_secret'];
                    
                    const verified = authenticator.check(totp, secret);

                    if(!verified) {
                              return next(new AppError('TOTP is not correct or has expired', 400));
                    }
                    const {token , refreshToken } = await TokenHelper.generateTokenAndRefreshToken(user);

                    res.status(200).json({
                              status: 'success',
                              token: token,
                              refreshToken: refreshToken,
                              data: {
                                        user: {
                                                  id: user.id,
                                                  email: user.email,
                                                  first_name: user.first_name,
                                                  last_name: user.last_name,
                                                  role: user.role,
                                                  status: user.status,
                                        }
                              }
                    });
          });

          enable2fa = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

                    const id = (req as any).user.id;
                    await this.authService.enableTwoFactorAuth(id);

                    res.status(200).json({
                              status: 'success',
                              message: '2FA has been enabled'
                    });
          });

          disable2fa = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

                    const id = (req as any).user.id;
                    await this.authService.disableTwoFactorAuth(id);

                    res.status(200).json({
                              status: 'success',
                              message: '2FA has been disabled'
                    });
          });


          resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

                    const {email} = req.body;

                    if(!email) {
                              return next(new AppError('Please provide an email', 400));
                    }

                    await this.authService.resetPassword(email);

                    res.status(200).json({
                              status: 'success',
                              message: 'Password reset email has been sent'
                    });
          });

       
            

        changePassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

                  const { password} = req.body;
                  const token = req.params.token;

                  if(!token || !password) {
                            return next(new AppError('Please fill in all fields', 400));
                  }



                  await this.authService.changePassword( token, password);

                  res.status(200).json({
                            status: 'success',
                            message: 'Password has been reset'
                  });
                });

          verifyEmail = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

                    const {token , id} = req.params;

                    if(!id || !token) {
                              return next(new AppError('Please provide id and token', 400));
                    }
                    console.log(id, token);

                    await this.authService.verifyEmail(id, token);

                    res.status(200).json({
                              status: 'success',
                              message: 'Email has been verified'
                    });
          });

          generateVerificationEmail= catchAsync(async (req: Request, res: Response, next: NextFunction) => {

                    const {email} = req.body;

                    if(!email) {
                              return next(new AppError('Please provide an email', 400));
                    }

                    await this.authService.generateVerifcationToken(email);

                    res.status(200).json({
                              status: 'success',
                              message: 'Verification email has been sent'
                    });
          });






          






     

}

export default AuthController;
