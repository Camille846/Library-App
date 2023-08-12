import { inject, injectable } from 'tsyringe'
import { IRefreshToken } from '../providers/RefreshTokenProvider/models/IRefreshToken'
import { AppError } from '@shared/errors/AppError'
import { IJWTProvider } from '../providers/JWTProvider/models/IJWTProvider'
import dayjs from 'dayjs'

@injectable()
export class RefreshTokenService {
  constructor(
    @inject('RefreshTokenProvider')
    private refreshTokenProvider: IRefreshToken,
    @inject('JWTProvider')
    private jwtProvider: IJWTProvider
  ) {}
  async execute(refresh_token: string): Promise<string> {
    const refreshToken = await this.refreshTokenProvider.findRefreshToken(refresh_token)

    if (!refreshToken) {
      throw new AppError('Invalid refresh token!', 401)
    }

    const isRefreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.ExpiresIn))

    if (isRefreshTokenExpired) throw new AppError('Refresh token is expired!', 403)

    const token = this.jwtProvider.sign(refreshToken.user_id)

    return token
  }
}
