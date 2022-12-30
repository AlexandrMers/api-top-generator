import { TopLevelCategory } from '../top-page.model'
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'
import { Type } from 'class-transformer'

class HhDataDto {
  @IsNumber()
  count: number

  @IsNumber()
  juniorSalary: number

  @IsNumber()
  middleSalary: number

  @IsNumber()
  seniorSalary: number

  @IsDate()
  updatedAt: Date
}

class AdvantageDto {
  @IsString()
  title: string

  @IsString()
  description: string
}

export class CreateTopPageDto {
  @IsEnum(TopLevelCategory)
  firstCategory: TopLevelCategory

  @IsString()
  secondCategory: string

  @IsString()
  alias: string

  @IsString()
  title: string

  @IsString()
  category: string

  @IsOptional()
  @ValidateNested()
  @Type(() => HhDataDto)
  hh?: HhDataDto

  @IsArray()
  @ValidateNested()
  @Type(() => AdvantageDto)
  advantages: AdvantageDto[]

  @IsString()
  seoText: string

  @IsString()
  tagsTitle: string

  @IsArray()
  @IsString({ each: true })
  tags: string[]
}
