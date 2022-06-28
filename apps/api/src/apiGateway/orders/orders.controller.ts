import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Inject,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { OrderDto } from './dto';

@Controller('orders')
@UseInterceptors(ClassSerializerInterceptor)
export class OrderController {
  constructor(
    @Inject('ORDERS_SRV') private readonly orderClient: ClientProxy,
  ) {}

  @Post()
  async create(@Body() order: OrderDto, @Req() req) {
    order.userId = req.user.id;
    return await this.orderClient.send({ cmd: 'createOrder' }, order);
  }

  async onApplicationBootstrap() {
    await this.orderClient.connect();
  }
}
