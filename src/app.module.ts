import { Module } from '@nestjs/common'

// modules
import { AuthModule } from './auth/auth.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { FilesModule } from './files/files.module'
import { HhModule } from './hh/hh.module'
import { MongooseModule } from '@nestjs/mongoose'
import { ProductModule } from './product/product.module'
import { ReviewModule } from './review/review.module'
import { ScheduleModule } from '@nestjs/schedule'
import { TelegramModule } from './telegram/telegram.module'
import { TopPageModule } from './top-page/top-page.module'

// configs
import { getMongoDbUrl, mongodbOptions } from './configs/mongo-db.config'
import { getTgConfig } from './configs/telegram.config'

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(getMongoDbUrl(process), mongodbOptions),
    AuthModule,
    TopPageModule,
    ProductModule,
    ReviewModule,
    FilesModule,
    TelegramModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTgConfig,
    }),
    HhModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
