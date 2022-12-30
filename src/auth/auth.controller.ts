import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'

import { Response } from 'express'

import { AUTH_ALREADY_EXIST_USER_TEXT_ERROR } from './auth.constants'

import { AuthService } from './auth.service'

import { UserDto } from './dto/userDto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: UserDto) {
    const existUser = await this.authService.findUserByEmail(dto.login)

    if (existUser) {
      throw new BadRequestException(AUTH_ALREADY_EXIST_USER_TEXT_ERROR)
    }

    return this.authService.createUser(dto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: UserDto, @Res() res: Response) {
    const userData = await this.authService.validateUser(
      dto.login,
      dto.password,
    )

    const user = await this.authService.login(userData)

    return res.cookie('token', user.token, { secure: true }).json(user)
  }
}
