import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { FederatedCredentials, User } from '@prisma/client'
import { prisma } from 'lib/prisma'
import { IUsersRepository, UserAuthInput } from '../IUsersRepository'

export class UsersImplementation implements IUsersRepository {
  async createUser(user: ICreateUserDTO): Promise<User> {
    return await prisma.user.create({
      data: {
        full_name: user.full_name,
        username: user.username,
        email: user.email,
        password: user.password,
        federatedCredentials: {
          create: {},
        },
      },
    })
  }

  async findByUsername(username: string): Promise<ICreateUserDTO | undefined> {
    const response = await prisma.user.findUnique({
      where: {
        username,
      },
      include: {
        federatedCredentials: true,
      },
    })
    console.log(response)
    if (response) return response as ICreateUserDTO
  }

  async findByEmail(email: string): Promise<(User & { federatedCredentials: FederatedCredentials[] }) | undefined> {
    const response = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        federatedCredentials: true,
      },
    })

    // response?.federatedCredentials.find((fed) => fed.provider === 'ApplicationLogin')

    if (response) return response
  }
  async createUserOAuth(user: UserAuthInput): Promise<void> {
    await prisma.user.create({
      data: {
        email: user.email,
        full_name: user.full_name,
        username: user.email.split('@')[0],
        avatar: user.picture,
        federatedCredentials: {
          create: {
            provider: user.provider,
          },
        },
      },
    })
  }
}
