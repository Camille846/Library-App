import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  FastifyServerOptions,
} from 'fastify'
import { userRoutes } from '@modules/users/http/routes/users.routes'

export async function routes(
  fastify: FastifyInstance,
  options: FastifyServerOptions
) {
  fastify.register(userRoutes, { prefix: 'users' })
  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })
}
