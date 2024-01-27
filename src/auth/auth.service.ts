import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserService } from '../user/user.service';
import { SigninUserDto } from '../user/dtos/signin-user.dto';

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

    return dbUser;
  }
}
