import { ClientsModule, Transport } from '@nestjs/microservices';

import { Module } from '@nestjs/common';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCTS_SRV',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'products_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
