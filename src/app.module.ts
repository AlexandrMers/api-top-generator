import { Module } from '@nestjs/common'

// modules
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { TopPageModule } from './top-page/top-page.module'
import { ProductModule } from './product/product.module'
import { ReviewModule } from './review/review.module'
import { FilesModule } from './files/files.module'
import { TelegramModule } from './telegram/telegram.module'
// configs
import { getMongoDbUrl, mongodbOptions } from './configs/mongo-db.config'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(getMongoDbUrl(process), mongodbOptions),
    AuthModule,
    TopPageModule,
    ProductModule,
    ReviewModule,
    FilesModule,
    TelegramModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
