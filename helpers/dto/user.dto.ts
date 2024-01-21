import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LoginProperty {
  @ApiProperty({
    description: 'Used to login within the platform',
    example: 'Agos.Cabby',
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    description: 'Used to login within the platform',
    example: 'Cabby.com*(@',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
export class UserBodyDto {
  @ApiProperty({
    description: 'Username',
    example: 'Agostinho Carrara',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'User age',
    example: '25',
  })
  @IsNumber()
  @IsNotEmpty()
  age: number;

  @ApiProperty({
    description: 'Profession user',
    example: 'Cabby',
  })
  @IsString()
  @IsNotEmpty()
  career: string;

  @ApiProperty({
    description: 'User email',
    example: 'Agostinho@Cabby.com.br',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Used to login within the platform',
    example: 'Agos.Cabby',
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    description: 'Used to login within the platform',
    example: 'Cabby.com*(@',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class CreateUserResponse {
  @ApiProperty({
    description: 'Username',
    example: 'Agostinho Carrara',
  })
  name: string;

  @ApiProperty({
    description: 'Used to login within the platform',
    example: 'Agos.Cabby',
  })
  login: string;

  @ApiProperty({
    description: 'Used to login within the platform',
    example: 'Cabby.com*(@',
  })
  email: string;
}
