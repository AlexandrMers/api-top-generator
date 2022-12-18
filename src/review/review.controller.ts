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

import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { UserDecorator } from '../decorators/user.decorator'

@Controller('review')
export class ReviewController {
  constructor(
    @Inject(ReviewService) private readonly reviewService: ReviewService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
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
    @Param('id') id: string,
    @UserDecorator() user: UserClientTypeFromAuth,
  ) {
    return this.reviewService.findByProductId(id)
  }

  @Delete('byProduct/:id')
  async deleteByProduct(@Param('id') id: string) {
    return this.reviewService.deleteByProductId(id)
  }
}
