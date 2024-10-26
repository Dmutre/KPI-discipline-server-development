import { ApiProperty } from '@nestjs/swagger';
import { AbstractEntity } from '../utils/abstract.entity';

export class Category extends AbstractEntity {
  @ApiProperty()
  name: string;
}
