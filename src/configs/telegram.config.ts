import { TelegramOptionsInterface } from '../telegram/telegram-options.interface'
import { ConfigService } from '@nestjs/config'

export const getTgConfig = (
  configService: ConfigService,
): TelegramOptionsInterface => {
  const token = configService.get('TG_BOT_TOKEN_APP')

  if (!token) throw new Error('Не задан TG_BOT_TOKEN_APP')

  return { token, chatId: configService.get('TG_CHAT_ID') ?? '' }
}
