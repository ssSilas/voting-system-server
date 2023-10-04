import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { configEnv } from 'src/config/enviroments';

const urlDb = `mongodb://${configEnv.userDb}:${configEnv.passDb}@mongo:${configEnv.portDb}`
@Module({
  imports: [MongooseModule.forRoot(urlDb)],
})
export class DatabaseModule { }
