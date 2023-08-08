import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { IJWTProvider } from '../providers/JWTProvider/models/IJWTProvider'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  token: string
}

@injectable()
export class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('JWTProvider')
    private jwtProvider: IJWTProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) throw new AppError('Invalid Credentials!', 401)

    const notSocialLogin = user.federatedCredentials.find((fed) => fed.provider === 'ApplicationLogin')

    if (!notSocialLogin) throw new AppError('Login with google/facebook or reset password!', 403)

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const passMatchs = await this.hashProvider.comparePasswords(password, user.password!)

    if (!passMatchs) throw new AppError('Invalid Credentials!', 401)

    const token = (await this.jwtProvider.sign(user.id)) as string

    return { token }
  }
}
