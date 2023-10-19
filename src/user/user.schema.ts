import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { configEnv } from "config/enviroments";
import { createHash } from "crypto";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number

  @Prop({ required: true })
  career: string

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true, unique: true })
  login: string

  @Prop({ required: true })
  password: string;

  @Prop({ default: 1 })
  status: number
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = configEnv.salt
  const password = this.get('password')
  const passSalt = String(password + salt)
  const encrypted = createHash('sha1').update(passSalt).digest('hex')
  this.password = encrypted
})