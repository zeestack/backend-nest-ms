import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ProductModule } from './products/product.module';
import { Transport } from '@nestjs/microservices';

const port = 3001;

async function bootstrap() {
  const app = await NestFactory.create(ProductModule);
  const microservice = app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'products_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  await microservice.listen();

  await app
    .listen(port)
    .then(() => {
      Logger.log(`Product-Service running on port ${port}`, 'Bootstrap');
    })
    .catch((err) => {
      Logger.error(err, 'Bootstrap');
    });
}
bootstrap();
