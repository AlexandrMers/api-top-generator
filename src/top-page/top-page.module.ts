import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { TopPageSchema } from './top-page.model'

import { SCHEMAS } from '../constants/schemas'

import { TopPageController } from './top-page.controller'

import { TopPageService } from './top-page.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SCHEMAS.TOP_PAGE_SCHEMA,
        schema: TopPageSchema,
        collection: SCHEMAS.TOP_PAGE_SCHEMA,
      },
    ]),
  ],
  controllers: [TopPageController],
  providers: [TopPageService],
  exports: [TopPageService],
})
export class TopPageModule {}
