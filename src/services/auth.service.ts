import { UserService} from './index';
import  JWTUtils from '../utils/jwt.util';
import {Hash , AppError} from '../utils/index';
import { UserRefreshTokenRepository , UserInvalidTokenRepository} from '../repositories/index';
import jwt from 'jsonwebtoken';

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
          
              // Check if the refresh token exists in the database
              const validRefreshToken = await this._userRefreshToken.findByToken(refreshToken);
          
              if (!validRefreshToken || new Date(validRefreshToken.expires) < new Date()) {
                // If the token does not exist or is expired
                throw new AppError('Invalid or expired refresh token', 401);
              }
          
              // Verify the refresh token
              const decoded = JWTUtils.verify(refreshToken);
          
              const user = await this._userService.getUserById(decoded.id);
          
              if (!user) {
                throw new AppError('User not found', 404);
              }
          
              // Delete the old refresh token
              await this._userRefreshToken.deleteByUserIdAndToken(user.id, refreshToken);
          
              // Generate new access and refresh tokens
              const newToken = JWTUtils.sign({ id: user.id });
              const newRefreshToken = JWTUtils.signRefreshToken({ id: user.id });
          
              // Save the new refresh token in the database
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


 
  

}

       export default AuthService;