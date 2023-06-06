import { upload } from '@utils/multer'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import rateLimit from '@fastify/rate-limit'
import { AppError } from '@shared/errors/AppError'
import { DiskImplementation } from '@shared/container/providers/StorageProvider/implementations/DiskImplementation'

import { CreateUserController } from '@modules/users/controllers/CreateUserController'

interface Request extends FastifyRequest {
  file?: {
    filename: string
  }
}
const diskImplementation = new DiskImplementation()
const createUserController = new CreateUserController()

export async function userRoutes(fastify: FastifyInstance) {
  await fastify.register(rateLimit, {
    max: 5,
    timeWindow: '1 minute',
  })

  fastify.route({
    method: 'POST',
    url: '/profile',
    preHandler: upload.single('avatar'),
    handler: async function (request: Request, reply: FastifyReply) {
      diskImplementation.saveFile(request.file?.filename ?? '')
      reply.code(200).send()
    },
  })

  fastify.route({
    method: 'POST',
    url: '/new',
    preHandler: upload.single('avatar'),
    handler: createUserController.handle,
  })
}
