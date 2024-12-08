import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../database/entities/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, { provide: APP_GUARD, useClass: AuthGuard }],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
