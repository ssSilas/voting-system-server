import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserResponse, UserBodyDto } from '../../helpers/dto/user.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({
    status: 201,
    type: CreateUserResponse,
  })
  @Post()
  create(@Body() userBody: UserBodyDto): Promise<CreateUserResponse> {
    return this.userService.createAccount(userBody);
  }
}
