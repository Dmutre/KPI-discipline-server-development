import { ApiProperty } from '@nestjs/swagger';
import { AbstractEntity } from '../utils/abstract.entity';

export class Record extends AbstractEntity {
  @ApiProperty()
  amount: number;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  categoryId: string;

  @ApiProperty()
  createdAt: Date;
}
