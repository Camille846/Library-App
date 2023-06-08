import { IHashProvider } from '../models/IHashProvider'
import bcrypt from 'bcrypt'
import { AppError } from '@shared/errors/AppError'

export class HashProviderImplemention implements IHashProvider {
  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 9)

    return hashedPassword
  }
  async comparePasswords(
    password: string,
    storagedHashedPassword: string
  ): Promise<void> {
    const compare = await bcrypt.compare(password, storagedHashedPassword)

    if (!compare) throw new AppError('invalid credentials', 401)
  }
}
