import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsString } from 'class-validator';

export class SurveyFindResponse {
  @ApiProperty({ description: 'UUID' })
  _id: string;

  @ApiProperty({
    description: 'Title survey',
    example: 'What is the best film of 2023?',
  })
  title: string;

  @ApiProperty({
    description: 'A short description for the survey',
    example:
      'Based on your personal tastes. Tell us which film is the best among the options below:',
  })
  description: string;

  @ApiProperty({
    description: 'Field containing the available options to be selected',
    example: [
      'Barbie',
      'The Super Mario Bros. Movie',
      'Guardians of the Galaxy Vol. 3',
      'Oppenheimer',
      'Avatar: The Way of Water',
    ],
  })
  options: string[];

  user: UserIdentityDTO;

  @ApiProperty({
    description: 'Tag to directly define the type of poll',
    examples: ['movie', 'geek'],
    example: 'geek',
  })
  type: string;

  @ApiProperty({
    description: 'Enable or disable survey',
  })
  status: number;
}

export class UserIdentityDTO {
  @ApiProperty({ description: 'UUID' })
  _id: string;

  @ApiProperty({ description: 'Email' })
  email: string;
}

export class FillDataSurveyDto {
  @ApiProperty({
    description: 'Title survey',
    example: 'What is the best film of 2023?',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'A short description for the survey',
    example:
      'Based on your personal tastes. Tell us which film is the best among the options below:',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Field containing the available options to be selected',
    example: [
      'Barbie',
      'The Super Mario Bros. Movie',
      'Guardians of the Galaxy Vol. 3',
      'Oppenheimer',
      'Avatar: The Way of Water',
    ],
    isArray: true,
    maxItems: 5,
    minItems: 5,
  })
  @IsArray()
  @ArrayMinSize(5)
  @ArrayMaxSize(5)
  options: string[];

  @ApiProperty({
    description: 'Tag to directly define the type of poll',
    examples: ['movie', 'geek'],
    example: 'geek',
  })
  @IsString()
  type: string;
}
