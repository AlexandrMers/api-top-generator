import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { genSalt, hash } from 'bcrypt'

import { UserClientType, UserDocument, UserModelType } from './auth.types'
import { UserDto } from './dto/userDto'

import { SCHEMAS } from '../constants/schemas'
import { User } from './user.model'

const mapUserBaseToClient = (user: UserDocument): UserClientType => ({
  id: user._id,
  email: user.email,
})

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(SCHEMAS.USER_SCHEMA) private readonly userModel: UserModelType,
  ) {}

  async createUser(data: UserDto) {
    const salt = await genSalt(Number(process.env.SALT))
    const passwordHashed = await hash(data.password, salt)

    const newUser = new this.userModel<User>({
      email: data.login,
      passwordHash: passwordHashed,
    })

    const savedUser = await newUser.save()
    return mapUserBaseToClient(savedUser)
  }

  findUserByEmail(email: string) {
    return this.userModel
      .findOne({
        email,
      })
      .exec()
  }
}
