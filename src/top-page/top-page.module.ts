import { Module } from '@nestjs/common'

// Modules
import { MongooseModule } from '@nestjs/mongoose'
import { HhModule } from '../hh/hh.module'

// Schemas of DB
import { TopPageSchema } from './top-page.model'

// Controller
import { TopPageController } from './top-page.controller'

// Service
import { TopPageService } from './top-page.service'

// Constants
import { SCHEMAS } from '../constants/schemas'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SCHEMAS.TOP_PAGE_SCHEMA,
        schema: TopPageSchema,
        collection: SCHEMAS.TOP_PAGE_SCHEMA,
      },
    ]),
    HhModule,
  ],
  controllers: [TopPageController],
  providers: [TopPageService],
})
export class TopPageModule {}
