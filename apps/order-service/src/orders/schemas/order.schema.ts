import * as mongoose from 'mongoose';

import { Document } from 'mongoose';
import { OrderDto } from '../dto';

export const ProductSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },

  unitPrice: {
    type: Number,
    required: true,
    min: 0,
    max: 9999,
  },

  quantity: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },

  productName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export const OrderSchema = new mongoose.Schema({
  products: [ProductSchema],
  totalPrice: Number,
  userId: String,
});

export interface Order extends Document {
  products: [
    {
      productId: string;
      unitPrice: number;
      quantity: number;
      productName: string;
      description: string;
    },
  ];
  totalPrice: number;
}

export function mapOrderToOrderDto(order: Order): OrderDto {
  return new OrderDto({ id: order._id.toString(), ...order.toObject() });
}
