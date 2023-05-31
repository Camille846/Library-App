import { IUsersRepository } from '../IUsersRepository'
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'

export class FakeUserRepository implements IUsersRepository {
  private Users: [ICreateUserDTO] = [
    { username: '1', email: '2', full_name: '23', password: '321312' },
  ]

  async createUser(
    user: ICreateUserDTO
  ): Promise<Omit<ICreateUserDTO, 'password'>> {
    this.Users.push(user)
    return user
  }
}
