import { CreateSurveyDto, UserIdentityDTO } from './dto/survey.dto';
import { SurveyService } from './survey.service';

describe('SurveyService', () => {
  let service: SurveyService;
  let id: string;
  let userId: string;
  let userEmail: string;
  let date;

  beforeEach(async () => {
    service = new SurveyService();
    id = '3cfa4d9d-52c8-479e-ac70-87dde8ded39f';
    userId = '5aeb0fdd-bd22-497f-a055-ea473799e95d';
    userEmail = 'test@test.com.br';
    date = new Date();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create of a course', async () => {
    const user: UserIdentityDTO = { _id: userId, email: userEmail };

    const mockSurveyRepo = {
      create: jest.fn().mockReturnValue(Promise.resolve(true)),
    };

    //@ts-expect-error defined part of methods
    service['surveyRepo'] = mockSurveyRepo;
    const createSurvey: CreateSurveyDto = {
      title: 'Quanto é 2+2',
      description: 'Some os valores, encontre os resultados e responda!',
      options: ['1', '5', '7', '9', '0'],
      type: 'Geek',
    };
    const newSurvey = await service.create(user, createSurvey);
    expect(mockSurveyRepo.create).toHaveBeenCalled();
    expect(true).toStrictEqual(newSurvey);
  });
});
