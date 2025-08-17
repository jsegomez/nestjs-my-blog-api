import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDTO } from 'src/dto/user.dto';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user/user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  findAll(): User[] {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): User {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() user: CreateUserDto): User {
    return this.userService.create(user);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): boolean {
    return this.userService.remove(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDTO,
  ): User {
    return this.userService.update(id, user);
  }
}
