import { IUsersRepository } from '../IUsersRepository'
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { User } from '@prisma/client'

export class FakeUserRepository implements IUsersRepository {
  private Users: [ICreateUserDTO] = [
    {
      id: 'e9ufhgsed8fgsd8f7sd9hfio',
      username: 'ballistc',
      email: 'ballistc@email.com',
      full_name: 'Pedro Vitor',
      password: '213sads234u9as234es',
    },
  ]

  async findByEmail(email: string): Promise<ICreateUserDTO | undefined> {
    return await this.Users.find((user) => user.email === email)
  }
  async findByUsername(username: string): Promise<ICreateUserDTO | undefined> {
    return await this.Users.find((user) => user.username === username)
  }
  async createUser(user: ICreateUserDTO): Promise<ICreateUserDTO> {
    this.Users.push(user)
    return user
  }
}
