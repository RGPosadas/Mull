/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.enableCors({
    origin: environment.production
      ? environment.client.baseUrl
      : [environment.client.baseUrl, 'https://studio.apollographql.com'],
    credentials: true,
  });
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Listening at ' + environment.backend.url + '/' + globalPrefix);
  });
}

bootstrap();
