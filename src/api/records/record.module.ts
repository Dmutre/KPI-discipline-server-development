import { Module } from '@nestjs/common';
import { RecordController } from './record.controller';
import { RecordService } from './record.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordEntity } from '../../database/entities/record.entity';
import { CategoryModule } from '../categories/category.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Module({
  controllers: [RecordController],
  providers: [RecordService, { provide: APP_GUARD, useClass: AuthGuard }],
  imports: [TypeOrmModule.forFeature([RecordEntity]), CategoryModule],
})
export class RecordModule {}
