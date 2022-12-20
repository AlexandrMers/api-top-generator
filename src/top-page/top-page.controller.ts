import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'

import { NOT_FOUND_PAGE_ERROR } from './top-page.constants'

import { CreateTopPageDto } from './dto/create-top-page.dto'

import { TopPageService } from './top-page.service'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { IdValidationPipe } from '../pipes/id-validation.pipe'
import { FindTopPageDto } from './dto/find-top-page.dto'

@Controller('top-page')
export class TopPageController {
  constructor(
    @Inject(TopPageService) private readonly topPageService: TopPageService,
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
  @Post('/findByFirstCategory')
  async find(@Body() dto: FindTopPageDto) {
    return this.topPageService.findByCategory(dto)
  }
}
