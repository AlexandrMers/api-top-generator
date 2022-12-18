import { Document, Model } from 'mongoose'

import { Product } from './product.model'

export type ProductDocument = Product & Document
export type ProductModelType = Model<ProductDocument>
