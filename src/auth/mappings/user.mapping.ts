import { UserClientType, UserDocument } from '../auth.types'

export const mapUserBaseToClient = (user: UserDocument): UserClientType => ({
  id: user._id,
  email: user.email,
})
