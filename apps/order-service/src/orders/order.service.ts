import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { OrderDto } from './dto';
import { mapOrderToOrderDto, Order } from './schemas';
import { Model } from 'mongoose';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_MODEL')
    private orderModel: Model<Order>,
    @Inject('PRODUCTS_SRV') private productClient: ClientProxy,
  ) {}

  async create(order: OrderDto): Promise<OrderDto> {
    const products = await this.getProductsFromProductService(order.products);
    await this.updateUnitPrice(order, products);

    const newOrder = new this.orderModel(order);
    const ord = mapOrderToOrderDto(await newOrder.save());
    return ord;
  }

  async updateUnitPrice(order: OrderDto, products: any[]) {
    order.products.map((product) => {
      const prod = products.find((p) => p.id === product.productId);
      product.unitPrice = prod.price;
      product.productName = prod.productName;
      product.description = prod.description;
      return product;
    });
  }

  async getProductsFromProductService(products: any[]) {
    const ids = products.map((product) => product.productId);
    const prods = [];
    await this.productClient
      .send({ cmd: 'getProductsByIds' }, ids)
      .forEach((products) => {
        products.map((product) => {
          prods.push(product);
        });
        return products;
      });
    return prods;
  }

  async onApplicationBootstrap() {
    await this.productClient.connect();
  }
}
