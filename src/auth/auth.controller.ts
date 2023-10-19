import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserBodyDto } from 'helpers/dto/auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  signIn() {

  }
}
