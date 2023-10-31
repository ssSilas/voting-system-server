import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserBodyDto } from './dto/user.dto';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() userBody: UserBodyDto) {
    return this.userService.createAccount(userBody);
  }
}
