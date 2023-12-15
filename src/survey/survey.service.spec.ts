import { getModelToken } from '@nestjs/mongoose';
import { CreateSurveyDto, UserIdentityDTO } from './dto/survey.dto';
import { SurveyService } from './survey.service';
import { SurveyResponse } from './types/user.type';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { NotFoundError } from '../common/errors/types/NotFoundError';

interface ModelSurvey {
  create: jest.Mock<any, any, any>;
  find: jest.Mock<any, any, any>;
  select: jest.Mock<any, any, any>;
  findOne: jest.Mock<any, any, any>;
  exists: jest.Mock<any, any, any>;
}
describe('SurveyService', () => {
  let service: SurveyService;
  let id: string;
  let user: UserIdentityDTO;
  let surveyDataResponse: SurveyResponse;
  let surveyRepository: ModelSurvey;

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

    surveyRepository = {
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

    it('deve retornar erro, caso o id não exista', async () => {
      surveyRepository.exists.mockReturnValue(false);
      try {
        await service.getById(undefined, user);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundError);
        expect(error.message).toEqual('Enquete(s) não encontrada(s)!');
      }
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
