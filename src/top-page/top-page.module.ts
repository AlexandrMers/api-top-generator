import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { TopPageController } from './top-page.controller'

import { TopPageSchema } from './top-page.model'

import { SCHEMAS } from '../constants/schemas'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SCHEMAS.TOP_PAGE_SCHEMA,
        schema: TopPageSchema,
      },
    ]),
  ],
  controllers: [TopPageController],
})
export class TopPageModule {}
