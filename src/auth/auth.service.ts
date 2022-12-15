import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { JwtService } from '@nestjs/jwt'
import { compare, genSalt, hash } from 'bcrypt'

import { UserClientType, UserDocument, UserModelType } from './auth.types'
import { UserDto } from './dto/userDto'

import {
  NOT_FOUND_USER_TEXT_ERROR,
  WRONG_PASSWORD_TEXT_ERROR,
} from './auth.constants'
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
    @Inject(JwtService) private readonly jwtService: JwtService,
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

  async validateUser(email: string, password: string) {
    const user = await this.findUserByEmail(email)

    if (!user) {
      throw new UnauthorizedException(NOT_FOUND_USER_TEXT_ERROR)
    }

    const isCorrectPassword = await compare(password, user.passwordHash)

    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_TEXT_ERROR)
    }

    return mapUserBaseToClient(user)
  }

  async login(user: UserClientType) {
    const token = await this.jwtService.signAsync({ ...user })
    return {
      token,
    }
  }
}
