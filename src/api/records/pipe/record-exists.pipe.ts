import { PipeTransform, Injectable } from '@nestjs/common';
import { RecordService } from '../record.service';

@Injectable()
export class RecordyExistPipe implements PipeTransform {
  constructor(private readonly service: RecordService) {}

  async transform(id: any) {
    const exntity = await this.service.getRecordById(id);
    return exntity.id;
  }
}
