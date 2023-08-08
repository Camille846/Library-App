import { IUsersRepository, UserAuthInput } from '../IUsersRepository'
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { FederatedCredentials, User } from '@prisma/client'

export class FakeUserRepository implements IUsersRepository {
  private Users: [User & { federatedCredentials: FederatedCredentials[] }] = [
    {
      id: 'e9ufhgsed8fgsd8f7sd9hfio',
      username: 'ballistc',
      email: 'ballistc@email.com',
      full_name: 'Pedro Vitor',
      password: '213sads234u9as234es',
      createdAt: new Date(),
      avatar: 'sfdsdf',
      federatedCredentials: [
        {
          id: 'dsaifohjasdufhaiofhia',
          provider: 'ApplicationLogin',
          user_id: 'e9ufhgsed8fgsd8f7sd9hfio',
        },
      ],
    },
  ]

  async findByEmail(email: string): Promise<(User & { federatedCredentials: FederatedCredentials[] }) | undefined> {
    return await this.Users.find((user) => user.email === email)
  }
  async findByUsername(username: string): Promise<ICreateUserDTO | undefined> {
    return (await this.Users.find((user) => user.username === username)) as ICreateUserDTO
  }
  async createUser(user: ICreateUserDTO): Promise<User> {
    const newUser = {
      id: '2ew',
      avatar: 'sds',
      createdAt: new Date(),
      federatedCredentials: [],
      ...user,
    }

    this.Users.push(newUser)

    return newUser
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createUserOAuth(user: UserAuthInput): Promise<void> {
    console.log('method not implemented')
  }
}
