import { FederatedCredentials, User } from '@prisma/client'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'

export interface UserAuthInput {
  email: string
  full_name: string
  picture: string
  provider: 'Google' | 'Facebook'
}

export interface IUsersRepository {
  createUser(user: ICreateUserDTO): Promise<User>
  createUserOAuth(user: UserAuthInput): Promise<User>
  findByEmail(email: string): Promise<(User & { federatedCredentials: FederatedCredentials[] }) | undefined>
  findByUsername(username: string): Promise<ICreateUserDTO | undefined>
}
