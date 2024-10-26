import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class NameDTO {
  @ApiProperty()
  @IsString()
  name: string;
}
