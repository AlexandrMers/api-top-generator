import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}

@Schema()
class Advantages {
  @Prop({ type: String })
  title: string

  @Prop({ type: String })
  description: string
}

@Schema({
  _id: false,
})
class HhDataModel {
  @Prop({ type: Number })
  count: number

  @Prop({ type: Number })
  juniorSalary: number

  @Prop({ type: Number })
  middleSalary: number

  @Prop({ type: Number })
  seniorSalary: number
}

@Schema({
  timestamps: true,
})
export class TopPageModel {
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
    type: HhDataModel,
  })
  hh?: HhDataModel

  @Prop({
    type: () => [Advantages],
  })
  advantages: Advantages[]

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

export const TopPageSchema = SchemaFactory.createForClass(TopPageModel)
