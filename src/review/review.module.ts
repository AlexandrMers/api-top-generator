import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

// Controller
import { ReviewController } from './review.controller'

// Services
import { ReviewService } from './review.service'

// Schema
import { ReviewSchema } from './review.model'

// Constants
import { SCHEMAS } from '../constants/schemas'

@Module({
  controllers: [ReviewController],
  imports: [
    MongooseModule.forFeature([
      {
        name: SCHEMAS.REVIEW_SCHEMA,
        schema: ReviewSchema,
        collection: SCHEMAS.REVIEW_SCHEMA,
      },
    ]),
  ],
  providers: [ReviewService],
})
export class ReviewModule {}
