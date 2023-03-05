import { UsersController } from '../controllers/users/users.controller.js';
import createDebug from 'debug';
import { Router } from 'express';
import { UsersMongoRepo } from '../repository/users/users.mongo.repo.js';
const debug = createDebug('W7ch5:router:users');

// eslint-disable-next-line new-cap
export const usersRouter = Router();
debug('Loaded');
const repo = UsersMongoRepo.getInstance();
const controller = new UsersController(repo);

usersRouter.get('/', controller.getAll.bind(controller));
usersRouter.post('/register', controller.register.bind(controller));
usersRouter.post('/login', controller.login.bind(controller));
