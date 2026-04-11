import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,       // strips any fields not in the DTO
      forbidNonWhitelisted: true, // throws error if unknown fields are sent
      transform: true,       // auto-converts types (e.g. string "3" → number 3)
    }),
  );

  await app.listen(3000);
}
bootstrap();