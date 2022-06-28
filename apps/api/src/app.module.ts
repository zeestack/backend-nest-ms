import { MiddlewareConsumer, Module } from '@nestjs/common';

import { AuthMiddlware } from './middlewares';
import { AuthModule } from './auth/auth.module';
import { DbModule } from '@app/db';
import { JwtModule } from '@nestjs/jwt';
import { JwtUtils } from '@app/utils';
import { OrderModule } from './apiGateway';
import { ProductModule } from './apiGateway';

@Module({
  imports: [
    DbModule,
    JwtModule.register({ secret: 'secret' }),
    AuthModule,
    ProductModule,
    OrderModule,
  ],
  controllers: [],
  providers: [JwtUtils],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddlware).forRoutes('*');
  }
}
