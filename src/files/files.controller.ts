import {
  Controller,
  HttpCode,
  Inject,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { FileElementResponse } from './dto/file-element.response'
import { FilesService } from './files.service'

@Controller('files')
export class FilesController {
  constructor(
    @Inject(FilesService) private readonly fileService: FilesService,
  ) {}

  @Post('upload')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('files'))
  async uploadFiles(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<FileElementResponse[]> {
    return this.fileService.saveFiles([file])
  }
}
