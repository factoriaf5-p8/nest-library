import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  findAll() {
    return 'find All user works';
  }
  findUser(userId: string) {
    return `find user with id ${userId}`;
  }
  createUser(user: any) {
    return `create user with ${JSON.stringify(user)}`;
  }
  signin(user: any) {
    return `user with name ${user.email} exists`;
  }
  updateUser(userId: string, user: any) {
    return `updated user ${userId} with ${JSON.stringify(user)}`;
  }
  removeUser(userId: string) {
    return `removed user ${userId}`;
  }
}
