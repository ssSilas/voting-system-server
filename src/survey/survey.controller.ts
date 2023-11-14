import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SurveyService } from './survey.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { EmbeddedUser, createSurveyDto } from './dto/survey.dto';
import { User } from 'src/decorator/user.decorator';

@Controller('survey')
@UseGuards(JwtAuthGuard)
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post()
  create(@User() user: EmbeddedUser, @Body() body: createSurveyDto) {
    return this.surveyService.create(user, body);
  }

  @Put()
  update(@Query('id') id: string, @Body() body: createSurveyDto) {
    return this.surveyService.update(id, body);
  }

  @Delete()
  delete(@Query('id') id: string) {
    return this.surveyService.delete(id);
  }
}
