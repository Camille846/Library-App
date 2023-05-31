import { upload } from '@utils/multer'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import rateLimit from '@fastify/rate-limit'
import { AppError } from '@shared/errors/AppError'
import { DiskImplementation } from '@shared/container/providers/StorageProvider/implementations/DiskImplementation'
import zod from 'zod'

interface Request extends FastifyRequest {
  file?: {
    filename: string
  }
}
const diskImplementation = new DiskImplementation()

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
    handler: async function (request: Request, reply: FastifyReply) {
      const requestSchema = zod.object({
        full_name: zod.string(),
        username: zod.string(),
        email: zod.string().email(),
        password: zod.string(),
      })

      const { email } = requestSchema.parse(request.body)
      console.log(email)

      reply.code(200).send()
    },
  })
}
