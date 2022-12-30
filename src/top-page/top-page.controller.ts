import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'

// Constants
import {
  CRON_NAME_OPERATION_FOR_UPDATE_HH_RU_DATA,
  NOT_FOUND_PAGE_ERROR,
} from './top-page.constants'

// DTO
import { FindTopPageDto } from './dto/find-top-page.dto'
import { CreateTopPageDto } from './dto/create-top-page.dto'

// Pipes
import { IdValidationPipe } from '../pipes/id-validation.pipe'

// Guards
import { JwtAuthGuard } from '../auth/guards/auth.guard'

// Services
import { TopPageService } from './top-page.service'
import { HhService } from '../hh/hh.service'

@Controller('top-page')
export class TopPageController {
  constructor(
    private readonly topPageService: TopPageService,
    private readonly hhService: HhService,
  ) {}

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: CreateTopPageDto) {
    return this.topPageService.create(dto)
  }

  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const page = await this.topPageService.findById(id)

    if (!page) throw new NotFoundException(NOT_FOUND_PAGE_ERROR)

    return page
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const page = await this.topPageService.deleteById(id)

    if (!page) throw new NotFoundException(NOT_FOUND_PAGE_ERROR)

    return page
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patch(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: CreateTopPageDto,
  ) {
    const updatedPage = await this.topPageService.updateById(id, dto)

    if (!updatedPage) throw new NotFoundException(NOT_FOUND_PAGE_ERROR)

    return updatedPage
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('findByFirstCategory')
  async find(@Body() dto: FindTopPageDto) {
    return this.topPageService.findByCategory(dto)
  }

  @HttpCode(200)
  @Post('search')
  async search(@Query('query') query: string) {
    return this.topPageService.search(query)
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    name: CRON_NAME_OPERATION_FOR_UPDATE_HH_RU_DATA,
  })
  async test() {
    const pages = await this.topPageService.findForHhUpdate(new Date())
    for (const page of pages) {
      const hhData = await this.hhService.get(page.category)
      if (hhData) {
        page.hh = hhData
        await this.topPageService.updateById(page._id, page)
      }
    }
  }
}
