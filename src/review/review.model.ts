import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({
  timestamps: true,
})
export class ReviewModel {
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
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel)
