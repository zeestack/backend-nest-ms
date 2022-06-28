import { Connection } from 'mongoose';
import { OrderSchema } from './schemas/order.schema';

export const orderProviders = [
  {
    provide: 'ORDER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Orders', OrderSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
