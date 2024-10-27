import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class GetRecordsDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  userId?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  categoryId?: string;
}
