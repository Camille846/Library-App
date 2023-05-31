import { AppError } from '@shared/errors/AppError'
import { IHashProvider } from '../models/IHashProvider'

export class FakeHashProvider implements IHashProvider {
  public password = '123456'

  async hashPassword(password: string): Promise<string> {
    return password
  }
  async comparePasswords(
    password: string,
    storagedHashedPassword: string
  ): Promise<void> {
    if (this.password !== storagedHashedPassword) {
      new AppError('Email or password incorrect', 401)
    }
  }
}
