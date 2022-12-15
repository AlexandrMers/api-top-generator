import { MongooseModule } from '@nestjs/mongoose'
import { Module } from '@nestjs/common'

import { AuthController } from './auth.controller'

import { UserSchema } from './user.model'

import { SCHEMAS } from '../constants/schemas'
import { AuthService } from './auth.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SCHEMAS.USER_SCHEMA, schema: UserSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
