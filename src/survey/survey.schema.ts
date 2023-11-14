import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EmbeddedUser } from './dto/survey.dto';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<Survey>;
@Schema({ timestamps: true, autoCreate: true })
export class Survey {
  @Prop({ maxlength: 50 })
  title: string;

  @Prop({ maxlength: 300 })
  description: string;

  @Prop({ required: true })
  options: string[];

  @Prop({ required: true })
  user: EmbeddedUser;

  @Prop({ required: true })
  type: string;

  @Prop({ default: 1 })
  status: number;
}

export const SurveySchema = SchemaFactory.createForClass(Survey);
