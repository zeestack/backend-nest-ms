import mongoose from 'mongoose';

const db = 'Microservices';

export const dbProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(`mongodb://localhost:27017/${db}`),
  },
];
