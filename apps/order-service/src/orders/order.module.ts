import { ClientsModule, Transport } from '@nestjs/microservices';

import { DbModule } from '@app/db';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { orderProviders } from './order.provider';

@Module({
  imports: [
    DbModule,
    JwtModule.register({ secret: 'secret' }),
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
  controllers: [OrderController],
  providers: [OrderService, ...orderProviders],
})
export class OrderModule {}
