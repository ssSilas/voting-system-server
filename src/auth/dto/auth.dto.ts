import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class LoginBodyDto {
  @IsNotEmpty()
  @IsString()
  login: string

  @IsString()
  @IsNotEmpty()
  password: string
}

export class PayloadData {
  id: string
  email: string
}