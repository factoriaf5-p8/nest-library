import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userService.findOneByUsername(username);

    console.log(user);

    const passwordsEqual = await compare(pass, user.password);

    if (!passwordsEqual) throw new UnauthorizedException();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user; //desestructuración de objetos en js.
    return result;
  }

  signin(user: any) {
    const payload = { username: user.username, sub: user._id };
    return this.jwtService.sign(payload);
  }
}
