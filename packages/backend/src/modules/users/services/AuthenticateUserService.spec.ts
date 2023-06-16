import 'reflect-metadata'
import { faker } from '@faker-js/faker'
import { AppError } from '../../../shared/errors/AppError'
import { FakeHashProvider } from '../providers/HashProvider/fakes/FakeHashProvider'
import { FakeUserRepository } from '../repositories/Fakes/FakeUserRepository'
import { AuthenticateUserService } from '../services/AuthenticateUserService'

let authenticateUserService: AuthenticateUserService
let fakeHashProvider: FakeHashProvider
let usersRepository: FakeUserRepository

describe('Create user ', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider()
    usersRepository = new FakeUserRepository()

    authenticateUserService = new AuthenticateUserService(usersRepository, fakeHashProvider)
  })
  test('user should able to login with valid credentials', async () => {
    const user = {
      email: 'ballistc@email.com',
      password: '213sads234u9as234es',
    }
    const response = await authenticateUserService.execute(user)

    expect(response).toHaveProperty('token')
  })
  test('user should not able to login with invalid credentials', async () => {
    const user = {
      email: 'ballistc@email.com',
      password: String(faker.internet.password),
    }

    await expect(authenticateUserService.execute(user)).rejects.toBeInstanceOf(AppError)
  })
})
