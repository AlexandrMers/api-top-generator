import { Module } from '@nestjs/common'
import { HhService } from './hh.service'

// Modules
import { TopPageModule } from '../top-page/top-page.module'
import { ConfigModule } from '@nestjs/config'
import { HttpModule } from '@nestjs/axios'

@Module({
  providers: [HhService],
  imports: [TopPageModule, ConfigModule, HttpModule],
})
export class HhModule {}
