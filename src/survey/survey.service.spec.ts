import { getModelToken } from '@nestjs/mongoose';
import { CreateSurveyDto, UserIdentityDTO } from './dto/survey.dto';
import { SurveyService } from './survey.service';
import { SurveyResponse } from './types/user.type';
import { Test, TestingModule } from '@nestjs/testing';

describe('SurveyService', () => {
  let service: SurveyService;
  let id: string;
  let user: UserIdentityDTO;
  let surveyDataResponse: SurveyResponse;

  beforeEach(async () => {
    user = {
      _id: '5aeb0fdd-bd22-497f-a055-ea473799e95d',
      email: 'test@test.com.br',
    };
    surveyDataResponse = {
      _id: id,
      title: 'Quanto é 2+2',
      description: 'Some os valores, encontre os resultados e responda!',
      options: ['1', '5', '7', '9', '0'],
      user,
      type: 'Geek',
      status: 1,
    };

    const surveyRepository = {
      create: jest.fn().mockResolvedValue(true),
      find: jest.fn().mockReturnThis(),
      select: jest.fn().mockResolvedValue([surveyDataResponse]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SurveyService,
        {
          provide: getModelToken('Survey'), // Use o token real do seu modelo
          useValue: surveyRepository,
        },
      ],
    }).compile();

    service = module.get<SurveyService>(SurveyService);
  });

  it('deve criar uma instância do SurveyService', () => {
    expect(service).toBeDefined();
  });

  it('deve encontrar todas as enquetes', async () => {
    const newSurvey = await service.getAll(user);

    expect(service['surveyRepo'].find).toHaveBeenCalled();
    expect(service['surveyRepo'].find().select).toHaveBeenCalledWith(
      '_id title description options user type status',
    );
    expect([surveyDataResponse]).toStrictEqual(newSurvey);
  });

  it('deve criar uma enquete', async () => {
    const createSurvey: CreateSurveyDto = {
      title: 'Quanto é 2+2',
      description: 'Some os valores, encontre os resultados e responda!',
      options: ['1', '5', '7', '9', '0'],
      type: 'Geek',
    };
    const newSurvey = await service.create(user, createSurvey);
    expect(service['surveyRepo'].create).toHaveBeenCalledWith({
      ...createSurvey,
      user,
    });
    expect(service['surveyRepo'].create).toHaveBeenCalled();
    expect(newSurvey).toBe(true);
  });
});
