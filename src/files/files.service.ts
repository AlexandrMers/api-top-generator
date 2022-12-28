import * as sharp from 'sharp'
import { Injectable } from '@nestjs/common'
import { ensureDir, writeFile } from 'fs-extra'
import { format } from 'date-fns'
import { path } from 'app-root-path'
import { Mfile } from './mfile.class'

import { FileElementResponse } from './dto/file-element.response'

@Injectable()
export class FilesService {
  async saveFiles(files: Mfile[]): Promise<FileElementResponse[]> {
    const dateFolder = format(new Date(), 'yyyy-MM-dd')
    const uploadFolder = `${path}/uploads/${dateFolder}`
    await ensureDir(uploadFolder)

    const res: FileElementResponse[] = []
    for (const file of files) {
      await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer)
      res.push({
        url: `${dateFolder}/${file.originalname}`,
        name: file.originalname,
      })
    }
    return res
  }

  async convertToWebP(file: Buffer): Promise<Buffer> {
    return sharp(file).webp().toBuffer()
  }
}
