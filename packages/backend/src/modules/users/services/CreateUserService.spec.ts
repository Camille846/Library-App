import 'reflect-metadata'
import { CreateUserService } from '../services/CreateUserService'
import { FakeHashProvider } from '../providers/HashProvider/fakes/FakeHashProvider'
import { FakeUserRepository } from '../repositories/Fakes/FakeUserRepository'
import { AppError } from '../../../shared/errors/AppError'

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
    const user = {
      full_name: 'João da silva',
      username: 'joãozinho171',
      email: 'joazinho171@email.com',
      password: '13413543453123@',
    }

    const response = await createUserService.execute(user)

    expect(response.password).toBe(
      '13413543453123@2413sd9aijh92903-54rs=a@@ds9'
    )
    expect(response).toHaveProperty('id')
  })

  test('user should not able to create an account with an already registered email', async () => {
    const user = {
      full_name: 'João da silva',
      username: 'joãozinho171',
      email: 'ballistc@email.com',
      password: '13413543453123@',
    }

    await expect(createUserService.execute(user)).rejects.toBeInstanceOf(
      AppError
    )
  })
})
