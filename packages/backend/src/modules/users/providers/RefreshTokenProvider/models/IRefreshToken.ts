import { RefreshToken } from '@prisma/client'

export interface IRefreshToken {
  findRefreshToken(refreshToken: string): Promise<RefreshToken | undefined>
  findRefreshTokenByUserId(userId: string): Promise<RefreshToken | undefined>
  createRefreshToken(userId: string): Promise<RefreshToken>
  deleteRefreshToken(refreshToken: string): Promise<void>
}
