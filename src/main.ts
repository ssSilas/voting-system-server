import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { configEnv } from 'config/enviroments';
import { UnauthorizedInterceptor } from './common/errors/interceptors/unauthorized.Interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new UnauthorizedInterceptor());
  await app.listen(configEnv.portApp || 8090);

  console.log(`\nRunning port: http://127.0.0.1:${configEnv.portApp}`);
}
bootstrap();
