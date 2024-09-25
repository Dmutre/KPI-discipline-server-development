import { Controller, Get, Res } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { HealthCheckResponse } from './healthcheck.response';

@ApiTags('App')
@Controller()
export class AppController {
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiOkResponse({ type: HealthCheckResponse })
  @Get('/healthcheck')
  getHello(@Res() response: Response) {
    response.status(200).json({
      message: 'Server is working. Status 200 OK response',
      date: new Date(),
    });
  }
}
