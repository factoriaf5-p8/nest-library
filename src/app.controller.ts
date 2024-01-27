import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { Request } from 'express';
import { SigninUserDto } from './auth/dtos/signin-user.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/signin')
  async signin(@Req() req: Request) {
    return this.authService.signin(req.user as SigninUserDto);
  }
}
