import { IRefreshToken } from '../models/IRefreshToken'
import { RefreshToken } from '@prisma/client'

export class FakeRefreshTokenProvider implements IRefreshToken {
  public refreshTokens: RefreshToken[] = [
    {
      ExpiresIn: 21901392,
      user_id: 'e9ufhgsed8fgsd8f7sd9hfio',
      id: 'ertf890udf89',
    },
  ]

  async findRefreshTokenByUserId(userId: string): Promise<RefreshToken | undefined> {
    const refresh_token = this.refreshTokens.find((refresh) => refresh.user_id === userId)

    return refresh_token
  }
  async deleteRefreshToken(refreshToken: string): Promise<void> {
    console.log('sdass')
  }
  async findRefreshToken(refreshToken: string): Promise<RefreshToken | undefined> {
    const refresh_token = this.refreshTokens.find((refresh) => refresh.id === refreshToken)

    return refresh_token
  }
  async createRefreshToken(user_id: string): Promise<RefreshToken> {
    return {
      ExpiresIn: 131233,
      id: 'ertf890udf89',
      user_id: user_id,
    }
  }
}
