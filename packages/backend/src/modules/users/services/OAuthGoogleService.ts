import { OAuth2Client } from 'google-auth-library'
import { inject, injectable } from 'tsyringe'
import { IUsersRepository, UserAuthInput } from '../repositories/IUsersRepository'
import { IJWTProvider } from '../providers/JWTProvider/models/IJWTProvider'

interface IRequest {
  token: string
}

const client = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET,
})

@injectable()
export class OAuthGoogleService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('JWTProvider')
    private jwtProvider: IJWTProvider
  ) {}
  async execute({ token }: IRequest) {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    })
    const payload = ticket.getPayload()

    const response = payload

    const user: UserAuthInput = {
      email: String(response?.email),
      full_name: String(response?.name),
      picture: String(response?.picture),
      provider: 'Google',
    }

    const userAlreadyExists = await this.usersRepository.findByEmail(user.email)

    if (userAlreadyExists) {
      const token = this.jwtProvider.sign(userAlreadyExists.id)

      return token
    }

    this.usersRepository.createUserOAuth(user)
  }
}
