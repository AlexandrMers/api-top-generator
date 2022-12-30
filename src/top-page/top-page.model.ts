import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}

@Schema()
class Advantage {
  @Prop({ type: String })
  title: string

  @Prop({ type: String })
  description: string
}

@Schema({
  _id: false,
})
class HhData {
  @Prop({ type: Number })
  count: number

  @Prop({ type: Number })
  juniorSalary: number

  @Prop({ type: Number })
  middleSalary: number

  @Prop({ type: Number })
  seniorSalary: number

  @Prop({ type: Date })
  updatedAt: Date
}

@Schema({
  timestamps: true,
})
export class TopPage {
  @Prop({
    enum: TopLevelCategory,
  })
  firstCategory: TopLevelCategory

  @Prop({
    type: String,
  })
  secondCategory: string

  @Prop({
    type: String,
    unique: true,
  })
  alias: string

  @Prop({
    type: String,
  })
  title: string

  @Prop({
    type: String,
  })
  category: string

  @Prop({
    type: HhData,
  })
  hh?: HhData

  @Prop({
    type: () => [Advantage],
  })
  advantages: Advantage[]

  @Prop({
    type: String,
  })
  seoText: string

  @Prop({
    type: String,
  })
  tagsTitle: string

  @Prop({
    type: () => [String],
  })
  tags: string[]
}

export const TopPageSchema = SchemaFactory.createForClass(TopPage).index({
  '$**': 'text',
})
