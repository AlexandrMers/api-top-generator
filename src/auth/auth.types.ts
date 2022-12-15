import { Document, Model } from 'mongoose'

import { User } from './user.model'

export type UserDocument = User & Document
export type UserModelType = Model<UserDocument>

export type UserClientType = {
  id: string
  email: string
}
