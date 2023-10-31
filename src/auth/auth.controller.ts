import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { PayloadData } from './dto/auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local')) //tratamento e validação de login
  async login(@Req() req: Request) {
    const { headers } = req;
    const user: PayloadData = req.user;

    return await this.authService.signIn(user, headers.host);
  }
}
