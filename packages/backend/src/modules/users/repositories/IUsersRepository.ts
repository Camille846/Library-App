import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { User } from '../entities/User'

export interface IUsersRepository {
  createUser(user: ICreateUserDTO): Promise<ICreateUserDTO>
  findByEmail(email: string): Promise<ICreateUserDTO | undefined>
}
