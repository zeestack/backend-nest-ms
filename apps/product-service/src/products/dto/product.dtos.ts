import { IsNotEmpty, IsNumber, IsString, Max, Min, min } from 'class-validator';

import { Exclude } from 'class-transformer';

export class ProductDto {
  id?: string;

  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  qty: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10000)
  price: number;

  @Exclude()
  _id?: any;

  @Exclude()
  __v?: any;

  constructor(partial: Partial<ProductDto>) {
    Object.assign(this, partial);
  }
}
