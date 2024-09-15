import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class JWTUtils {
  private privateKey: string;
  private publicKey: string;
  private expiresIn: string;
  private algorithm: jwt.Algorithm;

  constructor() {
    this.privateKey = process.env.JWT_PRIVATE_KEY || '';
    this.publicKey = process.env.JWT_PUBLIC_KEY || '';
    this.expiresIn = process.env.JWT_EXPIRES_IN || '5m';
    this.algorithm = (process.env.JWT_ALGORITHM as jwt.Algorithm) || 'RS256';

    if (!this.privateKey || !this.publicKey) {
      throw new Error('JWT keys are not defined in environment variables');
    }
  }

  public sign(payload: object, options: SignOptions = {}): any {
    return jwt.sign(payload, this.privateKey, {
      algorithm: this.algorithm,
      expiresIn: this.expiresIn,
      ...options,
    });
  }

  public signRefreshToken(payload: object, options: SignOptions = {}): any {
    return jwt.sign(payload, this.privateKey, {
      algorithm: this.algorithm, 
      expiresIn: '30d',
      ...options,
    });
  }

  public verify(token: string, options: VerifyOptions = {}): any {
    return jwt.verify(token, this.publicKey, options);
  }
}

export default new JWTUtils();
