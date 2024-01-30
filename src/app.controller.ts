import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from './user/schemas/user.schema';
import { Types } from 'mongoose';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/signin')
  signIn(@Req() req: Request) {
    //PASA ALGO: middleware
    return this.authService.signIn(req.user as User & { _id: Types.ObjectId });
  }
}
