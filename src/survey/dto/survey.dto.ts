import { ArrayMaxSize, ArrayMinSize, IsArray, IsString } from 'class-validator';

export class UserIdentityDTO {
  _id: string;
  email: string;
}

export class createSurveyDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  @ArrayMinSize(5)
  @ArrayMaxSize(5)
  options: string[];

  @IsString()
  type: string;
}
