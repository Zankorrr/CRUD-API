import { IUser, IUserBody } from './types';
import * as uuid from 'uuid';

export const users: IUser[] = []

export const createUser = async (userBody: IUserBody) => {
  const user = {id: uuid.v4(), ...userBody}
	users.push(user)
  return user
}

export const findUser = async (id: string) => {
  return users.find(item => item.id === id)
}

export const removeUser = async (id: string) => {
  const index = users.findIndex(item => item.id === id)
  users.splice(index, 1)
}