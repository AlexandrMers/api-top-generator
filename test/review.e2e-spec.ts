import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { disconnect, Types } from 'mongoose'

import { AppModule } from '../src/app.module'

import { CreateReviewDto } from '../src/review/dto/create-review.dto'

const productId = new Types.ObjectId().toHexString()

const testDto: CreateReviewDto = {
  name: 'test',
  title: 'Заголовок',
  description: 'описание тестовое',
  rating: 5,
  productId: productId,
}

afterAll(() => {
  disconnect()
})

describe('AppController (e2e)', () => {
  let app: INestApplication
  let createdId: string

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/review/create (POST)', async () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send(testDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdId = body._id
        expect(createdId).toBeDefined()
      })
  })

  it('/review/byProduct/:id (GET) - success', async () => {
    return request(app.getHttpServer())
      .get(`/review/byProduct/${productId}`)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(1)
        expect(body[0].rating).toEqual(testDto.rating)
        expect(body[0].title).toEqual(testDto.title)
        expect(body[0].name).toEqual(testDto.name)
      })
  })

  it('/review/byProduct/:id (GET) - failed', async () => {
    return request(app.getHttpServer())
      .get(`/review/byProduct/${new Types.ObjectId().toHexString()}`)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(0)
      })
  })

  it('/review/:id (DELETE) - success', async () => {
    return request(app.getHttpServer())
      .delete(`/review/${createdId}`)
      .expect(200)
  })

  it('/review/:id (DELETE) - failed', async () => {
    return request(app.getHttpServer())
      .delete(`/review/${createdId}`)
      .expect(200)
  })
})
