import { Document, Model } from 'mongoose'

import { Review } from './review.model'

export type ReviewDocument = Review & Document
export type ReviewModelType = Model<ReviewDocument>
