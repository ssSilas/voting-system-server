import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({ autoCreate: true })
export class User {
  @Prop({ required: true, })
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

  @Prop({ required: true })
  status: number

}

export const UserSchema = SchemaFactory.createForClass(User);