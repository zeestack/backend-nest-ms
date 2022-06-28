import { Connection } from 'mongoose';
import { ProductSchema } from './schemas/product.schema';

export const productProviders = [
  {
    provide: 'PRODUCT_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Products', ProductSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
