import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
// import { AppService } from './app.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @UseGuards(AuthGuard('local'))
  @Post('auth/signin')
  signin(@Req() req: any) {
    // return req.user; //sustituir por el envío del token
    return this.authService.signin(req.user);
  }
}
