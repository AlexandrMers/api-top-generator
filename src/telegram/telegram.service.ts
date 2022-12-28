import { Inject, Injectable } from '@nestjs/common'
import { Telegraf } from 'telegraf'

import { TelegramOptionsInterface } from './telegram-options.interface'
import { TELEGRAM_PROVIDER_TOKEN } from './telegram.constants'

@Injectable()
export class TelegramService {
  bot: Telegraf
  options: TelegramOptionsInterface

  constructor(
    @Inject(TELEGRAM_PROVIDER_TOKEN)
    optionsTg: TelegramOptionsInterface,
  ) {
    this.options = optionsTg
    this.bot = new Telegraf(optionsTg.token)
  }

  async sendMessage(message: string, chatId: string = this.options.chatId) {
    return this.bot.telegram.sendMessage(chatId, message)
  }
}
