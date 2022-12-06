import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
} from '@nestjs/common'

import { ReviewService } from './review.service'

import { CreateReviewDto } from './dto/create-review.dto'

import { REVIEW_NOT_FOUND_TEXT_ERROR } from '../constants/text-errors'

@Controller('review')
export class ReviewController {
  constructor(
    @Inject(ReviewService) private readonly reviewService: ReviewService,
  ) {}

  @Post('create')
  async create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const doc = await this.reviewService.delete(id)

    if (!doc) {
      throw new HttpException(REVIEW_NOT_FOUND_TEXT_ERROR, HttpStatus.NOT_FOUND)
    }

    return doc
  }

  @Get('byProduct/:id')
  async getByProduct(@Param('id') id: string) {
    return this.reviewService.findByProductId(id)
  }
}
