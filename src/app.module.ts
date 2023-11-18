import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SurveyModule } from './survey/survey.module';
import { LocalStrategy } from './auth/strategy/local.strategy';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule, SurveyModule],
  controllers: [],
  providers: [LocalStrategy],
})
export class AppModule {}
