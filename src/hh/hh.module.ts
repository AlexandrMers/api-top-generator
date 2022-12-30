import { Module } from '@nestjs/common'
import { HhService } from './hh.service'

// Modules
import { ConfigModule } from '@nestjs/config'
import { HttpModule } from '@nestjs/axios'

@Module({
  providers: [HhService],
  imports: [ConfigModule, HttpModule],
  exports: [HhService],
})
export class HhModule {}
