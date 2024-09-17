import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class JWTUtils {
  private privateKey: string;
  private publicKey: string;
  private expiresIn: string;
  private algorithm: jwt.Algorithm;
  private expiresInRefreshToken: string;

  constructor() {
     
    this.privateKey = process.env.JWT_PRIVATE_KEY || '';
    this.publicKey = process.env.JWT_PUBLIC_KEY || '';
    this.expiresIn = process.env.JWT_EXPIRES_IN || '5m';
    this.expiresInRefreshToken = process.env.JWT_EXPIRES_IN_REFRESH_TOKEN || '30d';
    this.algorithm = (process.env.JWT_ALGORITHM as jwt.Algorithm) || 'RS256';

    if (!this.privateKey || !this.publicKey) {
      throw new Error('JWT keys are not defined in environment variables');
    }
  }

  public sign(payload: object, options: SignOptions = {
    expiresIn: this.expiresIn,}): any {
    return jwt.sign(payload, this.privateKey, {
      algorithm: this.algorithm,
      ...options,
    });
  }

  public signRefreshToken(payload: object, options: SignOptions = { 
     expiresIn: this.expiresInRefreshToken,
    }): any {
    return jwt.sign(payload, this.privateKey, {
      algorithm: this.algorithm,
      ...options,

    });
  }

  public verify(token: string, options: VerifyOptions = {}): any {
    return jwt.verify(token, this.publicKey, options);
  }
  get ttl_refreshToken(): string {
    return this.expiresInRefreshToken
  }
  get ttl_token(): string {
    return this.expiresIn;
  }
  


  
}

export default new JWTUtils();
