import { IsString, IsNumber, Min, Max } from 'class-validator'

import {
  MAX_VALUE_RATING_ERROR_TEXT,
  MIN_VALUE_RATING_ERROR_TEXT,
} from '../review.constants'

export class CreateReviewDto {
  @IsString()
  name: string

  @IsString()
  title: string

  @IsString()
  description: string

  @Max(5, { message: MAX_VALUE_RATING_ERROR_TEXT })
  @Min(1, { message: MIN_VALUE_RATING_ERROR_TEXT })
  @IsNumber()
  rating: number

  @IsString()
  productId: string
}
