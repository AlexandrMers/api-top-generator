import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { disconnect, Types } from 'mongoose'

import { AppModule } from '../src/app.module'

import { CreateReviewDto } from '../src/review/dto/create-review.dto'

// Constants
import {
  MAX_VALUE_RATING_ERROR_TEXT,
  MIN_VALUE_RATING_ERROR_TEXT,
} from '../src/review/review.constants'

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

  it('/review/create (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send(testDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdId = body._id
        expect(createdId).toBeDefined()
      })
  })

  it('/review/create (POST) - fail rating min value', async () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send({ ...testDto, rating: 0 })
      .expect(400)
      .then(({ body }: request.Response) => {
        expect(body.message[0]).toBe(MIN_VALUE_RATING_ERROR_TEXT)
      })
  })

  it('/review/create (POST) - fail rating max value', async () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send({ ...testDto, rating: 10 })
      .expect(400)
      .then(({ body }: request.Response) => {
        expect(body.message[0]).toBe(MAX_VALUE_RATING_ERROR_TEXT)
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

  it('/review/:id (DELETE) - failed (Not found 404)', async () => {
    const anotherCreatedId = new Types.ObjectId().toHexString()

    return request(app.getHttpServer())
      .delete(`/review/${anotherCreatedId}`)
      .expect(404)
  })
})
