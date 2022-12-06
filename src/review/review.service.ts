import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { Types } from 'mongoose'

// Types
import { ReviewModelType } from './review.types'
import { CreateReviewDto } from './dto/create-review.dto'

// Constants
import { SCHEMAS } from '../constants/schemas'

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(SCHEMAS.REVIEW_SCHEMA)
    private readonly reviewModel: ReviewModelType,
  ) {}

  create(dto: CreateReviewDto) {
    const review = new this.reviewModel<CreateReviewDto>(dto)
    return review.save()
  }

  delete(id: string) {
    return this.reviewModel.findByIdAndDelete(id).exec()
  }

  findByProductId(id: string) {
    return this.reviewModel
      .findById({
        productId: new Types.ObjectId(id),
      })
      .exec()
  }
}
