import { container } from 'tsyringe'
import '@modules/users/providers'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { UsersImplementation } from '@modules/users/repositories/implementation/UsersImplementation'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersImplementation
)
