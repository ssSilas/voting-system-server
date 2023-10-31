import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { configEnv } from 'config/enviroments';

const urlDb = `mongodb://${configEnv.userDb}:${configEnv.passDb}@mongo:${configEnv.portDb}`;
@Module({
  imports: [MongooseModule.forRoot(urlDb, { autoCreate: true })],
})
export class DatabaseModule {}
