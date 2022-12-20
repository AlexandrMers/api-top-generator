import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'

// Services
import { ProductService } from './product.service'

// DTO
import { CreateProductDto } from './dto/create-product.dto'

// Constants
import { NOT_FOUND_PRODUCT } from './product.constants'
import { FindProductDto } from './dto/find-product.dto'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { IdValidationPipe } from '../pipes/id-validation.pipe'

@Controller('product')
export class ProductController {
  constructor(
    @Inject(ProductService) private readonly productService: ProductService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() product: CreateProductDto) {
    return this.productService.create(product)
  }

  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const product = await this.productService.findById(id)

    if (!product) {
      throw new NotFoundException(NOT_FOUND_PRODUCT)
    }

    return product
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const product = await this.productService.deleteById(id)

    if (!product) {
      throw new NotFoundException(NOT_FOUND_PRODUCT)
    }

    return product
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async patch(
    @Param('id', IdValidationPipe) id: string,
    @Body() product: CreateProductDto,
  ) {
    const updatedProduct = await this.productService.updateById(id, product)

    if (!updatedProduct) {
      throw new NotFoundException(NOT_FOUND_PRODUCT)
    }

    return updatedProduct
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('findWithReviews')
  async find(@Body() dto: FindProductDto) {
    return this.productService.findWithReviews(dto)
  }
}
