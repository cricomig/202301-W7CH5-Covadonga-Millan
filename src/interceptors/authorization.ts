import { NextFunction, Request, Response } from 'express';
import { TokenPayload } from '../helpers/auth.js';
import { HTTPError } from '../errors/error.js';
import createDebug from 'debug';
import { UsersMongoRepo } from '../repository/users/users.mongo.repo.js';
const debug = createDebug('W6:interceptor:authorization');

export interface RequestCool extends Request {
  info?: TokenPayload;
}

export async function authorization(
  req: RequestCool,
  resp: Response,
  next: NextFunction,
  usersRepo: UsersMongoRepo
) {
  const authHeader = req.get('Authorization');

  try {
    debug('Called');
    if (!req.info)
      throw new HTTPError(
        498,
        'Token not found',
        'Token not found in authorization interceptor'
      );
    const userId = req.info.id;
    const frenemieId = req.params.id;
    const actualUser = await usersRepo.queryId(frenemieId);
    if (actualUser.id !== userId)
      throw new HTTPError(
        401,
        'Not authorized',
        'Not authorized, different id'
      );
    next();
  } catch (error) {
    next(error);
  }
}
