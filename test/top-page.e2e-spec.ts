import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { disconnect } from 'mongoose'
import * as cookieParser from 'cookie-parser'

import { AppModule } from '../src/app.module'

// Constants
import { UserDto } from '../src/auth/dto/userDto'

const testUser: UserDto = {
  login: 'alexandrawdxy@gmail.com',
  password: '12345',
}

afterAll(() => {
  disconnect()
})

describe('AuthController (e2e)', () => {
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
})
