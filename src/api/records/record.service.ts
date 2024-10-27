import { BadRequestException, Injectable } from '@nestjs/common';
import { Record } from 'src/database/entities/record.entity';
import { AbstractRepository } from 'src/database/utils/abstract.repo';
import { CreateRecordDTO } from './dto/create-record.dto';
import { GetRecordsDTO } from './dto/get-records.dto';

@Injectable()
export class RecordService {
  constructor(private readonly recordRepo: AbstractRepository<Record>) {}

  createRecord(data: CreateRecordDTO) {
    return this.recordRepo.create(data);
  }

  getRecords(query: GetRecordsDTO) {
    if (!query.categoryId && !query.userId)
      throw new BadRequestException('At least one of params is required');
    return this.recordRepo.findByCriteria(query);
  }

  getRecordById(id: string) {
    return this.recordRepo.findOrThrow(id);
  }

  deleteRecord(id: string) {
    return this.recordRepo.deleteById(id);
  }
}
