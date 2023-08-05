import { container } from 'tsyringe'
import '@modules/users/providers'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { UsersImplementation } from '@modules/users/repositories/implementation/UsersImplementation'
import { ILibrariesRepository } from '@modules/libraries/repositories/ILibrariesRepository'
import { LibraryRepositoryImplementation } from '@modules/libraries/repositories/implementations/LibraryRepositoryImplementantion'

container.registerSingleton<IUsersRepository>('UsersRepository', UsersImplementation)
//container.registerSingleton<ILibrariesRepository>('LibrariesRepository', LibraryRepositoryImplementation)
