import { UserService} from './index';
import  JWTUtils from '../utils/jwt.util';
import {Hash , AppError} from '../utils/index';

class AuthService {
          private _userService: UserService;
          constructor() {
          this._userService = new UserService();
          }

          async register(body: any) {
                    const user = await this._userService.createUser(body);
                    const token = JWTUtils.sign({ id: user.id });
                    const refreshToken = JWTUtils.signRefreshToken({ id: user.id });

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
        
            return { user, token, refreshToken };
          }
 
  

}

       export default AuthService;