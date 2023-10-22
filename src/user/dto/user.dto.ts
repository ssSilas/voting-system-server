import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class UserBodyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  age: number

  @IsString()
  @IsNotEmpty()
  career: string

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  login: string

  @IsString()
  @IsNotEmpty()
  password: string;
}