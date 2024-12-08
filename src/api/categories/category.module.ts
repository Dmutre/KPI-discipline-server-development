import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '../../database/entities/category.entity';
import { UserModule } from '../users/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Module({
  controllers: [CategoryController],
  imports: [TypeOrmModule.forFeature([CategoryEntity]), UserModule],
  providers: [CategoryService, { provide: APP_GUARD, useClass: AuthGuard }],
  exports: [CategoryService],
})
export class CategoryModule {}
