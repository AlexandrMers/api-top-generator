import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'

import { REVIEW_NOT_FOUND_TEXT_ERROR } from './review.constants'

import { UserClientTypeFromAuth } from '../auth/auth.types'
import { CreateReviewDto } from './dto/create-review.dto'

import { ReviewService } from './review.service'
import { TelegramService } from '../telegram/telegram.service'

import { JwtAuthGuard } from '../auth/guards/auth.guard'

import { UserDecorator } from '../decorators/user.decorator'

import { IdValidationPipe } from '../pipes/id-validation.pipe'

const formatMessageForTg = (dto: CreateReviewDto) =>
  `Заголовок: ${dto.title}\n` +
  `Описание: ${dto.description}\n` +
  `Рейтинг: ${dto.rating}\n` +
  `ID продукта: ${dto.productId}`

@Controller('review')
export class ReviewController {
  constructor(
    @Inject(ReviewService) private readonly reviewService: ReviewService,
    @Inject(TelegramService) private readonly telegramService: TelegramService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto)
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('notify')
  async notify(@Body() dto: CreateReviewDto) {
    const message = formatMessageForTg(dto)
    return this.telegramService.sendMessage(message)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const doc = await this.reviewService.delete(id)

    if (!doc) {
      throw new HttpException(REVIEW_NOT_FOUND_TEXT_ERROR, HttpStatus.NOT_FOUND)
    }

    return doc
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Get('byProduct/:id')
  async getByProduct(
    @Param('id', IdValidationPipe) id: string,
    @UserDecorator() user: UserClientTypeFromAuth,
  ) {
    return this.reviewService.findByProductId(id)
  }

  @Delete('byProduct/:id')
  async deleteByProduct(@Param('id', IdValidationPipe) id: string) {
    return this.reviewService.deleteByProductId(id)
  }
}
