import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class GetRecordsDTO {
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  @IsNotEmpty()
  userId?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  @IsNotEmpty()
  categoryId?: string;
}
