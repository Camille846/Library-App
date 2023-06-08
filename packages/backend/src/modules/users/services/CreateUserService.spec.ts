import 'reflect-metadata'
import { CreateUserService } from '../services/CreateUserService'
import { FakeHashProvider } from '../providers/HashProvider/fakes/FakeHashProvider'
import { FakeUserRepository } from '../repositories/Fakes/FakeUserRepository'
import { AppError } from '../../../shared/errors/AppError'
import { faker } from '@faker-js/faker'

let createUserService: CreateUserService
let fakeHashProvider: FakeHashProvider
let usersRepository: FakeUserRepository

describe('Create user ', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider()
    usersRepository = new FakeUserRepository()

    createUserService = new CreateUserService(usersRepository, fakeHashProvider)
  })
  test('user should create an account', async () => {
    const pass = faker.internet.password({ length: 12 })
    const user = {
      full_name: faker.internet.displayName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: pass,
    }

    const response = await createUserService.execute(user)

    expect(response.password).toBe(`${pass}2413sd9aijh92903-54rs=a@@ds9`)

    expect(response).toHaveProperty('id')
  })

  test('user should not able to create an account with an already registered email', async () => {
    const user = {
      full_name: faker.internet.displayName(),
      username: faker.internet.userName(),
      email: faker.internet.email({
        firstName: 'ballistc',
        provider: 'email.com',
      }),
      password: faker.internet.password({ length: 7 }),
    }

    await expect(createUserService.execute(user)).rejects.toBeInstanceOf(
      AppError
    )
  })
  test('user should not able to create an account with an non password at least 8 characters long', async () => {
    const user = {
      full_name: faker.internet.displayName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 7 }),
    }
    await expect(createUserService.execute(user)).rejects.toBeInstanceOf(
      AppError
    )
  })
})
