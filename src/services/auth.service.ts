import { UserService} from './index';
import  {JWTUtils , TokenHelper} from '../utils/index';
import {Hash , AppError ,Email} from '../utils/index';
import { UserRefreshTokenRepository , UserInvalidTokenRepository} from '../repositories/index';
import { authenticator } from 'otplib';
import jwt from 'jsonwebtoken';
import qrcode from 'qrcode';
import jwtUtil from 'utils/jwt.util';
import email from 'utils/email';


class AuthService {
          private _userService: UserService;
          private _userRefreshToken: UserRefreshTokenRepository;
          private _userInvalidToken: UserInvalidTokenRepository;
          constructor() {
          this._userService = new UserService();
          this._userRefreshToken = new UserRefreshTokenRepository();
          this._userInvalidToken = new UserInvalidTokenRepository();
          }

          async register(body: any) {
                    const user = await this._userService.createUser(body);
                    const token = JWTUtils.sign({ id: user.id });
                    const refreshToken = JWTUtils.signRefreshToken({ id: user.id });

                    this._userRefreshToken.create({
                      user: user.id,
                      refresh_token: refreshToken,
                      expires: new Date(Date.now() +  30 * 24 * 60 * 60 * 1000),
                      adress_ip: body.adress_ip || null,
                      device_info: body.device_info || null, 
                      
                      

                    });

                    

                    return { user, token, refreshToken };
                    
                   
          }

          async login(body: any) {
            let user = await this._userService.getUserPasswordByEmail(body.email);

          
            if (!user) {
              throw new AppError('Invalid credentials', 401);
            } 
        
            if (!body.password || !user.password) {
              throw new AppError('Password is missing', 400);
            }
        
            const isMatch = await Hash.comparePassword(body.password, user.password);
            if (!isMatch) {
              throw new AppError('Invalid credentials', 401);
            }
        
            
            
        
            const token = JWTUtils.sign({ id: user.id });
            const refreshToken = JWTUtils.signRefreshToken({ id: user.id });
            this._userRefreshToken.create({
              user: user.id,
              refresh_token: refreshToken,
              expires: new Date(Date.now() +  30 * 24 * 60 * 60 * 1000),
              adress_ip: body.adress_ip || null,
              device_info: body.device_info || null, 
              
              

            });

        
            return { user, token, refreshToken };
          }

          async refreshToken(body: any) {
            try {
              const refreshToken = body.refreshToken;
              
              if (!refreshToken) {
                throw new AppError('Refresh token is missing', 400);
              }
          
              
              const validRefreshToken = await this._userRefreshToken.findByToken(refreshToken);
          
              if (!validRefreshToken || new Date(validRefreshToken.expires) < new Date()) {
             
                throw new AppError('Invalid or expired refresh token', 401);
              }
          
       
              const decoded = JWTUtils.verify(refreshToken);
          
              const user = await this._userService.getUserById(decoded.id);
          
              if (!user) {
                throw new AppError('User not found', 404);
              }
          
          
              await this._userRefreshToken.deleteByUserIdAndToken(user.id, refreshToken);
          
            
              const newToken = JWTUtils.sign({ id: user.id });
              const newRefreshToken = JWTUtils.signRefreshToken({ id: user.id });
          
           
              await this._userRefreshToken.create({
                user: user.id,
                refresh_token: newRefreshToken,
                expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 
                adress_ip: body.adress_ip || null,
                device_info: body.device_info || null,
              });
          
              return { token: newToken, refreshToken: newRefreshToken };
          
            } catch (error) {
              if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
                throw new AppError('Invalid or expired refresh token', 401);
              } else if  (error instanceof AppError) {
                throw error;
              }
              else {
                throw new AppError('Internal server error', 500);
              }
            }
          }
          

          async logout(req: any) {

        
            const  {refreshToken}  =  req.body;

            await this._userRefreshToken.deleteByToken(refreshToken);


            const token = req.acessToken.value;
            const decoded =  JWTUtils.verify(token);

            const id = decoded.id;


            await this._userInvalidToken.create({
              token:token ,
              user:  id,
              expires: decoded.exp,
            });
        
          }

          async logoutAllDevices(req: any) {

            const token = req.acessToken.value;
            const decoded =  JWTUtils.verify(token);

            const id = decoded.id;

            await this._userRefreshToken.deleteMany({ user: id });


            await this._userInvalidToken.create({
              token:token ,
              user:  id,
              expires: decoded.exp,
            });

          }

          async enableTwoFactorAuth(id: string) {
            return this._userService.updateUser(id, { two_factor_enabled: true });
          }

          async disableTwoFactorAuth(id: string) {
            return this._userService.updateUser(id, { two_factor_enabled: false });
          }

          async generate2fa(id: string) {
            const user = await this._userService.getUserById(id);
            if(!user) {
                    throw  new AppError('User not found', 404)
            }

            if(!user['2fa_enable']) {
                throw new AppError('must enable 2FA first', 400)
            }                            
            const secret = authenticator.generateSecret();
            const uri = authenticator.keyuri(user.email, 'e-commerce', secret);

            await this._userService.updateUser(id, { '2fa_secret': secret });

            const qr_code = await qrcode.toBuffer(uri, { type: 'png', margin: 1 });

            return { qr_code, secret };

          }

          async resetPassword(email: string) {
            const user = await this._userService.getUserByEmail(email);
            if (!user) {
              throw new AppError('User not found', 404);
            }
        
            const token =await  TokenHelper.generateToken({  });


            await this._userService.updateUser(user.id, { reset_password_token: token });
         
            Email.sendResetPasswordEmail(user.email, 
              { userName: user.username,  
                resetUrl: `${process.env.FRONTEND_URL}api/v1/auth/reset-password/${token}` }); 
          
           return true;

          }

          async changePassword( token: string, password: string) {

            const decode =  jwt.decode(token);
            if( (decode as any).exp < Date.now() / 1000) {
              throw new AppError('Token expired', 400);
            }
            
            const user = await this._userService.getUserByResetPasswordToken(token);
            console.log('Retrieved User:', user);
            if (!user) {
              throw new AppError('User not found', 404);
            }

        
            if (user.reset_password_token !== token) {
              throw new AppError('Invalid reset token', 400);
            }

            await this._userService.updateUser(user.id, { password , reset_password_token: null });

          }

          async generateVerifcationToken(email: string) {
            const user = await this._userService.getUserPasswordByEmail(email);
            if (!user) {
              throw new AppError('User not found', 404);
            }
        
            const token =await TokenHelper.generateToken({});
        
            await this._userService.updateUser(user.id, { verification_token: token });

            Email.sendVerifyEmail(user.email,{
              userName: user.username,  
              verificationUrl: `${process.env.FRONTEND_URL}api/v1/auth/verify-email/${token}/${user.id}` });
            
        
            
          }

          async verifyEmail(id: string , token: string) {

            console.log('Token:', token);

            const decode =  jwt.decode(token);

            console.log('Decoded:', decode);
            if( (decode as any).exp < Date.now() / 1000) {
              throw new AppError('Token expired', 400);
            }

            const user = await this._userService.getUserById(id);

         

            if (!user) {
              throw new AppError('User not found', 404);
            }

            if(user.status === 'active') {
              throw new AppError('User already verified', 400);
            }
            if(user.status === 'banned') {
              throw new AppError('User is banned', 400);
            }

            if (user.verification_token !== token) {
              throw new AppError('Invalid verification token', 400);
            }



        
            await this._userService.updateUser(user.id, { status: 'active', verification_token: null });
          }
           

          

        





          

             


 
  

}

       export default AuthService;