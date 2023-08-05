import { NextFunction } from '@fastify/middie'
import { JsonWebTokenError } from 'jsonwebtoken'
import { AppError } from '@shared/errors/AppError'
import { JWTProvider } from '@modules/users/providers/JWTProvider/JWTProvider'
import { FastifyReply, FastifyRequest } from 'fastify'

const jwtProvider = new JWTProvider()

export async function authenticate(req: FastifyRequest, reply: FastifyReply, next: NextFunction) {
  const { authorization } = req.headers

  if (!authorization) throw new AppError('Missing token', 401)

  const access_token = authorization.split(' ')[1]

  try {
    const token = await jwtProvider.verify(access_token)

    req.userId = token.sub as string

    next()
  } catch (error) {
    if (error instanceof JsonWebTokenError) throw new AppError(error.message, 401)

    throw new AppError('Internal server error', 500)
  }
}
