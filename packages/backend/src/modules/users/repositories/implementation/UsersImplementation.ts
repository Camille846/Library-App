import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { IUsersRepository } from '../IUsersRepository'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class UsersImplementation implements IUsersRepository {
  async createUser(user: ICreateUserDTO): Promise<ICreateUserDTO> {
    const response = await prisma.user.create({
      data: {
        full_name: user.full_name,
        username: user.username,
        id: user.id,
        email: user.email,
        password: user.password,
      },
    })
    return response
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
