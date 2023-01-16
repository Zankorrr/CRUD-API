import { IUser } from './types';
import * as uuid from 'uuid';

export const users: IUser[] = []

export const createUser = async (body: string) => {
  const userBody = JSON.parse(body);
  const user = {id: uuid.v4(), ...userBody}
	users.push(user)
  return user
}
