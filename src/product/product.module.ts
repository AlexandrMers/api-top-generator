import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ProductController } from './product.controller'

import { ProductSchema } from './product.model'

import { SCHEMAS } from '../constants/schemas'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SCHEMAS.PRODUCT_SCHEMA,
        schema: ProductSchema,
      },
    ]),
  ],
  controllers: [ProductController],
})
export class ProductModule {}
