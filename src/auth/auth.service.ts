import { Injectable } from '@nestjs/common';
import { configEnv } from 'config/enviroments';
import { createHash } from 'crypto';
import { User } from 'src/user/user.schema';
import { PayloadData, ResponseLogin } from '../../helpers/dto/auth.dto';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UnauthorizedError } from 'src/common/errors/types/UnauthorizedError';
import { UserIdentityDTO } from 'helpers/dto/survey.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signIn(payload: PayloadData, host: string): Promise<ResponseLogin> {
    const token = this.generateToken(payload, host);
    return { token };
  }

  async validateUser(login: string, password: string): Promise<User> {
    const user = await this.userService.findByLoginOrEmail(login);
    if (!user) throw new UnauthorizedError('Usuario não encontrado');

    const hashedPass = this.hashPass(password);
    const comparePass = hashedPass == user.password;
    if (!comparePass) throw new UnauthorizedError('Senha incorreta');
    return user;
  }

  hashPass(password: string): string {
    const salt = configEnv.salt;
    const passSalt = String(password + salt);
    const encrypted = createHash('sha1').update(passSalt).digest('hex');
    return encrypted;
  }

  generateToken(user: UserIdentityDTO, host: string): string {
    const secretKey: string = configEnv.secret;
    const timeToken: string = configEnv.expireToken;

    const payload: object = {
      iss: host,
      aud: host,
      data: {
        _id: user._id,
        email: user.email,
      },
    };
    const option: JwtSignOptions = {
      secret: secretKey,
      algorithm: 'HS256',
      expiresIn: timeToken,
    };
    return this.jwtService.sign(payload, { ...option });
  }
}
