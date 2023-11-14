import { BadRequestException, Injectable } from '@nestjs/common';
import { EmbeddedUser, createSurveyDto } from './dto/survey.dto';
import { Survey } from './survey.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SurveyService {
  constructor(@InjectModel(Survey.name) private surveyRepo: Model<Survey>) {}
  async create(user: EmbeddedUser, data: createSurveyDto) {
    return await this.surveyRepo.create({
      user,
      ...data,
    });
  }

  async update(id: string, data: createSurveyDto) {
    try {
      return await this.surveyRepo.updateOne(
        { _id: id },
        {
          ...data,
        },
      );
    } catch (error) {
      throw new BadRequestException('Algo deu errado');
    }
  }

  async delete(id: string) {
    try {
      return await this.surveyRepo.deleteOne({ _id: id });
    } catch (error) {
      throw new BadRequestException('Algo deu errado');
    }
  }
}
