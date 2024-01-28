import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/schemas/user.schema';
import { SignInDto } from './dto/signin-user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signIn(signinDto: SignInDto): Promise<Partial<User>> {
    // console.log(signinDto);

    const { username, password: signInPassword } = signinDto;
    const user = (await this.userService.findOne(username)) as unknown as User;
    console.log(user);

    if (user?.password !== signInPassword) throw new UnauthorizedException();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;

    return result;
  }
}
