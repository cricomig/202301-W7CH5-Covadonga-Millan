import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import createDebug from 'debug';
import { CustomError } from '../errors/error';

const debug = createDebug('W7CH5: app');

export const app = express();

const corsOptions = {
  origin: '*',
};

app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));
app.disable('x-powered-by');

app.use('/users', usersRouter);

app.get('/', (_req, resp) => {
  resp.json({
    info: '¿¿¿¿Amiguis????',
    endpoints: {
      users: '/users',
    },
  });
});

app.use(
  (error: CustomError, _req: Request, resp: Response, _next: NextFunction) => {
    debug('W7CH5:Error:app');
    const status = error.statusCode || 500;
    const statusMsg = error.statusMsg || 'Internal server error';
    resp.status(status);
    resp.json({
      error: [
        {
          status,
          statusMsg,
        },
      ],
    });
    debug(status, statusMsg, error.message);
  }
);
