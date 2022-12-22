import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

// Constants
import { SCHEMAS } from '../constants/schemas'

// Types
import { TopPageModelType } from './top-page.types'

// DTO
import { CreateTopPageDto } from './dto/create-top-page.dto'
import { FindTopPageDto } from './dto/find-top-page.dto'

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
      .find({
        firstCategory: dto.firstCategory,
      })
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
}
