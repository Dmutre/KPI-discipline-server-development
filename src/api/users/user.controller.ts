import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserEntity } from '../../database/entities/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserExistPipe } from './pipe/user-exist.pipe';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiOkResponse({ type: UserEntity })
  public createUser(@Body() data: CreateUserDTO): Promise<UserEntity> {
    return this.userService.createUser(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ type: [UserEntity] })
  public getAllUsers(): Promise<UserEntity[]> {
    return this.userService.getUsers();
  }

  @Get('/:userId')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse({ type: UserEntity })
  public getUserById(@Param('userId') userId: string): Promise<UserEntity> {
    return this.userService.getUserById(userId);
  }

  @Delete('/:userId')
  @ApiOperation({ summary: 'Delete user by id' })
  public deleteUser(
    @Param('userId', UserExistPipe) userId: string,
  ): Promise<void> {
    return this.userService.deleteUser(userId);
  }
}
