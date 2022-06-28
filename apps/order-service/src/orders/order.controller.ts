import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  UseInterceptors,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { OrderDto } from './dto';
import { OrderService } from './order.service';

@Controller('orders')
@UseInterceptors(ClassSerializerInterceptor)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern({ cmd: 'createOrder' })
  async create(@Body() order: OrderDto): Promise<OrderDto> {
    return this.orderService.create(order);
  }
}
