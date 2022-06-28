import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { ProductDto } from './dto';
import { ProductService } from './product.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('products')
@UseInterceptors(ClassSerializerInterceptor)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @MessagePattern({ cmd: 'create' })
  async create(@Body() product: ProductDto): Promise<ProductDto> {
    return this.productService.create(product);
  }

  @MessagePattern({ cmd: 'getAllProducts' })
  async getAllProducts(): Promise<ProductDto[]> {
    return this.productService.getAllProducts();
  }

  @MessagePattern({ cmd: 'getProductsByIds' })
  async getProduct(productIds: string[]) {
    return await this.productService.getProductsByIds(productIds);
  }

  @MessagePattern({ cmd: 'getProductById' })
  async getProductById(productId: string) {
    return await this.productService.getProductById(productId);
  }

  @MessagePattern({ cmd: 'delete' })
  async delete(productId: string) {
    return await this.productService.delete(productId);
  }
}
