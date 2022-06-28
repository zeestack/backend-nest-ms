import { ClientsModule, Transport } from '@nestjs/microservices';

import { DbModule } from '@app/db';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { productProviders } from './product.provider';

@Module({
  imports: [
    DbModule,
    JwtModule.register({ secret: 'secret' }),
    ClientsModule.register([
      {
        name: 'PRODUCTS_SERVICE',
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
  providers: [ProductService, ...productProviders],
})
export class ProductModule {}
