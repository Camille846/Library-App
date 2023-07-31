import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { sign } from 'jsonwebtoken'
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider'
import { IUsersRepository } from '../repositories/IUsersRepository'
import authSettings from '@config/auth'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  token: string
}

@injectable()
export class AuthenticateUserService {
  constructor(@inject('UsersRepository') private userRepository: IUsersRepository, @inject('HashProvider') private hashProvider: IHashProvider) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) throw new AppError('Invalid Credentials!', 401)

    const notSocialLogin = user.federatedCredentials.find((fed) => fed.provider === 'ApplicationLogin')

    if (!notSocialLogin) throw new AppError('Login with google/facebook or reset password!', 403)

    const passMatchs = await this.hashProvider.comparePasswords(password, user.password)

    if (!passMatchs) throw new AppError('Invalid Credentials!', 401)

    const { secret, expiresIn } = authSettings.jwt

    const token = await sign({}, secret, { subject: user.id, expiresIn })

    return { token }
  }
}
