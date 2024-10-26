import { Module } from '@nestjs/common';
import { AbstractRepository } from './utils/abstract.repo';

@Module({
  providers: [AbstractRepository],
  exports: [AbstractRepository],
})
export class DatabaseModule {}
