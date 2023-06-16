import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { FederatedCredentials, User } from '@prisma/client'
import { prisma } from 'lib/prisma'
import { IUsersRepository } from '../IUsersRepository'

interface ICreateUserDTOResponse extends ICreateUserDTO {
  federatedCredentials: []
}

export class UsersImplementation implements IUsersRepository {
  async createUser(user: ICreateUserDTO): Promise<ICreateUserDTO> {
    const response = await prisma.user.create({
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
    return response
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
    if (response) return response
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
}
