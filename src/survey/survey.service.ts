import { Injectable } from '@nestjs/common';
import { UserIdentityDTO, createSurveyDto } from './dto/survey.dto';
import { Survey } from './survey.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BadRequestError } from 'src/common/errors/types/BadRequestError';

@Injectable()
export class SurveyService {
  constructor(@InjectModel(Survey.name) private surveyRepo: Model<Survey>) {}

  async getAll(user: UserIdentityDTO): Promise<Survey[]> {
    return await this.surveyRepo.find({ 'user._id': user._id });
  }

  async getById(id: string, user: UserIdentityDTO): Promise<Survey> {
    await this.checkIdExist(id);
    return await this.surveyRepo.findOne({ _id: id, 'user._id': user._id });
  }

  async create(user: UserIdentityDTO, data: createSurveyDto): Promise<boolean> {
    await this.surveyRepo.create({
      user,
      ...data,
    });
    return true;
  }

  async update(id: string, data: createSurveyDto): Promise<boolean> {
    await this.checkIdExist(id);
    await this.surveyRepo.updateOne({ _id: id }, { ...data });
    return true;
  }

  async delete(id: string): Promise<boolean> {
    await this.checkIdExist(id);
    await this.surveyRepo.deleteOne({ _id: id });
    return true;
  }

  async checkIdExist(id: string): Promise<void> {
    const exist = await this.surveyRepo.exists({ _id: id });
    if (!exist) {
      throw new BadRequestError('Enquete(s) não encontrada(s)!');
    }
  }
}
