import { Injectable } from '@nestjs/common';
import { EmbeddedUser, createSurveyDto } from './dto/survey.dto';
import { Survey } from './survey.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BadRequestError } from 'src/common/errors/types/BadRequestError';

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
    await this.checkIdExist(id);
    return await this.surveyRepo.updateOne({ _id: id }, { ...data });
  }

  async delete(id: string) {
    await this.checkIdExist(id);
    return await this.surveyRepo.deleteOne({ _id: id });
  }

  async checkIdExist(id: string) {
    const exist = await this.surveyRepo.exists({ _id: id });
    if (!exist) {
      throw new BadRequestError('Enquete não encontrada!');
    }
  }
}
