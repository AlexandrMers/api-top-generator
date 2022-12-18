import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ProductController } from './product.controller'

import { ProductSchema } from './product.model'

import { SCHEMAS } from '../constants/schemas'
import { ProductService } from './product.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SCHEMAS.PRODUCT_SCHEMA,
        schema: ProductSchema,
        collection: SCHEMAS.PRODUCT_SCHEMA,
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
