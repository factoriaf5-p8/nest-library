import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/schemas/user.schema';
import { compare } from 'bcrypt';
import { Types } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async verifyPassword(password: string, hash: string) {
    return compare(password, hash);
  }

  async validateUser(username: string, pass: string): Promise<Partial<User>> {
    // console.log(signinDto);

    const user = await this.userService.findOne(username);

    const passwordsEquals = await this.verifyPassword(pass, user?.password);
    if (!passwordsEquals) throw new UnauthorizedException();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;

    return result;
  }

  signIn(user: User & { _id: Types.ObjectId }) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
