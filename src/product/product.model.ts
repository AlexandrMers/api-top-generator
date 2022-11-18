import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
class ProductCharacteristic {
  @Prop({
    type: String,
  })
  name: string

  @Prop({
    type: String,
  })
  value: string
}

@Schema({
  timestamps: true,
})
export class ProductModel {
  @Prop({
    type: String,
  })
  image: string

  @Prop({
    type: String,
  })
  title: string

  @Prop({
    type: Number,
  })
  price: number

  @Prop({
    type: Number,
  })
  oldPrice: number

  @Prop({
    type: Number,
  })
  credit: number

  @Prop({
    type: Number,
  })
  calculatedRating: number

  @Prop({
    type: String,
  })
  description: string

  @Prop({
    type: String,
  })
  advantages: string

  @Prop({
    type: String,
  })
  disAdvantages: string

  @Prop({
    type: () => [String],
  })
  categories: string[]

  @Prop({
    type: () => [String],
  })
  tags: string[]

  @Prop({
    type: () => [ProductCharacteristic],
    _id: false,
  })
  characteristics: ProductCharacteristic[]
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel)
