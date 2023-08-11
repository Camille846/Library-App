import { prisma } from 'lib/prisma'
import { IRefreshToken } from '../models/IRefreshToken'
import { RefreshToken } from '@prisma/client'
import dayjs from 'dayjs'

export class RefreshTokenProvider implements IRefreshToken {
  async findRefreshToken(refreshToken: string): Promise<RefreshToken | undefined> {
    return (await prisma.refreshToken.findUnique({
      where: {
        id: refreshToken,
      },
    })) as RefreshToken | undefined
  }
  async createRefreshToken(userId: string): Promise<RefreshToken> {
    return await prisma.refreshToken.create({
      data: {
        user_id: userId,
        ExpiresIn: dayjs().add(40, 'seconds').unix(),
      },
    })
  }
  async findRefreshTokenByUserId(userId: string): Promise<RefreshToken | undefined> {
    return (await prisma.refreshToken.findUnique({
      where: {
        user_id: userId,
      },
    })) as RefreshToken | undefined
  }
  async deleteRefreshToken(refreshToken: string): Promise<void> {
    await prisma.refreshToken.delete({
      where: {
        id: refreshToken,
      },
    })
  }
}
