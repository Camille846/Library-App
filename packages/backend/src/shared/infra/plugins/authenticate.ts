import { FastifyMiddieOptions, NextFunction } from '@fastify/middie'
import { verify, JsonWebTokenError } from 'jsonwebtoken'
import authSettings from '@config/auth'
import { AppError } from '@shared/errors/AppError'

export async function authenticate(req: any, res: any, next: NextFunction) {
  const { secret } = authSettings.jwt
  const { authorization } = req.headers

  if (!authorization) throw new AppError('Missing token', 401)

  const access_token = authorization.split(' ')[1]

  try {
    const token = await verify(access_token, secret)

    req.userId = token.sub

    next()
  } catch (error) {
    if (error instanceof JsonWebTokenError) throw new AppError(error.message, 401)

    throw new AppError('Internal server error', 500)
  }
}
