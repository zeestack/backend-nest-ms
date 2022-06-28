import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

const port = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  await app
    .listen(port)
    .then(() => {
      Logger.log(`Auth-Server running on port ${port}`, 'Bootstrap');
    })
    .catch((err) => {
      Logger.error(err, 'Bootstrap');
    });
}
bootstrap();
