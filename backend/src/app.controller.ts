import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRoot(): {
    service: string;
    status: string;
    message: string;
  } {
    return {
      service: 'JO.DIAMONDS API',
      status: 'ok',
      message: this.appService.getHello(),
    };
  }

  @Get('health')
  getHealth(): {
    status: string;
    timestamp: string;
  } {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
