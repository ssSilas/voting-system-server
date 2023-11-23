import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { configEnv } from 'config/enviroments';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserIdentityDTO } from 'src/survey/dto/survey.dto';
import { Payload } from '../types/auth.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configEnv.secret,
    });
  }

  async validate(payload: Payload): Promise<UserIdentityDTO> {
    return {
      _id: payload.data._id,
      email: payload.data.email,
    };
  }
}
