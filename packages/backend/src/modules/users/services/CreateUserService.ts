import { inject, injectable } from 'tsyringe'
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider'
import { AppError } from '@shared/errors/AppError'
import { IJWTProvider } from '../providers/JWTProvider/models/IJWTProvider'

@injectable()
export class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('JWTProvider')
    private jwtProvider: IJWTProvider
  ) {}
  async execute(user: ICreateUserDTO): Promise<string> {
    const userAlreadyExists = await this.usersRepository.findByEmail(user.email)

    const usernameAlreadyTaken = await this.usersRepository.findByUsername(user.username)

    if (userAlreadyExists) throw new AppError('Already have user registered with this email', 409)

    if (usernameAlreadyTaken) throw new AppError('Username already taken!', 409)

    const hashedPassword = await this.hashProvider.hashPassword(user.password)

    user.password = hashedPassword

    const createdUser = await this.usersRepository.createUser(user)

    const token = await this.jwtProvider.sign(createdUser.id)

    return token
  }
}
