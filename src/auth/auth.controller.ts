import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from 'src/decorators/user.decorator';
import { UserIdentityDTO } from 'helpers/dto/survey.dto';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ResponseLogin } from '../../helpers/dto/auth.dto';
import { LoginProperty } from 'helpers/dto/user.dto';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginProperty })
  @ApiCreatedResponse({ description: 'Login successful', type: ResponseLogin })
  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(
    @Req() req: Request,
    @User() user: UserIdentityDTO,
  ): Promise<ResponseLogin> {
    const { headers } = req;
    return await this.authService.signIn(user, headers.host);
  }
}
