import { Injectable } from '@nestjs/common';
import { UserIdentityDTO, FillDataSurveyDto } from './dto/survey.dto';
import { Survey } from './survey.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundError } from '../common/errors/types/NotFoundError';
import { SurveyResponse } from './types/user.type';
import { ApiTags } from '@nestjs/swagger';

@Injectable()
export class SurveyService {
  @InjectModel(Survey.name) private readonly surveyRepo: Model<Survey>;

  async getAll(user: UserIdentityDTO): Promise<SurveyResponse[]> {
    return await this.surveyRepo
      .find({ 'user._id': user._id })
      .select('_id title description options user type status');
  }

  async getById(id: string, user: UserIdentityDTO): Promise<SurveyResponse> {
    await this.checkIdExist(id);
    return await this.surveyRepo
      .findOne({ _id: id, 'user._id': user._id })
      .select('_id title description options user type status');
  }

  async create(
    user: UserIdentityDTO,
    data: FillDataSurveyDto,
  ): Promise<boolean> {
    await this.surveyRepo.create({
      user,
      ...data,
    });
    return true;
  }

  async update(id: string, data: FillDataSurveyDto): Promise<boolean> {
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
      throw new NotFoundError('Enquete(s) não encontrada(s)!');
    }
  }
}
