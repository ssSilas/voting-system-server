import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from 'src/decorator/user.decorator';
import { UserIdentityDTO } from 'src/survey/dto/survey.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req: Request, @User() user: UserIdentityDTO) {
    const { headers } = req;
    return await this.authService.signIn(user, headers.host);
  }
}
