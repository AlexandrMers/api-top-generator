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
import { Mfile } from './mfile.class'

function getOriginalNameForWebp(file: Express.Multer.File) {
  return `${file.originalname.split('.')[0]}.webp`
}

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
    const savedFiles: Mfile[] = [new Mfile(file)]
    if (file.mimetype.includes('image')) {
      const convertedImgBuffer = await this.fileService.convertToWebP(
        file.buffer,
      )
      savedFiles.push({
        buffer: convertedImgBuffer,
        originalname: getOriginalNameForWebp(file),
      })
    }

    return this.fileService.saveFiles(savedFiles)
  }
}
