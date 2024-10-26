import { ApiProperty } from '@nestjs/swagger';
import { AbstractEntity } from '../utils/abstract.entity';

export class User extends AbstractEntity {
  @ApiProperty()
  name: string;
}
