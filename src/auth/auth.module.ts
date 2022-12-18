import { MongooseModule } from '@nestjs/mongoose'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { getJwtConfig } from '../configs/jwt.config'

import { AuthController } from './auth.controller'

import { UserSchema } from './user.model'

import { SCHEMAS } from '../constants/schemas'

import { AuthService } from './auth.service'

import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SCHEMAS.USER_SCHEMA,
        schema: UserSchema,
        collection: SCHEMAS.USER_SCHEMA,
      },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    PassportModule,
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
