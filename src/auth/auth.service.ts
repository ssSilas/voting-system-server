import { Injectable } from '@nestjs/common';
import { configEnv } from 'config/enviroments';
import { createHash } from 'crypto';
import { User } from 'src/user/user.schema';
import { PayloadData } from './dto/auth.dto';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UnauthorizedError } from 'src/common/errors/types/UnauthorizedError';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signIn(payload: PayloadData, host: string) {
    const token = this.generateToken(payload, host);
    return { token };
  }

  async validateUser(login: string, password: string): Promise<User> {
    const user = await this.userService.findByLogin(login);
    if (!user) throw new UnauthorizedError('Usuario não autorizado');

    const hashedPass = this.hashPass(password);
    const comparePass = hashedPass == user.password;
    if (!comparePass) throw new UnauthorizedError('Usuario não autorizado');

    return user;
  }

  hashPass(password: string): string {
    const salt = configEnv.salt;
    const passSalt = String(password + salt);
    const encrypted = createHash('sha1').update(passSalt).digest('hex');
    return encrypted;
  }

  generateToken(user: PayloadData, host: string): string {
    const secretKey: string = configEnv.secret;
    const timeToken: string = configEnv.expireToken;

    const payload: object = {
      iss: host,
      aud: host,
      data: {
        id: user.id,
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
