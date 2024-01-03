import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { configEnv } from 'config/enviroments';
import { UnauthorizedInterceptor } from './common/errors/interceptors/Unauthorized.Interceptor';
import { NotFoundInterceptor } from './common/errors/interceptors/NotFound.Interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  //Global interceptors errors
  app.useGlobalInterceptors(
    new UnauthorizedInterceptor(),
    new NotFoundInterceptor(),
  );

  //Swagger
  const config = new DocumentBuilder()
    .setTitle('Voting System Server')
    .setDescription('A voting system based on polls and simple questions')
    .setVersion('1.o')
    .addTag('auth')
    .addTag('survey')
    .build();
  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, doc);

  await app.listen(configEnv.portApp || 8090);
  console.log(`\nRunning port: http://127.0.0.1:${configEnv.portApp}`);
}

bootstrap();
