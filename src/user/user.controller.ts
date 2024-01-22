import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':userId')
  findUser(@Param('userId') userId: string) {
    return this.userService.findUser(userId);
  }

  @Post()
  createUser(@Body() user: any) {
    return this.userService.createUser(user);
  }

  @Post('signin')
  signin(@Body() user: any) {
    return this.userService.signin(user);
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
