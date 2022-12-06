import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ReviewController } from './review.controller'

import { ReviewSchema } from './review.model'

import { SCHEMAS } from '../constants/schemas'

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
})
export class ReviewModule {}
