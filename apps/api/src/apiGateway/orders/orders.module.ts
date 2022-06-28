import { ClientsModule, Transport } from '@nestjs/microservices';

import { Module } from '@nestjs/common';
import { OrderController } from './orders.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDERS_SRV',
        transport: Transport.TCP,
        options: {
          port: 3002,
        },
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [],
})
export class OrderModule {}
