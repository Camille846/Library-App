import { OAuthGoogleService } from '@modules/users/services/OAuthGoogleService'
import { AppError } from '@shared/errors/AppError'
import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

export class OAuthGoogleController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { authorization } = request.headers

    if (!authorization) throw new AppError('You must provide a token', 401)

    const createUser = container.resolve(OAuthGoogleService)
  }
}
