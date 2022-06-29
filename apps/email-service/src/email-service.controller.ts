import { Body, Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { EmailService } from './email-service.service';

@Controller()
export class EmailServiceController {
  constructor(private readonly emailServiceService: EmailService) {}

  @EventPattern({ event: 'email-service-event' })
  getHello(@Body() data: any) {
    return this.emailServiceService.sendEmail(data);
  }
}
