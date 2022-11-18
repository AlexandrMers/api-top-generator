import { Module } from '@nestjs/common'

import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose'

import Process from 'process'

import { ConfigModule } from '@nestjs/config'

import { AuthModule } from './auth/auth.module'
import { TopPageModule } from './top-page/top-page.module'
import { ProductModule } from './product/product.module'
import { ReviewModule } from './review/review.module'

export const getMongoDbUrl = (process: typeof Process) =>
  'mongodb://' +
  process.env.MONGO_DB_LOGIN +
  ':' +
  process.env.MONGO_DB_PASSWORD +
  '@' +
  process.env.MONGO_DB_HOST +
  ':' +
  process.env.MONGO_DB_PORT +
  '/' +
  process.env.MONGO_DB_AUTHDATABASE

const mongodbOptions: MongooseModuleOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(getMongoDbUrl(process), mongodbOptions),
    AuthModule,
    TopPageModule,
    ProductModule,
    ReviewModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
