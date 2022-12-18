import { ProductDocument } from '../product/product.types'
import { ReviewDocument } from '../review/review.types'

export type AggregatedProductWithReviewsType = ProductDocument & {
  reviews: ReviewDocument[]
  reviewCount: number
  reviewAvg: number
}
