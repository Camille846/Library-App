import { IUsersRepository } from '../IUsersRepository'
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'

export class FakeUserRepository implements IUsersRepository {
  private Users: [ICreateUserDTO] = [
    {
      username: 'ballistc',
      email: 'ballistc@email.com',
      full_name: 'Pedro Vitor',
      password: '213sads234u9as234es',
    },
  ]

  async findByEmail(email: string): Promise<ICreateUserDTO | undefined> {
    return await this.Users.find((user) => user.email === email)
  }
  async createUser(
    user: ICreateUserDTO
  ): Promise<Omit<ICreateUserDTO, 'password'>> {
    this.Users.push(user)
    return user
  }
}
