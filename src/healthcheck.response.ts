import { ApiProperty } from '@nestjs/swagger';

export class HealthCheckResponse {
  @ApiProperty()
  message: string;

  @ApiProperty()
  date: string;
}
