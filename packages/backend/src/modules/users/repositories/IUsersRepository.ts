import { ICreateUserDTO } from '../dtos/ICreateUserDTO'

export interface IUsersRepository {
  createUser(user: ICreateUserDTO): Promise<Omit<ICreateUserDTO, 'password'>>
  findByEmail(email: string): Promise<ICreateUserDTO | undefined>
}
