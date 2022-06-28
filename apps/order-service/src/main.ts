import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { OrderModule } from './orders/order.module';
import { Transport } from '@nestjs/microservices';

const port = 3002;

async function bootstrap() {
  const app = await NestFactory.create(OrderModule);
  const microservice = app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port,
    },
  });
  await microservice.listen().then(() => {
    Logger.log(`Order Microservice running on port ${port}`, 'Bootstrap');
  });
}
bootstrap();
