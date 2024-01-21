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
import {
  UserIdentityDTO,
  FillDataSurveyDto,
  SurveyFindResponse,
} from '../../helpers/dto/survey.dto';
import { User } from 'src/decorators/user.decorator';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('survey')
@Controller('survey')
@UseGuards(JwtAuthGuard)
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @ApiOkResponse({ type: SurveyFindResponse, isArray: true })
  @Get('all-ids')
  async getAll(@User() user: UserIdentityDTO): Promise<SurveyFindResponse[]> {
    return await this.surveyService.getAll(user);
  }

  @ApiOkResponse({ type: SurveyFindResponse })
  @Get('by-id')
  async getById(
    @Query('id') id: string,
    @User() user: UserIdentityDTO,
  ): Promise<SurveyFindResponse> {
    return await this.surveyService.getById(id, user);
  }

  @ApiResponse({ type: Boolean })
  @Post()
  create(
    @User() user: UserIdentityDTO,
    @Body() body: FillDataSurveyDto,
  ): Promise<boolean> {
    return this.surveyService.create(user, body);
  }

  @ApiResponse({ type: Boolean })
  @Put()
  update(
    @Query('id') id: string,
    @Body() body: FillDataSurveyDto,
  ): Promise<boolean> {
    return this.surveyService.update(id, body);
  }

  @ApiResponse({ type: Boolean })
  @Delete()
  delete(@Query('id') id: string): Promise<boolean> {
    return this.surveyService.delete(id);
  }
}
