import { EmailServiceModule } from './email-service.module';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(EmailServiceModule);
  const microservice = app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'emails_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  microservice.listen();
}
bootstrap();
