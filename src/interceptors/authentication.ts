import { NextFunction, Request, Response } from 'express';
import { Auth, TokenPayload } from '../helpers/auth.js';
import createDebug from 'debug';
import { HTTPError } from '../errors/error.js';
const debug = createDebug('W6:interceptor:logged');
export interface RequestPlus extends Request {
  info?: TokenPayload;
}

export function logged(req: RequestPlus, resp: Response, next: NextFunction) {
  try {
    debug('Called');
    const authHeader = req.get('Authorization');
    if (!authHeader)
      throw new HTTPError(498, 'Token invalid', 'Not value in auth header');
    if (!authHeader.startsWith('Bearer'))
      throw new HTTPError(498, 'Token invalid', 'Not Bearer in auth header');
    const token = authHeader.slice(7);
    const payload = Auth.verifyJWT(token);
    req.info = payload;
    next();
  } catch (error) {
    next(error);
  }
}
