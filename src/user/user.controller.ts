import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':userId')
  findUser(
    @Req() req: Request & { user: { userId: string; username: string } },
    @Param('userId') userId: string,
  ) {
    if (req.user.userId !== userId) throw new ForbiddenException();
    return this.userService.findUser(userId);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @Put(':userId')
  updateUser(@Param('userId') userId: string, @Body() user: any) {
    return this.userService.updateUser(userId, user);
  }
  @Delete(':userId')
  removeUser(@Param('userId') userId: string) {
    return this.userService.removeUser(userId);
  }
}
