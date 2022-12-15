import { MongooseModule } from '@nestjs/mongoose'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import { getJwtConfig } from '../configs/jwt.config'

import { AuthController } from './auth.controller'

import { UserSchema } from './user.model'

import { SCHEMAS } from '../constants/schemas'

import { AuthService } from './auth.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SCHEMAS.USER_SCHEMA, schema: UserSchema },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
