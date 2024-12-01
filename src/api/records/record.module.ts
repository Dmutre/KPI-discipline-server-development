import { Module } from '@nestjs/common';
import { RecordController } from './record.controller';
import { RecordService } from './record.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordEntity } from 'src/database/entities/record.entity';
import { CategoryModule } from '../categories/category.module';

@Module({
  controllers: [RecordController],
  providers: [RecordService],
  imports: [TypeOrmModule.forFeature([RecordEntity]), CategoryModule],
})
export class RecordModule {}
