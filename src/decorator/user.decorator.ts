import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserIdentityDTO } from 'src/survey/dto/survey.dto';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext): UserIdentityDTO => {
    const request = ctx.switchToHttp().getRequest();
    const user: UserIdentityDTO = {
      _id: request.user._id,
      email: request.user.email,
    };
    return user;
  },
);
