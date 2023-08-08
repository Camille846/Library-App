import { FastifyInstance, FastifyRequest } from 'fastify'
import rateLimit from '@fastify/rate-limit'
import { DiskImplementation } from '@shared/container/providers/StorageProvider/implementations/DiskImplementation'

import { CreateUserController } from '@modules/users/http/controllers/CreateUserController'
import { AuthenticateUserController } from '../controllers/AuthenticateUserController'
import { OAuthGoogleController } from '../controllers/OAuthGoogleController'

interface Request extends FastifyRequest {
  file?: {
    filename: string
  }
}
const diskImplementation = new DiskImplementation()
const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()
const oauthGoogleController = new OAuthGoogleController()

export async function userRoutes(fastify: FastifyInstance) {
  await fastify.register(rateLimit, {
    max: 5,
    timeWindow: '1 minute',
  })

  fastify.post('/login', authenticateUserController.handle)
  fastify.post('/oauth/google', oauthGoogleController.handle)
  fastify.post('/new', createUserController.handle)
  fastify.get('/hello', (res, reply) => {
    reply.status(200).send({ ok: true })
  })
}
