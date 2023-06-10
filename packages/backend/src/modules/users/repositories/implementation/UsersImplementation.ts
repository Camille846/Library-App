import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { prisma } from 'lib/prisma'
import { IUsersRepository } from '../IUsersRepository'

export class UsersImplementation implements IUsersRepository {
  async createUser(user: ICreateUserDTO): Promise<ICreateUserDTO> {
    const response = await prisma.user.create({
      data: {
        full_name: user.full_name,
        username: user.username,
        email: user.email,
        password: user.password,
      },
    })
    return response
  }

  async findByUsername(username: string): Promise<ICreateUserDTO | undefined> {
    const response = await prisma.user.findUnique({
      where: {
        username,
      },
    })

    if (response) return response
  }

  async findByEmail(email: string): Promise<ICreateUserDTO | undefined> {
    const response = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })
    if (response) return response
  }
}
