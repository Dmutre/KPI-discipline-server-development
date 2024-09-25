import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get()
  getHello(@Res() response: Response) {
    response.status(200).send('Server is working. Status 200 OK response');
  }
}
