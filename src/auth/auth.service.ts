import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserService } from '../user/user.service';
import { SigninUserDto } from './dtos/signin-user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async verifyPassword(password: string, hash: string) {
    return compare(password, hash);
  }
  async validateUser(user: SigninUserDto) {
    const dbUser = await this.userService.findUser(user.username);
    let passwordVerified: boolean;
    if (dbUser)
      passwordVerified = await this.verifyPassword(
        user.password,
        dbUser.password,
      );
    if (!user || !passwordVerified) throw new UnauthorizedException();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = dbUser;
    return result;
  }
  signin(user: SigninUserDto) {
    return { accessToken: 'token' };
  }
}
