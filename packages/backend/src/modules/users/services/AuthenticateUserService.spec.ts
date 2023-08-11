import 'reflect-metadata'
import { faker } from '@faker-js/faker'
import { AppError } from '../../../shared/errors/AppError'
import { FakeHashProvider } from '../providers/HashProvider/fakes/FakeHashProvider'
import { FakeUserRepository } from '../repositories/Fakes/FakeUserRepository'
import { AuthenticateUserService } from '../services/AuthenticateUserService'
import { JWTProvider } from '../providers/JWTProvider/JWTProvider'
import { IRefreshToken } from '../providers/RefreshTokenProvider/models/IRefreshToken'
import { FakeRefreshTokenProvider } from '../providers/RefreshTokenProvider/fakes/FakeRefreshToken'

let authenticateUserService: AuthenticateUserService
let fakeHashProvider: FakeHashProvider
let usersRepository: FakeUserRepository
let jwtProvider: JWTProvider
let refreshTokenProvider: IRefreshToken

describe('Authenticate user ', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider()
    usersRepository = new FakeUserRepository()
    jwtProvider = new JWTProvider()
    refreshTokenProvider = new FakeRefreshTokenProvider()

    authenticateUserService = new AuthenticateUserService(usersRepository, fakeHashProvider, jwtProvider, refreshTokenProvider)
  })
  test('user should able to login with valid credentials', async () => {
    const user = {
      email: 'ballistc@email.com',
      password: '213sads234u9as234es',
    }
    const response = await authenticateUserService.execute(user)

    expect(response).toHaveProperty('token')
    expect(response).toHaveProperty('refresh_token')
  })
  test('user should not able to login with invalid credentials', async () => {
    const user = {
      email: 'ballistc@email.com',
      password: String(faker.internet.password),
    }

    await expect(authenticateUserService.execute(user)).rejects.toBeInstanceOf(AppError)
  })
})
