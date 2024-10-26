import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from 'src/database/entities/user.entity';
import { NameDTO } from './dto/name.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiOkResponse({ type: User })
  createUser(@Body() data: NameDTO) {
    return this.userService.createUser(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ type: [User] })
  getAllUsers() {
    return this.userService.getUsers();
  }

  @Get('/:userId')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse({ type: User })
  getUserById(@Param('userId') userId: string) {
    return this.userService.getUserById(userId);
  }

  @Delete('/:userId')
  @ApiOperation({ summary: 'Delete user by id' })
  deleteUser(@Param('userId') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
