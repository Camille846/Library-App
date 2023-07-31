import { AppError } from '@shared/errors/AppError'
import { IHashProvider } from '../models/IHashProvider'

export class FakeHashProvider implements IHashProvider {
  public password = '2413sd9aijh92903-54rs=a@@ds9'

  async hashPassword(password: string): Promise<string> {
    return password + this.password
  }
  async comparePasswords(password: string, storagedHashedPassword: string): Promise<boolean> {
    if (password !== storagedHashedPassword) {
      return false
    }
    return true
  }
}
