import { MongooseModule } from '@nestjs/mongoose'
import { Module } from '@nestjs/common'

import { AuthController } from './auth.controller'

import { AuthSchema } from './auth.model'

import { SCHEMAS } from '../constants/schemas'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SCHEMAS.AUTH_SCHEMA, schema: AuthSchema },
    ]),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
