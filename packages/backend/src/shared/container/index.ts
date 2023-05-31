import { container } from 'tsyringe'
import '@modules/users/providers'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { FakeUserRepository } from '@modules/users/repositories/Fakes/FakeUserRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  FakeUserRepository
)
