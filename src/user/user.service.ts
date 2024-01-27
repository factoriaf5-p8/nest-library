import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
// import { SigninUserDto } from './dtos/signin-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(user: CreateUserDto) {
    return this.userRepository.save(this.userRepository.create(user));
  }
  findAll() {
    return this.userRepository.find();
  }
  findUser(username: string): Promise<User | null> {
    return this.userRepository.findOneBy({ username });
  }
  removeUser(userId: string) {
    return `removed user ${userId}`;
  }
  // signin(user: SigninUserDto) {
  //   return { accessToken: 'token' };
  // }
  updateUser(userId: string, user: any) {
    return `updated user ${userId} with ${JSON.stringify(user)}`;
  }
}
