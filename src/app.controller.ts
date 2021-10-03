import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

import {
  MessagePattern,
  RmqContext,
  Ctx,
  Payload
} from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }


  @MessagePattern('generate_daily_report')
  public async execute(
    @Payload() data: any,
    @Ctx() context: RmqContext
  ) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    channel.ack(orginalMessage);

    this.appService.generate_daily_report(data);
  }
}
