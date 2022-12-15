import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'

import { AuthService } from './auth.service'

import { UserDto } from './dto/userDto'

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: UserDto) {
    const existUser = await this.authService.findUserByEmail(dto.login)

    if (existUser) {
      throw new BadRequestException(
        'Пользователь с таким логином уже существует',
      )
    }

    return this.authService.createUser(dto)
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: UserDto) {}
}
