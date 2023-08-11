import { inject, injectable } from 'tsyringe'
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider'
import { AppError } from '@shared/errors/AppError'
import { IJWTProvider } from '../providers/JWTProvider/models/IJWTProvider'
import { IRefreshToken } from '../providers/RefreshTokenProvider/models/IRefreshToken'
import { RefreshToken } from '@prisma/client'

interface IResponse {
  token: string
  refresh_token: RefreshToken
}

@injectable()
export class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('JWTProvider')
    private jwtProvider: IJWTProvider,
    @inject('RefreshTokenProvider')
    private refreshTokenProvider: IRefreshToken
  ) {}
  async execute(user: ICreateUserDTO): Promise<IResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(user.email)

    const usernameAlreadyTaken = await this.usersRepository.findByUsername(user.username)

    if (userAlreadyExists) throw new AppError('Already have user registered with this email', 409)

    if (usernameAlreadyTaken) throw new AppError('Username already taken!', 409)

    const hashedPassword = await this.hashProvider.hashPassword(user.password)

    user.password = hashedPassword

    const createdUser = await this.usersRepository.createUser(user)

    const token = await this.jwtProvider.sign(createdUser.id)

    const refresh_token = await this.refreshTokenProvider.createRefreshToken(createdUser.id)

    return { token, refresh_token }
  }
}
