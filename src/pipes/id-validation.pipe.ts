import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common'
import { Types } from 'mongoose'

import { WRONG_ID_FORMAT } from '../constants/validation.constants'

@Injectable()
export class IdValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param') {
      return value
    }

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(WRONG_ID_FORMAT)
    }

    return value
  }
}
