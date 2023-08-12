import dayjs from 'dayjs'
import { RefreshTokenProvider } from '../providers/RefreshTokenProvider/implementations/RefreshTokenProvider'
import { RefreshToken } from '@prisma/client'

const refreshTokenProvider = new RefreshTokenProvider()

interface IResponse {
  isExpired: boolean | undefined
  haveRefreshToken: RefreshToken | undefined
}

export async function ValidateRefreshToken(userId: string): Promise<IResponse> {
  const HaveRefreshToken = await refreshTokenProvider.findRefreshTokenByUserId(userId)

  const isRefreshTokenExpired = HaveRefreshToken && dayjs().isAfter(dayjs.unix(HaveRefreshToken.ExpiresIn))

  return {
    isExpired: isRefreshTokenExpired,
    haveRefreshToken: HaveRefreshToken,
  }
}
