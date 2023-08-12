import { OAuthGoogleService } from '@modules/users/services/OAuthGoogleService'
import { AppError } from '@shared/errors/AppError'
import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

export class OAuthGoogleController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { authorization } = request.headers

    if (!authorization) throw new AppError('You must provide a token', 401)
    const access_token = authorization.split(' ')[1]

    const createUser = container.resolve(OAuthGoogleService)

    const { token, refresh_token } = await createUser.execute({ token: access_token })

    reply.status(200).send({ token, refresh_token })
  }
}
