import { IHashProvider } from '../models/IHashProvider'
import bcrypt from 'bcrypt'
import { AppError } from '@shared/errors/AppError'

export class HashProviderImplemention implements IHashProvider {
  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 6)

    return hashedPassword
  }
  async comparePasswords(password: string, storagedHashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, storagedHashedPassword)
  }
}
