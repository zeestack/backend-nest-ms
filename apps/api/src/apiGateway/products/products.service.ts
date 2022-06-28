import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProductDto } from './dtos';

@Injectable()
export class ProductService {
  constructor(@Inject('PRODUCTS_SRV') private productClient: ClientProxy) {}

  async getAllProducts() {
    return await this.productClient.send<ProductDto[]>(
      {
        cmd: 'getAllProducts',
      },
      {},
    );
  }

  async getProducts(ids: string[]) {
    return await this.productClient.send({ cmd: 'getProductsByIds' }, ids);
  }

  async getProductById(id: string) {
    return await this.productClient.send({ cmd: 'getProductById' }, id);
  }

  async createProduct(product: ProductDto) {
    return await this.productClient.send({ cmd: 'create' }, product);
  }

  async deleteProduct(id: string) {
    return await this.productClient.send({ cmd: 'delete' }, id);
  }

  async onApplicationBootstrap() {
    await this.productClient.connect();
  }
}
