import { UserIdentityDTO } from 'src/survey/dto/survey.dto';

export type Payload = {
  iss: string;
  aud: string;
  data: UserIdentityDTO;
  iat: number;
  exp: number;
};
