export class Mfile {
  originalname: string
  buffer: Buffer

  constructor(file: Express.Multer.File | Mfile) {
    this.originalname = file.originalname
    this.buffer = file.buffer
  }
}
