import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  findAll() {
    return this.userRepository.find();
  }
  findUser(userId: string) {
    return `find user with id ${userId}`;
  }
  create(user: CreateUserDto) {
    return this.userRepository.save(user);
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
