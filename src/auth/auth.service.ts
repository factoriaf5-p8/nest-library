import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async verifyPassword(password: string, hash: string) {
    return compare(password, hash);
  }
  async validateUser(username: string, pass: string) {
    const user = await this.userService.findUser(username);
    let passwordVerified: boolean;

    if (user) passwordVerified = await this.verifyPassword(pass, user.password);
    if (!user || !passwordVerified) throw new UnauthorizedException();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }
  signin(user: User) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return { accessToken: this.jwtService.sign(payload) };
  }
}
