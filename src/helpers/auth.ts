import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from '../config.js';
import { HTTPError } from '../errors/error.js';

export interface TokenPayload extends JwtPayload {
  id: string;
  email: string;
  role: string;
}

const salt = 10;

export class Auth {
  static createJWT(payload: TokenPayload) {
    return jwt.sign(payload, config.jwtSecret as string);
  }

  static verifyJWT(token: string): TokenPayload {
    const result = jwt.verify(token, config.jwtSecret as string);

    if (typeof result === 'string')
      throw new HTTPError(498, 'Invalid token', result);

    return result as TokenPayload;
  }

  static hash(value: string) {
    return bcrypt.hash(value, salt);
  }

  static compare(value: string, hash: string) {
    return bcrypt.compare(value, hash);
  }
}
