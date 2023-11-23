import { IsNotEmpty, IsString } from 'class-validator';

export class LoginBodyDto {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class PayloadData {
  _id: string;
  email: string;
}
