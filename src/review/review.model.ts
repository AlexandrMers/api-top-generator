import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { SchemaTypes, Types } from 'mongoose'

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
    type: SchemaTypes.ObjectId,
  })
  productId: Types.ObjectId
}

export const ReviewSchema = SchemaFactory.createForClass(Review)
