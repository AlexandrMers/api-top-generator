import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({
  timestamps: true,
})
export class AuthModel {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  email: string

  @Prop({
    type: String,
    required: true,
  })
  passwordHash: string
}

export const AuthSchema = SchemaFactory.createForClass(AuthModel)
