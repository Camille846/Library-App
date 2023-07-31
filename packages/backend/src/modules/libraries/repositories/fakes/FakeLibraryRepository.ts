import { ICreateLibraryDTO } from '@modules/libraries/dtos/ICreateLibraryDTO'
import { AppError } from '@shared/errors/AppError'
import { ILibrariesRepository } from '../ILibrariesRepository'

export class FakeLibraryRepository implements ILibrariesRepository {
  private Users = [
    {
      id: 'e9ufhgsed8fgsd8f7sd9hfio',
      username: 'ballistc',
      email: 'ballistc@email.com',
      full_name: 'Pedro Vitor',
      password: '213sads234u9as234es',
      libraries: [{ id: '1212', name: 'sdfjajf' }],
    },
  ]

  async createLibrary(name: string, user_id: string): Promise<void> {
    const user = this.Users.find((user) => user.id === user_id)

    if (!user) throw new AppError('User not found', 404)

    user.libraries.push({ id: '387rtgwqe76rfse', name })
  }
  async findLibraryById(id: string): Promise<ICreateLibraryDTO | undefined> {
    return this.Users[0].libraries.find((library) => library.id === id)
  }
}
