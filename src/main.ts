import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join, resolve } from 'path';
import { configEnv } from 'config/enviroments';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  // On DTOs validations
  app.useGlobalPipes(new ValidationPipe());  
  await app.listen(configEnv.portApp);

  console.log(`\nRunning port: http://127.0.0.1:${configEnv.portApp}`)
}
bootstrap();
