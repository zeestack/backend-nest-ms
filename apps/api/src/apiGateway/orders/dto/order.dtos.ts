import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

import { Exclude } from 'class-transformer';

export class ProductDto {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  quantity: number;

  unitPrice: number;

  description: string;

  totalPrice: number;

  @Exclude()
  _id: string;

  constructor(partial: Partial<ProductDto>) {
    Object.assign(this, partial);
    this.calculateTotalPrice();
  }
  private calculateTotalPrice() {
    this.totalPrice = this.unitPrice * this.quantity;
  }
}

export class OrderDto {
  id?: string;
  @IsNotEmpty()
  products: [ProductDto];

  totalOrderPrice: number;

  userId: string;

  @Exclude()
  _id?: any;

  @Exclude()
  __v?: any;

  constructor(partial: Partial<OrderDto>) {
    if (partial && partial.products.length > 0) {
      Object.assign(this, partial);

      Object.assign(
        this.products,
        this.products.map((product) => new ProductDto(product)),
      );

      this.calculateTotalOrderPrice();
    }
  }

  private calculateTotalOrderPrice() {
    if (this.products && this.products.length > 0) {
      this.totalOrderPrice = this.products.reduce(
        (acc, product) => acc + product.totalPrice,
        0,
      );
    }
  }
}
