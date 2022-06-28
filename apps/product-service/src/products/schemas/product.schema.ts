import * as mongoose from 'mongoose';

import { Document } from 'mongoose';
import { ProductDto } from '../dto';

export const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
    min: 0,
    max: 9999,
  },
  price: {
    type: Number,
    required: true,
    min: 1,
    max: 10000,
  },
});

export interface Product extends Document {
  productName: string;
  description: string;
  qty: number;
}

export function mapProductToProdutDto(product: Product): ProductDto {
  return new ProductDto({ id: product._id.toString(), ...product.toObject() });
}
