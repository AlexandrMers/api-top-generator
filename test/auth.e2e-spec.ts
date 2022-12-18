import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { disconnect } from 'mongoose'
import * as cookieParser from 'cookie-parser'

import { AppModule } from '../src/app.module'

// Constants
import { UserDto } from '../src/auth/dto/userDto'
import {
  NOT_FOUND_USER_TEXT_ERROR,
  WRONG_PASSWORD_TEXT_ERROR,
} from '../src/auth/auth.constants'

const testUser: UserDto = {
  login: 'alexandrawdxy@gmail.com',
  password: '12345',
}

afterAll(() => {
  disconnect()
})

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    app.use(cookieParser())
    await app.init()
  })

  it('/auth/login (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(testUser)
      .expect(200)
      .then((response) => {
        expect(response.body.token).toBeDefined()
        expect(response.header['set-cookie']).toBeDefined()
      })
  })

  it('/auth/login (POST) - fail 401 - wrong password', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...testUser, password: '123' })
      .expect(401)
      .then((response) => {
        expect(response.body.message).toBe(WRONG_PASSWORD_TEXT_ERROR)
      })
  })

  it('/auth/login (POST) - fail 401 - wrong login', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...testUser, login: '1293ds@fdk.ru' })
      .expect(401)
      .then((response) => {
        expect(response.body.message).toBe(NOT_FOUND_USER_TEXT_ERROR)
      })
  })
})
