import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserResponse, UserBodyDto } from '../../helpers/dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userRepo: Model<User>) {}

  async createAccount(data: UserBodyDto): Promise<CreateUserResponse> {
    await this.emailExist(data.email);
    await this.loginExist(data.login);

    const create = await this.userRepo.create({ ...data });
    return {
      name: create.name,
      login: create.login,
      email: create.email,
    };
  }

  private async emailExist(email: string): Promise<void> {
    const check = await this.userRepo.findOne({ email });
    if (check) {
      throw new ConflictException('This email is already in use!');
    }
  }

  private async loginExist(login: string): Promise<void> {
    const check = await this.userRepo.findOne({ login });
    if (check) {
      throw new ConflictException('This login is already in use!');
    }
  }

  async findByLoginOrEmail(loginOrEmail: string): Promise<User> {
    return await this.userRepo.findOne(
      { $or: [{ login: loginOrEmail }, { email: loginOrEmail }] },
      '_id email password',
    );
  }
}
