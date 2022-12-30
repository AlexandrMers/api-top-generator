import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { addDays } from 'date-fns'

// Constants
import { SCHEMAS } from '../constants/schemas'

// Types
import { TopPageModelType } from './top-page.types'

// DTO
import { CreateTopPageDto } from './dto/create-top-page.dto'
import { FindTopPageDto } from './dto/find-top-page.dto'
import { TopLevelCategory } from './top-page.model'

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(SCHEMAS.TOP_PAGE_SCHEMA)
    private readonly topPageModel: TopPageModelType,
  ) {}

  async create(dto: CreateTopPageDto) {
    return this.topPageModel.create<CreateTopPageDto>(dto)
  }

  async findById(id: string) {
    return this.topPageModel.findById(id).exec()
  }

  async deleteById(id: string) {
    return this.topPageModel.findByIdAndDelete(id).exec()
  }

  async updateById(id: string, page: CreateTopPageDto) {
    return this.topPageModel.findByIdAndUpdate(id, page, { new: true }).exec()
  }

  async findByCategory(dto: FindTopPageDto) {
    return this.topPageModel
      .aggregate([
        {
          $match: {
            firstCategory: dto.firstCategory,
          },
        },
        {
          $group: {
            _id: '$secondCategory',
            pages: {
              $push: {
                alias: '$alias',
                title: '$title',
              },
            },
          },
        },
      ])
      .exec()
  }

  async search(query: string) {
    return this.topPageModel
      .find({
        $text: {
          $search: query,
          $caseSensitive: false,
        },
      })
      .exec()
  }

  async findForHhUpdate(date: Date) {
    return this.topPageModel
      .find({
        firstCategory: TopLevelCategory.Courses,
        'hh.updatedAt': { $lt: addDays(date, -1) },
      })
      .exec()
  }
}
