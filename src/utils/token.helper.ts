import ms from 'ms';
import jwtUtil from './jwt.util';
import { UserRefreshToken } from '../models/index';

class TokenHelper {
  async generateTokenAndRefreshToken(user: any) {
    const token = jwtUtil.sign({ id: user.id });
    const refreshToken = jwtUtil.signRefreshToken({ id: user.id });

    const refreshTokenExpiresIn = this.getExpirationDate(jwtUtil.ttl_refreshToken);

    await UserRefreshToken.create({
      user: user.id,
      refresh_token: refreshToken,
      expires: refreshTokenExpiresIn,  
    });

    return { token, refreshToken };
  }

  private getExpirationDate(ttl: string): Date {
    const now = Date.now();
    const ttlInMs = ms(ttl);  
    return new Date(now + ttlInMs);  
  }

  async generateToken(payload: any , options: any = {
    expiresIn: "10m", 
  }) {
    return jwtUtil.sign(payload, options);
  }

}

export default new TokenHelper();
