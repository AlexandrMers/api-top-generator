import { Document, Model } from 'mongoose'

import { TopPage } from './top-page.model'

export type TopPageDocument = TopPage & Document
export type TopPageModelType = Model<TopPageDocument>
