import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Request as RequestType } from 'express'

import { UserClientType } from '../auth.types'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_SECRET'),
    })
  }

  private static extractJWT(req: RequestType) {
    if (req.cookies && 'token' in req.cookies) {
      return req.cookies.token
    }
    return null
  }

  validate(user: UserClientType) {
    return user
  }
}
