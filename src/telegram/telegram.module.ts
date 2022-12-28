import { DynamicModule, Global, Module, Provider } from '@nestjs/common'
import { TelegramService } from './telegram.service'
import { TelegramModuleAsyncOptionsInterface } from './telegram-options.interface'
import { TELEGRAM_PROVIDER_TOKEN } from './telegram.constants'

@Global()
@Module({})
export class TelegramModule {
  static forRootAsync(
    options: TelegramModuleAsyncOptionsInterface,
  ): DynamicModule {
    const configProvider = this.getAsyncProviderOptions(options)

    return {
      module: TelegramModule,
      imports: options.imports,
      providers: [TelegramService, configProvider],
      exports: [TelegramService],
    }
  }

  private static getAsyncProviderOptions(
    options: TelegramModuleAsyncOptionsInterface,
  ): Provider {
    return {
      provide: TELEGRAM_PROVIDER_TOKEN,
      useFactory: async (...args: any[]) => {
        return options.useFactory(...args)
      },
      inject: options.inject ?? [],
    }
  }
}
