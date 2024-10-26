import { ApiProperty } from '@nestjs/swagger';

export class AbstractEntity {
  @ApiProperty()
  id: string;
}
