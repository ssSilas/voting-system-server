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
    id = 'af9bea1b-0d23-4295-8db6-ad5c8ef4e984';
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
      findOne: jest.fn().mockReturnThis(),
      exists: jest.fn().mockResolvedValue({ _id: id }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SurveyService,
        {
          provide: getModelToken('Survey'),
          useValue: surveyRepository,
        },
      ],
    }).compile();

    service = module.get<SurveyService>(SurveyService);
  });

  it('deve criar uma instância do SurveyService', () => {
    expect(service).toBeDefined();
  });

  describe('getAll()', () => {
    it('deve encontrar todas as enquetes', async () => {
      const newSurvey = await service.getAll(user);
      const expectOutputReponse = [surveyDataResponse];

      expect(service['surveyRepo'].find).toHaveBeenCalled();
      expect(service['surveyRepo'].find).toHaveBeenCalledTimes(1);
      expect(service['surveyRepo'].find().select).toHaveBeenCalledWith(
        '_id title description options user type status',
      );
      expect(expectOutputReponse).toStrictEqual(newSurvey);
    });
  });

  describe('getById()', () => {
    it('deve encontrar uma enquete por id', async () => {
      const newSurvey = await service.getById(id, user);

      expect(service['surveyRepo'].exists).toHaveBeenCalled();
      expect(service['surveyRepo'].exists).toHaveBeenCalledTimes(1);
      expect(service['surveyRepo'].findOne().select).toHaveBeenCalledWith(
        '_id title description options user type status',
      );
      expect(surveyDataResponse).toStrictEqual(newSurvey[0]);
    });
  });

  describe('create()', () => {
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
});
