import { Controller, Get, Res } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('App')
@Controller()
export class AppController {
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiOkResponse({ type: String })
  @Get('/healthcheck')
  getHello(@Res() response: Response) {
    response.status(200).send('Server is working. Status 200 OK response');
  }
}
