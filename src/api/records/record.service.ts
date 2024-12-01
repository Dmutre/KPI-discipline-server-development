import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RecordEntity } from 'src/database/entities/record.entity';
import { CreateRecordDTO } from './dto/create-record.dto';
import { GetRecordsDTO } from './dto/get-records.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryService } from '../categories/category.service';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(RecordEntity)
    private readonly recordRepo: Repository<RecordEntity>,
    private readonly categoryService: CategoryService,
  ) {}

  public async createRecord(data: CreateRecordDTO): Promise<RecordEntity> {
    const category = await this.categoryService.getCategoryById(
      data.categoryId,
    );
    if (category.userId && category.userId !== data.userId)
      throw new BadRequestException(
        'This category can be userd only for one user',
      );
    return this.recordRepo.create(data);
  }

  public async getRecords(query: GetRecordsDTO): Promise<RecordEntity[]> {
    if (!query.categoryId && !query.userId)
      throw new BadRequestException('At least one of params is required');
    return this.recordRepo.findBy(query);
  }

  public async getRecordById(id: string): Promise<RecordEntity> {
    return this.recordRepo.findOneOrFail({ where: { id } }).catch(() => {
      throw new NotFoundException('No such record');
    });
  }

  public async deleteRecord(id: string): Promise<void> {
    await this.recordRepo.delete({ id });
  }
}
