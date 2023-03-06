import { Repo } from '../repository.interface.js';
import { UserModel } from './users.mongo.model.js';
import createDebug from 'debug';
import { User } from '../../entities/user.js';
import { HTTPError } from '../../errors/error.js';
const debug = createDebug('W7CH5:repo');

export class UsersMongoRepo implements Repo<User> {
  private static instance: UsersMongoRepo;

  public static getInstance(): UsersMongoRepo {
    if (!UsersMongoRepo.instance) {
      UsersMongoRepo.instance = new UsersMongoRepo();
    }
    return UsersMongoRepo.instance;
  }

  private constructor() {
    debug('Repo:Instantiated');
  }

  async query(): Promise<User[]> {
    debug('query');
    const users = await UserModel.find().populate(['friends', 'enemies']);
    return users;
  }

  async queryId(id: string): Promise<User> {
    debug('queryId');
    const data = await UserModel.findById(id);
    if (!data) throw new HTTPError(404, 'Not Found', 'Id not found in query');
    return data;
  }

  async search(query: { key: string; value: unknown }): Promise<User[]> {
    debug('search');
    const data = await UserModel.find({ [query.key]: query.value });
    if (!data)
      throw new HTTPError(404, 'Not Found', `${query.key} not found in search`);
    return data;
  }

  async create(info: Partial<User>): Promise<User> {
    debug('create');
    const data = await UserModel.create(info);
    return data;
  }

  async update(info: Partial<User>): Promise<User> {
    debug('update');
    const data = await UserModel.findByIdAndUpdate(info.id, info, {
      new: true,
    });
    if (!data) throw new HTTPError(404, 'Not found', 'Id not found for update');
    return data;
  }

  async delete(id: string): Promise<void> {
    debug('delete');
    const data = await UserModel.findByIdAndDelete(id);
    if (!data)
      throw new HTTPError(404, 'Not found', 'Id not found for delete method');
  }
}
