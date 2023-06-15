import { User } from '@prisma/client'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'

export interface IUsersRepository {
  createUser(user: ICreateUserDTO): Promise<ICreateUserDTO>
  findByEmail(email: string): Promise<ICreateUserDTO | undefined>
  findByUsername(username: string): Promise<ICreateUserDTO | undefined>
}
