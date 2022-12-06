import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ReviewController } from './review.controller'

import { ReviewSchema } from './review.model'

import { SCHEMAS } from '../constants/schemas'
import { ReviewService } from './review.service';

@Module({
  controllers: [ReviewController],
  imports: [
    MongooseModule.forFeature([
      {
        name: SCHEMAS.REVIEW_SCHEMA,
        schema: ReviewSchema,
      },
    ]),
  ],
  providers: [ReviewService],
})
export class ReviewModule {}
