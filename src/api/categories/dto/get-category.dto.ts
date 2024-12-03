import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class GetCategoryDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
