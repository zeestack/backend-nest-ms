import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductDto, ProductsDto } from './dtos';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(@Body() products: ProductsDto) {
    return await this.productService.getProducts(products.productIds);
  }

  @Get('all')
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }

  @Get('/:productId')
  async getProduct(@Param('productId') productId: string) {
    return await this.productService.getProductById(productId);
  }

  @Post()
  async create(@Body() product: ProductDto) {
    return await this.productService.createProduct(product);
  }

  @Delete('/:productId')
  async delete(@Param('productId') productId: string) {
    return await this.productService.deleteProduct(productId);
  }
}
