import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { ProductDto } from './dto';
import { mapProductToProdutDto, Product } from './schemas';
import { Model } from 'mongoose';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_MODEL')
    private productModel: Model<Product>,
    @Inject('PRODUCTS_SERVICE') private client: ClientProxy,
  ) {}

  async create(product: ProductDto): Promise<ProductDto> {
    const newProduct = new this.productModel(product);
    const prod = mapProductToProdutDto(await newProduct.save());
    return prod;
  }

  async getProducts(products: any[]): Promise<ProductDto[]> {
    const data = await this.productModel
      .find({
        _id: { $in: products.map((product) => product.productId) },
      })
      .exec();
    return data ? data.map((product) => mapProductToProdutDto(product)) : [];
  }

  async getAllProducts(): Promise<ProductDto[]> {
    const data = await this.productModel.find().exec();
    return data ? data.map((product) => mapProductToProdutDto(product)) : [];
  }

  async getProductById(productId: string): Promise<ProductDto> {
    const product = await this.productModel.findById(productId).exec();
    return product ? mapProductToProdutDto(product) : null;
  }

  async getProductsByIds(
    productIds: string[],
  ): Promise<ProductDto[] | HttpException> {
    const data = await this.productModel
      .find({
        _id: { $in: productIds },
      })
      .exec();
    return data ? data.map((product) => mapProductToProdutDto(product)) : [];
  }

  async delete(productId: string): Promise<ProductDto | HttpException> {
    const product = await this.productModel.findByIdAndDelete(productId).exec();
    return product
      ? mapProductToProdutDto(product)
      : new HttpException(
          `no product found with id: ${productId}`,
          HttpStatus.NOT_FOUND,
        );
  }

  async onApplicationBootstrap() {
    await this.client.connect();
  }
}
