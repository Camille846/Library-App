import { OAuth2Client } from 'google-auth-library'
import { inject, injectable } from 'tsyringe'
import { IUsersRepository, UserAuthInput } from '../repositories/IUsersRepository'
import { IJWTProvider } from '../providers/JWTProvider/models/IJWTProvider'
import { ValidateRefreshToken } from '../utils/ValidateRefreshToken'
import { IRefreshToken } from '../providers/RefreshTokenProvider/models/IRefreshToken'

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
    private jwtProvider: IJWTProvider,
    @inject('RefreshTokenProvider')
    private refreshTokenProvider: IRefreshToken
  ) {}
  async execute({ token }: IRequest) {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    })
    const payload = ticket.getPayload()

    const response = payload
    console.log(response)

    const user: UserAuthInput = {
      email: String(response?.email),
      full_name: String(response?.name),
      picture: String(response?.picture),
      provider: 'Google',
    }

    const userAlreadyExists = await this.usersRepository.findByEmail(user.email)

    if (userAlreadyExists) {
      const { isExpired, haveRefreshToken } = await ValidateRefreshToken(userAlreadyExists.id)
      const token = this.jwtProvider.sign(userAlreadyExists.id)

      if (!isExpired && haveRefreshToken) {
        return { token, refresh_token: haveRefreshToken }
      } else if (haveRefreshToken) {
        await this.refreshTokenProvider.deleteRefreshToken(haveRefreshToken.id)

        const refresh_token = await this.refreshTokenProvider.createRefreshToken(userAlreadyExists.id)

        return { token, refresh_token }
      }
    }

    const { id } = await this.usersRepository.createUserOAuth(user)

    const access_token = this.jwtProvider.sign(id)

    const refresh_token = await this.refreshTokenProvider.createRefreshToken(id)

    return { token: access_token, refresh_token }
  }
}
