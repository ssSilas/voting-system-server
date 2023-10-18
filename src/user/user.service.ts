import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { UserBodyDto } from 'helpers/dto/auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userRepo: Model<User>
  ) { }

  async createAccount(data: UserBodyDto) {
    return await this.userRepo.create({ ...data, status: 1 })
  }
}
