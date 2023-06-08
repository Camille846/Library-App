import { inject, injectable } from 'tsyringe'
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { User } from '../entities/User'
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider'
import { AppError } from '@shared/errors/AppError'

@injectable()
export class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}
  async execute(
    user: Omit<ICreateUserDTO, 'id'>
  ): Promise<Partial<ICreateUserDTO>> {
    const userAlreadyExists = await this.usersRepository.findByEmail(user.email)

    if (userAlreadyExists) throw new AppError('user already exists!')

    if (user.password.length < 8)
      throw new AppError('Password must have at least 8 caracteries', 409)

    const hashedPassword = await this.hashProvider.hashPassword(user.password)

    const createdUser = new User({
      email: user.email,
      full_name: user.full_name,
      username: user.username,
      password: hashedPassword,
    })

    const response: Partial<ICreateUserDTO> =
      await this.usersRepository.createUser(createdUser)

    delete response['password']

    return response
  }
}
