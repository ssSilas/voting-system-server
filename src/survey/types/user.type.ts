import { UserIdentityDTO } from '../dto/survey.dto';

export type SurveyResponse = {
  _id: string;
  title: string;
  description: string;
  options: string[];
  user: UserIdentityDTO;
  type: string;
  status: number;
};
