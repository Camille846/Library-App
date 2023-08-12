import 'reflect-metadata'
import { CreateUserService } from '../services/CreateUserService'
import { FakeHashProvider } from '../providers/HashProvider/fakes/FakeHashProvider'
import { FakeUserRepository } from '../repositories/Fakes/FakeUserRepository'
import { AppError } from '../../../shared/errors/AppError'
import { faker } from '@faker-js/faker'
import { JWTProvider } from '../providers/JWTProvider/JWTProvider'
import { IRefreshToken } from '../providers/RefreshTokenProvider/models/IRefreshToken'
import { FakeRefreshTokenProvider } from '../providers/RefreshTokenProvider/fakes/FakeRefreshToken'

let createUserService: CreateUserService
let fakeHashProvider: FakeHashProvider
let usersRepository: FakeUserRepository
let jwtProvider: JWTProvider
let refreshTokenProvider: IRefreshToken

describe('Create user ', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider()
    usersRepository = new FakeUserRepository()
    jwtProvider = new JWTProvider()
    refreshTokenProvider = new FakeRefreshTokenProvider()
    createUserService = new CreateUserService(usersRepository, fakeHashProvider, jwtProvider, refreshTokenProvider)
  })

  test('user should create an account', async () => {
    const user = {
      full_name: faker.internet.displayName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 12 }),
    }

    const response = await createUserService.execute(user)

    expect(response).toHaveProperty('token')
    expect(response).toHaveProperty('refresh_token')
  })

  test('user should not able to create an account with an already registered email', async () => {
    const user = {
      full_name: faker.internet.displayName(),
      username: faker.internet.userName(),
      email: 'ballistc@email.com',
      password: faker.internet.password({ length: 8 }),
    }

    await expect(createUserService.execute(user)).rejects.toBeInstanceOf(AppError)
  })

  test('user should not able to create an account with an existent username ', async () => {
    const user = {
      full_name: faker.internet.displayName(),
      username: 'ballistc',
      email: faker.internet.email(),
      password: faker.internet.password({ length: 12 }),
    }

    await expect(createUserService.execute(user)).rejects.toBeInstanceOf(AppError)
  })
})
