import { Module } from '@nestjs/common'

import { ConfigModule } from '@nestjs/config'

import { AuthModule } from './auth/auth.module'
import { TopPageModule } from './top-page/top-page.module'
import { ProductModule } from './product/product.module'
import { ReviewModule } from './review/review.module'

import { AppController } from './app.controller'

import { AppService } from './app.service'

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    TopPageModule,
    ProductModule,
    ReviewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
