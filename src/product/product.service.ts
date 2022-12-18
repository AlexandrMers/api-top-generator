import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { PipelineStage } from 'mongoose'

import { ProductModelType } from './product.types'

import { SCHEMAS } from '../constants/schemas'
import { CreateProductDto } from './dto/create-product.dto'
import { FindProductDto } from './dto/find-product.dto'

import { AggregatedProductWithReviewsType } from '../types/product-with-reviews.types'

function getAggregateProductWithReviews(dto: FindProductDto): PipelineStage[] {
  return [
    { $match: { categories: dto.category } },
    {
      $sort: {
        _id: 1,
      },
    },
    {
      $limit: dto.limit,
    },
    {
      $lookup: {
        from: SCHEMAS.REVIEW_SCHEMA,
        localField: '_id',
        foreignField: 'productId',
        as: 'reviews',
      },
    },
    {
      $addFields: {
        reviewCount: {
          $size: '$reviews',
        },
        reviewAvg: { $avg: '$reviews.rating' },
      },
    },
  ]
}

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(SCHEMAS.PRODUCT_SCHEMA)
    private readonly productModel: ProductModelType,
  ) {}

  create(dto: CreateProductDto) {
    return this.productModel.create<CreateProductDto>(dto)
  }

  findById(id: string) {
    return this.productModel.findById(id).exec()
  }

  deleteById(id: string) {
    return this.productModel.findByIdAndDelete(id).exec()
  }

  updateById(id: string, product: CreateProductDto) {
    return this.productModel
      .findByIdAndUpdate(id, product, { new: true })
      .exec()
  }

  findWithReviews(dto: FindProductDto) {
    return this.productModel
      .aggregate(getAggregateProductWithReviews(dto))
      .exec() as Promise<AggregatedProductWithReviewsType[]>
  }
}
