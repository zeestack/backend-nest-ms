import { ClientsModule, Transport } from '@nestjs/microservices';

import { EmailService } from './email-service.service';
import { EmailServiceController } from './email-service.controller';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: 'localhost',
          port: 2525,
          secure: false,
        },
        defaults: {
          from: `"No Reply" <noreply@tech-foundry.com>`,
        },
        template: {
          dir: 'apps/email-service/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [EmailServiceController],
  providers: [EmailService],
})
export class EmailServiceModule {}
