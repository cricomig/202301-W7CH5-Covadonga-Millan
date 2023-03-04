import { UsersController } from '../controllers/users/users.controller.js';
import createDebug from 'debug';
import { Router } from 'express';
const debug = createDebug('W7ch5:router:users');

export const usersRouter = Router();
debug('Loaded');
const repo = UsersMongoRepo.getInstance();
const controller = new UsersController(repo);

usersRouter.get('/', controller.getAll.bind(controller));
usersRouter.post('/register', controller.register.bind(controller));
usersRouter.post('/login', controller.login.bind(controller));
