import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SurveyService } from './survey.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UserIdentityDTO, FillDataSurveyDto } from './dto/survey.dto';
import { User } from 'src/decorators/user.decorator';

@Controller('survey')
@UseGuards(JwtAuthGuard)
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Get('all-ids')
  async getAll(@User() user: UserIdentityDTO) {
    return await this.surveyService.getAll(user);
  }

  @Get('by-id')
  async getById(@Query('id') id: string, @User() user: UserIdentityDTO) {
    return await this.surveyService.getById(id, user);
  }

  @Post()
  create(@User() user: UserIdentityDTO, @Body() body: FillDataSurveyDto) {
    return this.surveyService.create(user, body);
  }

  @Put()
  update(@Query('id') id: string, @Body() body: FillDataSurveyDto) {
    return this.surveyService.update(id, body);
  }

  @Delete()
  delete(@Query('id') id: string) {
    return this.surveyService.delete(id);
  }
}
