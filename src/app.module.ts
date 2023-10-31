import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UnauthorizedInterceptor } from './common/errors/interceptors/unauthorized.Interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LocalStrategy } from './auth/strategy/local.strategy';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule],
  controllers: [],
  providers: [
    LocalStrategy,
    {
      provide: APP_INTERCEPTOR,
      useClass: UnauthorizedInterceptor,
    },
  ],
})
export class AppModule {}
