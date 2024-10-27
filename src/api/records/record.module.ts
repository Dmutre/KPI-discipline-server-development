import { Module } from '@nestjs/common';
import { RecordController } from './record.controller';
import { RecordService } from './record.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [RecordController],
  providers: [RecordService],
  imports: [DatabaseModule],
})
export class RecordModule {}
