import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { SigninUserDto } from './dtos/signin-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // @Get(':userId')
  // findUser(@Param('userId') userId: string) {
  //   return this.userService.findUser(userId);
  // }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  signin(@Body() user: SigninUserDto) {
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
