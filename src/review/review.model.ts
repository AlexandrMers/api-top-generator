import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'

@Schema({
  timestamps: true,
})
export class Review {
  @Prop({
    type: String,
  })
  name: string

  @Prop({
    type: String,
  })
  title: string

  @Prop({
    type: String,
  })
  description: string

  @Prop({
    type: Number,
  })
  rating: number

  @Prop({
    type: Types.ObjectId,
  })
  productId: Types.ObjectId
}

export const ReviewSchema = SchemaFactory.createForClass(Review)
